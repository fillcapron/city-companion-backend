export class CreareAddressDto {
    country: string;
    region: string;
    city: string;
    street: string;
    house: string;
    latitude: string;
    longitude: string;
}

export interface IMessage {
    message: string;
}

export interface GeoData {
    source: string,
    result: string,
    postal_code: string,
    country: string,
    region: string,
    city_area: string,
    city_district: string,
    street: string,
    house: string,
    geo_lat: string,
    geo_lon: string,
    qc_geo: number
}

export interface LatLon{
    geo_lat: string,
    geo_lon: string
}