import { Zoho, ZohoApiClient } from "@trieb.work/zoho-ts";
import fs from 'fs';
import path from 'path';

const json = fs.readFileSync('/Users/altiview/Code/SophosPartnerPortalStuff/SophosPartnerCLI/items/appliances.json', 'utf-8');

const headers = [
    'ItemName',
    'TermType',
    'Description',
    'ModelType',
    'LowerBound',
    'UpperBound',

]

async function runMe() {
const zoho = new Zoho(
    await ZohoApiClient.fromOAuth({
      orgId: "796427423",
      dc: ".com",
      client: {
        id: "1004.05SGGLRI10S20CWLSXV5XZX3E66UIF",
        secret: "6b7a8e62029e410459fdd7369017b39219ed7702d9",
      },
    }),
  );

  const items = await zoho.item.list({sortColumn: 'created_time'});
  console.log(items);
}

runMe().then(e => {
    console.log('Finished...')
})