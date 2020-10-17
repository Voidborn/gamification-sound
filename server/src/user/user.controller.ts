import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './user.decorator';

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
    registerUser(@Body('prolificId') prolificId: string) {
        console.log("registration data: ", prolificId);
        return this.userService.register(prolificId);
    }


    @Get('readinfo')
    @UseGuards(new AuthGuard())
    readUser(@User('userId') userId: string) {
        return this.userService.read(userId);
    }

    @Put()
    @UseGuards(new AuthGuard())
    updateUser(@User('userId') userId: string, @Body() data: Partial<UserDTO>) {
        return this.userService.update(userId, data);
    }

    @Get('nextImage')
    @UseGuards(new AuthGuard())
    getNextImage(@User('userId') userId: string) {
        console.log("next Image route " + userId)
        return this.userService.getNextImage(userId);
    }
}
