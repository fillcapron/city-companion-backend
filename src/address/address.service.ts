import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entity/address.entity';
import { CreateAddressDto, GeoData, IMessage } from './dto/create-address.dto';


@Injectable()
export class AddressService {

    constructor(@InjectRepository(Address) private readonly repo: Repository<Address>) { }

    public async getAll(): Promise<Address[]> {
        return await this.repo.find();
    }

    public async getAddressId(addr: CreateAddressDto): Promise<IMessage | number> {
        const res = await this.repo.findOne({
            select: ['id'] ,
            where: [
                {city: addr.city},
                {street: addr.street},
                {house: addr.house}
            ],
        });
        if (res) {
            return res.id;
        } else {
            return {error: true, message: 'Адрес не найден' }
        }
    }

    public async getAddress(id: number): Promise<IMessage | Address> {

        const result = await this.repo.findOne(id);
        if (result) {
            return result;
        } else {
            return { error: true, message: 'Адрес не найден' }
        }
    }

    public async create(addr: CreateAddressDto): Promise<number> {
        try {
            const address = await this.repo.create(addr).save();
            return address.id
        } catch (e) {
            console.log(e);
            return
        }
    }

    public async delete(id: number): Promise<void> {
        const res = this.repo.delete(id)
        res.then(r => console.log(r))
    }
}