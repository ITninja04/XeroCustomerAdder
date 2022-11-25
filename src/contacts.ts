import { Address, Contact, CurrencyCode, PaymentTermType, Phone } from "xero-node";

class VulcanContact {
    private contactDetails: Contact;
    constructor(name: string) {
        let formattedAcountName = name.replace(/[^A-Za-z0-9 ]/g, '').replace(' ', '_').toUpperCase()
        let formattedDisplayName = name.replace(/[^A-Za-z0-9 &]/g, '');
        this.contactDetails = {
            contactStatus: Contact.ContactStatusEnum.ACTIVE,
            name: `Vulcan Materials Company - ${formattedDisplayName}`,
            accountNumber: `VMC-${formattedAcountName}`,
            firstName: "Karl",
            lastName: "Wighaman",
            emailAddress: "wighamank@vmcmail.com",
            defaultCurrency: CurrencyCode.USD,
            addresses: [
            //   {
            //     addressType: Address.AddressTypeEnum.POBOX,
            //     addressLine1: "1200 Urban Center Dr",
            //     city: "Birmingham",
            //     region: "AL",
            //     postalCode: "35242",
            //     country: "USA",
            //     attentionTo: "Accounts Payable",
            //   }
            ],
            phones: [
              {
                phoneType: Phone.PhoneTypeEnum.DEFAULT,
                phoneNumber: "444-5920",
                phoneAreaCode: "713",
                phoneCountryCode: "1",
              }
            ],
            isSupplier: false,
            isCustomer: true,
            paymentTerms: {
              sales: {
                day: 0,
                type: PaymentTermType.DAYSAFTERBILLDATE,
              },
            },
            website: "https://www.vulcanmaterials.com/",
            hasAttachments: false,
            hasValidationErrors: false
        }
    }
    public addAddress(address1: string, city: string, state: string, zip: string, address2: string = undefined, address3: string = undefined, address4: string = undefined) {
        this.contactDetails?.addresses.push({
            addressType: Address.AddressTypeEnum.STREET,
            addressLine1: address1,
            addressLine2: address2,
            addressLine3: address3,
            addressLine4: address4,
            city: city,
            region: state,
            postalCode: zip,
            country: "USA",
            attentionTo: this.contactDetails.name,
          })
        return this;
    }
    public addPhone(number: string, type: Phone.PhoneTypeEnum = Phone.PhoneTypeEnum.DDI, countryCode: string = "1") {

        const cleansedNumber = number.trim().replace(/[^0-9]/g, '');
        if(cleansedNumber.length < 10 || cleansedNumber.length > 11) {
            return this;
        } else {
            const _number = cleansedNumber.length === 10 ? cleansedNumber : cleansedNumber.substring(1,11);
            const areaCode = _number.substring(0,3);
            const prefix = _number.substring(3,6);
            const lineNumber = _number.substring(6, 10);
            this.contactDetails?.phones.push(
                {
                    phoneType: type,
                    phoneNumber: `${prefix}-${lineNumber}`,
                    phoneAreaCode: areaCode,
                    phoneCountryCode: countryCode,
                }
            )
            return this;
        }
    }
    public getRecord() {
        return this.contactDetails;
    }
}


