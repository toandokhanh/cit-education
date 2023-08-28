

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

}