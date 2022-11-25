import axios from 'axios';
import rateLimit from 'axios-rate-limit';

import { makeContacts } from './contacts';
import * as figlet from 'figlet';
import {Phone, Contact} from 'xero-node'
// import app from "./app";

console.log(figlet.textSync("Xero AltiView Client Adder"));
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}!`)
// });




const appToken = '1000.8cb0c5c2ebd9154f29810b4664404490.07a521becf81dd650dba4d6ffa8403ff';


const http = rateLimit(axios.create({
    headers: {
        'Authorization': `Zoho-oauthtoken ${appToken}`,
        'Content-Type': 'application/json'
    }
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })


function startMe() {
    const contacts = makeContacts();

    const getPhone = (contact: Contact, fax=false) => {
        if(fax) {
            const f = contact.phones?.find(c => c.phoneType === Phone   .PhoneTypeEnum.FAX);
            if(f) {
                return `+1-${f.phoneAreaCode}-${f.phoneNumber}`
            }else {
                return '';
            }
        }else {
            const d = contact.phones?.find(c => c.phoneType === Phone   .PhoneTypeEnum.DDI);
            if(d) {
                return `+1-${d.phoneAreaCode}-${d.phoneNumber}`
            }else {
                return '';
            }
        }
    }
    const formatAddresses = (addy: Contact) => {
        
        return {
            "attention": addy.name,
            "address": addy.addresses[0].addressLine1,
            "city": addy.addresses[0].city,
            "state": addy.addresses[0].region,
            "zip": addy.addresses[0].postalCode,
            "country": "U.S.A",
            "fax": getPhone(addy, true),
            "phone": getPhone(addy, false)
        }
    }
    const promises = contacts.map(c => {
        if(c.addresses.length > 0) {
            const data = formatAddresses(c);
            return http.post('https://books.zoho.com/api/v3/contacts/3678765000000078431/address?organization_id=796427423', {
                ...data
            });
        }
    });

    Promise.all(promises).then((e) => {
        console.log('Wrote Addresses!');
    }).catch(err => {
        console.error('Error writing addresses');
        console.error(err);
    })

}

startMe();