"use client";
import { FC } from "react";
import { ScratchCard } from "./scratch-off";
import Image from "next/image";
import { useParams } from "next/navigation";

const YugiohCard: FC = () => {
  const params = useParams();
  const imageId = params.imageId;

  return (
    <ScratchCard finishPercent={60} brushSize={20} width={500} height={730}>
      <Image
        src={`/${imageId}.jpeg`}
        alt="yugioh card"
        width={500}
        height={730}
        priority
      />
    </ScratchCard>
  );
};

export default YugiohCard;
