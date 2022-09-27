import dynamic from "next/dynamic";

const DynamicBoard = dynamic(() => import("../components/Board/Board"), {
  ssr: false,
});

export default function Play() {
  return (
    <>
      {userState.loggedIn && (
        <DynamicBoard isWhitePlayer={false} isPlayable={true} />
      )}
    </>
  );
}
