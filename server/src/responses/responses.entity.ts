import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ResponseEntity {
    @PrimaryColumn('varchar')
    userId: string;

    @PrimaryColumn('varchar')
    questionId: string;

    @Column('integer')
    studyProgress: number;

    @Column('varchar')
    answer: string;

    @CreateDateColumn()
    responseTime: Date;
}