'use client';

import { useEffect, memo } from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd = memo(function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [data]);
  
  return null;
}); 