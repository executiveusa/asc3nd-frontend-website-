'use client';

import { SmoothScrollProvider } from '../components/SmoothScrollProvider';

export default function RootLayoutClient({ children }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
