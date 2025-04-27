import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TerminalSimulator } from './TerminalSimulator';

interface TutorialStepsProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  setCurrentBranch: (branch: string) => void;
}

export const TutorialSteps: React.FC<TutorialStepsProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
  setCurrentBranch,
}) => {
  const tutorialContent = [
    // Step 0: Introduction
    {
      title: 'Introduction to Git Flow',
      content: (
        <>
          <p className="mb-4">
            Git Flow is a branching model for Git that helps teams manage larger projects. 
            It defines a strict branching structure designed around project releases, providing 
            a robust framework for managing larger projects.
          </p>
          <p className="mb-4">
            Git Flow works with the following main branches:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong className="text-[#0366D6]">Main</strong> - contains production code that can be released</li>
            <li><strong className="text-[#2EA44F]">Develop</strong> - contains pre-production code with newly developed features</li>
            <li><strong className="text-[#6F42C1]">Feature</strong> - used to develop new features</li>
            <li><strong className="text-[#F97F0E]">Release</strong> - for preparing a new production release</li>
            <li><strong className="text-[#D73A49]">Hotfix</strong> - for quickly patching production releases</li>
          </ul>
          <p className="mb-4">
            This tutorial will guide you through each part of the Git Flow process, 
            showing how multiple developers can work on different branches simultaneously.
          </p>
          
          <button 
            className="bg-[#0366D6] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
            onClick={() => {
              setCurrentBranch('main');
              onNextStep();
            }}
          >
            Start Tutorial
          </button>
        </>
      ),
    },
    // Step 1: Main and Develop Branches
    {
      title: 'Main and Develop Branches',
      content: (
        <>
          <p className="mb-4">
            The Git Flow model uses two main branches with infinite lifetime:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong className="text-[#0366D6]">Main (master)</strong> - This branch contains production-ready code. It should always be in a deployable state.
            </li>
            <li>
              <strong className="text-[#2EA44F]">Develop</strong> - This is the integration branch for features. It contains code that will be included in the next release.
            </li>
          </ul>
          
          <p className="mb-4">
            After initializing a project, you'll create a develop branch from main:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git checkout -b develop', output: 'Switched to a new branch \'develop\'' },
              { command: 'git push -u origin develop', output: 'Total 0 (delta 0), reused 0 (delta 0)\nremote: \nremote: Create a pull request for \'develop\':\nremote:   https://github.com/user/repo/pull/new/develop\nremote: \nTo github.com:user/repo.git\n * [new branch]      develop -> develop\nBranch \'develop\' set up to track remote branch \'develop\' from \'origin\'.' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            The develop branch will serve as the integration branch for all features. Developers will branch from and merge back to this branch.
          </p>
          
          <div className="flex justify-between mt-6">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('main');
                onPrevStep();
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            <button 
              className="bg-[#0366D6] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('develop');
                onNextStep();
              }}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </>
      ),
    },
    // Step 2: Feature Branches
    {
      title: 'Feature Branches',
      content: (
        <>
          <p className="mb-4">
            Feature branches are used to develop new features for upcoming releases. When starting a new feature, branch off from the develop branch.
          </p>
          
          <p className="mb-4">
            Feature branches typically exist in developer repositories only, not in the main repository. They're eventually merged back into develop when the feature is complete.
          </p>
          
          <p className="mb-4">
            Creating a feature branch:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git checkout develop', output: 'Switched to branch \'develop\'\nYour branch is up to date with \'origin/develop\'.' },
              { command: 'git checkout -b feature/login', output: 'Switched to a new branch \'feature/login\'' },
              { command: 'git push -u origin feature/login', output: 'Total 0 (delta 0), reused 0 (delta 0)\nremote: \nremote: Create a pull request for \'feature/login\':\nremote:   https://github.com/user/repo/pull/new/feature/login\nremote: \nTo github.com:user/repo.git\n * [new branch]      feature/login -> feature/login\nBranch \'feature/login\' set up to track remote branch \'feature/login\' from \'origin\'.' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            Once you've completed work on your feature, you merge it back into develop:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git add .', output: '' },
              { command: 'git commit -m "Add login form"', output: '[feature/login abc1234] Add login form\n 2 files changed, 57 insertions(+), 0 deletions(-)' },
              { command: 'git commit -m "Implement authentication"', output: '[feature/login def5678] Implement authentication\n 3 files changed, 124 insertions(+), 2 deletions(-)' },
              { command: 'git checkout develop', output: 'Switched to branch \'develop\'\nYour branch is up to date with \'origin/develop\'.' },
              { command: 'git merge --no-ff feature/login', output: 'Merge made by the \'recursive\' strategy.\n 5 files changed, 181 insertions(+), 2 deletions(-)\nCreate mode 100644 src/components/Login.jsx\nCreate mode 100644 src/services/auth.js' },
              { command: 'git push origin develop', output: 'Counting objects: 15, done.\nDelta compression using up to 4 threads.\nCompressing objects: 100% (13/13), done.\nWriting objects: 100% (15/15), 2.34 KiB | 797.00 KiB/s, done.\nTotal 15 (delta 5), reused 0 (delta 0)\nremote: Resolving deltas: 100% (5/5), completed with 2 local objects.\nTo github.com:user/repo.git\n   abc1234..hij9012  develop -> develop' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            The <code>--no-ff</code> flag ensures that a merge commit is always created, even if it could be performed with a fast-forward. 
            This preserves the historical existence of the feature branch and groups all commits that added the feature.
          </p>
          
          <div className="flex justify-between mt-6">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('develop');
                onPrevStep();
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            <button 
              className="bg-[#0366D6] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('feature/login');
                onNextStep();
              }}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </>
      ),
    },
    // Step 3: Release Branches
    {
      title: 'Release Branches',
      content: (
        <>
          <p className="mb-4">
            Release branches support the preparation of a new production release. They allow for minor bug fixes and preparing metadata for a release (version number, build dates, etc.). By doing this work on a release branch, the develop branch is clear to receive features for the next release.
          </p>
          
          <p className="mb-4">
            Release branches are created from the develop branch when it contains (almost) all the desired features for the release:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git checkout develop', output: 'Switched to branch \'develop\'\nYour branch is up to date with \'origin/develop\'.' },
              { command: 'git checkout -b release/1.0', output: 'Switched to a new branch \'release/1.0\'' },
              { command: 'git push -u origin release/1.0', output: 'Total 0 (delta 0), reused 0 (delta 0)\nremote: \nremote: Create a pull request for \'release/1.0\':\nremote:   https://github.com/user/repo/pull/new/release/1.0\nremote: \nTo github.com:user/repo.git\n * [new branch]      release/1.0 -> release/1.0\nBranch \'release/1.0\' set up to track remote branch \'release/1.0\' from \'origin\'.' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            Once the release branch is ready to become a production release, you'll:
          </p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Merge it into main</li>
            <li>Tag the release with its version number</li>
            <li>Merge it back into develop to incorporate any changes made in the release branch</li>
          </ol>
          
          <TerminalSimulator 
            commands={[
              { command: 'git checkout main', output: 'Switched to branch \'main\'\nYour branch is up to date with \'origin/main\'.' },
              { command: 'git merge --no-ff release/1.0', output: 'Merge made by the \'recursive\' strategy.\n 8 files changed, 32 insertions(+), 10 deletions(-)\n ...' },
              { command: 'git tag -a v1.0 -m "Version 1.0"', output: '' },
              { command: 'git push origin main --tags', output: 'Counting objects: 5, done.\nDelta compression using up to 4 threads.\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (5/5), 734 bytes | 734.00 KiB/s, done.\nTotal 5 (delta 2), reused 0 (delta 0)\nTo github.com:user/repo.git\n   abc1234..klm3456  main -> main\n * [new tag]         v1.0 -> v1.0' },
              { command: 'git checkout develop', output: 'Switched to branch \'develop\'\nYour branch is up to date with \'origin/develop\'.' },
              { command: 'git merge --no-ff release/1.0', output: 'Merge made by the \'recursive\' strategy.\n 2 files changed, 5 insertions(+), 1 deletion(-)\n ...' },
              { command: 'git push origin develop', output: 'Counting objects: 7, done.\nDelta compression using up to 4 threads.\nCompressing objects: 100% (5/5), done.\nWriting objects: 100% (7/7), 734 bytes | 734.00 KiB/s, done.\nTotal 7 (delta 3), reused 0 (delta 0)\nTo github.com:user/repo.git\n   nop7890..qrs0123  develop -> develop' },
              { command: 'git branch -d release/1.0', output: 'Deleted branch release/1.0 (was tuv4567).' }
            ]}
          />
          
          <div className="flex justify-between mt-6">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('feature/login');
                onPrevStep();
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            <button 
              className="bg-[#0366D6] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('release/1.0');
                onNextStep();
              }}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </>
      ),
    },
    // Step 4: Hotfix Branches
    {
      title: 'Hotfix Branches',
      content: (
        <>
          <p className="mb-4">
            Hotfix branches are used to quickly patch production releases. They're very similar to release branches, but are created in response to an unwanted state of a production version.
          </p>
          
          <p className="mb-4">
            Hotfix branches are created from the main branch instead of develop:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git checkout main', output: 'Switched to branch \'main\'\nYour branch is up to date with \'origin/main\'.' },
              { command: 'git checkout -b hotfix/1.0.1', output: 'Switched to a new branch \'hotfix/1.0.1\'' },
              { command: 'git push -u origin hotfix/1.0.1', output: 'Total 0 (delta 0), reused 0 (delta 0)\nremote: \nremote: Create a pull request for \'hotfix/1.0.1\':\nremote:   https://github.com/user/repo/pull/new/hotfix/1.0.1\nremote: \nTo github.com:user/repo.git\n * [new branch]      hotfix/1.0.1 -> hotfix/1.0.1\nBranch \'hotfix/1.0.1\' set up to track remote branch \'hotfix/1.0.1\' from \'origin\'.' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            Making changes and fixing the critical issue:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git add .', output: '' },
              { command: 'git commit -m "Fix critical security issue"', output: '[hotfix/1.0.1 wxy5678] Fix critical security issue\n 1 file changed, 5 insertions(+), 2 deletions(-)' },
              { command: 'git checkout main', output: 'Switched to branch \'main\'\nYour branch is up to date with \'origin/main\'.' },
              { command: 'git merge --no-ff hotfix/1.0.1', output: 'Merge made by the \'recursive\' strategy.\n 1 file changed, 5 insertions(+), 2 deletions(-)\n ...' },
              { command: 'git tag -a v1.0.1 -m "Version 1.0.1"', output: '' },
              { command: 'git push origin main --tags', output: 'Counting objects: 5, done.\nDelta compression using up to 4 threads.\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (5/5), 734 bytes | 734.00 KiB/s, done.\nTotal 5 (delta 2), reused 0 (delta 0)\nTo github.com:user/repo.git\n   klm3456..z016789  main -> main\n * [new tag]         v1.0.1 -> v1.0.1' },
              { command: 'git checkout develop', output: 'Switched to branch \'develop\'\nYour branch is up to date with \'origin/develop\'.' },
              { command: 'git merge --no-ff hotfix/1.0.1', output: 'Merge made by the \'recursive\' strategy.\n 1 file changed, 5 insertions(+), 2 deletions(-)\n ...' },
              { command: 'git push origin develop', output: 'Counting objects: 7, done.\nDelta compression using up to 4 threads.\nCompressing objects: 100% (5/5), done.\nWriting objects: 100% (7/7), 734 bytes | 734.00 KiB/s, done.\nTotal 7 (delta 3), reused 0 (delta 0)\nTo github.com:user/repo.git\n   qrs0123..abc7890  develop -> develop' },
              { command: 'git branch -d hotfix/1.0.1', output: 'Deleted branch hotfix/1.0.1 (was wxy5678).' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            The key difference between hotfix and release branches is that hotfix branches are created from main, not develop.
            This ensures that the fix goes straight to production, and is then merged back to develop to ensure the fix is included in the next release.
          </p>
          
          <div className="flex justify-between mt-6">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('release/1.0');
                onPrevStep();
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            <button 
              className="bg-[#0366D6] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('hotfix/1.0.1');
                onNextStep();
              }}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </>
      ),
    },
    // Step 5: Collaborative Workflow
    {
      title: 'Collaborative Workflow',
      content: (
        <>
          <p className="mb-4">
            In a team environment, multiple developers work on different features simultaneously. Let's see how Git Flow supports this collaborative process:
          </p>
          
          <p className="mb-4">
            <strong>Developer A</strong> starts working on the user profile feature:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git checkout develop', output: 'Switched to branch \'develop\'\nYour branch is up to date with \'origin/develop\'.' },
              { command: 'git pull', output: 'Already up to date.' },
              { command: 'git checkout -b feature/profile', output: 'Switched to a new branch \'feature/profile\'' },
              { command: 'git push -u origin feature/profile', output: 'Total 0 (delta 0), reused 0 (delta 0)\nremote: \nremote: Create a pull request for \'feature/profile\':\nremote:   https://github.com/user/repo/pull/new/feature/profile\nremote: \nTo github.com:user/repo.git\n * [new branch]      feature/profile -> feature/profile\nBranch \'feature/profile\' set up to track remote branch \'feature/profile\' from \'origin\'.' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            <strong>Developer B</strong> starts working on the dashboard feature:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git checkout develop', output: 'Switched to branch \'develop\'\nYour branch is up to date with \'origin/develop\'.' },
              { command: 'git pull', output: 'Already up to date.' },
              { command: 'git checkout -b feature/dashboard', output: 'Switched to a new branch \'feature/dashboard\'' },
              { command: 'git push -u origin feature/dashboard', output: 'Total 0 (delta 0), reused 0 (delta 0)\nremote: \nremote: Create a pull request for \'feature/dashboard\':\nremote:   https://github.com/user/repo/pull/new/feature/dashboard\nremote: \nTo github.com:user/repo.git\n * [new branch]      feature/dashboard -> feature/dashboard\nBranch \'feature/dashboard\' set up to track remote branch \'feature/dashboard\' from \'origin\'.' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            Both developers work independently, making commits to their respective feature branches:
          </p>
          
          <p className="mb-2"><strong>Developer A</strong> (on feature/profile):</p>
          <TerminalSimulator 
            commands={[
              { command: 'git add .', output: '' },
              { command: 'git commit -m "Add user profile page"', output: '[feature/profile def0123] Add user profile page\n 3 files changed, 147 insertions(+), 0 deletions(-)' },
              { command: 'git push origin feature/profile', output: 'Counting objects: 8, done.\nDelta compression using up to 4 threads.\nCompressing objects: 100% (6/6), done.\nWriting objects: 100% (8/8), 1.42 KiB | 1.42 MiB/s, done.\nTotal 8 (delta 1), reused 0 (delta 0)\nTo github.com:user/repo.git\n   ghi4567..jkl8901  feature/profile -> feature/profile' }
            ]}
          />
          
          <p className="mb-2 mt-4"><strong>Developer B</strong> (on feature/dashboard):</p>
          <TerminalSimulator 
            commands={[
              { command: 'git add .', output: '' },
              { command: 'git commit -m "Create dashboard layout"', output: '[feature/dashboard mno2345] Create dashboard layout\n 4 files changed, 211 insertions(+), 0 deletions(-)' },
              { command: 'git push origin feature/dashboard', output: 'Counting objects: 9, done.\nDelta compression using up to 4 threads.\nCompressing objects: 100% (7/7), done.\nWriting objects: 100% (9/9), 1.84 KiB | 1.84 MiB/s, done.\nTotal 9 (delta 1), reused 0 (delta 0)\nTo github.com:user/repo.git\n   pqr6789..stu0123  feature/dashboard -> feature/dashboard' }
            ]}
          />
          
          <p className="mt-4 mb-4">
            When features are complete, they are merged into develop, often through Pull Requests, which allow for code review:
          </p>
          
          <p className="mb-2"><strong>Developer A</strong> creates a PR to merge feature/profile into develop</p>
          <p className="mb-2"><strong>Developer B</strong> creates a PR to merge feature/dashboard into develop</p>
          
          <p className="mb-4 mt-4">
            After review, both features are merged into develop:
          </p>
          
          <TerminalSimulator 
            commands={[
              { command: 'git checkout develop', output: 'Switched to branch \'develop\'\nYour branch is up to date with \'origin/develop\'.' },
              { command: 'git pull', output: 'remote: Enumerating objects: 17, done.\nremote: Counting objects: 100% (17/17), done.\nremote: Compressing objects: 100% (10/10), done.\nremote: Total 17 (delta 7), reused 17 (delta 7), pack-reused 0\nUnpacking objects: 100% (17/17), done.\nFrom github.com:user/repo\n   abc7890..vwx4567  develop     -> origin/develop\nUpdating abc7890..vwx4567\nFast-forward\n 7 files changed, 358 insertions(+), 0 deletions(-)\n ...' }
            ]}
          />
          
          <div className="flex justify-between mt-6">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('hotfix/1.0.1');
                onPrevStep();
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            <button 
              className="bg-[#0366D6] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('feature/profile');
                onNextStep();
              }}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </>
      ),
    },
    // Step 6: Practice Scenarios
    {
      title: 'Practice Scenarios',
      content: (
        <>
          <p className="mb-4">
            Now that you understand the Git Flow model, let's practice with common scenarios you might encounter:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">Scenario 1: Starting a New Feature</h3>
            <p className="mb-2">You need to implement a new notification system. Create a feature branch and make your first commit.</p>
            <div className="bg-white p-3 rounded mt-2">
              <pre className="text-sm">
                <code>
                  $ git checkout develop<br/>
                  $ git pull<br/>
                  $ git checkout -b feature/notifications<br/>
                  # Make changes...<br/>
                  $ git add .<br/>
                  $ git commit -m "Add notification component"<br/>
                  $ git push -u origin feature/notifications
                </code>
              </pre>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">Scenario 2: Handling Merge Conflicts</h3>
            <p className="mb-2">Your feature branch has conflicts with develop. Resolve them:</p>
            <div className="bg-white p-3 rounded mt-2">
              <pre className="text-sm">
                <code>
                  $ git checkout develop<br/>
                  $ git pull<br/>
                  $ git checkout feature/notifications<br/>
                  $ git merge develop<br/>
                  # Conflict in src/App.jsx<br/>
                  # Edit file to resolve conflict<br/>
                  $ git add src/App.jsx<br/>
                  $ git commit -m "Resolve merge conflicts with develop"<br/>
                  $ git push origin feature/notifications
                </code>
              </pre>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">Scenario 3: Creating a Release</h3>
            <p className="mb-2">Prepare a release for version 2.0:</p>
            <div className="bg-white p-3 rounded mt-2">
              <pre className="text-sm">
                <code>
                  $ git checkout develop<br/>
                  $ git checkout -b release/2.0<br/>
                  # Update version numbers<br/>
                  $ git add .<br/>
                  $ git commit -m "Bump version to 2.0"<br/>
                  $ git push -u origin release/2.0<br/>
                  # Fix minor bugs<br/>
                  $ git add .<br/>
                  $ git commit -m "Fix layout issue on mobile"<br/>
                  $ git push origin release/2.0
                </code>
              </pre>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">Scenario 4: Hotfix Production Issue</h3>
            <p className="mb-2">Fix a critical bug in production:</p>
            <div className="bg-white p-3 rounded mt-2">
              <pre className="text-sm">
                <code>
                  $ git checkout main<br/>
                  $ git checkout -b hotfix/2.0.1<br/>
                  # Fix the critical bug<br/>
                  $ git add .<br/>
                  $ git commit -m "Fix authentication bypass vulnerability"<br/>
                  $ git push -u origin hotfix/2.0.1<br/>
                  # After approval<br/>
                  $ git checkout main<br/>
                  $ git merge --no-ff hotfix/2.0.1<br/>
                  $ git tag -a v2.0.1 -m "Version 2.0.1"<br/>
                  $ git push origin main --tags<br/>
                  $ git checkout develop<br/>
                  $ git merge --no-ff hotfix/2.0.1<br/>
                  $ git push origin develop
                </code>
              </pre>
            </div>
          </div>
          
          <p className="mb-4">
            These practice scenarios cover common Git Flow situations. Try them in your own repositories to get comfortable with the workflow!
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <h3 className="font-semibold text-lg mb-2">Pro Tips</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use <code>git log --graph --oneline --all</code> to visualize your branch structure</li>
              <li>Consider using tools like GitKraken, Sourcetree, or GitLens for a more visual Git experience</li>
              <li>For larger teams, establish clear guidelines for branch naming and PR requirements</li>
              <li>Automate your Git Flow with tools like GitHub Actions or GitLab CI/CD</li>
              <li>Practice with a sample repository before using Git Flow on production projects</li>
            </ul>
          </div>
          
          <div className="flex justify-between mt-6">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setCurrentBranch('feature/profile');
                onPrevStep();
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            <button 
              className="bg-[#0366D6] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => setCurrentBranch('develop')}
            >
              Complete Tutorial
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{tutorialContent[currentStep].title}</h3>
      {tutorialContent[currentStep].content}
    </div>
  );
};