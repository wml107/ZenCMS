import { Repository } from "typeorm";
import { Post } from "./entities/post.entities";
import { CreatePostDto } from "./dto/create.post";
import { DeletePostDto } from "./dto/delete.post";
import { UpdatePostDto } from "./dto/update.post";
import { ListPostDto } from "./dto/list.post";
export declare class PostService {
    private postRepository;
    constructor(postRepository: Repository<Post>);
    list(listPostDto: ListPostDto): Promise<{
        statusCode: any;
        message: any;
        data: any;
    }>;
    create(createPostDto: CreatePostDto): Promise<{
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
    view(res: Post[]): void;
}
