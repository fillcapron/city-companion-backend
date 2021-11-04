import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    
    async createUser(dto: CreateUserDto) {
        const user = await this.repo.save(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.repo.find();
        return users;
    }

    async getOneUser(id: number): Promise<CreateUserDto> {
        const user = await this.repo.findOne(id);
        return user;
    }
}
