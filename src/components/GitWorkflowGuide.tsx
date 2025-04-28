import React, { useState } from "react";
import { TerminalSimulator } from "./TerminalSimulator";
import { GitBranch, Terminal, Code, Save } from "lucide-react";

interface WorkflowStep {
  title: string;
  terminalCommand: string;
  vscodeInstructions: string;
  output?: string;
  explanation: string;
}

export const GitWorkflowGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"terminal" | "vscode">("terminal");
  const [showStashSection, setShowStashSection] = useState(false);

  const basicWorkflow: WorkflowStep[] = [
    {
      title: "1. Clone Repository",
      terminalCommand: "git clone https://github.com/username/repository.git",
      vscodeInstructions:
        "1. Press Ctrl+Shift+P to open Command Palette\n2. Type 'Git: Clone'\n3. Paste repository URL\n4. Select local folder to clone into",
      explanation:
        "Downloads a copy of a remote repository to your local machine.",
    },
    {
      title: "2. Create New Branch",
      terminalCommand: "git checkout -b feature/new-feature",
      vscodeInstructions:
        "1. Click on the branch name in bottom-left corner\n2. Click '+ Create new branch from...'\n3. Type new branch name (e.g., 'feature/new-feature')\n4. Select source branch (usually 'main' or 'develop')",
      explanation:
        "Creates and switches to a new branch for your feature development.",
    },
    {
      title: "3. Make Changes",
      terminalCommand: "# Make your changes in your preferred editor",
      vscodeInstructions:
        "1. Use VS Code editor to modify files\n2. Changes will appear with colored marks in the gutter:\n   • Green: New lines\n   • Blue: Modified lines\n   • Red: Deleted lines",
      explanation: "Make necessary code changes for your feature.",
    },
    {
      title: "4. Check Status",
      terminalCommand: "git status",
      vscodeInstructions:
        "1. Click Source Control icon in sidebar (Ctrl+Shift+G)\n2. View changes under 'Changes' section:\n   • M = Modified\n   • U = Untracked\n   • D = Deleted",
      output:
        "On branch feature/new-feature\nChanges not staged for commit:\n  modified: src/components/App.tsx",
      explanation: "View which files have been changed.",
    },
    {
      title: "5. Stage Changes",
      terminalCommand: "git add .",
      vscodeInstructions:
        "In Source Control view:\n1. Hover over changed file to see + button\n2. Click + to stage individual file\n3. Or click + next to 'Changes' to stage all files\n4. Staged files move to 'Staged Changes' section",
      explanation: "Prepare changed files for commit.",
    },
    {
      title: "6. Commit Changes",
      terminalCommand: 'git commit -m "Add new feature"',
      vscodeInstructions:
        "1. In Source Control view:\n2. Type commit message in the text box at top\n3. Press Ctrl+Enter or click ✓ (Commit) button\n4. Optionally: Use 'Commit & Push' from dropdown (✓) for both actions",
      explanation: "Save your staged changes with a descriptive message.",
    },
    {
      title: "7. Push to Remote",
      terminalCommand: "git push -u origin feature/new-feature",
      vscodeInstructions:
        "Method 1 (New Branch):\n1. Click 'Publish Branch' button in status bar\n\nMethod 2 (Existing Branch):\n1. Click '...' in Source Control view\n2. Select 'Push'\n\nMethod 3 (Sync):\n1. Click Sync button in status bar (↻)\n2. This pulls and pushes changes",
      explanation:
        "Upload your local branch and commits to the remote repository.",
    },
  ];

  const stashWorkflow: WorkflowStep[] = [
    {
      title: "When to use git stash",
      terminalCommand: "",
      vscodeInstructions: "",
      explanation:
        "Use git stash when you need to switch branches but aren't ready to commit your current changes. Common scenarios:\n• Pulling latest changes\n• Switching to help a colleague\n• Working on an urgent hotfix",
    },
    {
      title: "Common Scenario: Pulling Remote Changes",
      terminalCommand:
        "# When you have uncommitted changes and remote has updates:\ngit stash\ngit pull --rebase\ngit stash pop",
      vscodeInstructions:
        "1. Click Source Control icon\n2. Click '...' menu\n3. Select 'Stash All Changes'\n4. Pull changes (Sync button)\n5. Click '...' menu again\n6. Select 'Pop Latest Stash'",
      explanation:
        "This is a common workflow when you have local changes but need to get the latest updates from remote.\n\nNote: Using git pull --rebase might affect commit history metadata (showing you as author/coauthor) because it rewrites commit history. If this is a concern, use regular git pull instead.",
    },
    {
      title: "Save changes to stash",
      terminalCommand: 'git stash save "work in progress on feature"',
      vscodeInstructions:
        "1. Open Command Palette (Ctrl+Shift+P)\n2. Type 'Git: Stash'\n3. Optionally enter a message",
      explanation:
        "Temporarily stores your modified tracked files, reverting them to their original state.",
    },
    {
      title: "List stashed changes",
      terminalCommand: "git stash list",
      vscodeInstructions:
        "1. Open Command Palette\n2. Type 'Git: Show Stashed Changes'",
      output: "stash@{0}: On feature/new-feature: work in progress on feature",
      explanation: "View all stashed changesets.",
    },
    {
      title: "Apply stashed changes",
      terminalCommand: "git stash pop",
      vscodeInstructions:
        "1. Open Command Palette\n2. Type 'Git: Pop Stash'\n3. Select stash to apply",
      explanation:
        "Restores the most recently stashed files and removes them from the stash.",
    },
    {
      title: "Apply without removing",
      terminalCommand: "git stash apply",
      vscodeInstructions:
        "1. Open Command Palette\n2. Type 'Git: Apply Stash'\n3. Select stash to apply",
      explanation:
        "Applies the stashed changes but keeps them in the stash for potential reuse.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Complete Git Workflow Guide</h2>

      {/* Tab Selector */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === "terminal"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("terminal")}
        >
          <Terminal className="w-4 h-4 mr-2" />
          Terminal Commands
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === "vscode"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("vscode")}
        >
          <Code className="w-4 h-4 mr-2" />
          VS Code Instructions
        </button>
      </div>

      {/* Understanding Git Pull --rebase */}
      <div className="bg-yellow-50 dark:bg-gray-800 p-6 rounded-lg shadow mb-8 border-l-4 border-yellow-400">
        <h3 className="text-xl font-semibold mb-4">
          Understanding Git Pull --rebase
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            When you use{" "}
            <code className="bg-yellow-100 dark:bg-gray-900 px-1 rounded">
              git pull --rebase
            </code>
            , Git does the following:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Temporarily removes your local commits</li>
            <li>Pulls the remote changes</li>
            <li>Replays your local commits on top of the updated branch</li>
          </ol>

          <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded mt-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Common Workflow with Stash and Rebase
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              When you have uncommitted changes and need to pull updates, this
              workflow is correct:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>
                <code className="bg-blue-100 dark:bg-gray-800 px-1 rounded">
                  git stash
                </code>{" "}
                - save your changes temporarily
              </li>
              <li>
                <code className="bg-blue-100 dark:bg-gray-800 px-1 rounded">
                  git pull --rebase
                </code>{" "}
                - get remote changes
              </li>
              <li>
                <code className="bg-blue-100 dark:bg-gray-800 px-1 rounded">
                  git stash pop
                </code>{" "}
                - reapply your changes
              </li>
            </ol>
          </div>

          <div className="bg-yellow-100 dark:bg-gray-900 p-4 rounded mt-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
              ⚠️ About Commit Metadata
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Commit metadata includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Author name and email</li>
              <li>Committer information</li>
              <li>Commit timestamp</li>
              <li>Commit message</li>
              <li>Parent commit references</li>
              <li>Commit hash (SHA-1)</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              When using{" "}
              <code className="bg-yellow-100 dark:bg-gray-900 px-1 rounded">
                git pull --rebase
              </code>
              , you might see:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>
                Yourself listed as author/coauthor on commits you didn't create
              </li>
              <li>Changed commit timestamps</li>
              <li>Different commit hashes</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-gray-900 p-4 rounded mt-4">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              💡 Preserving Original Commit History
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              To avoid rewriting commit history and preserve original metadata,
              use this alternative workflow:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>
                <code className="bg-green-100 dark:bg-gray-800 px-1 rounded">
                  git stash
                </code>{" "}
                - save your changes
              </li>
              <li>
                <code className="bg-green-100 dark:bg-gray-800 px-1 rounded">
                  git pull
                </code>{" "}
                - get remote changes (without --rebase)
              </li>
              <li>
                <code className="bg-green-100 dark:bg-gray-800 px-1 rounded">
                  git stash pop
                </code>{" "}
                - reapply your changes
              </li>
            </ol>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              This creates a merge commit instead of rebasing, which:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Preserves original commit authorship</li>
              <li>Maintains original timestamps</li>
              <li>Keeps original commit hashes</li>
              <li>Shows clear merge points in history</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-gray-900 p-4 rounded mt-4">
            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
              🤔 When to Use Each Approach
            </h4>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                Use{" "}
                <code className="bg-purple-100 dark:bg-gray-800 px-1 rounded">
                  git pull --rebase
                </code>{" "}
                when:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                <li>You want a cleaner, linear history</li>
                <li>You're working on a feature branch alone</li>
                <li>Exact commit metadata isn't critical</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Use regular{" "}
                <code className="bg-purple-100 dark:bg-gray-800 px-1 rounded">
                  git pull
                </code>{" "}
                when:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                <li>You need to preserve exact commit history</li>
                <li>Multiple people are working on the same branch</li>
                <li>You want to maintain clear merge points</li>
                <li>Accurate commit metadata is important</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded mt-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Switching Branches with Uncommitted Changes
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              When you try to switch branches with uncommitted changes, VS Code
              will show you these options:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                  Warning Message:
                </h5>
                <p className="text-gray-600 dark:text-gray-400">
                  "Your local changes would be overwritten by checkout."
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                  Available Options:
                </h5>
                <ul className="space-y-3">
                  <li className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      1. Stash & Checkout:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      Saves your changes temporarily and switches branch.
                      Recommended if you want to keep your changes for later.
                    </p>
                  </li>
                  <li className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      2. Migrate Changes:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      Takes your uncommitted changes with you to the new branch.
                      Use with caution as it might cause conflicts.
                    </p>
                  </li>
                  <li className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      3. Force Checkout:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      ⚠️ Discards all your uncommitted changes. Only use if
                      you're sure you don't need these changes.
                    </p>
                  </li>
                  <li className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                    <span className="font-semibold text-gray-600 dark:text-gray-400">
                      4. Cancel:
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      Keeps you on the current branch with your changes intact.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-100 dark:bg-gray-900 p-3 rounded">
                <h5 className="font-semibold text-blue-800 dark:text-blue-300">
                  💡 Best Practice:
                </h5>
                <p className="text-gray-700 dark:text-gray-300">
                  "Stash & Checkout" is usually the safest option. It's
                  equivalent to running:
                </p>
                <code className="block bg-blue-50 dark:bg-gray-800 p-2 mt-2 rounded">
                  git stash
                  <br />
                  git checkout other-branch
                </code>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  You can later retrieve your changes with{" "}
                  <code className="bg-blue-50 dark:bg-gray-800 px-1 rounded">
                    git stash pop
                  </code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Workflow Steps */}
      <div className="space-y-6">
        {basicWorkflow.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
              {activeTab === "terminal" ? (
                <>
                  <code className="block font-mono text-sm mb-2">
                    $ {step.terminalCommand}
                  </code>
                  {step.output && (
                    <pre className="text-sm text-gray-600 dark:text-gray-400 mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                      {step.output}
                    </pre>
                  )}
                </>
              ) : (
                <div className="text-sm space-y-2">
                  {step.vscodeInstructions.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {step.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Git Stash Section */}
      <div className="mt-12">
        <button
          className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white mb-6"
          onClick={() => setShowStashSection(!showStashSection)}
        >
          <Save className="w-4 h-4 mr-2" />
          {showStashSection ? "Hide Git Stash Guide" : "Show Git Stash Guide"}
        </button>

        {showStashSection && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Git Stash Guide</h3>
            {stashWorkflow.map((step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <h4 className="text-xl font-semibold mb-4">{step.title}</h4>
                {step.terminalCommand && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
                    {activeTab === "terminal" ? (
                      <>
                        <code className="block font-mono text-sm mb-2">
                          $ {step.terminalCommand}
                        </code>
                        {step.output && (
                          <pre className="text-sm text-gray-600 dark:text-gray-400 mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                            {step.output}
                          </pre>
                        )}
                      </>
                    ) : (
                      <div className="text-sm space-y-2">
                        {step.vscodeInstructions.split("\n").map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <p className="mt-4 text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {step.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
