import React, { useState, useEffect } from "react";
import { GitBranch, GitPullRequest, Check, X, GitCommit } from "lucide-react";

interface Developer {
  id: number;
  name: string;
  avatar: string;
  currentBranch: string;
  commits: {
    id: string;
    message: string;
    timestamp: string;
  }[];
  pullRequests: {
    id: number;
    title: string;
    status: "open" | "merged" | "closed";
    branches: {
      from: string;
      to: string;
    };
  }[];
}

export const DeveloperSimulation: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([
    {
      id: 1,
      name: "Alice",
      avatar:
        "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      currentBranch: "feature/profile",
      commits: [
        {
          id: "3k4l5m6",
          message: "Add user profile page",
          timestamp: "2 hours ago",
        },
      ],
      pullRequests: [],
    },
    {
      id: 2,
      name: "Bob",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      currentBranch: "feature/dashboard",
      commits: [
        {
          id: "4n5o6p7",
          message: "Create dashboard layout",
          timestamp: "3 hours ago",
        },
      ],
      pullRequests: [],
    },
    {
      id: 3,
      name: "Charlie",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      currentBranch: "develop",
      commits: [],
      pullRequests: [],
    },
  ]);

  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1); // 1 = normal speed, 2 = fast, 0.5 = slow
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);

      // Random simulation events based on time
      if (time % 10 === 0) {
        // Developer simulation events
        setDevelopers((prevDevelopers) => {
          const newDevelopers = [...prevDevelopers];

          // Random developer makes a commit
          const randomDeveloper = Math.floor(Math.random() * 3);
          const developer = newDevelopers[randomDeveloper];

          if (
            developer.currentBranch !== "develop" &&
            !developer.pullRequests.some((pr) => pr.status === "open")
          ) {
            // Create a new commit
            const newCommit = {
              id: Math.random().toString(36).substring(2, 8),
              message: getRandomCommitMessage(developer.currentBranch),
              timestamp: "Just now",
            };

            developer.commits.push(newCommit);

            // Occasionally create a PR
            if (developer.commits.length >= 2 && Math.random() > 0.6) {
              developer.pullRequests.push({
                id: Math.floor(Math.random() * 1000),
                title: `Merge ${developer.currentBranch} into develop`,
                status: "open",
                branches: {
                  from: developer.currentBranch,
                  to: "develop",
                },
              });
            }
          }

          // Review a PR
          newDevelopers.forEach((dev) => {
            if (dev.id === 3 && Math.random() > 0.7) {
              // Charlie reviews PRs
              const openPRs = newDevelopers
                .filter((d) => d.id !== 3)
                .flatMap((d) => d.pullRequests)
                .filter((pr) => pr.status === "open");

              if (openPRs.length > 0) {
                const prToReview =
                  openPRs[Math.floor(Math.random() * openPRs.length)];
                const devWithPR = newDevelopers.find((d) =>
                  d.pullRequests.some((p) => p.id === prToReview.id)
                );

                if (devWithPR) {
                  devWithPR.pullRequests = devWithPR.pullRequests.map((pr) =>
                    pr.id === prToReview.id ? { ...pr, status: "merged" } : pr
                  );

                  // After PR is merged, move to a new feature
                  devWithPR.currentBranch = getRandomFeatureBranch();
                  devWithPR.commits = [];
                }
              }
            }
          });

          return newDevelopers;
        });
      }

      // Update timestamps on commits
      setDevelopers((prevDevelopers) => {
        return prevDevelopers.map((dev) => ({
          ...dev,
          commits: dev.commits.map((commit) => ({
            ...commit,
            timestamp: getTimeAgo(commit.timestamp),
          })),
        }));
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [time, isPaused, speed]);

  const getRandomCommitMessage = (branch: string) => {
    if (branch.includes("profile")) {
      const messages = [
        "Update profile avatar component",
        "Fix profile form validation",
        "Add bio field to profile",
        "Improve profile page responsiveness",
        "Add social links to profile",
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else if (branch.includes("dashboard")) {
      const messages = [
        "Add chart component to dashboard",
        "Implement dashboard filters",
        "Fix layout on small screens",
        "Add stats widgets",
        "Optimize dashboard performance",
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = [
        "Update dependencies",
        "Fix typo in README",
        "Update documentation",
        "Minor refactoring",
        "Add unit tests",
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  };

  const getRandomFeatureBranch = () => {
    const features = [
      "feature/search",
      "feature/notifications",
      "feature/settings",
      "feature/payments",
      "feature/comments",
    ];
    return features[Math.floor(Math.random() * features.length)];
  };

  const getTimeAgo = (time: string) => {
    if (time === "Just now") return "Just now";

    const match = time.match(/(\d+)\s+(\w+)\s+ago/);
    if (!match) return time;

    let number = parseInt(match[1]);
    const unit = match[2];

    if (unit === "minute" || unit === "minutes") {
      number += 1;
      if (number === 1) return "1 minute ago";
      return `${number} minutes ago`;
    } else if (unit === "hour" || unit === "hours") {
      if (Math.random() > 0.9) {
        number += 1;
      }
      if (number === 1) return "1 hour ago";
      return `${number} hours ago`;
    }

    return time;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-3 flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Simulation Speed:</span>
          <button
            onClick={() => setSpeed(0.5)}
            className={`px-2 py-1 text-xs rounded ${
              speed === 0.5
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Slow
          </button>
          <button
            onClick={() => setSpeed(1)}
            className={`px-2 py-1 text-xs rounded ${
              speed === 1
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setSpeed(2)}
            className={`px-2 py-1 text-xs rounded ${
              speed === 2
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Fast
          </button>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`px-3 py-1 text-xs rounded font-semibold ${
            isPaused
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>

      {developers.map((developer) => (
        <div
          key={developer.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-2 flex flex-col"
        >
          <div className="flex items-center mb-4">
            <img
              src={developer.avatar}
              alt={developer.name}
              className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-200 dark:border-gray-700"
            />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {developer.name}
              </h4>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <GitBranch className="h-3.5 w-3.5 mr-1" />
                <span>{developer.currentBranch}</span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h5 className="text-sm font-medium mb-2 flex items-center text-gray-800 dark:text-gray-200">
              <GitCommit className="h-4 w-4 mr-1" />
              Recent Commits
            </h5>
            {developer.commits.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No recent commits
              </p>
            ) : (
              <ul className="text-sm space-y-2">
                {developer.commits.map((commit) => (
                  <li
                    key={commit.id}
                    className="bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between">
                      <span className="font-mono text-xs text-gray-600 dark:text-gray-300">
                        {commit.id}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {commit.timestamp}
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-gray-800 dark:text-gray-100">
                      {commit.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h5 className="text-sm font-medium mb-2 flex items-center text-gray-800 dark:text-gray-200">
              <GitPullRequest className="h-4 w-4 mr-1" />
              Pull Requests
            </h5>
            {developer.pullRequests.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No pull requests
              </p>
            ) : (
              <ul className="text-sm space-y-2">
                {developer.pullRequests.map((pr) => (
                  <li
                    key={pr.id}
                    className="bg-gray-50 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        {pr.status === "open" && (
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                        )}
                        {pr.status === "merged" && (
                          <Check className="h-4 w-4 text-purple-600 mr-1" />
                        )}
                        {pr.status === "closed" && (
                          <X className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className="font-medium text-gray-800 dark:text-gray-100">
                          {pr.title}
                        </span>
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-200">
                        #{pr.id}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      {pr.branches.from} → {pr.branches.to}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
