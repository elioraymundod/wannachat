import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity("users")
export class User {

    @PrimaryColumn({name: "user_id", type: "varchar"})
    userId: string;
  
    @Column()
    username: string;

  
    @Column()
    password: string;
  
    @Column()
    nombre: string;

    constructor(userId: string, username: string, password: string, nombre: string) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.nombre = nombre;
    }
    
}