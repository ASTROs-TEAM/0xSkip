'use client'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const RightPanel = () => {
  const [date, setDate] = useState(new Date())
  const [markedDates, setMarkedDates] = useState([
    { date: '2024-12-25', color: 'red' },
    { date: '2024-01-01', color: 'green' }
  ])

  const isDateMarked = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return markedDates.find((d) => d.date === dateString)
  }

  const tileContent = ({ date, view }: any) => {
    if (view === 'month') {
      const marked = isDateMarked(date)
      if (marked) {
        return (
          <div
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: marked.color,
              borderRadius: '50%',
              margin: '0 auto',
              marginTop: '2px'
            }}
          />
        )
      }
    }
    return null
  }

  return (
    <div className='skicky left-0 top-20 p-4 flex flex-col h-[90vh] w-full border-l-[1px] border-white/10 text-white'>
      <Calendar
        className={'text-black w-full'}
        value={date}
        onChange={() => {}} // Disable selection change
        onClickDay={() => {}} // Disable day clicks
        selectRange={false} // Ensure no range selection
        tileContent={tileContent}
      />
    </div>
  )
}

export default RightPanel
