import "./welcome.scss"
import {LinkButton} from "@/shared/ui/LinkButton/LinkButton";


export default function Welcome() {

  return <>
    <div className="welcome container">
      <img
        className="welcome__img"
        src="/welcome.jpg"
        alt=""
        width={345.5}
        height={440}
        loading="lazy"
      />
      <div className="welcome__info">
        <h1 className="welcome__info-title">Task Sync</h1>
        <p className="welcome__info-text">This productive tool is designed to help
          you better manage your task
          project-wise conveniently!
        </p>
      </div>
      <LinkButton
        size="lg"
        href={"/auth/login"}>Let’s Start</LinkButton>

    </div>
  </>
}