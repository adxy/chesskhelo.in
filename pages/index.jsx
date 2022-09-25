import dynamic from "next/dynamic";

const DynamicHero = dynamic(() => import("../components/Hero"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DynamicHero />
    </>
  );
}
