import { PostService } from './post.service';
import { CreatePostDto } from './dto/create.post';
import { ListPostDto } from './dto/list.post';
import { DeletePostDto } from './dto/delete.post';
import { UpdatePostDto } from './dto/update.post';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    list(listPostDto: ListPostDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    add(createPostDto: CreatePostDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    delete(deletePostDto: DeletePostDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    update(updatePostDto: UpdatePostDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
}
