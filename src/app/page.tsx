import Link from "next/link";

const GroomsmanHand = () => {
  return (
    <>
      <h1>See My Hand</h1>
      <ul className="grid grid-cols-3 gap-4 mx-6">
        <li>
          <Link
            className="block rounded-lg bg-white dark:bg-gray-700 p-6 shadow-gray transform border border-transparent transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-gray-300 hover:shadow-md"
            href="/best-man-of-the-eternal-jar"
          >
            John
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-lg bg-white dark:bg-gray-700 p-6 shadow-gray transform border border-transparent transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-gray-300 hover:shadow-md"
            href="/groomsman-of-the-silver-chain"
          >
            Nick
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-lg bg-white dark:bg-gray-700 p-6 shadow-gray transform border border-transparent transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-gray-300 hover:shadow-md"
            href="/the-legendary-milf-hunter-groomsman"
          >
            Kevin
          </Link>
        </li>
      </ul>
    </>
  );
};

export default GroomsmanHand;
