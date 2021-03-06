import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, IMessage } from './dto/create-address.dto';
import { Address } from '../entity/address.entity';
import { HttpService } from '@nestjs/axios';
require('dotenv').config();
@Controller('address')
export class AddressController {

    constructor(
        private readonly service: AddressService,
        private readonly http: HttpService) { }

    @Get()
    getAll(): Promise<Address[]> {
        return this.service.getAllAddress();
    }

    @Get(':id')
    getAddress(@Param('id') id: number): Promise<Address | IMessage> {
        return this.service.getAddress(id);
    }

    @Post()
    async create(@Body() addressDto: CreateAddressDto): Promise<IMessage> {

        const checkAddres: Address | IMessage = await this.service.getAddressEntry(addressDto);

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
        };

        if (addressDto.city && addressDto.street && addressDto.house) {
            const data = await this.http.axiosRef.post(process.env.GEO_URL, JSON.stringify([query]), options);
            if (data.status === 200) {
                const re: any = await data.data[0];
                addressDto.latitude = re.geo_lat;
                addressDto.longitude = re.geo_lon;
            }
            return this.service.createAddress(addressDto);
        } else {
            return { error: true, message: 'Вы передали пустые поля' };
        }
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<IMessage> {
        return this.service.deleteAddress(id);
    }

    @Patch()
    update(@Body() addressDto: CreateAddressDto): Promise<IMessage> {
        return this.service.updateAddress(addressDto);
    }

    @Get('/total/all')
    getTotal(): Promise<{ name: string, total: number, icon: string }> {
        return this.service.totalAddress();
    }
}

