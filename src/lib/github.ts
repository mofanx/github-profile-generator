import { Octokit } from "octokit";

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
  }

  async getUserProfile() {
    const { data } = await this.octokit.rest.users.getAuthenticated();
    return data;
  }

  async getUserRepos() {
    const profile = await this.getUserProfile();
    const { data } = await this.octokit.rest.repos.listForUser({
      username: profile.login,
      sort: "updated",
      per_page: 100,
      type: "all"
    });
    return data;
  }

  async getUserStats() {
    const profile = await this.getUserProfile();
    const repos = await this.getUserRepos();

    // 计算语言统计
    const languageStats: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language && !repo.fork) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    // 按星星数量排序的仓库
    const topRepos = [...repos]
      .filter((repo) => !repo.fork)
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 5);

    return {
      profile,
      repoCount: repos.length,
      starCount: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
      forkCount: repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0),
      languageStats,
      topRepos,
    };
  }
}
