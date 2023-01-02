import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {PostsService} from "../services/posts.service";
import {CreatePostReq} from "../dto/create_post.dto";
import {JwtAuthGuard} from "../local.strategy/jwt-auth.guard";

@Controller("/post")
export class PostController {
    constructor(private postService: PostsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post("/save")
    public saveCar(@Body() createPostReq: CreatePostReq) {
        return this.postService.savePost(createPostReq);
    }
}