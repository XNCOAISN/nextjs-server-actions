import { Suspense } from "react";
import { Toast } from "./toast";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <Toast />
      </Suspense>
      {children}
    </>
  );
}
