"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.createNewPost = void 0;
const postDetail_repository_1 = require("../repository/postDetail.repository");
const custom_error_1 = require("../../../common/error/custom.error");
const userProfile_service_1 = require("../../userProfile/service/userProfile.service");
const createNewPost = (postCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield (0, postDetail_repository_1.createPost)(postCreateDto);
        /**
         *
         */
        // 사용자 id email에서 object id로 변환
        newPost.user_id = (yield (0, userProfile_service_1.getUserObjectIdByEmail)(postCreateDto.user_id)).id;
        return newPost;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error creating new post`, error);
        throw new custom_error_1.InternalServerError(`Error creating new post`);
    }
});
exports.createNewPost = createNewPost;
const getPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, postDetail_repository_1.findPostById)(postId);
        return post;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error fetching post by id: ${postId}`, error);
        throw new custom_error_1.InternalServerError(`Error fetching post by id: ${postId}`);
    }
});
exports.getPostById = getPostById;
const updatePostById = (postId, postUpdateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield (0, postDetail_repository_1.updatePost)(postId, postUpdateDto);
        return updatedPost;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error updating post by id: ${postId}`, error);
        throw new custom_error_1.InternalServerError(`Error updating post by id: ${postId}`);
    }
});
exports.updatePostById = updatePostById;
const deletePostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield (0, postDetail_repository_1.deletePost)(postId);
        return deletedPost;
    }
    catch (error) {
        if (error instanceof custom_error_1.NotFoundError) {
            throw error;
        }
        console.error(`Error deleting post by id: ${postId}`, error);
        throw new custom_error_1.InternalServerError(`Error deleting post by id: ${postId}`);
    }
});
exports.deletePostById = deletePostById;