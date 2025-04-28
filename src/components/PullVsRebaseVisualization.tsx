import React, { useState } from "react";

export interface Commit {
  id: string;
  message: string;
  branch: string;
  position: number;
}

export interface Branch {
  name: string;
  color: string;
}

export const PullVsRebaseVisualization = () => {
  const [showRebase, setShowRebase] = useState(false);

  const branches: Branch[] = [
    { name: "main", color: "#2563eb" }, // blue-600
    { name: "feature", color: "#16a34a" }, // green-600
  ];

  const regularPullCommits: Commit[] = [
    // Main branch commits
    { id: "a1b2c3d", message: "Initial commit", branch: "main", position: 0 },
    { id: "e4f5g6h", message: "Update docs", branch: "main", position: 1 },
    { id: "i7j8k9l", message: "Fix bug", branch: "main", position: 2 },
    // Feature branch commits
    { id: "m1n2o3p", message: "Start feature", branch: "feature", position: 1 },
    {
      id: "q4r5s6t",
      message: "Add functionality",
      branch: "feature",
      position: 2,
    },
    // Merge commit
    {
      id: "u7v8w9x",
      message: "Merge main into feature",
      branch: "feature",
      position: 3,
    },
  ];

  const rebasePullCommits: Commit[] = [
    // Main branch commits
    { id: "a1b2c3d", message: "Initial commit", branch: "main", position: 0 },
    { id: "e4f5g6h", message: "Update docs", branch: "main", position: 1 },
    { id: "i7j8k9l", message: "Fix bug", branch: "main", position: 2 },
    // Rebased feature branch commits
    { id: "m1n2o3p", message: "Start feature", branch: "feature", position: 3 },
    {
      id: "q4r5s6t",
      message: "Add functionality",
      branch: "feature",
      position: 4,
    },
  ];

  const getCommitPosition = (commit: Commit, branchIndex: number) => {
    const xOffset = 50 + branchIndex * 100;
    const yOffset = 40 + commit.position * 60;
    return { x: xOffset, y: yOffset };
  };

  const renderBranchLines = (commits: Commit[]) => {
    return branches.map((branch, index) => {
      const branchCommits = commits.filter((c) => c.branch === branch.name);
      if (branchCommits.length === 0) return null;

      const startY = getCommitPosition(branchCommits[0], index).y;
      const endY = getCommitPosition(
        branchCommits[branchCommits.length - 1],
        index
      ).y;

      return (
        <React.Fragment key={`branch-${branch.name}`}>
          <line
            x1={50 + index * 100}
            y1={startY}
            x2={50 + index * 100}
            y2={endY + 30}
            stroke={branch.color}
            strokeWidth={2}
          />
          <text
            x={50 + index * 100}
            y={20}
            textAnchor="middle"
            fill={branch.color}
            fontWeight="500"
          >
            {branch.name}
          </text>
        </React.Fragment>
      );
    });
  };

  const renderCommits = (commits: Commit[]) => {
    return commits.map((commit) => {
      const branchIndex = branches.findIndex((b) => b.name === commit.branch);
      if (branchIndex < 0) return null;

      const pos = getCommitPosition(commit, branchIndex);
      const branchColor = branches[branchIndex].color;

      return (
        <g key={commit.id}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r={6}
            fill="white"
            stroke={branchColor}
            strokeWidth={2}
          />
          <text
            x={pos.x + 15}
            y={pos.y - 8}
            textAnchor="start"
            fill={branchColor}
            fontSize="12"
            fontFamily="monospace"
          >
            {commit.id.substring(0, 7)}
          </text>
          <text
            x={pos.x + 15}
            y={pos.y + 8}
            textAnchor="start"
            fill="currentColor"
            fontSize="12"
          >
            {commit.message}
          </text>
        </g>
      );
    });
  };
  // Draw merge or rebase connections
  const renderConnections = () => {
    if (showRebase) {
      // Draw rebase connections
      return (
        <g className="connections">
          <path
            d="M 50,160 C 100,160 100,220 150,220"
            stroke="#16a34a"
            strokeWidth={2}
            strokeDasharray="4"
            fill="none"
          />
          <path
            d="M 50,220 C 100,220 100,280 150,280"
            stroke="#16a34a"
            strokeWidth={2}
            strokeDasharray="4"
            fill="none"
          />
        </g>
      );
    } else {
      // Draw merge connection
      return (
        <path
          d="M 50,160 C 75,160 125,220 150,220"
          stroke="#16a34a"
          strokeWidth={2}
          strokeDasharray="4"
          fill="none"
        />
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            !showRebase ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowRebase(false)}
        >
          Git Pull (Merge)
        </button>
        <button
          className={`px-4 py-2 rounded ${
            showRebase ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setShowRebase(true)}
        >
          Git Pull --rebase
        </button>
      </div>

      <div className="border dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
        <svg width="400" height="320">
          {renderBranchLines(
            showRebase ? rebasePullCommits : regularPullCommits
          )}
          {renderConnections()}
          {renderCommits(showRebase ? rebasePullCommits : regularPullCommits)}
        </svg>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        {showRebase ? (
          <p>
            With <code>git pull --rebase</code>, your local commits are replayed
            on top of the remote changes, creating a linear history without
            merge commits.
          </p>
        ) : (
          <p>
            With regular <code>git pull</code>, a merge commit is created to
            combine the remote changes with your local changes.
          </p>
        )}
      </div>
    </div>
  );
};
