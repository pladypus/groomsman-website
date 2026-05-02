import Link from "next/link";

const GroomsmanHand = () => {
  return (
    <>
      <h1>See My Hand</h1>
      <ul>
        <li>
          <Link href="/groomsmen/best-man-of-the-eternal-jar">John</Link>
        </li>
        <li>
          <Link href="/groomsmen/groomsman-of-the-silver-chain">Nick</Link>
        </li>
        <li>
          <Link href="/groomsmen/the-legendary-milf-hunter-groomsman">
            Kevin
          </Link>
        </li>
      </ul>
    </>
  );
};

export default GroomsmanHand;
