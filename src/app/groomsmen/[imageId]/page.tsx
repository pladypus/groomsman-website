import YugiohCard from "~/components/yugioh-card";

const GroomsmenPage = () => {
  return (
    <div>
      <h1>Groomsmen</h1>
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
