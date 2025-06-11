import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface ReviewProps {
  config: any;
  onBack: () => void;
  onGenerate: (config: any) => void;
}

const Review: React.FC<ReviewProps> = ({ config, onBack, onGenerate }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await onGenerate(config);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card title="Review Your Configuration">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Project Type</h3>
            <p className="text-gray-600 capitalize">
              {config.projectType?.replace('-', ' ')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Selected Modules</h3>
            <div className="grid grid-cols-2 gap-2">
              {config.selectedModules.map((moduleId: string) => (
                <div key={moduleId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {moduleId.replace('-', ' ').toUpperCase()}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Configuration</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Region:</strong> {config.configuration.region}</p>
              <p><strong>Naming Prefix:</strong> {config.configuration.namingPrefix}</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">What happens next?</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• We'll generate your Terraform configuration files</li>
              <li>• A ZIP file will be created with all necessary files</li>
              <li>• You'll receive instructions for deployment</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to Edit
          </Button>
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="min-w-32"
          >
            {isGenerating ? 'Generating...' : 'Generate ZIP'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Review;
