import React, { useState } from "react";
import BrokerCard from "@/components/BrokerCard/BrokerCard";
import BrokerLoginForm from "@/components/BrokerLoginForm/BrokerLoginForm";
import { brokers } from "@/utils/mockData";
import useAppStore from "@/store/useAppStore";

const HomePage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedBroker = useAppStore((state) => state.selectedBroker);
  const setSelectedBroker = useAppStore((state) => state.setSelectedBroker);

  const handleSelectBroker = (brokerId: string) => {
    setSelectedBroker(brokerId);
    setShowLogin(true);
  };

  const handleSelectBrokerAgain = () => {
    if (!loading) {
      setShowLogin(false);
      setSelectedBroker(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      {!showLogin ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {brokers.map((broker) => (
            <BrokerCard
              key={broker.id}
              name={broker.name}
              onSelect={() => handleSelectBroker(broker.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <h2 className="text-2xl mb-4">Login to {selectedBroker}</h2>

          {selectedBroker && (
            <BrokerLoginForm
              brokerId={selectedBroker}
              loading={loading}
              setLoading={setLoading}
            />
          )}

          <button
            onClick={handleSelectBrokerAgain}
            className="mt-4 px-4 py-2 border rounded bg-white text-black hover:text-gray-900 dark:hover:text-gray-50 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={loading}
          >
            Select Broker
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
