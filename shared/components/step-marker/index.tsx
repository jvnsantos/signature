'use client';
import { useGlobalContext } from "@/shared/context/global-context";

interface StepsIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepsIndicator = ({ steps, currentStep }: StepsIndicatorProps) => {
  const { showHeader } = useGlobalContext();
  let _step = 0
  if (!showHeader) return null;


  if (currentStep === 0) return null

  switch (currentStep) {
    case 1:
      _step = 0
      break
    case 3:
      _step = 1
      break
    case 4:
      _step = 2
      break
    case 6:
      _step = 3
      break

    default:
      _step = currentStep
      break;
  }
  return (
    <div className="steps-indicator">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === _step ? 'active' : ''}`}
        >
          {index === _step && <span className="step-label">{step}</span>}
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;
