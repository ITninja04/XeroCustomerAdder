import { toXML } from 'jstoxml';
import fs from 'fs';
import path from 'path';
import parser from "xml2json";
import axios, { AxiosInstance, HttpStatusCode } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import https from 'https';
import { createSecureContext } from 'tls';
import {constants } from 'crypto';



type BaseRequest = {
    Version: string;
    TransactionHeader: {
        SenderID: string;
        ReceiverID: string;
        CountryCode: "MD" | "FT";
        LoginID: string;
        Password: string;
        TransactionID: string;
    }
}

const baseRequest: BaseRequest = {
    Version: '2.0',
    TransactionHeader: {
        SenderID: "12345",
        ReceiverID: "98763",
        CountryCode: "MD",
        LoginID: "7tt24PjjUN",
        Password: "H8Q23ks7Uu",
        TransactionID: uuidv4(),
    }
}



class IngramXmlApi {
    private readonly _instance: AxiosInstance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
            secureContext: createSecureContext({
                secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT

            })
        }),
        baseURL: 'https://newport.ingrammicro.com',
        headers: {
            'Content-Type': 'application/xml'
        }
    });
    private _baseRequest: BaseRequest;
    private readonly _username: string;
    private readonly _password: string;
    private readonly _countryCode: "MD" | "FT";
    private readonly _senderId: string = "12345";
    private readonly _receiverId: string = "98763";
    private _transId = () => this._baseRequest?.TransactionHeader?.TransactionID;

    private regenTrans = (): BaseRequest => {
        this._baseRequest = {
            Version: '2.0',
            TransactionHeader: {
                SenderID: this._senderId,
                ReceiverID: this._receiverId,
                CountryCode: this._countryCode,
                LoginID: this._username,
                Password: this._password,
                TransactionID: uuidv4(),
            }
        }
        console.log(`Transaction Id: ${this._transId()}`);
        return this._baseRequest;
    }
    constructor(username: string, password: string, countryCode: "MD" | "FT" = 'MD', senderId = '12345', receiverId = '98763') {
        this._username = username;
        this._password = password;
        this._countryCode = countryCode;
        this._senderId = senderId;
        this._receiverId = receiverId;
        this._baseRequest = this.regenTrans();
    }

    ExecPNARequest(itemSku: string, qty = 1) {
        this.regenTrans();
        const obj = {
            PNARequest: {
                ...this._baseRequest,
                PNAInformation: {
                    _name: 'PNAInformation',
                    _attrs: {
                        SKU: itemSku,
                        Quantity: `${qty}`
                    }
                },
                ShowDetail: '2'
            }
        }
        const xmlBody = toXML(obj);
        return this._instance.post("/MUSTANG", xmlBody);
    }
    ExecGetOrderTrackingRequest(customerPoNumber: string, orderNumber: string, orderSuffix: string) {
        this.regenTrans();
        const obj = {
            OrderTrackingRequest: {
                ...this._baseRequest,
                TrackingRequestHeader: {
                    BranchOrderNumber: orderNumber,
                    OrderSuffix: orderSuffix,
                    CustomerPO: customerPoNumber
                },
                ShowDetail: '2'
            }
        }
        const xmlBody = toXML(obj);
        return this._instance.post("/MUSTANG", xmlBody);
    }
    ExecGetOrderStatusRequest(customerPoNumber: string, orderNumber: string, orderSuffix: string) {
        this.regenTrans();
        const obj = {
            OrderDetailRequest: {
                ...this._baseRequest,
                OrderHeaderInfo: {
                    BranchOrderNumber: orderNumber,
                    OrderSuffix: orderSuffix,
                    CustomerPO: customerPoNumber
                },
                ShowDetail: '2'
            }
        }
        const xmlBody = toXML(obj);
        return this._instance.post("/MUSTANG", xmlBody);
    }
}

async function test() {
    const basePath = '/Users/altiview/Code/SophosPartnerPortalStuff/XeroCustomerAdder/samples';
    const b2 = new IngramXmlApi("7tt24PjjUN", "H8Q23ks7Uu", "MD");
    const orderStatus = await b2.ExecGetOrderStatusRequest('1120221337', '2180475', '11');
    const orderShippingStatus = await b2.ExecGetOrderTrackingRequest('1120221337', '2180475', '11');
    const panResults = await b2.ExecPNARequest('A120TCHNF', 4);

    fs.writeFileSync(path.join(basePath, 'order_status.json'), parser.toJson(orderStatus.data, {
        sanitize: true,
        trim: true
    }));
    
    fs.writeFileSync(path.join(basePath, 'order_shipping_status.json'), parser.toJson(orderShippingStatus.data, {
        sanitize: true,
        trim: true
    }));

    fs.writeFileSync(path.join(basePath, 'pricing_and_availabiltiy_status.json'), parser.toJson(panResults.data, {
        sanitize: true,
        trim: true
    }));
}

test().then(() => {
    console.log('Done');
})