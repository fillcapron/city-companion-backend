import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Address } from '../entity/address.entity';
import { CreateAddressDto, IMessage } from './dto/create-address.dto';


@Injectable()
export class AddressService {

    constructor(@InjectRepository(Address) private readonly repo: Repository<Address>) { }

    async getAllAddress(): Promise<Address[]> {
        return await this.repo.find({ relations: ['places', 'category'] });
    }

    async getAddressEntry(addr: CreateAddressDto): Promise<IMessage | Address> {
        const address = await this.repo.findOne({
            where: 
            { city: Like(`%${addr.city}%`) , street: Like(`%${addr.street}%`), house: addr.house },
        });
        if (address) {
            return address;
        } else {
            return { error: true, message: 'Адрес не найден' };
        }
    }

    async getAddress(id: number): Promise<IMessage | Address> {

        const address = await this.repo.findOne(id);
        if (address) {
            return address;
        } else {
            return { error: true, message: 'Адрес не найден' };
        }
    }

    async createAddress(addr: CreateAddressDto): Promise<IMessage> {
        try {
            const address = await this.repo.create(addr).save();
            return {error: false, message: 'Адрес создан', meta: address};
        } catch (e) {
            return { error: true, message: 'Ошибка создания адреса', meta: e };
        }
    }

    async deleteAddress(id: number): Promise<IMessage> {
        const address = this.repo.delete(id);
        return { message: 'Адрес удален', meta: address };
    }

    async updateAddress(dto: CreateAddressDto): Promise<IMessage> {
        const address = this.repo.update(dto.id, dto);
        return { message: 'Адрес обновлен', meta: address };
    }

    async totalAddress(): Promise<{address: number}> {
        const total = await this.repo.count();
        return {address: total};
    }
}