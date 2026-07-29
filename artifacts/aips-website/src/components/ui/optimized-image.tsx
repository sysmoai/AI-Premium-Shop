'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
}

/**
 * Optimized image component with Supabase CDN
 * Handles loading states and responsive sizing
 */
export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className,
  priority = false,
  sizes,
  objectFit = 'contain',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Default sizes for responsive images
  const defaultSizes = sizes || `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 90vw,
    (max-width: 1280px) 80vw,
    70vw
  `;

  if (error) {
    return (
      <div
        className={cn(
          'bg-gray-100 flex items-center justify-center text-gray-400',
          className
        )}
        style={{ aspectRatio: width / height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    );
  }

  if (fill) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          style={{ objectFit }}
          priority={priority}
          sizes={defaultSizes}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setError(true)}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className="relative" style={{ aspectRatio: width / height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300 w-full h-auto',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        priority={priority}
        sizes={defaultSizes}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setError(true)}
      />
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{ aspectRatio: width / height }}
        />
      )}
    </div>
  );
}

/**
 * Hero image component for banner sections
 */
export function HeroImage({
  src,
  alt,
  className,
}: Pick<OptimizedImageProps, 'src' | 'alt' | 'className'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      priority
      className={cn('object-cover', className)}
      objectFit="cover"
    />
  );
}

/**
 * Product thumbnail component
 */
export function ProductThumbnail({
  src,
  alt,
  className,
}: Pick<OptimizedImageProps, 'src' | 'alt' | 'className'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={300}
      height={300}
      className={cn('rounded-lg', className)}
    />
  );
}

/**
 * Product detail image component
 */
export function ProductImage({
  src,
  alt,
  className,
}: Pick<OptimizedImageProps, 'src' | 'alt' | 'className'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={600}
      className={cn('rounded-xl shadow-lg', className)}
    />
  );
}
