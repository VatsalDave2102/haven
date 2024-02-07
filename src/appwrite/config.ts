import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  AppwriteException,
} from "appwrite";
import conf from "../conf/conf";
import { throwError } from "./error";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId: string;
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  async updatePost(
    slug: string,
    {
      title,

      content,
      featuredImage,
      status,
    }: {
      title: string;
      content: string;
      featuredImage: string | undefined;
      status: string;
    }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  async deletePost(slug: string) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
      );
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  //   file upload service
  async uploadFile(file: File) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketID, fileId);
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  getFilePreview(fileId: string) {
    return this.storage.getFilePreview(conf.appwriteBucketID, fileId);
  }
}

const service = new Service();
export default service;
