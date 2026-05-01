"use client";

import { ScratchCard } from "~/components/scratch-off";

const GroomsmenPage = () => {
  const handleComplete = () => {
    console.log("complete");
  };

  return (
    <div>
      <h1>Groomsmen</h1>
      <div className="bg-slate-500 p-10">
        <ScratchCard
          finishPercent={80}
          brushSize={20}
          onComplete={handleComplete}
        >
          apple
        </ScratchCard>
      </div>
    </div>
  );
};

export default GroomsmenPage;