const json = [
        {
            "name": "1604 Asphalt",
            "street1": "4303 N E Loop 1604",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78247",
            "locationNumber": "1",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-545-5299",
                    "main_fax": "210-494-9697",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "1604 Quarry",
            "street1": "4303 N Loop 1604 East",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78247",
            "locationNumber": "2",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-494-9555",
                    "main_fax": "210-494-9697",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "1604 Ready-Mix",
            "street1": "4303 N Loop 1604 East",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78247",
            "locationNumber": "3",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-494-6705",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Abilene Asphalt",
            "street1": "14500 Cr 224",
            "city": "Abilene",
            "state": "TX",
            "zip": "79602",
            "locationNumber": "4",
            "phone_numbers": {
                "phone": {
                    "main_phone": "325-529-3785",
                    "main_fax": "375-529-3305",
                    "sales": {
                        "contactName": "Sean Hughes",
                        "contactNumber": "210-620-6042"
                    }
                }
            }
        },
        {
            "name": "Abilene Danville",
            "street1": "1801 N. Danville",
            "city": "Abilene",
            "state": "TX",
            "zip": "79603",
            "locationNumber": "5"
        },
        {
            "name": "Abilene Hardison",
            "street1": "126 Hardison Lane",
            "city": "Abilene",
            "state": "TX",
            "zip": "79602",
            "locationNumber": "6"
        },
        {
            "name": "Admin Office (SC & Corp)",
            "street1": "331 N. Main St.,",
            "city": "Euless",
            "state": "TX",
            "zip": "76039",
            "locationNumber": "7"
        },
        {
            "name": "Alliance",
            "street1": "13624 FM 1171",
            "city": "Roanoke",
            "state": "TX",
            "zip": "76262",
            "locationNumber": "8"
        },
        {
            "name": "Anna Plant #722",
            "street1": "9024 County Rd. 418",
            "city": "Anna",
            "state": "TX",
            "zip": "75409",
            "locationNumber": "9"
        },
        {
            "name": "Austin Volumetric",
            "street1": "4433 Terry-O Ln",
            "city": "Austin",
            "state": "TX",
            "zip": "78745",
            "locationNumber": "10"
        },
        {
            "name": "Aztec Portable Asphalt",
            "street1": "3001 US 283 North",
            "city": "Baird",
            "state": "TX",
            "zip": "79504",
            "locationNumber": "11",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Sean Hughes",
                        "contactNumber": "210-620-6042"
                    }
                }
            }
        },
        {
            "name": "Ballinger",
            "street1": "1440 Hwy. 158 (1/2 Mile N. of Hwy. 158)",
            "city": "Ballinger",
            "state": "TX",
            "zip": "76821",
            "locationNumber": "12"
        },
        {
            "name": "Beaumont Yard",
            "street1": "1399 Carroll Street",
            "city": "Beaumont",
            "state": "TX",
            "zip": "77701",
            "locationNumber": "13",
            "phone_numbers": {
                "phone": {
                    "main_phone": "409-833-4177",
                    "main_fax": "409-212-9347",
                    "sales": {
                        "contactName": "Garrett Elbert",
                        "contactNumber": "409-965-6204"
                    }
                }
            }
        },
        {
            "name": "Big Spring",
            "street1": "605 North Benton Street",
            "city": "Big Spring",
            "state": "TX",
            "zip": "79720",
            "locationNumber": "14"
        },
        {
            "name": "Black Lease",
            "street1": "14500 CR 224",
            "city": "Potosi",
            "state": "TX",
            "zip": "79603",
            "locationNumber": "15",
            "phone_numbers": {
                "phone": {
                    "main_phone": "325-271-4271",
                    "main_fax": "325-201-9644",
                    "sales": {
                        "contactName": "Tyler Bradshaw",
                        "contactNumber": "210-505-9253"
                    }
                }
            }
        },
        {
            "name": "Blue Wing Ready-Mix",
            "street1": "12955 Blue Wing Road",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78223",
            "locationNumber": "16",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-633-9573",
                    "main_fax": "210-633-9428",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Brady",
            "street1": "2600 Bridge Street",
            "city": "Brady",
            "state": "TX",
            "zip": "76825",
            "locationNumber": "17"
        },
        {
            "name": "Breckenridge",
            "street1": "502-C E. Lindsey",
            "city": "Breckenridge",
            "state": "TX",
            "zip": "76424",
            "locationNumber": "18"
        },
        {
            "name": "Briggs Sand & Gravel",
            "street1": "1902 FM 1432",
            "city": "Victoria",
            "state": "TX",
            "zip": "77905",
            "locationNumber": "19",
            "phone_numbers": {
                "phone": {
                    "main_phone": "361-578-1861",
                    "sales": {
                        "contactName": "Clark Faust",
                        "contactNumber": "361-935-1513"
                    }
                }
            }
        },
        {
            "name": "Brownfield",
            "street1": "1607 Lubbock Rd.",
            "city": "Brownfield",
            "state": "TX",
            "zip": "79316",
            "locationNumber": "20"
        },
        {
            "name": "Brownsville Yard",
            "street1": "10905 Ostos Road",
            "city": "Brownsville",
            "state": "TX",
            "zip": "78521",
            "locationNumber": "21",
            "phone_numbers": {
                "phone": {
                    "main_phone": "956-831-8888",
                    "main_fax": "281-276-4999",
                    "sales": {
                        "contactName": "Carlos Trevino",
                        "contactNumber": "956-371-7587"
                    }
                }
            }
        },
        {
            "name": "Brownwood",
            "street1": "US 377 Brady Hwy",
            "city": "Brownwood",
            "state": "TX",
            "zip": "76801",
            "locationNumber": "22",
            "phone_numbers": {
                "phone": {
                    "main_phone": "325-646-8526",
                    "main_fax": "325-646-0117",
                    "sales": {
                        "contactName": "Tyler Bradshaw",
                        "contactNumber": "210-505-9253"
                    }
                }
            }
        },
        {
            "name": "Brownwood",
            "street1": "1601 CR 234",
            "city": "Brownwood",
            "state": "TX",
            "zip": "76801",
            "locationNumber": "23"
        },
        {
            "name": "Brownwood Asphalt",
            "street1": "US 377 Brady Hwy",
            "city": "Brownwood",
            "state": "TX",
            "zip": "76801",
            "locationNumber": "24",
            "phone_numbers": {
                "phone": {
                    "main_phone": "325-646-8526",
                    "main_fax": "325-646-0117",
                    "sales": {
                        "contactName": "Sean Hughes",
                        "contactNumber": "210-620-6042"
                    }
                }
            }
        },
        {
            "name": "Burkburnett",
            "street1": "1000 Daniels Rd.",
            "city": "Burkburnett",
            "state": "TX",
            "zip": "76354",
            "locationNumber": "25"
        },
        {
            "name": "Chatfield Sand and Gravel",
            "street1": "9500 N.E. County Road 3270",
            "city": "Chatfield",
            "state": "TX",
            "zip": "75105",
            "locationNumber": "26",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Etta Dean",
                        "contactNumber": "214-546-2580"
                    }
                }
            }
        },
        {
            "name": "Cherokee Bridge",
            "street1": "101 Industrial Road",
            "city": "Junction",
            "state": "TX",
            "zip": "76849",
            "locationNumber": "27"
        },
        {
            "name": "Cherokee Bridge",
            "street1": "1968 US-83",
            "city": "Menard",
            "state": "TX",
            "zip": "76859",
            "locationNumber": "28"
        },
        {
            "name": "Chico",
            "street1": "2560 TX 101",
            "city": "Bridgeport",
            "state": "TX",
            "zip": "76426",
            "locationNumber": "29",
            "phone_numbers": {
                "phone": {
                    "main_phone": "940-683-4996",
                    "main_fax": "940-683-4924",
                    "sales": {
                        "contactName": "Courtney Reibel",
                        "contactNumber": "469-994-9828"
                    }
                }
            }
        },
        {
            "name": "Chisholm Trail",
            "street1": "12000 Old Granbury Rd.",
            "city": "Crowley",
            "state": "TX",
            "zip": "76036",
            "locationNumber": "30"
        },
        {
            "name": "Cleburne",
            "street1": "502 Mulberry Street",
            "city": "Cleburne",
            "state": "TX",
            "zip": "76031",
            "locationNumber": "31"
        },
        {
            "name": "Cleveland Yard",
            "street1": "1099 5th Street",
            "city": "Cleveland",
            "state": "TX",
            "zip": "77237",
            "locationNumber": "33",
            "phone_numbers": {
                "phone": {
                    "main_phone": "936-523-3225",
                    "sales": {
                        "contactName": "Carter Yancey",
                        "contactNumber": "936-537-0680"
                    }
                }
            }
        },
        {
            "name": "Coleman 1",
            "street1": "500 N. Trinity",
            "city": "Coleman",
            "state": "TX",
            "zip": "76834",
            "locationNumber": "34"
        },
        {
            "name": "Colorado City",
            "street1": "721 West I-20",
            "city": "Colorado City",
            "state": "TX",
            "zip": "79512",
            "locationNumber": "35"
        },
        {
            "name": "Comanche",
            "street1": "105 CR 403",
            "city": "Comanche",
            "state": "TX",
            "zip": "76442",
            "locationNumber": "36"
        },
        {
            "name": "Conroe Asphalt",
            "street1": "9490 FM 1485",
            "city": "Conroe",
            "state": "TX",
            "zip": "77306",
            "locationNumber": "37",
            "phone_numbers": {
                "phone": {
                    "main_phone": "936-523-3225",
                    "sales": {
                        "contactName": "Jason Carter",
                        "contactNumber": "346-420-4886"
                    }
                }
            }
        },
        {
            "name": "Conroe Yard",
            "street1": "9490 FM 1485",
            "city": "Conroe",
            "state": "TX",
            "zip": "77306",
            "locationNumber": "38",
            "phone_numbers": {
                "phone": {
                    "main_phone": "936-523-3225",
                    "sales": {
                        "contactName": "Carter Yancey",
                        "contactNumber": "936-537-0680"
                    }
                }
            }
        },
        {
            "name": "Corpus Christi Volumetric",
            "street1": "4934 Hwy 181",
            "city": "Gregory",
            "state": "TX",
            "zip": "78359",
            "locationNumber": "39"
        },
        {
            "name": "Corpus Christi Yard",
            "street1": "8357 Joe Fulton International Trade Corridor",
            "city": "Corpus Christi",
            "state": "TX",
            "zip": "78409",
            "locationNumber": "40",
            "phone_numbers": {
                "phone": {
                    "main_phone": "361-241-4722",
                    "main_fax": "361-241-6635",
                    "sales": {
                        "contactName": "Victor Pinon",
                        "contactNumber": "281-750-5746"
                    }
                }
            }
        },
        {
            "name": "Dallas Yard",
            "street1": "1760 Z Street",
            "city": "Dallas",
            "state": "TX",
            "zip": "75229",
            "locationNumber": "41",
            "phone_numbers": {
                "phone": {
                    "main_phone": "972-556-1999",
                    "main_fax": "972-556-0622",
                    "sales": {
                        "contactName": "Johnny Nelson",
                        "contactNumber": "214-310-2792"
                    }
                }
            }
        },
        {
            "name": "DeLeon Quarry",
            "street1": "5900 Hwy 6",
            "city": "DeLeon",
            "state": "TX",
            "zip": "76444",
            "locationNumber": "42"
        },
        {
            "name": "Denton",
            "street1": "406 E. Sycamore",
            "city": "Denton",
            "state": "TX",
            "zip": "76205",
            "locationNumber": "43"
        },
        {
            "name": "DeSoto",
            "street1": "1001 E. Centre Park Blvd.",
            "city": "Desoto",
            "state": "TX",
            "zip": "75213",
            "locationNumber": "44"
        },
        {
            "name": "DeSoto 2",
            "street1": "812 E Centre Park Blvd",
            "city": "DeSoto",
            "state": "TX",
            "zip": "75115",
            "locationNumber": "45"
        },
        {
            "name": "DFW Portable Plant #2",
            "street1": "402 Westport Pkwy",
            "city": "Haslet",
            "state": "TX",
            "zip": "70652",
            "locationNumber": "46"
        },
        {
            "name": "DFW Portable Plant #3",
            "street1": "13624 FM 1171",
            "city": "Roanoke",
            "state": "TX",
            "zip": "76262",
            "locationNumber": "47"
        },
        {
            "name": "DFW Portable Plant #4",
            "street1": "6115 Forest Park Rd.",
            "city": "Dallas",
            "state": "TX",
            "zip": "75235",
            "locationNumber": "48"
        },
        {
            "name": "DFW Volumetric",
            "street1": "5526 Crystal Lake Blvd",
            "city": "Dallas",
            "state": "TX",
            "zip": "75236",
            "locationNumber": "49"
        },
        {
            "name": "DFW Volumetric",
            "street1": "2725 Prestige Rd.,",
            "city": "Keller",
            "state": "TX",
            "zip": "76248",
            "locationNumber": "50"
        },
        {
            "name": "DFW Volumetric",
            "street1": "2624 Joe Field Rd",
            "city": "Dallas",
            "state": "TX",
            "zip": "75229",
            "locationNumber": "51"
        },
        {
            "name": "DFW Volumetric",
            "street1": "2624 Joe Field Road - Buildings",
            "city": "Dallas",
            "state": "TX",
            "zip": "75229",
            "locationNumber": "52"
        },
        {
            "name": "Eastland",
            "street1": "702 County Road 442",
            "city": "Eastland",
            "state": "TX",
            "zip": "76448",
            "locationNumber": "53",
            "phone_numbers": {
                "phone": {
                    "main_phone": "254-629-2850",
                    "main_fax": "254-629-8779",
                    "sales": {
                        "contactName": "Tyler Bradshaw",
                        "contactNumber": "210-505-9253"
                    }
                }
            }
        },
        {
            "name": "Eastland",
            "street1": "FM 3101 North",
            "city": "Eastland",
            "state": "TX",
            "zip": "76448",
            "locationNumber": "54"
        },
        {
            "name": "Eastland",
            "street1": "613 N. College",
            "city": "Eastland",
            "state": "TX",
            "zip": "76448",
            "locationNumber": "55"
        },
        {
            "name": "Eastland Asphalt",
            "street1": "702 County Road 442",
            "city": "Eastland",
            "state": "TX",
            "zip": "76448",
            "locationNumber": "56",
            "phone_numbers": {
                "phone": {
                    "main_phone": "254-629-2850",
                    "main_fax": "254-629-8779",
                    "sales": {
                        "contactName": "Sean Hughes",
                        "contactNumber": "210-620-6042"
                    }
                }
            }
        },
        {
            "name": "Ferris Plant",
            "street1": "1100 S. Interstate 45",
            "city": "Ferris",
            "state": "TX",
            "zip": "75125",
            "locationNumber": "57"
        },
        {
            "name": "Forney",
            "street1": "14755 W Hwy 80",
            "city": "Forney",
            "state": "TX",
            "zip": "75126",
            "locationNumber": "58"
        },
        {
            "name": "Fort Bend Yard",
            "street1": "939 A Hwy 36",
            "city": "Rosenburg",
            "state": "TX",
            "zip": "77471",
            "locationNumber": "59",
            "phone_numbers": {
                "phone": {
                    "main_phone": "281-238-5777",
                    "main_fax": "281-238-5222",
                    "sales": {
                        "contactName": "Linda Trimpe",
                        "contactNumber": "281-276-4928"
                    }
                }
            }
        },
        {
            "name": "Fort Worth",
            "street1": "2725 Premier",
            "city": "Ft. Worth",
            "state": "TX",
            "zip": "76111",
            "locationNumber": "60"
        },
        {
            "name": "Freeport Yard",
            "street1": "1055 Turning Basin Drive",
            "city": "Freeport",
            "state": "TX",
            "zip": "77541",
            "locationNumber": "61",
            "phone_numbers": {
                "phone": {
                    "main_phone": "979-373-0300",
                    "main_fax": "713-455-9666",
                    "sales": {
                        "contactName": "Linda Trimpe",
                        "contactNumber": "281-276-4928"
                    }
                }
            }
        },
        {
            "name": "Frisco",
            "street1": "14800 Hwy. 121",
            "city": "Frisco",
            "state": "TX",
            "zip": "75034",
            "locationNumber": "62",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Johnny Nelson",
                        "contactNumber": "214-310-2792"
                    }
                }
            }
        },
        {
            "name": "Frisco Yard",
            "street1": "6601 Eubanks",
            "city": "Frisco",
            "state": "TX",
            "zip": "75034",
            "locationNumber": "63",
            "phone_numbers": {
                "phone": {
                    "main_phone": "972-335-0008",
                    "main_fax": "972-335-8767",
                    "sales": {
                        "contactName": "Johnny Nelson",
                        "contactNumber": "214-310-2792"
                    }
                }
            }
        },
        {
            "name": "Gainesville",
            "street1": "518 E. Scott St.",
            "city": "Gainesville",
            "state": "TX",
            "zip": "76240",
            "locationNumber": "64"
        },
        {
            "name": "Glen Rose 1",
            "street1": "1845 Hwy. 56, 1 M N Jct US 67",
            "city": "Glen Rose",
            "state": "TX",
            "zip": "76043",
            "locationNumber": "65"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "220 W. Tying Ave.",
            "city": "Pampa",
            "state": "TX",
            "zip": "79065",
            "locationNumber": "66"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "219 County Road M",
            "city": "Stratford",
            "state": "TX",
            "zip": "79804",
            "locationNumber": "67"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "U.S. Highway 287",
            "city": "Clarendon",
            "state": "TX",
            "zip": "79226",
            "locationNumber": "68"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "2900 Arnot Rd.",
            "city": "Amarillo",
            "state": "TX",
            "zip": "79124",
            "locationNumber": "69"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "26507 U.S. -287",
            "city": "Amarillo",
            "state": "TX",
            "zip": "79108",
            "locationNumber": "70"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "2001 W. Amarillo Blvd.",
            "city": "Amarillo",
            "state": "TX",
            "zip": "79107",
            "locationNumber": "71"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "12721 Indian Hill Rd.",
            "city": "Amarillo",
            "state": "TX",
            "zip": "79124",
            "locationNumber": "72"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "3635 U.S. Highway 385",
            "city": "Hereford",
            "state": "TX",
            "zip": "79045",
            "locationNumber": "73"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "529 S Florida",
            "city": "Borger",
            "state": "TX",
            "zip": "79007",
            "locationNumber": "74"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "1313 W. Oklahoma Ave.",
            "city": "Wheeler",
            "state": "TX",
            "zip": "79096",
            "locationNumber": "75"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "U.S. Highway 60, FM 2373, Zone 10",
            "city": "Panhandle",
            "state": "TX",
            "zip": "79068",
            "locationNumber": "76"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "301 E. 2nd Street",
            "city": "Canyon",
            "state": "TX",
            "zip": "79015",
            "locationNumber": "77"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "101 S. Van Buren Street",
            "city": "Amarillo",
            "state": "TX",
            "zip": "79101",
            "locationNumber": "78"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "340 E. Loop 335 S (Hollywood)",
            "city": "79119",
            "state": "TX",
            "zip": "79119",
            "locationNumber": "79"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "200 N. Twichell Avenue",
            "city": "Dumas",
            "state": "TX",
            "zip": "79029",
            "locationNumber": "80"
        },
        {
            "name": "Golden Spread Redi-Mix, Inc.",
            "street1": "US 60 & FM 2373",
            "city": "Panhandle",
            "state": "TX",
            "zip": "79063",
            "locationNumber": "81"
        },
        {
            "name": "Golthwaite",
            "street1": "840 Hwy 84 West",
            "city": "Goldthwaite",
            "state": "TX",
            "zip": "76844",
            "locationNumber": "82"
        },
        {
            "name": "Granbury",
            "street1": "1911 Acton, Hwy. 4",
            "city": "Granbury",
            "state": "TX",
            "zip": "76049",
            "locationNumber": "83"
        },
        {
            "name": "Granbury 3",
            "street1": "5455 Old Granbury RD",
            "city": "Granbury",
            "state": "TX",
            "zip": "76049",
            "locationNumber": "84"
        },
        {
            "name": "Haltom City",
            "street1": "5517 Denton Hwy",
            "city": "Haltom City",
            "state": "TX",
            "zip": "76148",
            "locationNumber": "85"
        },
        {
            "name": "Hamilton",
            "street1": "1208 Park Rd.",
            "city": "Hamilton",
            "state": "TX",
            "zip": "76531",
            "locationNumber": "86"
        },
        {
            "name": "Haskell",
            "street1": "175 US Bus. Hwy 277S",
            "city": "Haskell",
            "state": "TX",
            "zip": "79521",
            "locationNumber": "87"
        },
        {
            "name": "Helotes",
            "street1": "11602 Rainbow Ridge",
            "city": "Helotes",
            "state": "TX",
            "zip": "78023",
            "locationNumber": "88",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-695-3081",
                    "main_fax": "210-695-9813",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Helotes Asphalt",
            "street1": "12354 Fm 1560 N",
            "city": "Helotes",
            "state": "TX",
            "zip": "78023",
            "locationNumber": "89",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-695-9388",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Helotes Ready-Mix",
            "street1": "11602 Rainbow Ridge",
            "city": "Helotes",
            "state": "TX",
            "zip": "78023",
            "locationNumber": "90",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-695-2019",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Hockley Yard",
            "street1": "30585 Old Washington Road",
            "city": "Hockley",
            "state": "TX",
            "zip": "77447",
            "locationNumber": "91",
            "phone_numbers": {
                "phone": {
                    "main_phone": "281-276-4930",
                    "sales": {
                        "contactName": "Linda Trimpe",
                        "contactNumber": "281-276-4928"
                    }
                }
            }
        },
        {
            "name": "Houston Hub Yard",
            "street1": "7070 A Bennington St.",
            "city": "Houston",
            "state": "TX",
            "zip": "77028",
            "locationNumber": "92",
            "phone_numbers": {
                "phone": {
                    "main_phone": "713-631-7221",
                    "main_fax": "281-276-4999",
                    "sales": {
                        "contactName": "Leigh May",
                        "contactNumber": "346-375-9654"
                    }
                }
            }
        },
        {
            "name": "Houston Volumetric",
            "street1": "4523 Brittmore",
            "city": "Houston",
            "state": "TX",
            "zip": "77041",
            "locationNumber": "93"
        },
        {
            "name": "Houston Yard",
            "street1": "14047 Industrial Road",
            "city": "Houston",
            "state": "TX",
            "zip": "77015",
            "locationNumber": "94",
            "phone_numbers": {
                "phone": {
                    "main_phone": "713-455-6984",
                    "main_fax": "713-455-0295",
                    "sales": {
                        "contactName": "Leigh May",
                        "contactNumber": "346-375-9654"
                    }
                }
            }
        },
        {
            "name": "Huebner Road",
            "street1": "12307 Huebner Road",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78230",
            "locationNumber": "95",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-492-1053",
                    "main_fax": "210-492-7013",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Huebner Road Ready-Mix",
            "street1": "12307 Huebner Road",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78230",
            "locationNumber": "96",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-492-1079",
                    "main_fax": "210-492-7013",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Huntsville Asphalt",
            "street1": "1118 US 190 East",
            "city": "Huntsville",
            "state": "TX",
            "zip": "77340",
            "locationNumber": "97",
            "phone_numbers": {
                "phone": {
                    "main_phone": "936-523-3225",
                    "sales": {
                        "contactName": "Jason Carter",
                        "contactNumber": "346-420-4886"
                    }
                }
            }
        },
        {
            "name": "Huntsville Yard",
            "street1": "1118 US 190 East",
            "city": "Huntsville",
            "state": "TX",
            "zip": "77340",
            "locationNumber": "98",
            "phone_numbers": {
                "phone": {
                    "main_phone": "936-523-3225",
                    "sales": {
                        "contactName": "Carter Yancey",
                        "contactNumber": "936-537-0680"
                    }
                }
            }
        },
        {
            "name": "Hwy 211 Ready-Mix",
            "street1": "9151 SH 211",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78254",
            "locationNumber": "99",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-688-6700",
                    "main_fax": "210-688-3187",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Iowa Park",
            "street1": "700 West Chestnut",
            "city": "Iowa Park",
            "state": "TX",
            "zip": "76367",
            "locationNumber": "100"
        },
        {
            "name": "Kennedale",
            "street1": "4040 Eden Rd.",
            "city": "Kennedale",
            "state": "TX",
            "zip": "76060",
            "locationNumber": "101"
        },
        {
            "name": "Knippa Trap Rock",
            "street1": "Highway 90 West",
            "city": "Knippa",
            "state": "TX",
            "zip": "78870",
            "locationNumber": "102",
            "phone_numbers": {
                "phone": {
                    "main_phone": "830-934-2625",
                    "main_fax": "830-934-2725",
                    "sales": {
                        "contactName": "Oscar Benavides",
                        "contactNumber": "210-241-5041"
                    }
                }
            }
        },
        {
            "name": "Kyle Sand & Gravel",
            "street1": "1282 FM 447",
            "city": "Victoria",
            "state": "TX",
            "zip": "77904",
            "locationNumber": "103",
            "phone_numbers": {
                "phone": {
                    "main_phone": "361-573-4300",
                    "sales": {
                        "contactName": "Clark Faust",
                        "contactNumber": "361-935-1513"
                    }
                }
            }
        },
        {
            "name": "Leon River",
            "street1": "3601 HWY 67/377",
            "city": "Dublin",
            "state": "TX",
            "zip": "76446",
            "locationNumber": "104"
        },
        {
            "name": "Levelland",
            "street1": "200 S. West Avenue,",
            "city": "Levelland",
            "state": "TX",
            "zip": "79336",
            "locationNumber": "105"
        },
        {
            "name": "Lewisville",
            "street1": "725 E. College St.",
            "city": "Lewisville",
            "state": "TX",
            "zip": "75057",
            "locationNumber": "106"
        },
        {
            "name": "Lewisville",
            "street1": "3101 Hwy 170",
            "city": "Westlake",
            "state": "TX",
            "zip": "76262",
            "locationNumber": "107"
        },
        {
            "name": "Little Elm",
            "street1": "2405 Oak Grove Pkwy",
            "city": "Little Elm",
            "state": "TX",
            "zip": "75068",
            "locationNumber": "108"
        },
        {
            "name": "Littlefield",
            "street1": "1610 E. Delano St.",
            "city": "Littlefield",
            "state": "TX",
            "zip": "79339",
            "locationNumber": "109"
        },
        {
            "name": "Lockwood Asphalt",
            "street1": "600 Lockwood Dr",
            "city": "Houston",
            "state": "TX",
            "zip": "77029",
            "locationNumber": "110",
            "phone_numbers": {
                "phone": {
                    "main_phone": "713-491-6065",
                    "sales": {
                        "contactName": "Mario Posada",
                        "contactNumber": "832-334-2851"
                    }
                }
            }
        },
        {
            "name": "Lubbock",
            "street1": "6201 Martin Luther King Blvd",
            "city": "Lubbock",
            "state": "TX",
            "zip": "79404",
            "locationNumber": "111",
            "phone_numbers": {
                "phone": {
                    "main_phone": "806-745-2729",
                    "main_fax": "806-745-2741",
                    "sales": {
                        "contactName": "Tyler Bradshaw",
                        "contactNumber": "210-505-9253"
                    }
                }
            }
        },
        {
            "name": "Lubbock North",
            "street1": "1405 N. Gary",
            "city": "79415",
            "state": "TX",
            "zip": "79415",
            "locationNumber": "112"
        },
        {
            "name": "Lubbock South",
            "street1": "66th & Ash Ave",
            "city": "Lubbock",
            "state": "TX",
            "zip": "79404",
            "locationNumber": "113"
        },
        {
            "name": "Masterson Road Hot Mix Asphalt",
            "street1": "7220 Masterson Road",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78252",
            "locationNumber": "114",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-524-3500",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Medina Quarry",
            "street1": "257 Private Road 3535",
            "city": "Medina",
            "state": "TX",
            "zip": "78861",
            "locationNumber": "115",
            "phone_numbers": {
                "phone": {
                    "main_phone": "830-426-2280",
                    "main_fax": "830-426-2281",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Mesquite",
            "street1": "12909 Eastgate",
            "city": "Mesquite",
            "state": "TX",
            "zip": "75181",
            "locationNumber": "116"
        },
        {
            "name": "Mico",
            "street1": "18394 FM 1283",
            "city": "Mico",
            "state": "TX",
            "zip": "78056",
            "locationNumber": "117",
            "phone_numbers": {
                "phone": {
                    "main_phone": "830-612-2701",
                    "main_fax": "830-612-2275",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Midland",
            "street1": "2608 FM 1788",
            "city": "Midland",
            "state": "TX",
            "zip": "79707",
            "locationNumber": "118"
        },
        {
            "name": "Midland Volumetric",
            "street1": "2608 FM 1788",
            "city": "Midland",
            "state": "TX",
            "zip": "79707",
            "locationNumber": "119"
        },
        {
            "name": "Midlothian",
            "street1": "5750 W. Highway 287",
            "city": "Midlothian",
            "state": "TX",
            "zip": "75123",
            "locationNumber": "120"
        },
        {
            "name": "Montgomery Asphalt",
            "street1": "12930 FM 149",
            "city": "Montgomery",
            "state": "TX",
            "zip": "77316",
            "locationNumber": "121",
            "phone_numbers": {
                "phone": {
                    "main_phone": "936-523-3225",
                    "sales": {
                        "contactName": "Jason Carter",
                        "contactNumber": "346-420-4886"
                    }
                }
            }
        },
        {
            "name": "Montgomery Road RM",
            "street1": "6415 W.T. Montgomery Rd",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78252",
            "locationNumber": "122",
            "phone_numbers": {
                "phone": {
                    "main_phone": "210-677-8037",
                    "main_fax": "210-677-8035",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Montgomery Yard",
            "street1": "12930 FM 149",
            "city": "Montgomery",
            "state": "TX",
            "zip": "77316",
            "locationNumber": "123",
            "phone_numbers": {
                "phone": {
                    "main_phone": "936-523-3225",
                    "sales": {
                        "contactName": "Carter Yancey",
                        "contactNumber": "936-537-0680"
                    }
                }
            }
        },
        {
            "name": "MW Ranch",
            "street1": "1006B CR. 401",
            "city": "Glen Rose",
            "state": "TX",
            "zip": "76043",
            "locationNumber": "124",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Etta Dean",
                        "contactNumber": "214-546-2580"
                    }
                }
            }
        },
        {
            "name": "Mykawa Yard",
            "street1": "6700 Almeda-Genoa",
            "city": "Houston",
            "state": "TX",
            "zip": "77075",
            "locationNumber": "125",
            "phone_numbers": {
                "phone": {
                    "main_phone": "713-991-2551",
                    "main_fax": "281-276-4999",
                    "sales": {
                        "contactName": "Leigh May",
                        "contactNumber": "346-375-9654"
                    }
                }
            }
        },
        {
            "name": "North Dallas",
            "street1": "11080 Luna Rd.,",
            "city": "Dallas",
            "state": "TX",
            "zip": "75229",
            "locationNumber": "126"
        },
        {
            "name": "Parmelly",
            "street1": "10590 HWY 277 South",
            "city": "Abilene",
            "state": "TX",
            "zip": "79606",
            "locationNumber": "127",
            "phone_numbers": {
                "phone": {
                    "main_phone": "325-283-2787",
                    "main_fax": "325-201-9212",
                    "sales": {
                        "contactName": "Tyler Bradshaw",
                        "contactNumber": "210-505-9253"
                    }
                }
            }
        },
        {
            "name": "Pilot Point",
            "street1": "300 W. Broad St.",
            "city": "Pilot Point",
            "state": "TX",
            "zip": "76258",
            "locationNumber": "128"
        },
        {
            "name": "Potter Plant #3",
            "street1": "2450 E. Pioneer Drive",
            "city": "Irving",
            "state": "TX",
            "zip": "75061",
            "locationNumber": "129"
        },
        {
            "name": "Prosper",
            "street1": "706 S. Dallas Pkwy",
            "city": "Prosper",
            "state": "TX",
            "zip": "75078",
            "locationNumber": "130"
        },
        {
            "name": "Quality Control",
            "street1": "201 W. Euless Blvd",
            "city": "Euless",
            "state": "TX",
            "zip": "76040",
            "locationNumber": "131"
        },
        {
            "name": "Rainbow Sand and Gravel",
            "street1": "4989 N. FM 199",
            "city": "Cleburne",
            "state": "TX",
            "zip": "76077",
            "locationNumber": "132",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Etta Dean",
                        "contactNumber": "214-546-2580"
                    }
                }
            }
        },
        {
            "name": "Rockwall",
            "street1": "2010 Kristy Ln",
            "city": "Rockwall",
            "state": "TX",
            "zip": "75032",
            "locationNumber": "133"
        },
        {
            "name": "San Angelo - 1040 Foster",
            "street1": "1040 Foster",
            "city": "San Angelo",
            "state": "TX",
            "zip": "76903",
            "locationNumber": "134"
        },
        {
            "name": "San Angelo - 1040 Foster",
            "street1": "1040 Foster",
            "city": "San Angelo",
            "state": "TX",
            "zip": "76903",
            "locationNumber": "135"
        },
        {
            "name": "San Angelo - 1040 Foster",
            "street1": "Lot 2, Block 89",
            "city": "Eldorado",
            "state": "TX",
            "zip": "76936",
            "locationNumber": "136"
        },
        {
            "name": "San Angelo - Christoval",
            "street1": "5235 Old Christoval Rd.",
            "city": "San Angelo",
            "state": "TX",
            "zip": "76804",
            "locationNumber": "137"
        },
        {
            "name": "San Antonio Volumetric",
            "street1": "1030 Creekview Dr",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78219",
            "locationNumber": "138"
        },
        {
            "name": "San Saba",
            "street1": "1207 West Pierce",
            "city": "San Saba",
            "state": "TX",
            "zip": "76877",
            "locationNumber": "139"
        },
        {
            "name": "Sanco - Bronte",
            "street1": "1816 Double Barrel Rd.",
            "city": "Bronte",
            "state": "TX",
            "zip": "76933",
            "locationNumber": "140",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Etta Dean",
                        "contactNumber": "214-546-2580"
                    }
                }
            }
        },
        {
            "name": "Sanger",
            "street1": "904 B. 1 Utility Rd.",
            "city": "Sanger",
            "state": "TX",
            "zip": "76266",
            "locationNumber": "141"
        },
        {
            "name": "Schertz Ready-Mix",
            "street1": "19347 IH35 North",
            "city": "New Braunfels",
            "state": "TX",
            "zip": "78132",
            "locationNumber": "142",
            "phone_numbers": {
                "phone": {
                    "main_phone": "830-624-4944",
                    "main_fax": "830-624-8560",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Sherman",
            "street1": "6202 Theresa Dr.",
            "city": "Sherman",
            "state": "TX",
            "zip": "75090",
            "locationNumber": "143"
        },
        {
            "name": "Shop",
            "street1": "1765 N. Danville Drive",
            "city": "Abilene",
            "state": "TX",
            "zip": "79603",
            "locationNumber": "144"
        },
        {
            "name": "Showers Sand & Gravel",
            "street1": "3601 North Abrams Road",
            "city": "Mission",
            "state": "TX",
            "zip": "78572",
            "locationNumber": "145",
            "phone_numbers": {
                "phone": {
                    "main_phone": "956-581-0672",
                    "sales": {
                        "contactName": "Clark Faust",
                        "contactNumber": "361-935-1513"
                    }
                }
            }
        },
        {
            "name": "Silver Aggregates",
            "street1": "6650 Hwy. 2059",
            "city": "Robert Lee",
            "state": "TX",
            "zip": "76945",
            "locationNumber": "146",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Etta Dean",
                        "contactNumber": "214-546-2580"
                    }
                }
            }
        },
        {
            "name": "Simonton Sand & Gravel",
            "street1": "3551 East FM 1093",
            "city": "Wallis",
            "state": "TX",
            "zip": "77485",
            "locationNumber": "147",
            "phone_numbers": {
                "phone": {
                    "main_phone": "979-478-6134",
                    "sales": {
                        "contactName": "Linda Trimpe",
                        "contactNumber": "281-276-4928"
                    }
                }
            }
        },
        {
            "name": "Snyder",
            "street1": "2300 Avenue Q",
            "city": "Snyder",
            "state": "TX",
            "zip": "79549",
            "locationNumber": "148"
        },
        {
            "name": "Sonora",
            "street1": "202 East First St.",
            "city": "Sonora",
            "state": "TX",
            "zip": "76951",
            "locationNumber": "149"
        },
        {
            "name": "South Dallas",
            "street1": "3301 National St.",
            "city": "Dallas",
            "state": "TX",
            "zip": "75215",
            "locationNumber": "150"
        },
        {
            "name": "Specht Road Ready-Mix",
            "street1": "255 West Specht Road",
            "city": "San Antonio",
            "state": "TX",
            "zip": "78260",
            "locationNumber": "151",
            "phone_numbers": {
                "phone": {
                    "main_phone": "830-438-8454",
                    "main_fax": "830-438-8453",
                    "sales": {
                        "contactName": "Holly Beasley",
                        "contactNumber": "210-330-1470"
                    }
                }
            }
        },
        {
            "name": "Spicewood",
            "street1": "5525 East Hwy 71",
            "city": "Spicewood",
            "state": "TX",
            "zip": "78654",
            "locationNumber": "152",
            "phone_numbers": {
                "phone": {
                    "main_phone": "830-693-2756",
                    "main_fax": "830-693-5907",
                    "sales": {
                        "contactName": "Robert Murff",
                        "contactNumber": "210-744-3055"
                    }
                }
            }
        },
        {
            "name": "Spicewood Asphalt",
            "street1": "5525 East Hwy 71",
            "city": "Spicewood",
            "state": "TX",
            "zip": "78669",
            "locationNumber": "153",
            "phone_numbers": {
                "phone": {
                    "main_phone": "830-693-2087",
                    "main_fax": "830-693-5907",
                    "sales": {
                        "contactName": "Robert Murff",
                        "contactNumber": "210-744-3055"
                    }
                }
            }
        },
        {
            "name": "Spring Yard",
            "street1": "8702 E Hardy Road",
            "city": "Houston",
            "state": "TX",
            "zip": "77073",
            "locationNumber": "154",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Leigh May",
                        "contactNumber": "346-375-9654"
                    }
                }
            }
        },
        {
            "name": "Springtown",
            "street1": "1655 Hwy. 199 East",
            "city": "Springtown",
            "state": "TX",
            "zip": "76082",
            "locationNumber": "155"
        },
        {
            "name": "Stafford Yard",
            "street1": "13930 Pike Road Building One",
            "city": "Missouri City",
            "state": "TX",
            "zip": "77489",
            "locationNumber": "156",
            "phone_numbers": {
                "phone": {
                    "main_phone": "281-261-0791",
                    "main_fax": ".",
                    "sales": {
                        "contactName": "Linda Trimpe",
                        "contactNumber": "281-276-4928"
                    }
                }
            }
        },
        {
            "name": "Stephenville 1",
            "street1": "1375 Bates",
            "city": "Stephenville",
            "state": "TX",
            "zip": "76401",
            "locationNumber": "157"
        },
        {
            "name": "Stephenville 2",
            "street1": "286 CR-179",
            "city": "Stephenville",
            "state": "TX",
            "zip": "76401",
            "locationNumber": "158"
        },
        {
            "name": "Support",
            "street1": "4301 Danhil Dr.",
            "city": "Brownwood",
            "state": "TX",
            "zip": "76801",
            "locationNumber": "159"
        },
        {
            "name": "Sweetwater",
            "street1": "802 Ash Street",
            "city": "Sweetwater",
            "state": "TX",
            "zip": "79556",
            "locationNumber": "160"
        },
        {
            "name": "Sweetwater",
            "street1": "101B FM 419",
            "city": "Sweetwater",
            "state": "TX",
            "zip": "79556",
            "locationNumber": "161",
            "phone_numbers": {
                "phone": {
                    "main_phone": "325-236-6622",
                    "sales": {
                        "contactName": "Tyler Bradshaw",
                        "contactNumber": "210-505-9253"
                    }
                }
            }
        },
        {
            "name": "TG East Wind",
            "street1": "11227 Country Road 3791",
            "city": "Truscott",
            "state": "TX",
            "zip": "79227",
            "locationNumber": "162"
        },
        {
            "name": "Tomball Yard",
            "street1": "20406 Hufsmith Kohrville Rd",
            "city": "Tomball",
            "state": "TX",
            "zip": "77375",
            "locationNumber": "163",
            "phone_numbers": {
                "phone": {
                    "main_phone": "281-257-8143",
                    "main_fax": "281-257-3318",
                    "sales": {
                        "contactName": "Leigh May",
                        "contactNumber": "346-375-9654"
                    }
                }
            }
        },
        {
            "name": "Trinity Plant",
            "street1": "9501 Trammel Davis Rd",
            "city": "Hurst",
            "state": "TX",
            "zip": "76053",
            "locationNumber": "164"
        },
        {
            "name": "Trucking Dept Maintenance",
            "street1": "3533 N. Hwy. 281",
            "city": "Stephenville",
            "state": "TX",
            "zip": "76401",
            "locationNumber": "165"
        },
        {
            "name": "Uvalde Limestone Rock Asphalt",
            "street1": "FM 1022 / Hwy 90 West",
            "city": "Dabney",
            "state": "TX",
            "zip": "78801",
            "locationNumber": "166",
            "phone_numbers": {
                "phone": {
                    "main_phone": "830-278-6205",
                    "main_fax": "830-278-3137",
                    "sales": {
                        "contactName": "Oscar Benavides",
                        "contactNumber": "210-241-5041"
                    }
                }
            }
        },
        {
            "name": "Vernon Quarry",
            "street1": "5448 FM 2072",
            "city": "Vernon",
            "state": "TX",
            "zip": "76384",
            "locationNumber": "167",
            "phone_numbers": {
                "phone": {
                    "main_phone": "940-886-7242",
                    "sales": {
                        "contactName": "Etta Dean",
                        "contactNumber": "214-546-2580"
                    }
                }
            }
        },
        {
            "name": "View",
            "street1": "8941 FM 1235",
            "city": "Abilene",
            "state": "TX",
            "zip": "79606",
            "locationNumber": "168",
            "phone_numbers": {
                "phone": {
                    "main_phone": "325-676-0001",
                    "sales": {
                        "contactName": "Tyler Bradshaw",
                        "contactNumber": "210-505-9253"
                    }
                }
            }
        },
        {
            "name": "View Asphalt",
            "street1": "8941 FM 1235",
            "city": "Abilene",
            "state": "TX",
            "zip": "79601",
            "locationNumber": "169",
            "phone_numbers": {
                "phone": {
                    "main_phone": "325-676-0001",
                    "sales": {
                        "contactName": "Sean Hughes",
                        "contactNumber": "210-620-6042"
                    }
                }
            }
        },
        {
            "name": "Waxahachie",
            "street1": "3985 North I-35",
            "city": "Waxahachie",
            "state": "TX",
            "zip": "75165",
            "locationNumber": "170"
        },
        {
            "name": "Weatherford",
            "street1": "89980 Interstate 20",
            "city": "Santo",
            "state": "TX",
            "zip": "76472",
            "locationNumber": "171",
            "phone_numbers": {
                "phone": {
                    "main_phone": "817-594-4524",
                    "sales": {
                        "contactName": "Ronnie Merrifield",
                        "contactNumber": "817-307-7253"
                    }
                }
            }
        },
        {
            "name": "Weatherford 2",
            "street1": "1884 Mineral Wells Hwy.",
            "city": "Weatherford",
            "state": "TX",
            "zip": "76088",
            "locationNumber": "172",
            "phone_numbers": {
                "phone": {
                    "sales": {
                        "contactName": "Ronnie Merrifield",
                        "contactNumber": "817-307-7253"
                    }
                }
            }
        },
        {
            "name": "Weatherford Asphalt",
            "street1": "1111 Gilbert Pit Road",
            "city": "Millsap",
            "state": "TX",
            "zip": "76066",
            "locationNumber": "173",
            "phone_numbers": {
                "phone": {
                    "main_phone": "817-596-8930",
                    "main_fax": "817-594-5011",
                    "sales": {
                        "contactName": "Sean Hughes",
                        "contactNumber": "210-620-6042"
                    }
                }
            }
        },
        {
            "name": "West Fort Worth",
            "street1": "12301 US Hwy 80 West",
            "city": "Aledo",
            "state": "TX",
            "zip": "76008",
            "locationNumber": "174"
        },
        {
            "name": "West Texas Limestone",
            "street1": "4671 CR 141 (West Texas Limestone Quarry)",
            "city": "Caddo",
            "state": "TX",
            "zip": "76429",
            "locationNumber": "175"
        },
        {
            "name": "Western Trail",
            "street1": "1597 US Hwy 283N",
            "city": "Seymour",
            "state": "TX",
            "zip": "76380",
            "locationNumber": "176"
        },
        {
            "name": "Wichita Falls",
            "street1": "1204 28th Steet",
            "city": "Wichita Falls",
            "state": "TX",
            "zip": "76302",
            "locationNumber": "177"
        },
        {
            "name": "Willow Park",
            "street1": "6222 E. I-20",
            "city": "Willow Park",
            "state": "TX",
            "zip": "76087",
            "locationNumber": "178"
        },
        {
            "name": "Wind River",
            "street1": "1204 28th Steet",
            "city": "Wichita Falls",
            "state": "TX",
            "zip": "76302",
            "locationNumber": "179"
        },
        {
            "name": "Wylie",
            "street1": "1502 W. FM 544",
            "city": "Wylie",
            "state": "TX",
            "zip": "75098",
            "locationNumber": "180"
        }
]


export function makeContacts() {
    let newContacts = json.map(e => {
        var contact = new VulcanContact(e.name)
        .addAddress(e.street1, e.city, e.state, e.zip);

        if(e.phone_numbers) {
            if(e.phone_numbers?.phone?.main_fax) {
                contact = contact.addPhone(e.phone_numbers.phone.main_fax, Phone.PhoneTypeEnum.FAX);
            } if(e.phone_numbers?.phone?.main_phone) {
                contact = contact.addPhone(e.phone_numbers.phone.main_phone, Phone.PhoneTypeEnum.DDI);
            }
        }
        return contact.getRecord();
    });
    return newContacts;
}



// let newContacts = [
//     new VulcanContact("Stafford Yard")
//     .addAddress("13930 Pike Road Building One", "Missouri City", "TX", "77489")
//     .addPhone("281", "2610791")
//     .getRecord(),
//     new VulcanContact("Briggs Sand & Gravel")
//     .addAddress("13930 Pike Road Building One", "Missouri City", "TX", "77489")
//     .addPhone("281", "2610791")
//     .getRecord(),
// ]

