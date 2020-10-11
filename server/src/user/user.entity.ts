import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column('text')
    prolificId: string;

    @Column('int')
    testgroup: number;
}