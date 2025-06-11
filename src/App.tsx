import React, { useState } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import ConfigWizard from './pages/ConfigWizard'
import Review from './pages/Review'
import Download from './pages/Download'

type AppState = 'home' | 'wizard' | 'review' | 'download';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('home');
  const [config, setConfig] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleStartConfiguration = () => {
    setCurrentView('wizard');
  };

  const handleWizardComplete = (wizardConfig: any) => {
    setConfig(wizardConfig);
    setCurrentView('review');
  };

  const handleWizardBack = () => {
    setCurrentView('home');
  };

  const handleReviewBack = () => {
    setCurrentView('wizard');
  };

  const handleGenerate = async (finalConfig: any) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`${import.meta.env.VITE_API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalConfig),
      });
      
      if (response.ok) {
        const data = await response.json();
        setDownloadUrl(data.downloadUrl);
        setCurrentView('download');
      } else {
        throw new Error('Failed to generate configuration');
      }
    } catch (error) {
      console.error('Error generating configuration:', error);
      // TODO: Add proper error handling UI
      alert('Failed to generate configuration. Please try again.');
    }
  };

  const handleStartNew = () => {
    setConfig(null);
    setDownloadUrl('');
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home onStartConfiguration={handleStartConfiguration} />;
      case 'wizard':
        return (
          <ConfigWizard
            onComplete={handleWizardComplete}
            onBack={handleWizardBack}
          />
        );
      case 'review':
        return (
          <Review
            config={config}
            onBack={handleReviewBack}
            onGenerate={handleGenerate}
          />
        );
      case 'download':
        return (
          <Download
            downloadUrl={downloadUrl}
            onStartNew={handleStartNew}
          />
        );
      default:
        return <Home onStartConfiguration={handleStartConfiguration} />;
    }
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  )
}

export default App
