import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../models/user-model";
import { Repository } from "typeorm";

export class UserRepository {
    constructor(@InjectRepository(User) private userRepositiory: Repository<User>) {

    }

    async getUser(userId: string) {
        return await this.userRepositiory.findOne({
            where: {userId}
        })
    }
}