import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";




@Entity('languages')
export class Language {
    @PrimaryGeneratedColumn()
    id: string;
    

    @Column({unique: true})
    idUnit: string;

    @Column()
    name: string;


    @OneToMany(() => Video, video => video.sourceLanguage)
    videoInput: Video;


    @OneToMany(() => Video, video => video.sourceLanguage)
    videoOutput: Video;

}