


import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity('videos')
export class Video {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    pathMP4: string;

    @Column()
    pathSRT: string;

    @Column()
    pathTXT: string;

}