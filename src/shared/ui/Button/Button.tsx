'use client'

import "./Button.scss"
import classNames from "classnames";
import React from "react";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  onClick?: () => void
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
                                                                          children,
                                                                          className,
                                                                          variant = 'primary',
                                                                          size = 'md',
                                                                          isLoading = false,
                                                                          disabled = false,
                                                                          onClick,
                                                                          type,
                                                                          ...props
                                                                        }, ref) => {

    const buttonClasses = classNames(
      'button',
      `button--${variant}`,
      `button--${size}`,
      {
        'button--loading': isLoading,
        'button--disabled': disabled,
      },
      className
    )


    return <>

      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        type={type}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>

    </>
  }
)
