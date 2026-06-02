'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import LeadRequestModal, { type LeadRequestModalProps } from '@/components/ui/LeadRequestModal';
import type { LeadServiceValue } from '@/lib/lead-services';

export type OpenLeadRequestOptions = {
  title?: string;
  description?: string;
  defaultService?: LeadServiceValue;
  submitLabel?: string;
};

type LeadRequestContextValue = {
  openLeadRequest: (options?: OpenLeadRequestOptions) => void;
  closeLeadRequest: () => void;
};

const LeadRequestContext = createContext<LeadRequestContextValue | null>(null);

export function useLeadRequest(): LeadRequestContextValue {
  const context = useContext(LeadRequestContext);
  if (!context) {
    throw new Error('useLeadRequest must be used within LeadRequestProvider');
  }
  return context;
}

export default function LeadRequestProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState<OpenLeadRequestOptions>({});

  const openLeadRequest = useCallback((options?: OpenLeadRequestOptions) => {
    setModalProps(options ?? {});
    setOpen(true);
  }, []);

  const closeLeadRequest = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openLeadRequest, closeLeadRequest }),
    [openLeadRequest, closeLeadRequest]
  );

  const resolvedModalProps: Omit<LeadRequestModalProps, 'open' | 'onClose'> = {
    title: modalProps.title,
    description: modalProps.description,
    defaultService: modalProps.defaultService,
    submitLabel: modalProps.submitLabel,
  };

  return (
    <LeadRequestContext.Provider value={value}>
      {children}
      <LeadRequestModal open={open} onClose={closeLeadRequest} {...resolvedModalProps} />
    </LeadRequestContext.Provider>
  );
}
