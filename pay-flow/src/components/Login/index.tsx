import Button from "../Button";
import Input from "../Input";
import { Page } from "./style";
import logoDark from "../../assets/logo_dark.png";

function Login() {
  return (
    <Page theme="dark">
      <div className="login-card">
        <img
          src={logoDark}
          width={300}
          height={300}
          alt="Logo do sistema"
          className="login-logo"
        />
        <Input label="teste" type="email" />
        <Input label="teste" type="password" />
        <Button theme="dark">teste</Button>
      </div>
    </Page>
  );
}

export default Login;
