'use client';

import { useLeadRequest } from '@/components/providers/LeadRequestProvider';
import type { OpenLeadRequestOptions } from '@/components/providers/LeadRequestProvider';

interface LeadRequestTriggerProps extends OpenLeadRequestOptions {
  children: React.ReactNode;
  className?: string;
}

export default function LeadRequestTrigger({
  children,
  className = '',
  ...options
}: LeadRequestTriggerProps) {
  const { openLeadRequest } = useLeadRequest();

  return (
    <button
      type="button"
      onClick={() => openLeadRequest(options)}
      className={className}
    >
      {children}
    </button>
  );
}
