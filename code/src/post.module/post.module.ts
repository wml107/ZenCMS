import { Module } from "@nestjs/common";
import { Post } from "./entities/post.entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule { }