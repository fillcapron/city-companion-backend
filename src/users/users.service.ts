import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/address/dto/create-address.dto';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }

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

    async createUser(userDto: CreateUserDto): Promise<User> {
        return await this.repo.save(userDto);
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.repo.find({select: ['id', 'name', 'email']});
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

    async updateUser(userDto: CreateUserDto): Promise<IMessage> {
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.repo.update(userDto.id, {...userDto, password: hashPassword });
        return {message: 'Пользователь обновлен'}
    }
}
