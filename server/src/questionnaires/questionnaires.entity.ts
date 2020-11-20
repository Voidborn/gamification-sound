import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class QuestionnairesEntity {
    @PrimaryColumn('varchar')
    userId: string;

    @Column('int')
    testgroup: number;

    @Column('varchar')
    gender: string;

    @Column('varchar')
    age: string;

    @Column('varchar')
    nationality: string;

    //music
    @Column('int')
    musicEnjoyment: number;

    @Column('int')
    musicTheory: number;

    @Column('int')
    instrument: number;

    @Column('int')
    musician: number;

    @Column('varchar')
    genres: string;

    //SAM:
    @Column('varchar')
    turnoff: string;

    @Column('int')
    valence: number;

    @Column('int')
    arousal: number;

    //IMI :
    @Column('int')
    imi01: number;

    @Column('int')
    imi02: number;

    @Column('int')
    imi03: number;

    @Column('int')
    imi04: number;

    @Column('int')
    imi05: number;

    @Column('int')
    imi06: number;

    @Column('int')
    imi07: number;

    @Column('int')
    imi08: number;

    @Column('int')
    imi09: number;

    @Column('int')
    imi10: number;

    @Column('int')
    imi11: number;

    @Column('int')
    imi12: number;

    @Column('int')
    imi13: number;

    @Column('int')
    imi14: number;

    @Column('int')
    imi15: number;

    @Column('int')
    imi16: number;

    @Column('int')
    imi17: number;

    @Column('int')
    imi18: number;

    @Column('int')
    imi19: number;

    @Column('int')
    imi20: number;

    @Column('int')
    imi21: number;

    @Column('int')
    imi22: number;

    //PEI:
    @Column('int')
    peiImmersion01: number;

    @Column('int')
    peiImmersion02: number;

    @Column('int')
    peiImmersion03: number;

    @Column('int')
    peiChallenge01: number;

    @Column('int')
    peiChallenge02: number;

    @Column('int')
    peiChallenge03: number;


}