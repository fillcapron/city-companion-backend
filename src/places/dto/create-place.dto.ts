import { CreareAddressDto } from "src/address/dto/create-address.dto";

export class CreatePlaceDto {
    id: number;
    name: string;
    address: number;
    description: string;
    category: number;
    rating: number;
    website: string;
}