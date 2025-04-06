
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileDown } from "lucide-react";
import { exportWebsiteData } from '@/services/supabaseService';

const ExportPage = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportWebsiteData();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Export Website Data</h1>
      </div>
      
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-medium mb-4">Export Data for cPanel Hosting</h2>
              <p className="text-gray-600 mb-4">
                Export all your website data as a JSON file that you can use to restore your site on cPanel or any other hosting service.
              </p>
              <Button 
                size="lg" 
                onClick={handleExport} 
                disabled={isExporting}
                className="flex items-center gap-2"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {isExporting ? "Exporting..." : "Export Website Data"}
              </Button>
            </div>
            
            <div className="border-t md:border-l md:border-t-0 pt-4 md:pt-0 md:pl-6 flex-1">
              <h3 className="font-medium mb-3">How to use the exported data:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Export your website data using the button on the left</li>
                <li>Log in to your cPanel account</li>
                <li>Navigate to File Manager</li>
                <li>Upload your exported JSON file to your website's directory</li>
                <li>Import the data using your website's import functionality</li>
              </ol>
              
              <div className="bg-gray-50 p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  cPanel Setup Guide
                </h3>
                <p className="text-sm text-gray-600">
                  For detailed instructions on how to set up your website on cPanel, please follow our step-by-step tutorial below.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-medium mb-4">cPanel Hosting Setup Tutorial</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Step 1: Create a Database</h3>
                <p className="text-gray-600">
                  In your cPanel, navigate to the MySQL Databases section and create a new database. Make sure to note down the database name, username, and password.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Step 2: Upload Files</h3>
                <p className="text-gray-600">
                  Use the File Manager in cPanel or FTP to upload your website files to the public_html directory. Make sure to extract any ZIP files after uploading.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Step 3: Configure Environment</h3>
                <p className="text-gray-600">
                  Create or edit the .env file to include your database credentials and any other environment variables required by your application.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Step 4: Import Database</h3>
                <p className="text-gray-600">
                  Use phpMyAdmin to import your database schema and data. Alternatively, you can use the SQL import feature to run your database scripts.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Step 5: Configure Domain</h3>
                <p className="text-gray-600">
                  If you haven't already, set up your domain to point to your new hosting. This may involve updating DNS settings at your domain registrar.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md mt-6">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  If you need assistance with setting up your website on cPanel, our support team is available to help. Contact us for personalized guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExportPage;
