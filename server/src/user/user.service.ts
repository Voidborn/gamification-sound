import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

import { UserEntity } from './user.entity';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async showAll() {
        return await this.userRepository.find();
    }

    async create(data: UserDTO) {
        console.log(data);
        const user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }

    async read(userId: string) {
        return await this.userRepository.findOne({ where: { userId } });
    }

    async update(userId: string, data: Partial<UserDTO>) {
        await this.userRepository.update({ userId }, data);
        return await this.userRepository.findOne({ userId })
    }

    async destroy(userId: string) {
        await this.userRepository.delete({ userId });
        return { deleted: true };
    }
}
