import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity('languages')
export class Language {
    @PrimaryGeneratedColumn()
    id: string;


    @Column()
    name: string;

}