"use client";
import fetcherWeb from "./fetcherWeb";
import { SWRConfig } from "swr";



export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        fetcherWeb,
        fetcherAPI,
      }}
    >
      {children}
    </SWRConfig>
  );
}