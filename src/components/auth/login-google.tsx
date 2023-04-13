import StandardLoginButton from "./login-button-ui";
import { FcGoogle as GoogleIcon } from "react-icons/fc";

export default function LoginButtonGoogle() {
  return (
    <StandardLoginButton>
      <GoogleIcon /> Google
    </StandardLoginButton>
  );
}
