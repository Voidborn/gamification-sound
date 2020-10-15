import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { UserDTO } from './user.dto';
import { UserService } from './user.service'



@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('login')
    loginUser(@Body() data) {
        return this.userService.login(data);
    }

    @Post('register')
    registerUser(@Body() data: { prolificId: string }) {
        return this.userService.register(data);
    }


    @Get(':userId')
    readUser(@Param('userId') userId: string) {
        return this.userService.read(userId);
    }

    @Put(':userId')
    updateUser(@Param('userId') userId: string, @Body() data: Partial<UserDTO>) {
        return this.userService.update(userId, data);
    }

    @Get('nextImage/:userId')
    getNextImage(@Param('userId') userId: string) {
        console.log("next Image route " + userId)
        return this.userService.getNextImage(userId);
    }
}
