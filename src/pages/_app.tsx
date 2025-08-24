import "@/styles/globals.css";
import type { AppProps } from "next/app";
import FAB from "@/components/FAB/FAB";
import useAppStore from "@/store/useAppStore";
import PNLCard from "@/components/PNLCard/PNLCard";
import useOrderStore from "@/store/useOrderStore";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const holdings = useOrderStore((state) => state.holdings);

  return (
    <>
      <Toaster position="top-right" />
      {isLoggedIn && <PNLCard holdings={holdings} />}
      <Component {...pageProps} />
      {isLoggedIn && <FAB />}
    </>
  );
}
