'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import { Button } from '@/components/ui/Button';

interface EnterButtonsProps {
  onEnter: () => void;
  className?: string;
  variant?: 'mobile' | 'desktop' | 'hero';
}

export default function EnterButtons({ onEnter, className = '', variant = 'mobile' }: EnterButtonsProps) {
  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col gap-3 w-full ${className}`}>
        <Button
          onClick={onEnter}
          size="lg"
          className="w-full"
        >
          ENTER
        </Button>
        <Link href="/auth/login">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            icon={() => <GoogleIcon />}
          >
            SIGN IN WITH GOOGLE
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === 'desktop') {
    return (
      <div className={`flex flex-col gap-3 items-end shrink-0 ${className}`}>
        <Button
          onClick={onEnter}
          size="lg"
          className="px-12"
        >
          ENTER
        </Button>
        <Link href="/auth/login">
          <Button
            variant="outline"
            size="md"
            icon={() => <GoogleIcon />}
          >
            SIGN IN WITH GOOGLE
          </Button>
        </Link>
      </div>
    );
  }

  // Hero variant
  return (
    <div className={`flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto ${className}`}>
      <Link href="/dashboard" className="flex-1 lg:flex-none">
        <Button size="xl" className="w-full">
          INITIALIZE SESSION
        </Button>
      </Link>
      <Link href="/auth/login" className="flex-1 lg:flex-none">
        <Button
          variant="outline"
          size="xl"
          className="w-full"
          icon={() => <GoogleIcon />}
        >
          SIGN IN WITH GOOGLE
        </Button>
      </Link>
    </div>
  );
}
