"use client"

import { useEffect, useState } from "react"
import DisclaimerScene from "./DisclaimerScene"

export default function DisclaimerWrapper() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    setShowDisclaimer(true);
  }, []);

  useEffect(() => {
    if(showDisclaimer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    };

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDisclaimer]);

  const handleClose = () => {
    setShowDisclaimer(false);

    window.dispatchEvent(
      new CustomEvent("disclaimerClosed")
    );
  };

  if(!showDisclaimer) return null;

  return <DisclaimerScene onClose={handleClose} />
}