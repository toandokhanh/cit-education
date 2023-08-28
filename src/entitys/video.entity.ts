


import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Algorithm } from "./algorithm.entity";
import { Language } from "./language.entity";
import { Lesson } from "./lesson.entity";




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

    @ManyToOne(() => Algorithm, algorithm => algorithm.video)
    algorithm : Algorithm;

    @ManyToOne(() => Language, language => language.videoInput)
    sourceLanguage : Language;

    @ManyToOne(() => Language, language => language.videoOutput)
    targetLanguage : Language;

    @OneToMany(() => Lesson, lesson => lesson.video)
    lesson : Lesson;
}