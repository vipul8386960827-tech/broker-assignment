import React from "react";
import { BrokerCardProps } from "./BrokerCard.types";

const BrokerCard: React.FC<BrokerCardProps> = ({ name, onSelect }) => {
  return (
    <div
      className="p-6 border rounded-lg shadow hover:shadow-md cursor-pointer transition text-center"
      onClick={onSelect}
    >
      <h2 className="text-xl font-semibold">{name}</h2>
    </div>
  );
};

export default BrokerCard;
