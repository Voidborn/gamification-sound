import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { UserDTO } from './user.dto';
import { UserService } from './user.service'

import imgJson from '../trafficImg/images.json'


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    showAllUsers() {
        return this.userService.showAll();
    }

    @Post()
    createUser(@Body() data) {
        //set the amount of test groups
        var test_groups = 4;
        var testgroup = Math.floor(Math.random() * Math.floor(test_groups));

        var myArray: number[] = [];

        for (var i = 0; i < imgJson.images.length; i++) {
            myArray.push(i);
        }


        for (var i = myArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = myArray[i];
            myArray[i] = myArray[j];
            myArray[j] = temp;
        }

        var imageOrder = JSON.stringify({ 'array': myArray })

        console.log(data);
        var user: UserDTO = {
            prolificId: data.prolificId,
            testgroup: testgroup,
            studyProgress: 1,
            imageOrder: imageOrder,
            currentImage: 0
        }
        return this.userService.create(user);
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
