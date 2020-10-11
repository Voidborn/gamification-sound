import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class ImageratingEntity {
    @PrimaryColumn('varchar')
    userId: string;

    @PrimaryColumn('varchar')
    imageId: string;

    @Column('varchar')
    ratingsArray: string;

    @Column('int')
    receivedPoints: number;
}