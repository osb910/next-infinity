import {type NextRequest} from 'next/server';
import requestIp, {type Request} from 'request-ip';
import {WebServiceClient} from '@maxmind/geoip2-node';
import {env} from './helpers';
import type {GeoLocation} from '@/types';

const nullLocation = {
  ip: undefined,
  country: undefined,
  countryCode: undefined,
  region: undefined,
  city: undefined,
  longitude: undefined,
  latitude: undefined,
};

export const getGeoLocationAbstract = async (): Promise<GeoLocation> => {
  try {
    const res = await fetch(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${env(
        'ABSTRACT_API_KEY'
      )}`
    );
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error.message);
    }
    const offset = json.timezone?.gmt_offset;
    const location = {
      ip: json.ip_address,
      country: json.country,
      countryCode: json.country_code,
      region: json.region,
      city: json.city,
      longitude: json.longitude,
      latitude: json.latitude,
      source: 'Abstract',
      as: json.connection.autonomous_system_organization,
      asn: `${json.connection.autonomous_system_number}`,
      isp: json.connection.isp_name,
      timeZone: `${offset > 0 ? '+' : offset === 0 ? '' : '-'}${offset.padStart(
        2,
        '0'
      )}:00 - ${json.timezone.name}`,
    };
    return location;
  } catch (err) {
    console.error(err);
    return nullLocation;
  }
};

export const getIp = async (req: NextRequest & Request) => {
  const {headers, ip: nextIp} = req;
  let ipAddress = {
    ip: nextIp,
    ipSource: 'Vercel',
  };
  if (!ipAddress.ip || ipAddress.ip === 'undefined') {
    ipAddress = {
      ip: headers.get('x-ip') ?? '',
      ipSource: 'headers',
    };
  }
  if (!ipAddress.ip) {
    ipAddress = {
      ip: requestIp.getClientIp(req) ?? '',
      ipSource: 'request-ip',
    };
  }
  if (!ipAddress.ip || ipAddress.ip === 'undefined') {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    ipAddress = {
      ip: (await ipRes.json()).ip,
      ipSource: 'ipify',
    };
  }
  return ipAddress;
};

export const getGeoLocationIPInfo = async (
  ip: string
): Promise<GeoLocation> => {
  try {
    const res = await fetch(
      `https://ipinfo.io/${ip}?token=${env('IPINFO_API_KEY')}`
    );
    const json = await res.json();
    const location = {
      ip: json.ip,
      country: json.country,
      region: json.region,
      city: json.city,
      longitude: +json.loc.split(',')[1],
      latitude: +json.loc.split(',')[0],
      countryCode: json.country,
      isp: json.org.split(' ')[1],
      asn: json.org.split(' ')[0].replace(/^AS/, ''),
      source: 'IPInfo',
      timeZone: json.timezone,
    };
    return location;
  } catch (err) {
    console.error(err);
    return nullLocation;
  }
};

export const getGeoLocationIP2Location = async (
  ip: string
): Promise<GeoLocation> => {
  try {
    const locFromIpRes = await fetch(
      `https://api.ip2location.io/?key=${env('IP2LOCATION_API_KEY')}&ip=${ip}`
    );
    const json = await locFromIpRes.json();
    const location = {
      ip: json.ip === '-' ? undefined : json.ip,
      country: json.country_name === '-' ? undefined : json.country_name,
      countryCode: json.country_code === '-' ? undefined : json.country_code,
      region: json.region_name === '-' ? undefined : json.region_name,
      city: json.city_name === '-' ? undefined : json.city_name,
      longitude: json.longitude,
      latitude: json.latitude,
      zipCode: json.zip_code === '-' ? undefined : json.zip_code,
      timeZone: json.time_zone === '-' ? undefined : json.time_zone,
      asn: json.asn === '-' ? undefined : json.asn,
      as: json.as === '-' ? undefined : json.as,
      isProxy: json.is_proxy === '-' ? undefined : json.is_proxy,
      source: 'IP2Location',
    };
    return location;
  } catch (err) {
    console.error(err);
    return {
      ...nullLocation,
      ip,
    };
  }
};

export const getGeoLocationMaxMind = async (
  ip: string
): Promise<GeoLocation> => {
  const client = new WebServiceClient(
    env('MAXMIND_ACCOUNT_ID') ?? '',
    env('MAXMIND_LICENSE_KEY') ?? '',
    {host: 'geolite.info'}
  );
  try {
    const location = await client.city(ip ?? '');
    return {
      ip: location.traits.ipAddress,
      country: location.country?.names.en,
      countryCode: location.country?.isoCode,
      region: location.city?.names.en,
      city: location.subdivisions?.[0].names.en,
      longitude: location.location?.longitude,
      latitude: location.location?.latitude,
      zipCode: location.postal?.code,
      source: 'MaxMind',
      as: location.traits.autonomousSystemOrganization,
      asn: `${location.traits.autonomousSystemNumber}`,
      isProxy: location.traits.isPublicProxy,
      timeZone: location.location?.timeZone,
    };
  } catch (err) {
    console.error(err);
    return {
      ...nullLocation,
      ip,
    };
  }
};

export const getLocationFromIp = async (
  req: NextRequest & Request,
  source?: string
) => {
  let loc: GeoLocation;
  if (
    (req.geo?.longitude &&
      req.geo?.latitude &&
      source !== 'IP2Location' &&
      source !== 'MaxMind') ||
    source === 'Vercel'
  ) {
    loc = {
      ip: req?.ip,
      country: req.geo?.country,
      region: req.geo?.region,
      city: req.geo?.city,
      longitude: req.geo?.longitude ? +req.geo?.longitude : undefined,
      latitude: req.geo?.latitude ? +req.geo?.latitude : undefined,
      source: 'Vercel',
    };
    return loc;
  } else {
    try {
      const {ip, ipSource} = await getIp(req);
      console.log('ip source', ipSource);
      loc = await getGeoLocationIPInfo(ip ?? '');

      if (!loc.country) {
        loc = await getGeoLocationIP2Location(ip ?? '');
      }

      if (!loc.country) {
        loc = await getGeoLocationMaxMind(ip ?? '');
      }

      return loc;
    } catch (err) {
      console.error(err);
    }
  }
};
