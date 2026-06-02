'use client';

import LeadRequestProvider from '@/components/providers/LeadRequestProvider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <LeadRequestProvider>{children}</LeadRequestProvider>;
}
