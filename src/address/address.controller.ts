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
    public getAll(): Promise<Address[]> {
        return this.service.getAll();
    }

    @Post()
    public getAddressId(@Body() dto: CreateAddressDto): Promise<Address | IMessage> {
        return this.service.getAddressId(dto);
    }

    @Get(':id')
    public getAddress(@Param('id') id: number): Promise<Address | IMessage> {
        return this.service.getAddress(id);
    }


    @Post()
    public async create(@Body() addressDto: CreateAddressDto): Promise<number | {}> {

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
            return this.service.create(addressDto);
        } else {
            return { error: true, message: 'Вы передали пустые поля' }
        }
    }

    @Delete(':id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.service.delete(id);
    }
}

