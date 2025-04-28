import React, { useMemo } from "react";

interface CommandReferenceProps {
  currentStep: number;
}

interface Command {
  command: string;
  description: string;
  usage: string;
}

export const CommandReference: React.FC<CommandReferenceProps> = ({
  currentStep,
}) => {
  const commands: Command[] = useMemo(() => {
    // Basic commands for all steps
    const baseCommands: Command[] = [
      {
        command: "git init",
        description: "Initialize a new Git repository",
        usage: "git init",
      },
      {
        command: "git status",
        description: "Show the working tree status",
        usage: "git status",
      },
      {
        command: "git add",
        description: "Add file contents to the index",
        usage: "git add <file> or git add .",
      },
      {
        command: "git commit",
        description: "Record changes to the repository",
        usage: 'git commit -m "commit message"',
      },
      {
        command: "git pull",
        description: "Fetch from and integrate with another repository",
        usage: "git pull",
      },
      {
        command: "git push",
        description: "Update remote refs along with associated objects",
        usage: "git push origin <branch>",
      },
      {
        command: "git checkout",
        description: "Switch branches or restore working tree files",
        usage: "git checkout <branch>",
      },
      {
        command: "git push -u origin branch-name",
        description: "Push a branch and set up tracking",
        usage: "git push -u origin branch-name",
      },
      {
        command: "git branch",
        description: "List all branches",
        usage: "git branch",
      },
      {
        command: "git branch -d",
        description: "Delete a branch",
        usage: "git branch -d <branch>",
      },
      {
        command: "git merge",
        description: "Merge a branch into the current branch",
        usage: "git merge <branch>",
      },
      {
        command: "git replace",
        description: "Replace a commit in one branch with another",
        usage: "git replace <old-commit> <new-commit>",
      },
      {
        command: "git push --all origin",
        description:
          "This will push all your local branches to the remote named <origin>.",
        usage: "git push --all origin",
      },
      {
        command: "git push --tags",
        description:
          "This will push all your local tags to the remote named <origin>.",
        usage: "git push --tags",
      },
      {
        command: "git fetch",
        description: "Fetch objects from another repository",
        usage: "git fetch <remote>",
      },
      {
        command: "git pull",
        description: "Fetch from and integrate with another repository",
        usage: "git pull",
      },
      {
        command: "git stash",
        description: "Stash changes in working directory",
        usage: "git stash",
      },
    ];

    // Step-specific commands
    let stepCommands: Command[] = [];

    if (currentStep >= 1) {
      // Main and Develop Branches
      stepCommands = [
        {
          command: "git checkout -b",
          description: "Create and switch to a new branch",
          usage: "git checkout -b develop",
        },
        {
          command: "git push -u",
          description: "Push a branch and set up tracking",
          usage: "git push -u origin develop",
        },
      ];
    }

    if (currentStep >= 2) {
      // Feature Branches
      stepCommands = [
        {
          command: "git checkout -b feature/",
          description: "Create a new feature branch",
          usage: "git checkout -b feature/login",
        },
        {
          command: "git merge --no-ff",
          description: "Merge a branch creating a merge commit",
          usage: "git merge --no-ff feature/login",
        },
      ];
    }

    if (currentStep >= 3) {
      // Release Branches
      stepCommands = [
        {
          command: "git checkout -b release/",
          description: "Create a new release branch",
          usage: "git checkout -b release/1.0",
        },
        {
          command: "git tag",
          description: "Create a new tag",
          usage: 'git tag -a v1.0 -m "Version 1.0"',
        },
        {
          command: "git push --tags",
          description: "Push tags to remote repository",
          usage: "git push origin main --tags",
        },
      ];
    }

    if (currentStep >= 4) {
      // Hotfix Branches
      stepCommands = [
        {
          command: "git checkout -b hotfix/",
          description: "Create a new hotfix branch",
          usage: "git checkout -b hotfix/1.0.1",
        },
        {
          command: "git branch -d",
          description: "Delete a branch after merging",
          usage: "git branch -d hotfix/1.0.1",
        },
      ];
    }

    if (currentStep >= 5) {
      // Collaborative Workflow
      stepCommands = [
        {
          command: "git remote",
          description: "Manage set of tracked repositories",
          usage: "git remote -v",
        },
        {
          command: "git fetch",
          description: "Download objects and refs from repository",
          usage: "git fetch origin",
        },
        {
          command: "git stash",
          description: "Stash changes in working directory",
          usage: 'git stash save "work in progress"',
        },
        {
          command: "git log --graph",
          description: "View commit history as a graph",
          usage: "git log --graph --oneline --all",
        },
      ];
    }

    if (currentStep >= 6) {
      // Practice Scenarios
      stepCommands = [
        {
          command: "git rebase",
          description: "Reapply commits on top of another base",
          usage: "git rebase develop",
        },
        {
          command: "git cherry-pick",
          description: "Apply changes introduced by some commits",
          usage: "git cherry-pick commit-hash",
        },
        {
          command: "git bisect",
          description: "Use binary search to find a bad commit",
          usage: "git bisect start",
        },
        {
          command: "git reflog",
          description: "Manage reflog information",
          usage: "git reflog",
        },
      ];
    }

    return [...baseCommands, ...stepCommands];
  }, [currentStep]);

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Command
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Description
            </th>
            <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Usage
            </th>
          </tr>
        </thead>
        <tbody>
          {commands.map((cmd, index) => (
            <tr
              key={index}
              className={`transition-colors ${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-700"
              } hover:bg-blue-50 dark:hover:bg-gray-600`}
            >
              <td className="py-2 px-4 font-mono text-blue-700 dark:text-blue-300 whitespace-nowrap">
                {cmd.command}
              </td>
              <td className="py-2 px-4 text-gray-800 dark:text-gray-100">
                {cmd.description}
              </td>
              <td className="py-2 px-4 font-mono text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {cmd.usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
