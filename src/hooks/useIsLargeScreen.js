import { useEffect, useState } from "react";

export const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isLarge;
};
