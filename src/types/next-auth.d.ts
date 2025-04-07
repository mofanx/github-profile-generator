import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * 扩展Session类型，添加accessToken属性
   */
  interface Session {
    accessToken?: string;
    user?: DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * 扩展JWT类型，添加accessToken属性
   */
  interface JWT {
    accessToken?: string;
  }
}
