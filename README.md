
# Website CMS with cPanel Hosting Guide

This repository contains a React-based jewelry website with a complete content management system (CMS) built with Supabase as the backend. This document provides instructions on how to export your website data and host it on cPanel.

## Features

- Complete CMS dashboard with authentication
- Manage hero banners, collections, featured items, testimonials and more
- Export functionality for easy migration to any hosting environment
- Integrated with Supabase for data storage and file management

## Exporting Data for cPanel Hosting

1. Navigate to the Export page in the dashboard
2. Click the "Export Website Data" button to download a JSON file containing all your website data
3. This file will be used to import your data into a new hosting environment

## Setting up on cPanel Hosting

### Step 1: Prepare Your Environment

1. Sign in to your cPanel account
2. Create a new database from MySQL Databases
3. Create or assign a user to the database with all privileges

### Step 2: Upload Files

1. Navigate to File Manager in cPanel
2. Go to the public_html directory (or a subdirectory if you're not hosting on the root domain)
3. Upload the build files of your React application
   - If you have a ZIP file, upload it and then extract it
4. Create a `.env` file with your database credentials and Supabase configuration

### Step 3: Configure PHP and Database

1. Go to phpMyAdmin in cPanel
2. Select the database you created
3. Click on the Import tab
4. Upload and import your database schema
5. Upload your exported JSON data using the import functionality

### Step 4: Configure Supabase

1. Create a Supabase project if you haven't already
2. Set up the same tables and structures as in the exported data
3. Update the Supabase URL and API key in your application configuration

### Step 5: Test Your Website

1. Open your website URL
2. Verify that all content is loading correctly
3. Check the admin section to ensure you can log in and manage content

## Troubleshooting

If you encounter issues with your cPanel hosting:

1. Check the server error logs in cPanel
2. Verify that all database connections are properly configured
3. Ensure that file permissions are set correctly (typically 755 for directories and 644 for files)
4. Confirm that your .htaccess file is properly configured for a React single-page application

## Support

If you need further assistance, please contact our support team at support@example.com.
