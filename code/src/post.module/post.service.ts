import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entities";
import { CreatePostDto } from "./dto/create.post";
import { DeletePostDto } from "./dto/delete.post";
import { UpdatePostDto } from "./dto/update.post";
import { ListPostDto } from "./dto/list.post";
import { ResponseCode, generateResponse } from "src/utils/Response";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) { }

  async list(listPostDto: ListPostDto) {
    let query = this.postRepository
      .createQueryBuilder('Post')
      .where("Post.del = 0");

    if ('timeStart' in listPostDto) {
      query = query.andWhere("Post.time >= :timeStart", { timeStart: listPostDto.timeStart });
    }
    if ('timeEnd' in listPostDto) {
      query = query.andWhere("Post.time <= :timeEnd", { timeEnd: listPostDto.timeEnd });
    }

    const res = await query
      .skip(listPostDto.page * listPostDto.pageSize)
      .take(listPostDto.pageSize)
      .getMany();

    this.view(res);

    return generateResponse(ResponseCode.OK, "", res);
  }

  async create(createPostDto: CreatePostDto) {
    await this.postRepository.save(createPostDto);
    return generateResponse(ResponseCode.OK, "", null);
  }

  async delete(deletePostDto: DeletePostDto) {
    const res = await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ del: 1 })
      .where("id =:id", { id: deletePostDto.id })
      .execute();
    return generateResponse(ResponseCode.OK, "", {
      affected: res.affected
    });
  }

  async update(updatePostDto: UpdatePostDto) {
    await this.postRepository.save(updatePostDto);
    return generateResponse(ResponseCode.OK, "", null);
  }

  view(res: Post[]) {
    for (let i = 0; i < res.length; i++) {
      this.postRepository
        .createQueryBuilder()
        .update(Post)
        .set({
          views: res[i].views + 1
        })
        .where("id = :id", { id: res[i].id })
        .execute();
    }
  }
}
