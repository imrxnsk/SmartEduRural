import React from 'react';

const BrandLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <img src="/logo-animated.svg" alt="SmartEduRural" className="h-16 w-auto animate-pulse" />
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-start via-brand-mid to-brand-end opacity-30 blur animate-gradient-x" />
      </div>
      <p className="mt-4 text-sm text-gray-600">Loading SmartEduRural...</p>
    </div>
  );
};

export default BrandLoader;



