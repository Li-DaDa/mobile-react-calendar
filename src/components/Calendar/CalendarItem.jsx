import React from 'react'
import {formatDate} from './common'

class CalendarItem extends React.Component {
    state = {
        items: [],
        year: '',
        month: ''
    }

    componentDidMount = () => {
        this.setMonthData(this.props)
    }

    // 计算当前月份对应的日历
    setMonthData = (props) => {
        const {max, min, date} = props
        let items = []
        let year = date.getFullYear()
        let month = date.getMonth()
        // 获取本月第一天是周几
        let startWeek = new Date(year, month, 1).getDay()
        for(let i=0; i<startWeek; i++) {
            items.push({
                text: '',
                disabled: true,
                date: null,
                index: i
            })
        }
        // 获取本月总共天数
        let total = new Date(year, month + 1, 0).getDate()
        for(let i=0; i<total; i++) {
            const curDate = new Date(year, month, i + 1)
            items.push({
                text: i + 1,
                disabled: curDate < min || curDate > max,
                date: curDate,
                index: i + startWeek
            })
        }
        this.setState({
            items,
            year,
            month
        })
    }

    // 点击日期列表
    clickDateHandler = date => {
        this.props.selectDate(date)
    }
    
    render() {
        const {items, year, month} = this.state
        const {minSelect, maxSelect, id} = this.props
        const maxTimes = maxSelect && maxSelect.getTime()
        const minTimes = minSelect && minSelect.getTime()
        const today = new Date(formatDate(new Date(), 'yyyy/mm/dd')).getTime()
        return (
            <div className="calendar_item" id={id}>
                <div className="calendar_item_title_wrap">
                    <div className="calendar_item_title">{year}年{ (month + 1) < 10 ? '0' + (month + 1) : (month + 1) }月</div>
                </div>
                <div className="calendar_row calendar_flex calendar_flex_wrap">
                    {items.map((item, index) => {
                        let isSelected = false
                        let itemTimes = item.date && item.date.getTime()
                        if(item.date && minSelect && maxSelect) {
                            if(itemTimes >= minTimes && itemTimes <= maxTimes) {
                                isSelected = true
                            }
                        }

                        if(item.date && ((minSelect && itemTimes === minTimes) || (maxSelect && maxTimes === itemTimes))) {
                            isSelected = true
                        }
                        return <div
                            key={index} 
                            className={`calendar_flex_1 calendar_date_item ${isSelected && 'selected'} ${item.disabled && 'calendar_disabled'} ${today === itemTimes && 'calendar_today'}`}
                            onClick={() => !item.disabled && this.clickDateHandler(item.date)}
                        >{item.text}{today === itemTimes ? <div>今天</div> : ''}</div>
                    })}
                </div>
            </div>
        )
    }
}

export default CalendarItem