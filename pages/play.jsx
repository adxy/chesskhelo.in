import dynamic from "next/dynamic";

import { useUserState } from "../store/user";

const DynamicBoard = dynamic(() => import("../components/Board/Board"), {
  ssr: false,
});

export default function Play() {
  const [userState, _] = useUserState();
  return (
    <>
      {userState.loggedIn && (
        <DynamicBoard isWhitePlayer={false} isPlayable={true} />
      )}
    </>
  );
}
