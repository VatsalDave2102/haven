import { Account, AppwriteException, Client, ID } from "appwrite";
import conf from "../conf/conf";
import { throwError } from "./error";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      if (currentUser) return currentUser;
      return null;
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throwError(error as AppwriteException);
    }
  }
}

const authService = new AuthService();

export default authService;
