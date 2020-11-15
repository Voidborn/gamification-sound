import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ImageratingEntity {
    @PrimaryColumn('varchar')
    userId: string;

    @PrimaryColumn('varchar')
    imageId: string;

    @Column('varchar')
    markedArray: string;

    @Column('varchar')
    pointsArray: string;

    @Column('int')
    receivedPoints: number;

    @CreateDateColumn()
    responseTime: Date;
}