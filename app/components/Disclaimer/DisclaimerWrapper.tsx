"use client"

import { useEffect, useState } from "react"
import DisclaimerScene from "./DisclaimerScene"
import { useDisclaimer } from "./DisclaimerContent";

export default function DisclaimerWrapper() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const { setAccepted } = useDisclaimer();

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
    setAccepted(true);
    setShowDisclaimer(false);
  };

  if(!showDisclaimer) return null;

  return <DisclaimerScene onClose={handleClose} />
}