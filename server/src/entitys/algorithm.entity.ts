import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";




@Entity('algorithms')
export class Algorithm {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    idUnit: string;

    @Column()
    name: string;

    @OneToMany(() => Video, video => video.algorithm )
    video: Video;
}