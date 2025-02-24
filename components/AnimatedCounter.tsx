"use client";

import { mockTotalCurrentBalance } from "@/components/mockData"; // Import mock data
import CountUp from "react-countup";

const AnimatedCounter = () => {
  return (
    <div className="w-full">
      <CountUp
        decimals={2}
        decimal=","
        prefix="$"
        end={mockTotalCurrentBalance}
      />
    </div>
  );
};

export default AnimatedCounter;
