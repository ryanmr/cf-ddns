import {
  getListDnsRecords,
  selectZoneRecordByName,
  patchDnsRecord,
  makePatchBody,
} from "./cloudflare";
import { getZoneId, getZoneRecordName } from "./env";
import { getExternalIp } from "./ip";

type OnUpdateFn = (ip: string, action: "same" | "updated") => void;

/**
 * Cron Job.
 *
 * @param onUpdate a function that runs when the patch runs, or when the patch is skipped
 */
export async function job(onUpdate?: OnUpdateFn) {
  const zoneId = getZoneId();
  const zoneRecordName = getZoneRecordName();

  console.info(`🌤 cloudflare dns sync`);

  const ip = await getExternalIp();
  console.log("🦜 detected ip", ip.ip);

  const data = await getListDnsRecords(zoneId);

  const selectedRecord = selectZoneRecordByName(data.result, zoneRecordName);
  const selectedRecordZoneId = selectedRecord.id;

  console.info(`🌤️ cloudflare reports the ip is ${selectedRecord.content}`);
  console.info(
    `🌤️ cloudflare reports the ip was set on ${selectedRecord.modified_on}`
  );

  if (ip.ip === selectedRecord.content) {
    if (onUpdate) {
      onUpdate(selectedRecord.content, "same");
    }
    console.info(`💸 exiting early; the ip is the same so no need to update`);
    return;
  }

  const body = makePatchBody(selectedRecord, ip.ip);

  console.info(
    `🦋 patching cloudflare dns record settings for ${zoneId}/${selectedRecordZoneId}`
  );

  // the response does not matter right now
  // maybe it could report back something useful in the future
  await patchDnsRecord(zoneId, selectedRecordZoneId, body);

  if (onUpdate) {
    onUpdate(ip.ip, "updated");
  }

  console.info(`👍 all done for now`);
}
