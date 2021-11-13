import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, IMessage } from './dto/create-address.dto';
import { Address } from '../entity/address.entity';
import { HttpService } from '@nestjs/axios';
require('dotenv').config();
@Controller('address')
export class AddressController {

    constructor(
        private readonly service: AddressService,
        private readonly serviceHttp: HttpService) { }

    @Get()
    getAll(): Promise<Address[]> {
        return this.service.getAllAddress();
    }

    @Get(':id')
    getAddress(@Param('id') id: number): Promise<Address | IMessage> {
        return this.service.getAddress(id);
    }

    @Post()
    async create(@Body() addressDto: CreateAddressDto): Promise<Address | IMessage> {

        const checkAddres: Address | IMessage = await this.service.getAddressId(addressDto);

        if (typeof checkAddres === 'number') {
            return checkAddres;
        }

        const query: string = `${addressDto.city} ${addressDto.street} ${addressDto.house}`;

        const options = {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + process.env.TOKEN,
                "X-Secret": process.env.SECRET
            }
        }

        if (addressDto.city && addressDto.street && addressDto.house) {
            const data = await this.serviceHttp.axiosRef.post(process.env.GEO_URL, JSON.stringify([query]), options);
            if (data.status === 200) {
                const re: any = await data.data[0];
                addressDto.latitude = re.geo_lat;
                addressDto.longitude = re.geo_lon;
            }
            return this.service.createAddress(addressDto);
        } else {
            return { error: true, message: 'Вы передали пустые поля' }
        }
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.service.deleteAddress(id);
    }
}

