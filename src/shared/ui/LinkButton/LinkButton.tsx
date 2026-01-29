import './LinkButton.scss'
import classNames from 'classnames'
import React from "react";
import {UrlObject} from "node:url";
import Link from "next/link";

interface LinkButtonProps {
  href: string | UrlObject;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(({
                                                                                  href,
                                                                                  children,
                                                                                  className,
                                                                                  variant = 'primary',
                                                                                  size = 'md',
                                                                                  onClick,
                                                                                  ...props
                                                                                }, ref) => {

  const linkClasses = classNames(
    'link-button',
    `link-button--${variant}`,
    `link-button--${size}`,
    className,
  )


  return (
    <Link
      className={linkClasses}
      ref={ref}
      href={href}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  )
})