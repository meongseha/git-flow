import React, { useState } from "react";
import { GitFlowVisualization } from "./GitFlowVisualization";
import { TutorialSteps } from "./TutorialSteps";
import { CommandReference } from "./CommandReference";
import { DeveloperSimulation } from "./DeveloperSimulation";

export const TutorialContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBranch, setCurrentBranch] = useState("main");

  const steps = [
    { id: "intro", title: "Introduction to Git Flow" },
    { id: "main-develop", title: "Main and Develop Branches" },
    { id: "feature", title: "Feature Branches" },
    { id: "release", title: "Release Branches" },
    { id: "hotfix", title: "Hotfix Branches" },
    { id: "collaboration", title: "Collaborative Workflow" },
    { id: "practice", title: "Practice Scenarios" },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
      <div className="col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4" id="tutorial">
            Tutorial Steps
          </h2>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleSelectStep(index)}
                className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                  currentStep === index
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mr-3 text-gray-700 dark:text-gray-100 font-semibold">
                    {index + 1}
                  </span>
                  {step.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mt-4 sm:mt-6">
          <h2 className="text-xl font-semibold mb-4" id="reference">
            Command Reference
          </h2>
          <CommandReference currentStep={currentStep} />
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6 overflow-x-auto"
          id="visualization"
        >
          <h2 className="text-xl font-semibold mb-4">Git Flow Visualization</h2>
          <GitFlowVisualization
            currentStep={currentStep}
            currentBranch={currentBranch}
          />
        </div>

        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6"
          id="practice"
        >
          <h2 className="text-xl font-semibold mb-4">Tutorial Content</h2>
          <TutorialSteps
            currentStep={currentStep}
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            setCurrentBranch={setCurrentBranch}
          />
        </div>

        {currentStep >= 5 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mt-4 sm:mt-6">
            <h2 className="text-xl font-semibold mb-4">Developer Simulation</h2>
            <DeveloperSimulation />
          </div>
        )}
      </div>
    </div>
  );
};
