import React, { useEffect, useState } from 'react';

interface Commit {
  id: string;
  message: string;
  branch: string;
  position: number;
}

interface Branch {
  name: string;
  color: string;
  basedOn: string;
  startPosition: number;
  endPosition?: number;
}

interface GitFlowVisualizationProps {
  currentStep: number;
  currentBranch: string;
}

export const GitFlowVisualization: React.FC<GitFlowVisualizationProps> = ({ 
  currentStep,
  currentBranch
}) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  
  // Setup initial state based on current step
  useEffect(() => {
    // Reset state for each step
    let newBranches: Branch[] = [];
    let newCommits: Commit[] = [];
    
    // Initial commit always exists
    newCommits.push({
      id: '1a2b3c4',
      message: 'Initial commit',
      branch: 'main',
      position: 0
    });
    
    // Main branch always exists
    newBranches.push({
      name: 'main',
      color: 'var(--color-main)',
      basedOn: '',
      startPosition: 0
    });
    
    // Step-specific changes
    if (currentStep >= 1) {
      // Add develop branch
      newBranches.push({
        name: 'develop',
        color: 'var(--color-develop)',
        basedOn: 'main',
        startPosition: 0
      });
      
      newCommits.push({
        id: '2d3e4f5',
        message: 'Setup development environment',
        branch: 'develop',
        position: 1
      });
    }
    
    if (currentStep >= 2) {
      // Add feature branch
      newBranches.push({
        name: 'feature/login',
        color: 'var(--color-feature)',
        basedOn: 'develop',
        startPosition: 1
      });
      
      newCommits.push({
        id: '3g4h5i6',
        message: 'Add login form',
        branch: 'feature/login',
        position: 2
      });
      
      newCommits.push({
        id: '4j5k6l7',
        message: 'Implement authentication',
        branch: 'feature/login',
        position: 3
      });
      
      if (currentStep >= 3) {
        // Feature complete and merged to develop
        newCommits.push({
          id: '5m6n7o8',
          message: 'Merge feature/login into develop',
          branch: 'develop',
          position: 4
        });
        
        newBranches = newBranches.map(branch => 
          branch.name === 'feature/login' 
            ? {...branch, endPosition: 3} 
            : branch
        );
      }
    }
    
    if (currentStep >= 3) {
      // Add release branch
      newBranches.push({
        name: 'release/1.0',
        color: 'var(--color-release)',
        basedOn: 'develop',
        startPosition: 4
      });
      
      newCommits.push({
        id: '6p7q8r9',
        message: 'Version bump to 1.0',
        branch: 'release/1.0',
        position: 5
      });
      
      newCommits.push({
        id: '7s8t9u0',
        message: 'Fix release bugs',
        branch: 'release/1.0',
        position: 6
      });
      
      if (currentStep >= 4) {
        // Release complete and merged to main and develop
        newCommits.push({
          id: '8v9w0x1',
          message: 'Merge release/1.0 into main',
          branch: 'main',
          position: 7
        });
        
        newCommits.push({
          id: '9y0z1a2',
          message: 'Merge release/1.0 back into develop',
          branch: 'develop',
          position: 8
        });
        
        newBranches = newBranches.map(branch => 
          branch.name === 'release/1.0' 
            ? {...branch, endPosition: 6} 
            : branch
        );
      }
    }
    
    if (currentStep >= 4) {
      // Add hotfix branch
      newBranches.push({
        name: 'hotfix/1.0.1',
        color: 'var(--color-hotfix)',
        basedOn: 'main',
        startPosition: 7
      });
      
      newCommits.push({
        id: '0b1c2d3',
        message: 'Fix critical security issue',
        branch: 'hotfix/1.0.1',
        position: 9
      });
      
      if (currentStep >= 5) {
        // Hotfix complete and merged to main and develop
        newCommits.push({
          id: '1e2f3g4',
          message: 'Merge hotfix/1.0.1 into main',
          branch: 'main',
          position: 10
        });
        
        newCommits.push({
          id: '2h3i4j5',
          message: 'Merge hotfix/1.0.1 back into develop',
          branch: 'develop',
          position: 11
        });
        
        newBranches = newBranches.map(branch => 
          branch.name === 'hotfix/1.0.1' 
            ? {...branch, endPosition: 9} 
            : branch
        );
      }
    }
    
    if (currentStep >= 5) {
      // Add collaborative feature branches
      newBranches.push({
        name: 'feature/profile',
        color: 'var(--color-feature)',
        basedOn: 'develop',
        startPosition: 11
      });
      
      newBranches.push({
        name: 'feature/dashboard',
        color: 'var(--color-feature)',
        basedOn: 'develop',
        startPosition: 11
      });
      
      newCommits.push({
        id: '3k4l5m6',
        message: 'Add user profile page',
        branch: 'feature/profile',
        position: 12
      });
      
      newCommits.push({
        id: '4n5o6p7',
        message: 'Create dashboard layout',
        branch: 'feature/dashboard',
        position: 13
      });
      
      newCommits.push({
        id: '5q6r7s8',
        message: 'Implement profile settings',
        branch: 'feature/profile',
        position: 14
      });
      
      newCommits.push({
        id: '6t7u8v9',
        message: 'Add dashboard widgets',
        branch: 'feature/dashboard',
        position: 15
      });
      
      if (currentStep >= 6) {
        // Features complete and merged to develop
        newCommits.push({
          id: '7w8x9y0',
          message: 'Merge feature/profile into develop',
          branch: 'develop',
          position: 16
        });
        
        newCommits.push({
          id: '8z9a0b1',
          message: 'Merge feature/dashboard into develop',
          branch: 'develop',
          position: 17
        });
        
        newBranches = newBranches.map(branch => {
          if (branch.name === 'feature/profile') return {...branch, endPosition: 14};
          if (branch.name === 'feature/dashboard') return {...branch, endPosition: 15};
          return branch;
        });
        
        // Start new release
        newBranches.push({
          name: 'release/2.0',
          color: 'var(--color-release)',
          basedOn: 'develop',
          startPosition: 17
        });
        
        newCommits.push({
          id: '9c0d1e2',
          message: 'Version bump to 2.0',
          branch: 'release/2.0',
          position: 18
        });
      }
    }
    
    setCommits(newCommits);
    setBranches(newBranches);
  }, [currentStep]);
  
  const getCommitPosition = (commit: Commit, branchIndex: number) => {
    const xOffset = 50 + branchIndex * 80;
    const yOffset = 40 + commit.position * 60;
    return { x: xOffset, y: yOffset };
  };
  
  // Function to draw branch lines
  const renderBranchLines = () => {
    return branches.map((branch, index) => {
      const startCommit = commits.find(c => c.position === branch.startPosition);
      const endCommit = branch.endPosition 
        ? commits.find(c => c.position === branch.endPosition)
        : null;
      
      if (!startCommit) return null;
      
      const startBranch = branches.findIndex(b => b.name === branch.basedOn);
      const startPos = getCommitPosition(startCommit, startBranch >= 0 ? startBranch : 0);
      const endPos = endCommit 
        ? getCommitPosition(endCommit, index)
        : { x: 50 + index * 80, y: 40 + Math.max(...commits.map(c => c.position)) * 60 + 60 };
        
      // Draw vertical line
      return (
        <React.Fragment key={`branch-${branch.name}`}>
          <line 
            x1={startPos.x} 
            y1={startPos.y} 
            x2={50 + index * 80} 
            y2={startPos.y} 
            stroke={branch.color} 
            strokeWidth={2} 
            className="branch-line"
          />
          <line 
            x1={50 + index * 80} 
            y1={startPos.y} 
            x2={50 + index * 80} 
            y2={endPos.y} 
            stroke={branch.color} 
            strokeWidth={2} 
            className="branch-line"
          />
          
          {/* Branch label */}
          <text 
            x={50 + index * 80} 
            y={20} 
            textAnchor="middle" 
            fill={branch.color}
            fontWeight="500"
            fontSize="12"
            transform={`rotate(-30, ${50 + index * 80}, 20)`}
          >
            {branch.name}
          </text>
          
          {/* Branch end (if applicable) */}
          {endCommit && (
            <line 
              x1={50 + index * 80} 
              y1={endPos.y} 
              x2={endPos.x} 
              y2={endPos.y} 
              stroke={branch.color} 
              strokeWidth={2} 
              strokeDasharray="4"
              className="branch-line"
            />
          )}
        </React.Fragment>
      );
    });
  };
  
  // Function to render commit nodes
  const renderCommits = () => {
    return commits.map(commit => {
      const branchIndex = branches.findIndex(b => b.name === commit.branch);
      if (branchIndex < 0) return null;
      
      const pos = getCommitPosition(commit, branchIndex);
      const isCurrentBranch = commit.branch === currentBranch;
      
      return (
        <g key={commit.id} className="commit-node">
          <circle 
            cx={pos.x} 
            cy={pos.y} 
            r={isCurrentBranch ? 10 : 8} 
            fill={isCurrentBranch ? branches[branchIndex].color : 'white'} 
            stroke={branches[branchIndex].color} 
            strokeWidth={2}
          />
          
          <text 
            x={pos.x + 15} 
            y={pos.y - 10} 
            textAnchor="start" 
            fill="#333"
            fontWeight="500"
            fontSize="12"
          >
            {commit.id.substring(0, 7)}
          </text>
          
          <text 
            x={pos.x + 15} 
            y={pos.y + 5} 
            textAnchor="start" 
            fill="#666"
            fontSize="11"
          >
            {commit.message}
          </text>
        </g>
      );
    });
  };
  
  const svgHeight = Math.max(...commits.map(c => c.position)) * 60 + 100;
  const svgWidth = 50 + branches.length * 80 + 300;
  
  return (
    <div className="w-full overflow-auto" style={{ maxHeight: '500px' }}>
      <svg width={svgWidth} height={svgHeight} style={{ minWidth: '100%' }}>
        {renderBranchLines()}
        {renderCommits()}
      </svg>
    </div>
  );
};