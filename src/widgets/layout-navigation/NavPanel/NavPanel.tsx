'use client'
import './NavPanel.scss'

import classNames from 'classnames'
import React from "react";
import {LinkButton} from "@/shared/ui/LinkButton/LinkButton";
import {Button} from "@/shared/ui/Button/Button";
import {usePathname} from "next/navigation";
import {
  navigationItems
} from "@/widgets/layout-navigation/lib/config/navigation-items";

interface NavPanelProps {
  className?: string
}

const NavPanel = ({className}: NavPanelProps) => {

  const pathname = usePathname();

  if (pathname?.includes('/auth')) {
    return null;
  }


  return (
    <nav className={classNames('nav-panel', className)}>
      {/* Desktop version */}
      <div className="nav-panel__desktop">
        <ul className="nav-panel__list">
          {navigationItems.map(({href, src}) => (
            <li
              className="nav-panel__item"
              key={href}
            >
              <LinkButton href={href}>
                <img
                  className="nav-panel__item-img"
                  src={src}
                  width="40"
                  height="40"
                  loading="lazy"
                  alt=""
                />
              </LinkButton>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile version */}
      <div className="nav-panel__mobile">
        <div className="nav-panel__mobile-inner">
          <ul className="nav-panel__mobile-list">
            {navigationItems.slice(0, 2).map(({href, src}) => (
              <li
                className="nav-panel__mobile-item"
                key={href}
              >
                <LinkButton href={href}>
                  <img
                    className="nav-panel__mobile-img"
                    src={src}
                    width="40"
                    height="40"
                    loading="lazy"
                    alt=""
                  />
                </LinkButton>
              </li>
            ))}
          </ul>

          <Button className="nav-panel__mobile-button">
            <img
              className="nav-panel__mobile-button-img"
              src="/add.svg"
              alt="Add"
              width="24"
              height="24"
              loading="lazy"
            />
          </Button>

          <ul className="nav-panel__mobile-list">
            {navigationItems.slice(2, 4).map(({href, src}) => (
              <li
                className="nav-panel__mobile-item"
                key={href}
              >
                <LinkButton href={href}>
                  <img
                    className="nav-panel__mobile-img"
                    src={src}
                    width="40"
                    height="40"
                    loading="lazy"
                    alt=""
                  />
                </LinkButton>
              </li>
            ))}
          </ul>

          <div className="nav-panel__mobile-bg">
            <svg
              width="375"
              height="56"
              viewBox="0 0 375 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                className="nav-panel__mobile-path"
                d="M0 22C0 9.84974 9.84974 0 22 0H93.5H141C141 0 145.5 0 154 0C164.148 0 162 27 187.5 27C214.5 27 210.735 -5.64924e-06 220.5 0C229 4.91738e-06 233.5 0 233.5 0H282.5H353C365.15 0 375 9.84974 375 22V56H0V22Z"
                fill="#EEE9FF"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default NavPanel