import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
}

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index < currentStep
                  ? "bg-green-600 text-white"
                  : index === currentStep
                  ? "bg-[#FF9900] text-black"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                index <= currentStep ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mx-3 ${
                index < currentStep ? "bg-green-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
