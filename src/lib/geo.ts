import {type NextRequest} from 'next/server';
import requestIp, {type Request} from 'request-ip';
import {env} from './helpers';

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
  let loc = req.geo;
  if (loc?.longitude && loc?.latitude) {
    return loc;
  } else {
    try {
      const ip = await getIp(req);
      const locFromIpRes = await fetch(
        `https://api.ip2location.io/?key=${env('IP2LOCATION_API_KEY')}&ip=${ip}`
      );
      const locationFromIp = await locFromIpRes.json();
      return locationFromIp;
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
      throw err;
    }
  }
};
