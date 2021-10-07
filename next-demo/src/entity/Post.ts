import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar')
    title: string;
    @Column('text')
    content: string;

    constructor(attrs: Partial<Post>) {
        Object.assign(this, attrs);
    }
}
