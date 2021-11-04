import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entity/address.entity';
import { CreateAddressDto, IMessage } from './dto/create-address.dto';


@Injectable()
export class AddressService {

    constructor(@InjectRepository(Address) private readonly repo: Repository<Address>) { }

    public async getAllAddress(): Promise<Address[]> {
        return await this.repo.find();
    }

    public async getAddressId(addr: CreateAddressDto): Promise<IMessage | number> {
        const address = await this.repo.findOne({
            select: ['id'] ,
            where: [
                {city: addr.city, street: addr.street, house: addr.house},
            ],
        });
        if (address) {
            return address.id;
        } else {
            return {error: true, message: 'Адрес не найден' }
        }
    }

    public async getAddress(id: number): Promise<IMessage | Address> {

        const address = await this.repo.findOne(id);
        if (address) {
            return address;
        } else {
            return { error: true, message: 'Адрес не найден' }
        }
    }

    public async createAddress(addr: CreateAddressDto): Promise<number | IMessage> {
        try {
            const address = await this.repo.create(addr).save();
            return address.id
        } catch (e) {
            console.log(e);
            return {error: true, message: 'Ошибка создания адреса'}
        }
    }

    public async deleteAddress(id: number): Promise<void> {
        const address = this.repo.delete(id)
        address.then(r => console.log(r))
    }
}