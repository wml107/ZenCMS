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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_1 = require("./dto/create.post");
const list_post_1 = require("./dto/list.post");
const delete_post_1 = require("./dto/delete.post");
const update_post_1 = require("./dto/update.post");
const authorization_decorator_1 = require("../auth/authorization.decorator");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    list(listPostDto) {
        return this.postService.list(listPostDto);
    }
    add(createPostDto) {
        return this.postService.create(createPostDto);
    }
    delete(deletePostDto) {
        return this.postService.delete(deletePostDto);
    }
    update(updatePostDto) {
        return this.postService.update(updatePostDto);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)('list'),
    (0, authorization_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_post_1.ListPostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, authorization_decorator_1.PostW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "add", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, authorization_decorator_1.PostW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_post_1.DeletePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, authorization_decorator_1.PostW)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_post_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "update", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map