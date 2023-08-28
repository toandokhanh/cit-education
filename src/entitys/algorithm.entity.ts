
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity('algorithms')
export class Algorithm {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

}