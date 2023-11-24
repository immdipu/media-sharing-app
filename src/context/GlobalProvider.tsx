"use client";
import React, { SetStateAction, createContext, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import { SocketProvider } from "./SocketProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import { Toaster } from "@/components/ui/toaster";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showSider: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined,
);

const queryClient = new QueryClient();

const getSearchResult = async (query: string) => {};
const Providers = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSider, setShowSidebar] = useState(false);
  const path = usePathname();

  const searchContextValue: SearchContextProps = {
    searchTerm,
    setSearchTerm,
    showSider,
    setShowSidebar,
  };

  return (
    <Provider store={store}>
      <Toaster />
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <SearchContext.Provider value={searchContextValue}>
            <GoogleOAuthProvider clientId="999403015017-rodh8011hs8r1l0tjlakeidj4vnu1u53.apps.googleusercontent.com">
              <ThemeProvider>
                <TooltipProvider>
                  <AuthProvider>{children}</AuthProvider>
                </TooltipProvider>
              </ThemeProvider>
            </GoogleOAuthProvider>
          </SearchContext.Provider>
        </QueryClientProvider>
      </SocketProvider>
    </Provider>
  );
};

export default Providers;
