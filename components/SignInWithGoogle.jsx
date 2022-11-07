import Script from "next/script";

import { post } from "../utils/networkUtils";
import { useUserState } from "../store/user";
import { useAccessTokenState } from "../store/accessToken";
import useDeviceDetect from "../hooks/useDeviceDetect";

export default function SignInWithGoogle() {
  const [userState, userStateActions] = useUserState();
  const [accessTokenState, accessTokenStateActions] = useAccessTokenState();

  window.handleCredentialResponse = async (response) => {
    const loginResponse = await post({
      url: "/v1/login",
      body: { googleJwt: response.credential },
    });

    if (
      loginResponse &&
      loginResponse.ok &&
      loginResponse.data &&
      loginResponse.data.data &&
      loginResponse.data.data.token &&
      loginResponse.data.data.expiresIn &&
      loginResponse.data.data.userId
    ) {
      const { expiresIn, token, userId } = loginResponse.data.data;

      userStateActions.setUserId(userId);
      accessTokenStateActions.update(token);
    }
  };

  const currentDevice = useDeviceDetect();

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      {!userState.loggedIn && (
        <div
          id="g_id_onload"
          data-client_id={process.env.googleLoginClientId}
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleCredentialResponse"
          data-itp_support="true"
          data-prompt_parent_id="g_id_onload"
          style={{
            position: "absolute",
            top: "90px",
            right: "16px",
            zIndex: "1001",
          }}
        ></div>
      )}
      <div
        className="g_id_signin"
        data-type="standard"
        data-size={currentDevice.isMobile() ? "medium" : "large"}
        data-theme="outline"
        data-text={currentDevice.isMobile() ? "signin" : "sign_in_with"}
        data-shape="pill"
        data-logo_alignment="left"
      ></div>
    </>
  );
}
