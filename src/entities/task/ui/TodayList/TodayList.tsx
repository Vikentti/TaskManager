import './TodayList.scss'
import classNames from 'classnames'
import React from "react";

interface TodayListProps {
  className?: string
}

const TodayList = ({className}: TodayListProps) => {


  return (
    <div
      className={classNames(className, 'today-list')}
    >
      TodayList
    </div>
  )
}

export default TodayList