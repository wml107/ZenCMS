"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entities_1 = require("./entities/post.entities");
const Response_1 = require("../utils/Response");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async list(listPostDto) {
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
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", res);
    }
    async create(createPostDto) {
        await this.postRepository.save(createPostDto);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    async delete(deletePostDto) {
        const res = await this.postRepository
            .createQueryBuilder()
            .update(post_entities_1.Post)
            .set({ del: 1 })
            .where("id =:id", { id: deletePostDto.id })
            .execute();
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", {
            affected: res.affected
        });
    }
    async update(updatePostDto) {
        await this.postRepository.save(updatePostDto);
        return (0, Response_1.generateResponse)(Response_1.ResponseCode.OK, "", null);
    }
    view(res) {
        for (let i = 0; i < res.length; i++) {
            this.postRepository
                .createQueryBuilder()
                .update(post_entities_1.Post)
                .set({
                views: res[i].views + 1
            })
                .where("id = :id", { id: res[i].id })
                .execute();
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entities_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map