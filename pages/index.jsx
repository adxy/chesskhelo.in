import dynamic from "next/dynamic";

const DynamicBoard = dynamic(() => import("../components/Board/Board"), {
  ssr: false,
});

export default function Home() {
  return <DynamicBoard isWhitePlayer={true} isPlayable={true} />;
}
