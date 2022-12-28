import {Body, Controller, Post} from "@nestjs/common";
import {PostsService} from "../services/posts.service";
import {CreatePostReq} from "../dto/create_post.dto";

@Controller("/post")
export class PostController {
    constructor(private postService: PostsService) {
    }

    @Post("/save")
    public saveCar(@Body() createPostReq: CreatePostReq) {
        return this.postService.savePost(createPostReq);
    }
}