export interface ResponseIP {
    ip:             string;
    type:           string;
    continent_code: string;
    continent_name: string;
    country_code:   string;
    country_name:   string;
    region_code:    string;
    region_name:    string;
    city:           string;
    zip:            string;
    latitude:       number;
    longitude:      number;
    location:       Location;
    success:        boolean;
    error:          Error;
}

export interface Location {
    geoname_id:                 number;
    capital:                    string;
    languages:                  Language[];
    country_flag:               string;
    country_flag_emoji:         string;
    country_flag_emoji_unicode: string;
    calling_code:               string;
    is_eu:                      boolean;
}

export interface Language {
    code:   string;
    name:   string;
    native: string;
}

export interface Error {
    code: number;
    type: string;
    info: string;
}