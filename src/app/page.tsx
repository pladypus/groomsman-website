import Link from "next/link";

const GroomsmanHand = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl">See My Hand</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-6">
        <li>
          <Link
            className="block rounded-lg bg-white dark:bg-gray-700 p-6 shadow-gray transform border border-transparent transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-gray-300 hover:shadow-md text-center"
            href="/best-man-of-the-eternal-jar"
          >
            John
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-lg bg-white dark:bg-gray-700 p-6 shadow-gray transform border border-transparent transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-gray-300 hover:shadow-md text-center"
            href="/groomsman-of-the-silver-chain"
          >
            Nick
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-lg bg-white dark:bg-gray-700 p-6 shadow-gray transform border border-transparent transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-gray-300 hover:shadow-md text-center"
            href="/the-legendary-milf-hunter-groomsman"
          >
            Kevin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GroomsmanHand;
