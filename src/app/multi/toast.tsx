"use client";

import { notifications } from "@mantine/notifications";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Toast = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const message = params.get("message");
    if (message) {
      notifications.show({ message });
      params.delete("message");
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    }
  }, [pathname, searchParams]);

  return null;
};
