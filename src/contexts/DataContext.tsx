
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchHeroBanners, fetchCollections, fetchFeaturedCollections, fetchTestimonials, fetchAboutSection, fetchFooterContent } from '@/services/supabaseService';

// Create context
const DataContext = createContext(null);

// Data provider component
export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    heroBanners: [],
    collections: [],
    featuredCollections: [],
    testimonials: [],
    aboutSection: null,
    footerContent: {}
  });
  
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [
        heroBanners,
        collections,
        featuredCollections,
        testimonials,
        aboutSection,
        footerContent
      ] = await Promise.all([
        fetchHeroBanners(),
        fetchCollections(),
        fetchFeaturedCollections(),
        fetchTestimonials(),
        fetchAboutSection(),
        fetchFooterContent()
      ]);
      
      setData({
        heroBanners,
        collections,
        featuredCollections,
        testimonials,
        aboutSection,
        footerContent
      });
    } catch (error) {
      console.error('Error loading website data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);
  
  return (
    <DataContext.Provider value={{ ...data, isLoading, refreshData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for using the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Wrap the App with this provider in the root component
