"use client";

import React, { createContext, useContext, useState } from "react";

type DisclaimerContextType = {
  accepted: boolean;
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
};

const DisclaimerContext = createContext<DisclaimerContextType | null>(null);

export function DisclaimerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accepted, setAccepted] = useState(false);

  return (
    <DisclaimerContext.Provider value={{ accepted, setAccepted }}>
      {children}
    </DisclaimerContext.Provider>
  );
}

export function useDisclaimer() {
  const context = useContext(DisclaimerContext);

  if (!context) {
    throw new Error("useDisclaimer must be used within a DisclaimerProvider");
  }

  return context;
}