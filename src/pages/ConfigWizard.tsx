import React from 'react';
import { useWizard } from '../hooks/useWizard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Checkbox from '../components/ui/Checkbox';

interface ConfigWizardProps {
  onComplete: (config: any) => void;
  onBack: () => void;
}

const AWS_MODULES = [
  { id: 'vpc', name: 'VPC & Networking', description: 'Virtual Private Cloud with subnets and routing' },
  { id: 'security-groups', name: 'Security Groups', description: 'Network security and access control' },
  { id: 'ecs', name: 'ECS Cluster', description: 'Container orchestration service' },
  { id: 'cloudfront', name: 'CloudFront CDN', description: 'Content delivery network' },
  { id: 's3', name: 'S3 Buckets', description: 'Object storage with security policies' },
  { id: 'rds', name: 'RDS Database', description: 'Managed relational database' },
  { id: 'lambda', name: 'Lambda Functions', description: 'Serverless compute functions' },
  { id: 'api-gateway', name: 'API Gateway', description: 'RESTful API management' }
];

const ConfigWizard: React.FC<ConfigWizardProps> = ({ onComplete, onBack }) => {
  const { currentStep, config, nextStep, prevStep, updateConfig, updateModules, updateConfiguration } = useWizard();

  const renderStep1 = () => (
    <Card title="Step 1: Choose Project Type">
      <div className="space-y-4">
        <div 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            config.projectType === 'single-account' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => updateConfig({ projectType: 'single-account' })}
        >
          <h3 className="font-semibold">Single Account</h3>
          <p className="text-gray-600">Deploy infrastructure in a single AWS account</p>
        </div>
        
        <div 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            config.projectType === 'multi-account' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => updateConfig({ projectType: 'multi-account' })}
        >
          <h3 className="font-semibold">Multi Account</h3>
          <p className="text-gray-600">Set up infrastructure across multiple AWS accounts</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button 
          onClick={nextStep}
          disabled={!config.projectType}
        >
          Next
        </Button>
      </div>
    </Card>
  );

  const renderStep2 = () => (
    <Card title="Step 2: Select AWS Modules">
      <div className="space-y-4 mb-6">
        {AWS_MODULES.map(module => (
          <Checkbox
            key={module.id}
            label={module.name}
            description={module.description}
            checked={config.selectedModules.includes(module.id)}
            onChange={(checked) => updateModules(module.id, checked)}
          />
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> VPC & Security Groups are recommended for most deployments
        </p>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button 
          onClick={nextStep}
          disabled={config.selectedModules.length === 0}
        >
          Next
        </Button>
      </div>
    </Card>
  );

  const renderStep3 = () => (
    <Card title="Step 3: Configuration Options">
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            AWS Region
          </label>
          <select 
            value={config.configuration.region}
            onChange={(e) => updateConfiguration('region', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="us-east-1">US East (N. Virginia) - us-east-1</option>
            <option value="us-west-2">US West (Oregon) - us-west-2</option>
            <option value="eu-west-1">Europe (Ireland) - eu-west-1</option>
            <option value="ap-southeast-1">Asia Pacific (Singapore) - ap-southeast-1</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Naming Prefix
          </label>
          <input
            type="text"
            value={config.configuration.namingPrefix}
            onChange={(e) => updateConfiguration('namingPrefix', e.target.value)}
            placeholder="e.g., mycompany-prod"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-600 mt-1">
            This prefix will be added to all resource names
          </p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button 
          onClick={() => onComplete(config)}
          disabled={!config.configuration.namingPrefix}
        >
          Review Configuration
        </Button>
      </div>
    </Card>
  );

  const steps = [renderStep1, renderStep2, renderStep3];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && <div className="w-12 h-0.5 bg-gray-300 mx-2" />}
            </div>
          ))}
        </div>
      </div>
      
      {steps[currentStep - 1]()}
    </div>
  );
};

export default ConfigWizard;
