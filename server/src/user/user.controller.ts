import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { UserDTO } from './user.dto';
import { UserService } from './user.service'



@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    showAllUsers() {
        return this.userService.showAll();
    }

    @Post()
    createUser(@Body() data: { prolificId: string }) {
        return this.userService.create(data);
    }

    @Get(':userId')
    readUser(@Param('userId') userId: string) {
        return this.userService.read(userId);
    }

    @Put(':userId')
    updateUser(@Param('userId') userId: string, @Body() data: Partial<UserDTO>) {
        return this.userService.update(userId, data);
    }

    @Delete(':userId')
    deleteUser(@Param('userId') userId: string) {
        return this.userService.destroy(userId);

    }
}
