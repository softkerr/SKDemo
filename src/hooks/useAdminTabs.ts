import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { adminTabs } from '@/data/admin';

export const useAdminTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  // Initialize tab from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const tabIndex = adminTabs.findIndex((t) => t.id === tab);
      if (tabIndex !== -1) {
        setActiveTab(tabIndex);
      }
    }
  }, [searchParams]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    const newTabId = adminTabs[newValue].id;
    router.push(`/admin?tab=${newTabId}`, { scroll: false });
  }, [router]);

  return {
    activeTab,
    handleTabChange,
    currentTab: adminTabs[activeTab],
  };
};
