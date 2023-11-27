"use client";
import { ThemeProvider } from "next-themes";
import React, { useState, useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider disableTransitionOnChange>{children}</ThemeProvider>;
}
