'use client';

import { useEffect } from 'react';
import { initAnalytics } from '@/lib/firebase';

export default function FirebaseAnalytics() {
  useEffect(() => {
    const setupAnalytics = async () => {
      try {
        const analytics = await initAnalytics();
        if (analytics) {
          console.log('Firebase Analytics initialized successfully');
        }
      } catch (error) {
        console.error('Failed to initialize Firebase Analytics:', error);
      }
    };

    setupAnalytics();
  }, []);

  return null;
}