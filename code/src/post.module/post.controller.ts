import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create.post';
import { ListPostDto } from './dto/list.post';
import { DeletePostDto } from './dto/delete.post';
import { UpdatePostDto } from './dto/update.post';
import { PostW, Public } from 'src/auth/authorization.decorator';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @Post('list')
    @Public()
    list(@Body() listPostDto: ListPostDto) {
        return this.postService.list(listPostDto);
    }

    @Post('create')
    @PostW()
    add(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto);
    }

    @Post('delete')
    @PostW()
    delete(@Body() deletePostDto: DeletePostDto) {
        return this.postService.delete(deletePostDto);
    }
    @Post('update')
    @PostW()
    update(@Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(updatePostDto);
    }
}