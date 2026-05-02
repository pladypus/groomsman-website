"use client";
import { ScratchCard } from "~/components/scratch-off";
import Image from "next/image";
import { useParams } from "next/navigation";

const GroomsmenPage = () => {
  const params = useParams();
  const imageId = params.imageId;

  return (
    <div>
      <h1>Groomsmen</h1>
      <div className="bg-slate-500 p-10">
        <ScratchCard finishPercent={60} brushSize={20} width={500} height={730}>
          <Image
            src={`/${imageId}.jpeg`}
            alt="yugioh card"
            width={500}
            height={730}
            priority
          />
        </ScratchCard>
      </div>
    </div>
  );
};

export default GroomsmenPage;
