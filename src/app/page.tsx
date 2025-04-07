"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { GitHubService } from "@/lib/github";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.accessToken) {
        setLoading(true);
        try {
          const githubService = new GitHubService(session.accessToken as string);
          const userStats = await githubService.getUserStats();
          setStats(userStats);
        } catch (error) {
          console.error("Error fetching GitHub data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session]);

  const languageChartData = stats
    ? {
        labels: Object.keys(stats.languageStats),
        datasets: [
          {
            label: "编程语言",
            data: Object.values(stats.languageStats),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
      }
    : null;

  const repoChartData = stats
    ? {
        labels: stats.topRepos.map((repo: any) => repo.name),
        datasets: [
          {
            label: "星星数",
            data: stats.topRepos.map((repo: any) => repo.stargazers_count),
            backgroundColor: "#36A2EB",
          },
        ],
      }
    : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">GitHub个人档案生成器</h1>

        {!session ? (
          <div className="flex flex-col items-center justify-center">
            <p className="mb-4 text-lg">
              使用GitHub账号登录以生成你的个人档案
            </p>
            <button
              onClick={() => signIn("github")}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              使用GitHub登录
            </button>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                {stats?.profile?.avatar_url && (
                  <img
                    src={stats.profile.avatar_url}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold">
                    {stats?.profile?.name || session.user?.name}
                  </h2>
                  <p className="text-gray-600">@{stats?.profile?.login}</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                退出登录
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center my-12">
                <p>加载中...</p>
              </div>
            ) : stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-4">基本统计</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold">{stats.repoCount}</p>
                      <p className="text-gray-600">仓库</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold">{stats.starCount}</p>
                      <p className="text-gray-600">星星</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold">{stats.forkCount}</p>
                      <p className="text-gray-600">分支</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-4">编程语言</h3>
                  {languageChartData && (
                    <div className="h-64">
                      <Pie data={languageChartData} />
                    </div>
                  )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4">热门仓库</h3>
                  {repoChartData && (
                    <div className="h-64">
                      <Bar
                        data={repoChartData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true,
                            },
                          },
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4">热门仓库列表</h3>
                  <div className="space-y-4">
                    {stats.topRepos.map((repo: any) => (
                      <div
                        key={repo.id}
                        className="border p-4 rounded-lg hover:bg-gray-50"
                      >
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {repo.name}
                        </a>
                        <p className="text-sm text-gray-600 mt-1">
                          {repo.description}
                        </p>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="mr-4">
                            ⭐ {repo.stargazers_count}
                          </span>
                          <span className="mr-4">🍴 {repo.forks_count}</span>
                          <span>{repo.language}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center my-12">
                <p>无法加载数据，请重试</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
