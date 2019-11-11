import React from 'react'
import './Calendar.css'
import Animate from './Animate'
import CalendarContent from './CalendarContent'

class CalendarWrap extends React.Component {

    render() {
        const {className, isShow, close} = this.props
        return (
            <div className={`calendar_wrap ${className || ''}`}>
                <Animate isShow={isShow} enter="fade_in" leave="fade_out">
                    <div className="calendar_cover" onClick={() => close()}></div>
                </Animate>
                <Animate isShow={isShow} enter="slide_in" leave="slide_out">
                    <div className="calendar_content_wrap"><CalendarContent {...this.props} /></div>
                </Animate>
            </div>
        )
    }
}

export default CalendarWrap