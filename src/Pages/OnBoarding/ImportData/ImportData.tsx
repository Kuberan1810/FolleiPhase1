import React, { useState } from "react";
import MainImportPage1 from "./ImportPage1/MainImportPage1";

const ImportData: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSkip = () => {
    console.log("Onboarding step skipped");
  };

  // Easily extensible as more import pages are added
  return (
    <div>
      {currentStep === 1 && (
        <MainImportPage1
          onNext={handleNextStep}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
};

export default ImportData;
