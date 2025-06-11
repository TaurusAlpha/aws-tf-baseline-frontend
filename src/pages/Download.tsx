import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface DownloadProps {
  downloadUrl: string;
  onStartNew: () => void;
}

const Download: React.FC<DownloadProps> = ({ downloadUrl, onStartNew }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card title="🎉 Your Configuration is Ready!">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Configuration Generated Successfully
            </h2>
            <p className="text-gray-600">
              Your Terraform baseline configuration is ready for download
            </p>
          </div>
          
          <Button size="lg" className="mb-8">
            <a href={downloadUrl} download className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download ZIP File
            </a>
          </Button>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">📋 Next Steps</h3>
          <ol className="text-blue-800 space-y-2 text-sm">
            <li>1. <strong>Extract the ZIP file</strong> to your desired directory</li>
            <li>2. <strong>Install Terraform</strong> if you haven't already (terraform.io)</li>
            <li>3. <strong>Configure AWS credentials</strong> using AWS CLI or environment variables</li>
            <li>4. <strong>Run terraform init</strong> to initialize the configuration</li>
            <li>5. <strong>Run terraform plan</strong> to review what will be created</li>
            <li>6. <strong>Run terraform apply</strong> to deploy your infrastructure</li>
          </ol>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">📁 What's in your ZIP file:</h3>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• <code>main.tf</code> - Main Terraform configuration</li>
            <li>• <code>variables.tf</code> - Input variables</li>
            <li>• <code>outputs.tf</code> - Resource outputs</li>
            <li>• <code>README.md</code> - Detailed setup instructions</li>
            <li>• Module directories with AWS resources</li>
          </ul>
        </div>
        
        <div className="text-center">
          <Button variant="outline" onClick={onStartNew}>
            Create Another Configuration
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Download;
