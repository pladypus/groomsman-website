import YugiohCard from "~/components/yugioh-card";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const GroomsmenPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Bitch you knew this was coming</h1>
      <div className="bg-slate-500 p-10">
        <YugiohCard />
      </div>
    </div>
  );
};

export default GroomsmenPage;

export const generateStaticParams = async () => {
  return [
    { imageId: "best-man-of-the-eternal-jar" },
    { imageId: "groomsman-of-the-silver-chain" },
    { imageId: "the-legendary-milf-hunter-groomsman" },
  ];
};
