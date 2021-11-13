import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IMessage } from 'src/address/dto/create-address.dto';
import { User } from 'src/entity/users.entity';
import { CreateUserDto } from './dto/users.dto';
import { UserService } from './users.service';

@Controller('users')
export class AuthController {

    constructor(private readonly userService: UserService) { }

    @Get(':id')
    getUser(@Param('id') id: number): Promise<User> {
        return this.userService.getOneUser(id);
    }

    @Post()
    create(@Body() userDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Delete(':id')
    delete(@Param() id: number): Promise<IMessage> {
        return this.userService.deleteUser(id);
    }

    @Patch()
    updateUser(@Body() dto: CreateUserDto): Promise<IMessage> {
        return this.userService.updateUser(dto);
    }

}
