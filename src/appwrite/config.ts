import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

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
      throw new Error(error as string);
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
      featuredImage: string;
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
      throw new Error(error as string);
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
      throw new Error(error as string);
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
      throw new Error(error as string);
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
      throw new Error(error as string);
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
      throw new Error(error as string);
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketID, fileId);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  getFilePreview(fileId: string) {
    return this.storage.getFilePreview(conf.appwriteBucketID, fileId);
  }
}

const service = new Service();
export default service;
