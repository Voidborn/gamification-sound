import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column('text')
    prolificId: string;

    @Column('int')
    progress: number;

    @Column('int')
    testgroup: number;
}