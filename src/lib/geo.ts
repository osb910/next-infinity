import {type NextRequest} from 'next/server';
import requestIp, {type Request} from 'request-ip';
import {env} from './helpers';
import {GeoLocation} from '@/types';

export const getIp = async (req: NextRequest & Request) => {
  const {headers, ip: nextIp} = req;
  let ip = nextIp ?? headers.get('x-ip') ?? requestIp.getClientIp(req);
  if (!ip || ip === 'undefined') {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    ip = (await ipRes.json()).ip;
  }
  return ip;
};

export const getLocationFromIp = async (req: NextRequest & Request) => {
  let loc: GeoLocation;
  if (req.geo?.longitude && req.geo?.latitude) {
    loc = {
      ip: req?.ip,
      country: req.geo?.country,
      region: req.geo?.region,
      city: req.geo?.city,
      longitude: req.geo?.longitude ? +req.geo?.longitude : undefined,
      latitude: req.geo?.latitude ? +req.geo?.latitude : undefined,
    };
    return loc;
  } else {
    try {
      const ip = await getIp(req);
      const locFromIpRes = await fetch(
        `https://api.ip2location.io/?key=${env('IP2LOCATION_API_KEY')}&ip=${ip}`
      );
      const locFromIp = await locFromIpRes.json();
      loc = {
        ip: locFromIp.ip === '-' ? undefined : locFromIp.ip,
        country:
          locFromIp.country_name === '-' ? undefined : locFromIp.country_name,
        countryCode:
          locFromIp.country_code === '-' ? undefined : locFromIp.country_code,
        region:
          locFromIp.region_name === '-' ? undefined : locFromIp.region_name,
        city: locFromIp.city_name === '-' ? undefined : locFromIp.city_name,
        longitude: locFromIp.longitude,
        latitude: locFromIp.latitude,
        zipCode: locFromIp.zip_code === '-' ? undefined : locFromIp.zip_code,
        timeZone: locFromIp.time_zone === '-' ? undefined : locFromIp.time_zone,
        asn: locFromIp.asn === '-' ? undefined : locFromIp.asn,
        as: locFromIp.as === '-' ? undefined : locFromIp.as,
        isProxy: locFromIp.is_proxy === '-' ? undefined : locFromIp.is_proxy,
      };
      return loc;
    } catch (err) {
      console.error(err);
    }
  }
};
