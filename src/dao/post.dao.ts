import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "../models/post.entity";
import {Repository} from "typeorm";

@Injectable()
export class PostDao {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}
    findAll(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    findOne(id: number): Promise<Post> {
        return this.postsRepository.findOneBy({id});
    }

    async remove(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }

    async insert(newPost: Post): Promise<Post> {
        return this.postsRepository.save(newPost, {reload: true});
    }


}