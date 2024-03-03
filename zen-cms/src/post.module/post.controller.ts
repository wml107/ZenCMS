import { Body, Controller, Get, HttpCode, Param, Post, Delete, Put, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create.post';
import { ListPostDto } from './dto/list.post';
import { DeletePostDto } from './dto/delete.post';
import { UpdatePostDto } from './dto/update.post';
import { PostW, Public } from 'src/auth/authorization.decorator';
import { ResponseCode, generateResponse } from 'src/utils/Response';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @Get('list')
    @Public()
    async list(@Body() listPostDto: ListPostDto) {
        const res = await this.postService.list(listPostDto);
        return generateResponse(ResponseCode.OK, "", res);
    }

    @Post('create')
    @PostW()
    async add(@Body() createPostDto: CreatePostDto) {
        if(await this.postService.create(createPostDto)) return generateResponse(ResponseCode.OK, "", null);
    }

    @Delete('delete')
    @PostW()
    async delete(@Body() deletePostDto: DeletePostDto) {
        if(await this.postService.delete(deletePostDto)) return generateResponse(ResponseCode.OK, "", null);
    }
    @Put('update')
    @PostW()
    async update(@Body() updatePostDto: UpdatePostDto) {
        if(await this.postService.update(updatePostDto)) return generateResponse(ResponseCode.OK, "", null);
    }
}