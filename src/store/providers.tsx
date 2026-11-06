"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import ThemeRegistry from "@/app/theme/ThemeRegistry";
import { PersistGate } from "redux-persist/integration/react";

//const {claimIds} = usePermissions() => diyerek claim'lere erişebilirsin

const Providers = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Provider store={store}>
        <ThemeRegistry>
          <PermissionProvider>
              {children}
          </PermissionProvider>
        </ThemeRegistry>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeRegistry>
            {children}
        </ThemeRegistry>
      </PersistGate>
    </Provider>
  );
};
export default Providers;