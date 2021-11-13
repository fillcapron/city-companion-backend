import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IMessage } from 'src/address/dto/create-address.dto';
import { User } from 'src/entity/users.entity';
import { CreateUserDto } from './dto/users.dto';
import { UserService } from './users.service';

@Controller('users')
export class AuthController {

    constructor(private readonly userService: UserService) { }

    @Get(':id')
    public getUser(@Param('id') id: number): Promise<User> {
        return this.userService.getOneUser(id);
    }

    @Post()
    public create(@Body() userDto: CreateUserDto): Promise<IMessage> {
        return this.userService.createUser(userDto);
    }

    @Get()
    public getAll(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Delete(':id')
    public delete(@Param() id: number): Promise<IMessage> {
        return this.userService.deleteUser(id);
    }

    @Patch()
    public updateUser(@Body() dto: CreateUserDto): Promise<IMessage> {
        return this.userService.updateUser(dto);
    }

}
