import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { response } from 'express';
import { UserRO } from './user.dto';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column('text')
    prolificId: string;

    @Column('int')
    testgroup: number;

    @Column('int')
    studyProgress: number;

    @Column('varchar')
    imageOrder: string;

    @Column('int')
    currentImage: number;

    toResponseObject(showToken: boolean = true): UserRO {
        const { userId, token } = this;
        const responseObject: any = { userId }
        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }

    private get token() {
        const { userId } = this;
        return jwt.sign(
            { userId },
            process.env.SECRET,
            { expiresIn: '14d' });
    }
}