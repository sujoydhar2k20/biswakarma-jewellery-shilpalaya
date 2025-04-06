
// This file now serves as a re-export of all services
// Import all specific services
import * as bannerService from './bannerService';
import * as collectionService from './collectionService';
import * as featuredCollectionService from './featuredCollectionService';
import * as testimonialService from './testimonialService';
import * as reviewService from './reviewService';
import * as aboutService from './aboutService';
import * as paymentService from './paymentService';
import * as footerService from './footerService';
import * as uploadService from './uploadService';
import * as exportService from './exportService';

// Export all services
export {
  bannerService,
  collectionService,
  featuredCollectionService,
  testimonialService,
  reviewService,
  aboutService,
  paymentService,
  footerService,
  uploadService,
  exportService
};

// Re-export all individual functions for backward compatibility
export const {
  fetchHeroBanners,
  saveHeroBanner,
  deleteHeroBanner
} = bannerService;

export const {
  fetchCollections,
  saveCollection,
  deleteCollection
} = collectionService;

export const {
  fetchFeaturedCollections,
  saveFeaturedCollection,
  deleteFeaturedCollection
} = featuredCollectionService;

export const {
  fetchTestimonials,
  saveTestimonial,
  deleteTestimonial
} = testimonialService;

export const {
  fetchReviews,
  saveReview,
  deleteReview
} = reviewService;

export const {
  fetchAboutSection,
  saveAboutSection
} = aboutService;

export const {
  fetchPaymentMethods,
  savePaymentMethod,
  deletePaymentMethod,
  fetchPaymentSection,
  savePaymentSection
} = paymentService;

export const {
  fetchFooterContent,
  saveFooterContent
} = footerService;

export const {
  uploadFile
} = uploadService;

export const {
  exportWebsiteData
} = exportService;
