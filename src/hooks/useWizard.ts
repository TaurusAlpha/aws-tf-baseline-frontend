import { useState } from 'react';

export interface WizardConfig {
  projectType: 'single-account' | 'multi-account' | null;
  selectedModules: string[];
  configuration: {
    region: string;
    namingPrefix: string;
  };
}

export const useWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<WizardConfig>({
    projectType: null,
    selectedModules: [],
    configuration: {
      region: 'us-east-1',
      namingPrefix: ''
    }
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(1, prev - 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const updateConfig = (updates: Partial<WizardConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const updateModules = (moduleId: string, selected: boolean) => {
    setConfig(prev => ({
      ...prev,
      selectedModules: selected
        ? [...prev.selectedModules, moduleId]
        : prev.selectedModules.filter(id => id !== moduleId)
    }));
  };

  const updateConfiguration = (key: keyof WizardConfig['configuration'], value: string) => {
    setConfig(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        [key]: value
      }
    }));
  };

  return {
    currentStep,
    config,
    nextStep,
    prevStep,
    goToStep,
    updateConfig,
    updateModules,
    updateConfiguration
  };
};
