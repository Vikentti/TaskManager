'use client'
import './Statistics.scss'
import classNames from 'classnames'
import React from "react";
import {useStat} from "@/features/stats/lib/hooks/useStat";
import {
  statItemsConfig
} from "@/features/stats/lib/config/stat.items";

interface StatisticsProps {
  className?: string
}

const Statistics = ({className}: StatisticsProps) => {

  const {data: stat, isLoading} = useStat()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const statItems = statItemsConfig.map((config) => {
    const statItem = stat?.[config.key]
    return {
      name: statItem?.name || config.name,
      value: statItem?.value || 0,
      isAccent: config.isAccent
    }
  })

  return (
    <div
      className={classNames(className, 'statistics', 'container')}
    >
      <p className="statistics__title">Statistics</p>
      <ul className="statistics__list">
        {statItems.map(({name, value, isAccent}, key) => (
          <li
            className={classNames("statistics__item", {
              'is-accent': isAccent
            })}
            key={key}
          >
            <p className="statistics__name">{name}</p>
            <p className="statistics__value">{value}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Statistics