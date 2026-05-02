import YugiohCard from "~/components/yugioh-card";

const GroomsmenPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Bitch you knew this was coming</h1>
      <p>Will you be my...</p>
      <div className="bg-slate-500 p-10">
        <YugiohCard />
      </div>
      <p>Scratch off above to reveal your fate</p>
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
