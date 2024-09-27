import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
class Config {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
}

export { Config };