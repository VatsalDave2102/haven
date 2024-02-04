import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

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
      throw new Error(error as string);
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      if (currentUser) return currentUser;
      return null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

const authService = new AuthService();

export default authService;
