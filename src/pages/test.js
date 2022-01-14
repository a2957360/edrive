import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridWeek from '@fullcalendar/timegrid'

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ timeGridWeek ]}
        initialView="timeGridWeek"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        events={[
          {
            id: 'a',
            title: 'my event',
            start: '2020-07-15 12:00:00',
            end: '2020-07-15 18:00:00'
          }
        ]}
      />
    )
  }
}