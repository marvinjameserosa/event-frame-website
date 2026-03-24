'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ── Photo data for the continuous streams ──
   Left stream flows top-to-bottom, right stream flows bottom-to-top.
   Each photo is a polaroid with a caption, slightly rotated. */

const LEFT_PHOTOS = [
  { src: '/hero/photo1.jpg',  caption: 'Friends forever' },
  { src: '/hero/photo9.jpg',  caption: 'Campfire nights' },
  { src: '/hero/photo3.jpg',  caption: 'Golden hour' },
  { src: '/hero/photo11.jpg', caption: 'Make a wish' },
  { src: '/hero/photo5.jpg',  caption: 'Party time' },
  { src: '/hero/photo13.jpg', caption: 'Festival vibes' },
  { src: '/hero/photo7.jpg',  caption: 'Celebrate!' },
];

const RIGHT_PHOTOS = [
  { src: '/hero/photo2.jpg',  caption: 'Say cheese!' },
  { src: '/hero/photo10.jpg', caption: 'Under the lights' },
  { src: '/hero/photo4.jpg',  caption: 'Memories' },
  { src: '/hero/photo12.jpg', caption: 'Adventure awaits' },
  { src: '/hero/photo6.jpg',  caption: 'City vibes' },
  { src: '/hero/photo14.jpg', caption: 'Cozy moments' },
  { src: '/hero/photo8.jpg',  caption: 'Snapshot' },
];

/* Deterministic rotation for each index */
const LEFT_ROTATIONS  = [-12, -6, -14, -4, -10, -8, -15];
const RIGHT_ROTATIONS = [12, 5, 14, 7, 10, 4, 13];

interface PolaroidProps {
  src: string;
  caption: string;
  rotate: number;
  parallaxOffset: number;
}

function Polaroid({ src, caption, rotate, parallaxOffset }: PolaroidProps) {
  return (
    <div
      className="flex-shrink-0 pointer-events-none select-none"
      style={{
        transform: `rotate(${rotate}deg) translateY(${parallaxOffset}px)`,
        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div
        className="rounded-sm overflow-hidden"
        style={{
          width: 160,
          background: '#f5f0e8',
          padding: '8px 8px 36px 8px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        <Image
          src={src}
          alt=""
          width={144}
          height={160}
          className="object-cover block"
          style={{
            width: 144,
            height: 160,
            filter: 'saturate(0.75) contrast(1.05) brightness(0.9)',
          }}
        />
        <p
          className="text-center mt-1.5 font-serif italic"
          style={{ fontSize: 10, color: '#8a7e6b', letterSpacing: '0.02em' }}
        >
          {caption}
        </p>
      </div>
    </div>
  );
}

export default function PhotoStream() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Subtle parallax per photo based on its index */
  const getParallax = (index: number, direction: 'left' | 'right') => {
    const speed = 0.015 + index * 0.008;
    return direction === 'left'
      ? scrollY * speed
      : scrollY * -speed;
  };

  return (
    <>
      {/* Left stream */}
      <div
        className="fixed top-0 left-0 z-10 hidden lg:flex flex-col items-center gap-6 py-8 pointer-events-none"
        style={{
          width: 180,
          height: '100vh',
          overflowY: 'clip',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex flex-col items-center gap-8"
          style={{
            transform: `translateY(${-scrollY * 0.06}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {/* Repeat photos to fill tall pages */}
          {[...LEFT_PHOTOS, ...LEFT_PHOTOS, ...LEFT_PHOTOS].map((photo, i) => (
            <Polaroid
              key={`left-${i}`}
              src={photo.src}
              caption={photo.caption}
              rotate={LEFT_ROTATIONS[i % LEFT_ROTATIONS.length]}
              parallaxOffset={getParallax(i % LEFT_PHOTOS.length, 'left')}
            />
          ))}
        </div>
      </div>

      {/* Right stream */}
      <div
        className="fixed top-0 right-0 z-10 hidden lg:flex flex-col items-center gap-6 py-8 pointer-events-none"
        style={{
          width: 180,
          height: '100vh',
          overflowY: 'clip',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex flex-col items-center gap-8"
          style={{
            transform: `translateY(${scrollY * 0.04}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {[...RIGHT_PHOTOS, ...RIGHT_PHOTOS, ...RIGHT_PHOTOS].map((photo, i) => (
            <Polaroid
              key={`right-${i}`}
              src={photo.src}
              caption={photo.caption}
              rotate={RIGHT_ROTATIONS[i % RIGHT_ROTATIONS.length]}
              parallaxOffset={getParallax(i % RIGHT_PHOTOS.length, 'right')}
            />
          ))}
        </div>
      </div>
    </>
  );
}
