export interface IfconfigResponse {
  ip: string;
  ip_decimal: number;
  country: string;
  country_iso: string;
  country_eu: boolean;
  region_name: string;
  region_code: string;
  metro_code: number;
  zip_code: string;
  city: string;
  latitude: number;
  longitude: number;
  time_zone: string;
  asn: string;
  asn_org: string;
  hostname: string;
  user_agent: {
    product: string;
    raw_value: string;
  };
}

export function getExternalIpEndpoint() {
  return "https://ifconfig.co/";
}

export async function getExternalIp() {
  const url = getExternalIpEndpoint();
  const resp = await fetch(url, {
    method: "get",
    headers: { "User-Agent": "curl", Accept: "application/json" },
  });
  const data = (await resp.json()) as IfconfigResponse;
  const ip = data.ip;

  const regex = /[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}/gi;
  const matches = ip.match(regex);

  if (!matches) {
    throw new Error("not an ip");
  }

  return data;
}
