import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { UserService } from './users.service';

@Controller('user')
export class AuthController {

    constructor(private readonly userService: UserService) {}

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getOneUser(id);
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
}
