"use client"; // Ensure this component is a client component

import { useEffect } from "react";

export default function MobileRestrictions({ children }) {
  // Comment the useEffect to inspect from the browser
  useEffect(() => {
    // Disable right-click on mobile devices
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    const handleCut = (e) => e.preventDefault();
    const handlePaste = (e) => e.preventDefault();
    const handleSelectStart = (e) => e.preventDefault();

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      // Clean up event listeners on component unmount
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("selectstart", handleSelectStart);
    };
  }, []);

  return <>{children}</>; // Render the children inside the restriction component
}
