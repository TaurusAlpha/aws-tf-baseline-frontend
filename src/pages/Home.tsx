import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface HomeProps {
  onStartConfiguration: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartConfiguration }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AWS Terraform Baseline Generator
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Generate production-ready AWS infrastructure configurations with best practices built-in
        </p>
        <Button 
          size="lg" 
          onClick={onStartConfiguration}
          className="mb-12"
        >
          Start Configuration
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card title="🚀 Quick Setup">
          <p className="text-gray-600">
            Get started in minutes with our guided wizard. No Terraform expertise required.
          </p>
        </Card>
        
        <Card title="🏗️ Best Practices">
          <p className="text-gray-600">
            Pre-configured modules following AWS Well-Architected Framework principles.
          </p>
        </Card>
        
        <Card title="📦 Ready to Deploy">
          <p className="text-gray-600">
            Download complete Terraform configurations ready for your infrastructure.
          </p>
        </Card>
      </div>

      <Card title="What You'll Get">
        <ul className="text-left text-gray-600 space-y-2">
          <li>• Complete Terraform configuration files</li>
          <li>• AWS modules for VPC, security groups, and more</li>
          <li>• Documentation and deployment instructions</li>
          <li>• Best practice security configurations</li>
        </ul>
      </Card>
    </div>
  );
};

export default Home;
