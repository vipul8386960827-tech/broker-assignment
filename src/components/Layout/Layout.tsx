import React from "react";
import PNLCard from "../PNLCard/PNLCard";
import BottomNav from "../BottomNav/BottomNav";
import useOrderStore from "@/store/useOrderStore";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const holdings = useOrderStore((state) => state.holdings);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative pb-20">
      <PNLCard holdings={holdings} />
      <main>{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;
