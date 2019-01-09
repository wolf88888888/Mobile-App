import { handleActions } from 'redux-actions';
import { setCountries } from '../../action/Country';


const initialState = () => ({
    countries: [
        {
            "code": "US",
            "name": "United States of America",
            "id": 1
        },
        {
            "code": "GB",
            "name": "United Kingdom",
            "id": 2
        },
        {
            "code": "ES",
            "name": "Spain",
            "id": 3
        },
        {
            "code": "IT",
            "name": "Italy",
            "id": 4
        },
        {
            "code": "CO",
            "name": "Colombia",
            "id": 5
        },
        {
            "code": "FR",
            "name": "France",
            "id": 6
        },
        {
            "code": "DO",
            "name": "Dominican Republic",
            "id": 8
        },
        {
            "code": "BG",
            "name": "Bulgaria",
            "id": 9
        },
        {
            "code": "AW",
            "name": "Aruba",
            "id": 10
        },
        {
            "code": "AF",
            "name": "Afghanistan",
            "id": 11
        },
        {
            "code": "AO",
            "name": "Angola",
            "id": 12
        },
        {
            "code": "AI",
            "name": "Anguilla",
            "id": 13
        },
        {
            "code": "AL",
            "name": "Albania",
            "id": 14
        },
        {
            "code": "AD",
            "name": "Andorra",
            "id": 15
        },
        {
            "code": "AE",
            "name": "United Arab Emirates",
            "id": 17
        },
        {
            "code": "AR",
            "name": "Argentina",
            "id": 18
        },
        {
            "code": "AM",
            "name": "Armenia",
            "id": 19
        },
        {
            "code": "AG",
            "name": "Antigua and Barbuda",
            "id": 23
        },
        {
            "code": "AU",
            "name": "Australia",
            "id": 24
        },
        {
            "code": "AT",
            "name": "Austria",
            "id": 25
        },
        {
            "code": "AZ",
            "name": "Azerbaijan",
            "id": 26
        },
        {
            "code": "BE",
            "name": "Belgium",
            "id": 28
        },
        {
            "code": "BD",
            "name": "Bangladesh",
            "id": 31
        },
        {
            "code": "BH",
            "name": "Bahrain",
            "id": 32
        },
        {
            "code": "BS",
            "name": "Bahamas",
            "id": 33
        },
        {
            "code": "BA",
            "name": "Bosnia and Herzegovina",
            "id": 34
        },
        {
            "code": "BY",
            "name": "Belarus",
            "id": 35
        },
        {
            "code": "BZ",
            "name": "Belize",
            "id": 36
        },
        {
            "code": "BM",
            "name": "Bermuda",
            "id": 37
        },
        {
            "code": "BO",
            "name": "Bolivia (Plurinational State of)",
            "id": 38
        },
        {
            "code": "BR",
            "name": "Brazil",
            "id": 39
        },
        {
            "code": "BB",
            "name": "Barbados",
            "id": 40
        },
        {
            "code": "BN",
            "name": "Brunei Darussalam",
            "id": 41
        },
        {
            "code": "BW",
            "name": "Botswana",
            "id": 44
        },
        {
            "code": "CA",
            "name": "Canada",
            "id": 46
        },
        {
            "code": "CH",
            "name": "Switzerland",
            "id": 48
        },
        {
            "code": "CL",
            "name": "Chile",
            "id": 49
        },
        {
            "code": "CN",
            "name": "China",
            "id": 50
        },
        {
            "code": "CM",
            "name": "Cameroon",
            "id": 52
        },
        {
            "code": "CK",
            "name": "Cook Islands",
            "id": 55
        },
        {
            "code": "CV",
            "name": "Cabo Verde",
            "id": 57
        },
        {
            "code": "CR",
            "name": "Costa Rica",
            "id": 58
        },
        {
            "code": "CU",
            "name": "Cuba",
            "id": 59
        },
        {
            "code": "KY",
            "name": "Cayman Islands",
            "id": 61
        },
        {
            "code": "CY",
            "name": "Cyprus",
            "id": 62
        },
        {
            "code": "CZ",
            "name": "Czech Republic",
            "id": 63
        },
        {
            "code": "DE",
            "name": "Germany",
            "id": 64
        },
        {
            "code": "DK",
            "name": "Denmark",
            "id": 67
        },
        {
            "code": "DZ",
            "name": "Algeria",
            "id": 68
        },
        {
            "code": "EC",
            "name": "Ecuador",
            "id": 69
        },
        {
            "code": "EG",
            "name": "Egypt",
            "id": 70
        },
        {
            "code": "ER",
            "name": "Eritrea",
            "id": 71
        },
        {
            "code": "EE",
            "name": "Estonia",
            "id": 73
        },
        {
            "code": "ET",
            "name": "Ethiopia",
            "id": 74
        },
        {
            "code": "FI",
            "name": "Finland",
            "id": 75
        },
        {
            "code": "FJ",
            "name": "Fiji",
            "id": 76
        },
        {
            "code": "FM",
            "name": "Micronesia (Federated States of)",
            "id": 79
        },
        {
            "code": "GE",
            "name": "Georgia",
            "id": 81
        },
        {
            "code": "GH",
            "name": "Ghana",
            "id": 82
        },
        {
            "code": "GI",
            "name": "Gibraltar",
            "id": 83
        },
        {
            "code": "GP",
            "name": "Guadeloupe",
            "id": 85
        },
        {
            "code": "GR",
            "name": "Greece",
            "id": 89
        },
        {
            "code": "GD",
            "name": "Grenada",
            "id": 90
        },
        {
            "code": "GL",
            "name": "Greenland",
            "id": 91
        },
        {
            "code": "GT",
            "name": "Guatemala",
            "id": 92
        },
        {
            "code": "GU",
            "name": "Guam",
            "id": 94
        },
        {
            "code": "HK",
            "name": "Hong Kong",
            "id": 96
        },
        {
            "code": "HN",
            "name": "Honduras",
            "id": 98
        },
        {
            "code": "HR",
            "name": "Croatia",
            "id": 99
        },
        {
            "code": "HT",
            "name": "Haiti",
            "id": 100
        },
        {
            "code": "HU",
            "name": "Hungary",
            "id": 101
        },
        {
            "code": "ID",
            "name": "Indonesia",
            "id": 102
        },
        {
            "code": "IN",
            "name": "India",
            "id": 103
        },
        {
            "code": "IE",
            "name": "Ireland",
            "id": 105
        },
        {
            "code": "IR",
            "name": "Iran",
            "id": 106
        },
        {
            "code": "IQ",
            "name": "Iraq",
            "id": 107
        },
        {
            "code": "IS",
            "name": "Iceland",
            "id": 108
        },
        {
            "code": "IL",
            "name": "Israel",
            "id": 109
        },
        {
            "code": "JM",
            "name": "Jamaica",
            "id": 110
        },
        {
            "code": "JO",
            "name": "Jordan",
            "id": 111
        },
        {
            "code": "JP",
            "name": "Japan",
            "id": 112
        },
        {
            "code": "KZ",
            "name": "Kazakhstan",
            "id": 113
        },
        {
            "code": "KE",
            "name": "Kenya",
            "id": 114
        },
        {
            "code": "KG",
            "name": "Kyrgyzstan",
            "id": 115
        },
        {
            "code": "KH",
            "name": "Cambodia",
            "id": 116
        },
        {
            "code": "KN",
            "name": "Saint Kitts and Nevis",
            "id": 118
        },
        {
            "code": "KR",
            "name": "Korea (Republic of)",
            "id": 119
        },
        {
            "code": "KW",
            "name": "Kuwait",
            "id": 120
        },
        {
            "code": "LA",
            "name": "Lao People's Democratic Republic",
            "id": 121
        },
        {
            "code": "LB",
            "name": "Lebanon",
            "id": 122
        },
        {
            "code": "LY",
            "name": "Libya",
            "id": 124
        },
        {
            "code": "LC",
            "name": "Saint Lucia",
            "id": 125
        },
        {
            "code": "LI",
            "name": "Liechtenstein",
            "id": 126
        },
        {
            "code": "LK",
            "name": "Sri Lanka",
            "id": 127
        },
        {
            "code": "LT",
            "name": "Lithuania",
            "id": 129
        },
        {
            "code": "LU",
            "name": "Luxembourg",
            "id": 130
        },
        {
            "code": "LV",
            "name": "Latvia",
            "id": 131
        },
        {
            "code": "MO",
            "name": "Macao",
            "id": 132
        },
        {
            "code": "MA",
            "name": "Morocco",
            "id": 133
        },
        {
            "code": "MD",
            "name": "Moldova (Republic of)",
            "id": 135
        },
        {
            "code": "MG",
            "name": "Madagascar",
            "id": 136
        },
        {
            "code": "MV",
            "name": "Maldives",
            "id": 137
        },
        {
            "code": "MX",
            "name": "Mexico",
            "id": 138
        },
        {
            "code": "MK",
            "name": "Macedonia (the former Yugoslav Republic of)",
            "id": 140
        },
        {
            "code": "ML",
            "name": "Mali",
            "id": 141
        },
        {
            "code": "MT",
            "name": "Malta",
            "id": 142
        },
        {
            "code": "MM",
            "name": "Myanmar",
            "id": 143
        },
        {
            "code": "MP",
            "name": "Northern Mariana Islands",
            "id": 145
        },
        {
            "code": "MZ",
            "name": "Mozambique",
            "id": 146
        },
        {
            "code": "MQ",
            "name": "Martinique",
            "id": 149
        },
        {
            "code": "MU",
            "name": "Mauritius",
            "id": 150
        },
        {
            "code": "MY",
            "name": "Malaysia",
            "id": 152
        },
        {
            "code": "NA",
            "name": "Namibia",
            "id": 154
        },
        {
            "code": "NC",
            "name": "New Caledonia",
            "id": 155
        },
        {
            "code": "NG",
            "name": "Nigeria",
            "id": 158
        },
        {
            "code": "NI",
            "name": "Nicaragua",
            "id": 159
        },
        {
            "code": "NL",
            "name": "Netherlands",
            "id": 161
        },
        {
            "code": "NO",
            "name": "Norway",
            "id": 162
        },
        {
            "code": "NP",
            "name": "Nepal",
            "id": 163
        },
        {
            "code": "NZ",
            "name": "New Zealand",
            "id": 165
        },
        {
            "code": "OM",
            "name": "Oman",
            "id": 166
        },
        {
            "code": "PK",
            "name": "Pakistan",
            "id": 167
        },
        {
            "code": "PA",
            "name": "Panama",
            "id": 168
        },
        {
            "code": "PE",
            "name": "Peru",
            "id": 170
        },
        {
            "code": "PH",
            "name": "Philippines",
            "id": 171
        },
        {
            "code": "PW",
            "name": "Palau",
            "id": 172
        },
        {
            "code": "PL",
            "name": "Poland",
            "id": 174
        },
        {
            "code": "PR",
            "name": "Puerto Rico",
            "id": 175
        },
        {
            "code": "PT",
            "name": "Portugal",
            "id": 177
        },
        {
            "code": "PY",
            "name": "Paraguay",
            "id": 178
        },
        {
            "code": "PF",
            "name": "French Polynesia",
            "id": 180
        },
        {
            "code": "QA",
            "name": "Qatar",
            "id": 181
        },
        {
            "code": "RE",
            "name": "Réunion",
            "id": 182
        },
        {
            "code": "RO",
            "name": "Romania",
            "id": 183
        },
        {
            "code": "RU",
            "name": "Russian Federation",
            "id": 184
        },
        {
            "code": "SA",
            "name": "Saudi Arabia",
            "id": 186
        },
        {
            "code": "SD",
            "name": "Sudan",
            "id": 187
        },
        {
            "code": "SN",
            "name": "Senegal",
            "id": 188
        },
        {
            "code": "SG",
            "name": "Singapore",
            "id": 189
        },
        {
            "code": "SV",
            "name": "El Salvador",
            "id": 195
        },
        {
            "code": "SK",
            "name": "Slovakia",
            "id": 201
        },
        {
            "code": "SI",
            "name": "Slovenia",
            "id": 202
        },
        {
            "code": "SE",
            "name": "Sweden",
            "id": 203
        },
        {
            "code": "SZ",
            "name": "Swaziland",
            "id": 204
        },
        {
            "code": "SC",
            "name": "Seychelles",
            "id": 205
        },
        {
            "code": "SY",
            "name": "Syrian Arab Republic",
            "id": 206
        },
        {
            "code": "TC",
            "name": "Turks and Caicos Islands",
            "id": 207
        },
        {
            "code": "TH",
            "name": "Thailand",
            "id": 210
        },
        {
            "code": "TO",
            "name": "Tonga",
            "id": 215
        },
        {
            "code": "TT",
            "name": "Trinidad and Tobago",
            "id": 216
        },
        {
            "code": "TN",
            "name": "Tunisia",
            "id": 217
        },
        {
            "code": "TR",
            "name": "Turkey",
            "id": 218
        },
        {
            "code": "TW",
            "name": "Taiwan, Province of China",
            "id": 220
        },
        {
            "code": "TZ",
            "name": "Tanzania, United Republic of",
            "id": 221
        },
        {
            "code": "UG",
            "name": "Uganda",
            "id": 222
        },
        {
            "code": "UA",
            "name": "Ukraine",
            "id": 223
        },
        {
            "code": "UY",
            "name": "Uruguay",
            "id": 225
        },
        {
            "code": "UZ",
            "name": "Uzbekistan",
            "id": 226
        },
        {
            "code": "VC",
            "name": "Saint Vincent and the Grenadines",
            "id": 228
        },
        {
            "code": "VE",
            "name": "Venezuela (Bolivarian Republic of)",
            "id": 229
        },
        {
            "code": "VG",
            "name": "Virgin Islands (British)",
            "id": 230
        },
        {
            "code": "VI",
            "name": "Virgin Islands (U.S.)",
            "id": 231
        },
        {
            "code": "VN",
            "name": "Vietnam",
            "id": 232
        },
        {
            "code": "VU",
            "name": "Vanuatu",
            "id": 233
        },
        {
            "code": "WS",
            "name": "Samoa",
            "id": 235
        },
        {
            "code": "YE",
            "name": "Yemen",
            "id": 236
        },
        {
            "code": "ZA",
            "name": "South Africa",
            "id": 238
        },
        {
            "code": "ZM",
            "name": "Zambia",
            "id": 239
        },
        {
            "code": "ZW",
            "name": "Zimbabwe",
            "id": 240
        },
        {
            "code": "ME",
            "name": "Montenegro",
            "id": 508
        },
        {
            "code": "RS",
            "name": "Serbia",
            "id": 513
        },
        {
            "code": "NF",
            "name": "Norfolk Island",
            "id": 734
        },
        {
            "code": "MC",
            "name": "Monaco",
            "id": 735
        },
        {
            "code": "SM",
            "name": "San Marino",
            "id": 736
        },
        {
            "code": "JE",
            "name": "Jersey",
            "id": 737
        },
        {
            "code": "GG",
            "name": "Guernsey",
            "id": 738
        },
        {
            "code": "CW",
            "name": "Curaçao",
            "id": 740
        },
        {
            "code": "SX",
            "name": "Sint Maarten (Dutch part)",
            "id": 741
        },
        {
            "code": "LS",
            "name": "Lesotho",
            "id": 742
        },
        {
            "code": "BQ",
            "name": "Bonaire, Sint Eustatius and Saba",
            "id": 743
        },
        {
            "code": "SH",
            "name": "Saint Helena, Ascension and Tristan da Cunha",
            "id": 744
        },
        {
            "code": "MF",
            "name": "Saint Martin (French part)",
            "id": 745
        },
        {
            "code": "AX",
            "name": "Åland Islands",
            "id": 764
        },
        {
            "code": "AS",
            "name": "American Samoa",
            "id": 765
        },
        {
            "code": "AQ",
            "name": "Antarctica",
            "id": 766
        },
        {
            "code": "BJ",
            "name": "Benin",
            "id": 767
        },
        {
            "code": "BT",
            "name": "Bhutan",
            "id": 768
        },
        {
            "code": "BV",
            "name": "Bouvet Island",
            "id": 769
        },
        {
            "code": "IO",
            "name": "British Indian Ocean Territory",
            "id": 770
        },
        {
            "code": "BF",
            "name": "Burkina Faso",
            "id": 771
        },
        {
            "code": "BI",
            "name": "Burundi",
            "id": 772
        },
        {
            "code": "CF",
            "name": "Central African Republic",
            "id": 773
        },
        {
            "code": "TD",
            "name": "Chad",
            "id": 774
        },
        {
            "code": "CX",
            "name": "Christmas Island",
            "id": 775
        },
        {
            "code": "CC",
            "name": "Cocos (Keeling) Islands",
            "id": 776
        },
        {
            "code": "KM",
            "name": "Comoros",
            "id": 777
        },
        {
            "code": "CG",
            "name": "Congo (Republic of the)",
            "id": 778
        },
        {
            "code": "CD",
            "name": "Congo (Democratic Republic of the)",
            "id": 779
        },
        {
            "code": "CI",
            "name": "Côte d'Ivoire",
            "id": 780
        },
        {
            "code": "DJ",
            "name": "Djibouti",
            "id": 781
        },
        {
            "code": "DM",
            "name": "Dominica",
            "id": 782
        },
        {
            "code": "GQ",
            "name": "Equatorial Guinea",
            "id": 783
        },
        {
            "code": "FK",
            "name": "Falkland Islands (Malvinas)",
            "id": 784
        },
        {
            "code": "FO",
            "name": "Faroe Islands",
            "id": 785
        },
        {
            "code": "GF",
            "name": "French Guiana",
            "id": 786
        },
        {
            "code": "TF",
            "name": "French Southern Territories",
            "id": 787
        },
        {
            "code": "GA",
            "name": "Gabon",
            "id": 788
        },
        {
            "code": "GM",
            "name": "Gambia",
            "id": 789
        },
        {
            "code": "GN",
            "name": "Guinea",
            "id": 790
        },
        {
            "code": "GW",
            "name": "Guinea-Bissau",
            "id": 791
        },
        {
            "code": "GY",
            "name": "Guyana",
            "id": 792
        },
        {
            "code": "HM",
            "name": "Heard Island and McDonald Islands",
            "id": 793
        },
        {
            "code": "VA",
            "name": "Vatican City State",
            "id": 794
        },
        {
            "code": "IM",
            "name": "Isle of Man",
            "id": 795
        },
        {
            "code": "KI",
            "name": "Kiribati",
            "id": 796
        },
        {
            "code": "KP",
            "name": "Korea (Democratic People's Republic of)",
            "id": 797
        },
        {
            "code": "LR",
            "name": "Liberia",
            "id": 798
        },
        {
            "code": "MW",
            "name": "Malawi",
            "id": 799
        },
        {
            "code": "MH",
            "name": "Marshall Islands",
            "id": 800
        },
        {
            "code": "MR",
            "name": "Mauritania",
            "id": 801
        },
        {
            "code": "YT",
            "name": "Mayotte",
            "id": 802
        },
        {
            "code": "MN",
            "name": "Mongolia",
            "id": 803
        },
        {
            "code": "MS",
            "name": "Montserrat",
            "id": 804
        },
        {
            "code": "NR",
            "name": "Nauru",
            "id": 805
        },
        {
            "code": "NE",
            "name": "Niger",
            "id": 806
        },
        {
            "code": "NU",
            "name": "Niue",
            "id": 807
        },
        {
            "code": "PS",
            "name": "Palestine, State of",
            "id": 808
        },
        {
            "code": "PG",
            "name": "Papua New Guinea",
            "id": 809
        },
        {
            "code": "PN",
            "name": "Pitcairn",
            "id": 810
        },
        {
            "code": "RW",
            "name": "Rwanda",
            "id": 811
        },
        {
            "code": "BL",
            "name": "Saint Barthélemy",
            "id": 812
        },
        {
            "code": "PM",
            "name": "Saint Pierre and Miquelon",
            "id": 813
        },
        {
            "code": "ST",
            "name": "Sao Tome and Principe",
            "id": 814
        },
        {
            "code": "SL",
            "name": "Sierra Leone",
            "id": 815
        },
        {
            "code": "SB",
            "name": "Solomon Islands",
            "id": 816
        },
        {
            "code": "SO",
            "name": "Somalia",
            "id": 817
        },
        {
            "code": "GS",
            "name": "South Georgia and the South Sandwich Islands",
            "id": 818
        },
        {
            "code": "SS",
            "name": "South Sudan",
            "id": 819
        },
        {
            "code": "SR",
            "name": "Suriname",
            "id": 820
        },
        {
            "code": "SJ",
            "name": "Svalbard and Jan Mayen",
            "id": 821
        },
        {
            "code": "TJ",
            "name": "Tajikistan",
            "id": 822
        },
        {
            "code": "TL",
            "name": "Timor-Leste",
            "id": 823
        },
        {
            "code": "TG",
            "name": "Togo",
            "id": 824
        },
        {
            "code": "TK",
            "name": "Tokelau",
            "id": 825
        },
        {
            "code": "TM",
            "name": "Turkmenistan",
            "id": 826
        },
        {
            "code": "TV",
            "name": "Tuvalu",
            "id": 827
        },
        {
            "code": "UM",
            "name": "United States Minor Outlying Islands",
            "id": 828
        },
        {
            "code": "WF",
            "name": "Wallis and Futuna",
            "id": 829
        },
        {
            "code": "EH",
            "name": "Western Sahara",
            "id": 830
        }
    ]
});

export default handleActions(
    {
        [setCountries]: (state, {payload}) => {
            let countries = payload.countries;
            return { ...state, countries: countries};
        },
    },
    initialState()
);
