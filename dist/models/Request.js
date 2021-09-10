"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
//* Env Variables Configuration
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//* Axios, package to make HTTP requests
const axios_1 = __importDefault(require("axios"));
//* Colors
require("colors");
//! Errors
const error_1 = require("../functions/error");
//* Abstract Class to initialize env Variables and define rules
class RequestFormat {
    constructor(ip, _language = 'en') {
        var _a, _b;
        this._baseUrl = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.BASE_API_URL) || (0, error_1.showErr)('Base Url is not defined.');
        this._apiKey = ((_b = process.env) === null || _b === void 0 ? void 0 : _b.API_KEY) || (0, error_1.showErr)('API Key not defined');
        this.ip = ip;
        this._language = _language;
    }
}
//* Class for HTTP requests definition
class Request extends RequestFormat {
    //! Get Config Data (Debug)
    get configDataDebug() {
        return `
        IP: ${this.ip}
        Language: ${this._language}
        Api Key: ${this._apiKey}
        Base Url: ${this._baseUrl}
        `;
    }
    //! Get user config
    get configData() {
        return `
        IP: ${this.ip}
        Language: ${this._language}
        `;
    }
    //! Validate an existing language
    validateLanguage(language) {
        const validLanguages = ['en', 'es', 'de', 'fr', 'ja', 'pt-br', 'ru', 'zh'];
        let valid = (!validLanguages.find(lan => lan === language)) ? false : true;
        return valid;
    }
    //! Making the request
    makeRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get(`${this._baseUrl}${this.ip}?access_key=${this._apiKey}&language=${this._language}`);
            if (!data.success) {
                return data;
            }
            return data;
        });
    }
    printResponse(object) {
        var _a;
        //! Validations
        let validLanguage = this.validateLanguage(this._language);
        if (!validLanguage) {
            return '\n[x] Language not valid\n'.red;
        }
        if (!object.continent_code) {
            return `\n[x] Something's gone wrong. Pleasy, verify that the IP Address is valid.\n`.red;
        }
        if (((_a = object.error) === null || _a === void 0 ? void 0 : _a.info) && !(object === null || object === void 0 ? void 0 : object.success)) {
            return `\n[x] ${object.error.info}\n`.red;
        }
        //* Printing response if everything's gone wrong
        return `
        
        ${'IP: '.green}                        ${object.ip}
        ${'Internet Protocol Version: '.red} ${object.type}
        ${'Region Code: '.cyan}               ${object.continent_code}
        ${'Region: '.cyan}                    ${object.continent_name}
        ${'Country Code: '.cyan}              ${object.country_code}
        ${'City: '.cyan}                      ${object.city}
        ${'ZIP Code: '.cyan}                  ${object.zip}
        ${'Capital: '.cyan}                   ${object.location.capital}
        ${'Latitude: '.magenta}                  ${object.latitude}
        ${'Longitude: '.magenta}                 ${object.longitude}
        ${'Language code: '.yellow}             ${object.location.languages[0].code} 
        ${'Language name: '.yellow}             ${object.location.languages[0].name} 
        ${'Language native: '.yellow}           ${object.location.languages[0].native} 
        ${'Calling code: '.grey}              +${object.location.calling_code}
    
        ${'View Location in Google Maps: '.blue} 
        https://www.google.com/maps/search/${object.latitude},${object.longitude}

        `;
    }
    //! Showing obtained results
    returnResponse(object) {
        return this.printResponse(object);
    }
}
exports.Request = Request;
//# sourceMappingURL=Request.js.map