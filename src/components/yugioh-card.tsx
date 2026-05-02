"use client";
import { FC } from "react";
import { ScratchCard } from "./scratch-off";
import Image from "next/image";
import { useParams } from "next/navigation";

const YugiohCard: FC<{ color?: string }> = ({ color }) => {
  const params = useParams();
  const imageId = params.imageId;

  return (
    <ScratchCard
      finishPercent={60}
      brushSize={20}
      width={WIDTH}
      height={HEIGHT}
      color={color}
    >
      <Image
        src={`/${imageId}.jpeg`}
        alt="yugioh card"
        width={WIDTH}
        height={HEIGHT}
        priority
      />
    </ScratchCard>
  );
};

export default YugiohCard;

const WIDTH = 300;
const HEIGHT = 438;
