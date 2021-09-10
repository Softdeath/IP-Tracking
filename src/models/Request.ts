//* Env Variables Configuration
import dotenv from 'dotenv';
dotenv.config();

//* Axios, package to make HTTP requests
import axios from 'axios';

//* Colors
import 'colors';

//! Errors
import { showErr } from '../functions/error';

//* Interfaces
import { ResponseIP } from '../interfaces';

//* Abstract Class to initialize env Variables and define rules
abstract class RequestFormat {

    protected ip: string;
    protected _apiKey: string;
    protected _baseUrl: string;
    protected _language: string;

    constructor(
        ip: string,
        _language: string = 'en'
    ) {
        this._baseUrl = process.env?.BASE_API_URL || showErr('Base Url is not defined.');
        this._apiKey = process.env?.API_KEY || showErr('API Key not defined');
        this.ip = ip;
        this._language = _language;
    }
}

//* Class for HTTP requests definition
export class Request extends RequestFormat {

    //! Get Config Data (Debug)
    get configDataDebug():string {
        return `
        IP: ${ this.ip }
        Language: ${ this._language }
        Api Key: ${ this._apiKey }
        Base Url: ${ this._baseUrl }
        `;
    }

    //! Get user config
    get configData():string {
        return `
        IP: ${ this.ip }
        Language: ${ this._language }
        `;
    }

    //! Validate an existing language

    private validateLanguage( language: string ): boolean {

        const validLanguages: string[] = ['en', 'es', 'de', 'fr', 'ja', 'pt-br', 'ru', 'zh'];

        let valid: boolean = ( !validLanguages.find( lan => lan === language ) ) ? false : true;

        return valid;
    }

    //! Making the request
    public async makeRequest(): Promise<ResponseIP> {

        const { data } = await axios.get<ResponseIP>(`${ this._baseUrl }${ this.ip }?access_key=${ this._apiKey }&language=${ this._language }`);
        
        if ( !data.success ) {

            return data;
        }

        return data;
    }

    private printResponse( object: ResponseIP ):string {
        
        //! Validations
        let validLanguage: boolean = this.validateLanguage( this._language );

        if ( !validLanguage ) {
            return '\n[x] Language not valid\n'.red;
        }

        if ( !object.continent_code ) {
            return `\n[x] Something's gone wrong. Pleasy, verify that the IP Address is valid.\n`.red;
        }

        if ( object.error?.info && !object?.success ) {
            return `\n[x] ${ object.error.info }\n`.red;
        }

        //* Printing response if everything's gone wrong
        return `
        
        ${ 'IP: '.green }                        ${ object.ip }
        ${ 'Internet Protocol Version: '.red } ${ object.type }
        ${ 'Region Code: '.cyan }               ${ object.continent_code }
        ${ 'Region: '.cyan }                    ${ object.continent_name }
        ${ 'Country Code: '.cyan }              ${ object.country_code }
        ${ 'City: '.cyan }                      ${ object.city }
        ${ 'ZIP Code: '.cyan }                  ${ object.zip }
        ${ 'Capital: '.cyan }                   ${ object.location.capital }
        ${ 'Latitude: '.magenta }                  ${ object.latitude }
        ${ 'Longitude: '.magenta }                 ${ object.longitude }
        ${ 'Language code: '.yellow }             ${ object.location.languages[0].code } 
        ${ 'Language name: '.yellow }             ${ object.location.languages[0].name } 
        ${ 'Language native: '.yellow }           ${ object.location.languages[0].native } 
        ${ 'Calling code: '.grey }              +${ object.location.calling_code }
    
        ${ 'View Location in Google Maps: '.blue } 
        https://www.google.com/maps/search/${ object.latitude },${ object.longitude }

        `;
    }

    //! Showing obtained results
    public returnResponse( object: ResponseIP ):string {
        return this.printResponse( object );
    }

}