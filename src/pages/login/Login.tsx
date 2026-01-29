import './login.scss'
import {LinkButton} from "@/shared/ui/LinkButton/LinkButton";
import AuthForm from "@/features/auth/AuthForm/AuthForm";

export default function LoginPage() {
  return <>

    <div className="login container">
      <img
        className="login__img"
        src="/welcome.jpg"
        alt=""
        width={345.5}
        height={440}
        loading="lazy"
      />
      <div className="login__inner">
        <h1 className="h3">Login</h1>
        <AuthForm mode="login"></AuthForm>
      </div>
      <LinkButton
        href={'/auth/register'}
        size={'sm'}
      >Registration</LinkButton>
    </div>
  </>;
}
