import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainImportPage1 from "./ImportPage1/MainImportPage1";

const ImportData: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    if (currentStep === 1) {
      navigate('/onboarding/connect-tools');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    console.log("Onboarding import data step skipped");
    navigate('/onboarding/connect-tools');
  };

  return (
    <div className="h-screen overflow-hidden">
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
