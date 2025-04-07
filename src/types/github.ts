// GitHub用户类型定义
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// GitHub仓库类型定义
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
}

// 用户统计信息类型定义
export interface UserStats {
  profile: GitHubUser;
  repoCount: number;
  starCount: number;
  forkCount: number;
  languageStats: Record<string, number>;
  topRepos: GitHubRepo[];
}
