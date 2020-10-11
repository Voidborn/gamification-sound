import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ResponseEntity {
    @PrimaryColumn('varchar')
    userId: string;

    @PrimaryColumn('varchar')
    questionId: string;

    @Column('text')
    answer: string;

    @CreateDateColumn()
    responseTime: Date;
}