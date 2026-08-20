import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children, value = {} }) {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  const openTrialModal = useCallback(() => setIsTrialModalOpen(true), []);
  const closeTrialModal = useCallback(() => setIsTrialModalOpen(false), []);

  const combinedValue = {
    isTrialModalOpen,
    openTrialModal,
    closeTrialModal,
    ...value,
  };

  return <AppContext.Provider value={combinedValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

export default AppContext;
