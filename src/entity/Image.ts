import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryColumn()
    image_id: number;

    @Column()
    data: string;


    constructor(image_id: number, data: string) {
        this.image_id = image_id
        this.data = data
    }
}
