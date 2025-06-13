import React, { useState } from 'react';
import { databaseService } from '../services/databaseService';

export const DatabaseDebug: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing connection...');
    
    try {
      const config = databaseService.getConfig();
      console.log('Current Atlas Config:', config);
      
      if (!databaseService.isConfigured()) {
        setTestResult('❌ Configuration Error: Missing environment variables. Check your .env file.');
        return;
      }
      
      const result = await databaseService.testConnection();
      if (result) {
        setTestResult('✅ Connection successful! Atlas Data API is working.');
      } else {
        setTestResult('❌ Connection failed. Check your API key and cluster name.');
      }
    } catch (error) {
      console.error('Connection test error:', error);
      setTestResult(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const config = databaseService.getConfig();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-8">
      <h3 className="text-lg font-semibold mb-4">MongoDB Atlas Debug</h3>
      
      <div className="space-y-3 text-sm">
        <div>
          <strong>App ID:</strong> {config.appId || '❌ Missing'}
        </div>
        <div>
          <strong>API Key:</strong> {config.apiKey ? '✅ Set' : '❌ Missing'}
        </div>
        <div>
          <strong>Cluster:</strong> {config.clusterName || '❌ Missing'}
        </div>
        <div>
          <strong>Database:</strong> {config.databaseName || '❌ Missing'}
        </div>
        <div>
          <strong>Configured:</strong> {databaseService.isConfigured() ? '✅ Yes' : '❌ No'}
        </div>
      </div>

      <button
        onClick={testConnection}
        disabled={isLoading}
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test Connection'}
      </button>

      {testResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          {testResult}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-600">
        <p>Open browser console for detailed logs.</p>
        <p>Remove this component when Atlas is working.</p>
      </div>
    </div>
  );
};