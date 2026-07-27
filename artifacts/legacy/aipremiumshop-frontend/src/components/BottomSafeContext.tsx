import { createContext, useContext, useState, type ReactNode } from "react";

interface BottomSafeValue {
  offset: number;
  setCookieBanner: (visible: boolean) => void;
  setMobileOrderBar: (visible: boolean) => void;
  setStickyBar: (visible: boolean) => void;
}

const BottomSafeContext = createContext<BottomSafeValue>({
  offset: 0,
  setCookieBanner: () => {},
  setMobileOrderBar: () => {},
  setStickyBar: () => {},
});

export function BottomSafeProvider({ children }: { children: ReactNode }) {
  const [cookieBanner, setCookieBanner] = useState(false);
  const [mobileOrderBar, setMobileOrderBar] = useState(false);
  const [stickyBar, setStickyBar] = useState(false);

  const offset = (cookieBanner ? 52 : 0) + (mobileOrderBar ? 56 : 0) + (stickyBar ? 56 : 0);

  return (
    <BottomSafeContext.Provider
      value={{
        offset,
        setCookieBanner,
        setMobileOrderBar,
        setStickyBar,
      }}
    >
      {children}
    </BottomSafeContext.Provider>
  );
}

export function useBottomSafe() {
  return useContext(BottomSafeContext);
}
