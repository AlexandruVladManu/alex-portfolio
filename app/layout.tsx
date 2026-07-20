import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource/inter";
import "@fontsource/ibm-plex-mono";
import "./globals.css";

import { NavProvider } from "@/components/state/NavContext";
import GlobalUI from "@/components/GlobalUI";
import StageTransitionProvider from "@/components/StageTransitionProvider";
import HubUnderlay from "@/components/home/HubUnderlay";
import PageLayer from "@/components/PageLayer";

export const metadata: Metadata = {
  title: "Alex — Portfolio",
  description: "React/Next.js developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StageTransitionProvider>
          <NavProvider>
            {/* Hub always exists underneath */}
            <HubUnderlay />

            {/* Chrome above hub */}
            <GlobalUI />

            {/* Pages above hub, disabled on "/" */}
            <PageLayer>{children}</PageLayer>
          </NavProvider>
        </StageTransitionProvider>
      </body>
    </html>
  );
}
