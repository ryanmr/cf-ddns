import { cloudflareApi } from "./constants";

export interface CloudflareZoneRecord {
  id: string;
  zone_id: string;
  zone_name: string;
  name: string;
  type: string;
  content: string;
  proxiable: boolean;
  proxied: boolean;
  ttl: number;
  locked: boolean;
  meta: {
    auto_added: boolean;
    managed_by_apps: boolean;
    managed_by_argo_tunnel: boolean;
    source: string;
  };
  comment: string | null;
  tags: string[];
  created_on: string;
  modified_on: string;
}

export interface CloudflareListDnsRecordsResponse {
  result: CloudflareZoneRecord[];
  success: boolean;
  errors: string[];
  messages: string[];
  result_info: {
    page: number;
    per_page: number;
    count: number;
    total_count: number;
    total_pages: number;
  };
}

export interface CloudflarePatchDnsRecordRequest {
  content: string;
  name: string;
  type: string;
}

function getAccessToken() {
  const value = process.env.CLOUDFLARE_ACCESS_TOKEN;
  if (!value) {
    throw new Error("cloudflare access token was not set");
  }
  return value;
}

export function getListDnsRecordsEndpoint(zone: string) {
  const endpoint = cloudflareApi + `/zones/${zone}/dns_records`;
  return endpoint;
}

export async function getListDnsRecords(zone: string) {
  const url = getListDnsRecordsEndpoint(zone);
  const token = getAccessToken();
  console.info(`🔑 token: ${token.substring(0, 8)}...`);
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await resp.json();

  return data;
}

export function selectZoneRecordByName(
  records: CloudflareZoneRecord[],
  name: string
): CloudflareZoneRecord {
  const selected = records.find((record) => record.name === name);

  if (!selected) {
    throw new Error("zone record was not found");
  }

  return selected;
}

export function getPatchDnsRecordEndpoint(zoneId: string, recordId: string) {
  return cloudflareApi + `/zones/${zoneId}/dns_records/${recordId}`;
}

export function makePatchBody(
  existingRecord: CloudflareZoneRecord,
  newIp: string
) {
  const body: CloudflarePatchDnsRecordRequest = {
    content: newIp,
    name: existingRecord.name,
    type: existingRecord.type,
  };
  return body;
}

export async function patchDnsRecord(
  zoneId: string,
  recordId: string,
  body: CloudflarePatchDnsRecordRequest
) {
  const url = getPatchDnsRecordEndpoint(zoneId, recordId);
  const token = getAccessToken();
  const resp = await fetch(url, {
    method: "patch",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return data;
}
