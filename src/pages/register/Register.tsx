import './register.scss'
import classNames from 'classnames'
import React from "react";
import AuthForm from "@/features/auth/AuthForm/AuthForm";
import {LinkButton} from "@/shared/ui/LinkButton/LinkButton";

interface registerProps {
  className?: string
}

const register = ({className}: registerProps) => {


  return (
    <div
      className={classNames(className, 'register', 'container')}
    >
      <img
        className="register__img"
        src="/welcome.jpg"
        alt=""
        width={345.5}
        height={440}
        loading="lazy"
      />
      <div className="register__inner">
        <h1 className="h3">Register</h1>
        <AuthForm mode="register"></AuthForm>
      </div>
      <LinkButton
        href={'/auth/login'}
        size={'sm'}
      >Login</LinkButton>
    </div>
  )
}

export default register