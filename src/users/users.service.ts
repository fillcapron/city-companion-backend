import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }

    async getUserByEmail(email: string): Promise<CreateUserDto> {
        const findUser = await this.repo.findOne({
            select: ['name', 'password', 'email'],
            where: [
                { email: email }
            ],
            relations: []
        })
        return findUser;
    }

    async createUser(dto: CreateUserDto): Promise<IMessage> {
        const user = await this.repo.save(dto);
        return { message: 'Пользователь создан' };
    }

    async getAllUsers() {
        const users = await this.repo.find();
        return users;
    }

    async deleteUser(id: number): Promise<IMessage> {
        const user = await this.repo.delete(id);
        return { message: 'Пользователь удален' };
    }

    async getOneUser(id: number): Promise<User> {
        const user = await this.repo.findOne(id);
        return user;
    }

    async updateUser(dto: CreateUserDto): Promise<IMessage> {
        const user = await this.repo.update(dto.id, dto);
        return {message: 'Пользователь обновлен'}
    }
}
