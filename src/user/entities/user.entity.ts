import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../core/enum/roles.enum";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: Role;

}