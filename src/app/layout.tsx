import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
  Anchor,
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
} from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <AppShell header={{ height: 60 }} padding="md">
            <AppShellHeader>
              <Container h="100%">
                <Group h="100%">
                  <Anchor component={Link} href="/single">
                    Single
                  </Anchor>
                  <Anchor component={Link} href="/multi">
                    Multi
                  </Anchor>
                </Group>
              </Container>
            </AppShellHeader>
            <AppShellMain px={0}>{children}</AppShellMain>
          </AppShell>
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
