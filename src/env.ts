export function getZoneId() {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;

  if (!zoneId) {
    throw new Error("zone id was not set");
  }

  return zoneId;
}

export function getZoneRecordName() {
  const zoneRecordName = process.env.CLOUDFLARE_RECORD_NAME || "example.com";

  return zoneRecordName;
}
