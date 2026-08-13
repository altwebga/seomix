"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

const YM_COUNTER_ID = 91677133;

export function getMetrikaClientId(): Promise<string | undefined> {
  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => resolve(undefined), 2000);

    ym("getClientID", (clientId: string) => {
      window.clearTimeout(timeoutId);
      resolve(clientId);
    });
  });
}

function RouterTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      ym("hit", url);
    }
  }, [pathname, searchParams]);

  return null;
}

export const YandexMetrika = () => {
  return (
    <>
      <YMInitializer
        accounts={[YM_COUNTER_ID]}
        options={{
          defer: true,
          webvisor: true,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
        }}
        version="2"
      />
      <Suspense fallback={null}>
        <RouterTracker />
      </Suspense>
    </>
  );
};
