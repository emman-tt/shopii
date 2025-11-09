import { useState } from 'react'

function ImageWithShimmer ({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className='relative w-full h-full'>
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 shimmer rounded bg-[#d6d3d3ee] animate-pulse ${className}`}
        />
      )}

      <img
        src={src}
        alt={alt}
        loading='lazy'
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700'>
          <span className='text-gray-500'>Failed to load</span>
        </div>
      )}
    </div>
  )
}

export default ImageWithShimmer
