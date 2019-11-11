import React from 'react'
import CalendarItem from './CalendarItem'
import {formatDate} from './common'

class CalendarContent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            maxDate: formatDate(props.maxDate),
            minDate: formatDate(props.minDate),
            maxSelect: formatDate(props.end),
            minSelect: formatDate(props.start),
            showMonth: [] // 要显示的月份
        }
    }

    componentWillMount = () => {
        // 验证传入的时间大小
        this.verificationSelectValue()
        // 根据maxDate 和 minDate 计算显示的月份
        this.getShowMonth()
    }

    componentDidMount = () => {
        this.refs.calendar.addEventListener("scroll", e => {
            // console.dir(e.srcElement.scrollTop)
        });
        // 如果有默认日期，滚动到默认日期，没有则滚动到今日
        let tempTimer = setTimeout(() => {
            clearTimeout(tempTimer)
            this.defaultScroll()
        }, 0)
    }

    // 如果有默认日期，滚动到默认日期，没有则滚动到今日
    defaultScroll = () => {
        const {minSelect, maxSelect} = this.state
        if(minSelect) {
            this.scrollToMonth(minSelect)
        } else if(maxSelect) {
            this.scrollToMonth(maxSelect)
        } else {
            this.scrollToMonth(new Date())
        }
    }

    // 页面滚动到指定的月份
    scrollToMonth = date => {
        // 获取当前月份在所有列表中的索引
        const {showMonth} = this.state
        const year = date.getFullYear()
        const month = date.getMonth()
        const cur = new Date(year, month, 1)
        let index = 0
        for(let i=0; i<showMonth.length; i++) {
            if(cur.getTime() === showMonth[i].getTime()) {
                index = i
                break;
            }
        }
        // 累计高度
        let height = 0
        for(let i=0; i<index; i++) {
            height += document.getElementById('calendar_item_' + i).offsetHeight
        }
        // 容器滚动到指定值
        document.getElementsByClassName("calendar_date_wrap")[0].scrollTo(0, height)
    }

    // 验证传入的start和end大小关系
    verificationSelectValue = () => {
        let {minSelect, maxSelect} = this.state
        if(minSelect === null && maxSelect === null) {

        } else if(minSelect > maxSelect) {
            let temp = minSelect
            minSelect = maxSelect
            maxSelect = temp
        }
        this.setState({
            maxSelect,
            minSelect
        })
    }

    // 根据maxDate 和 minDate 计算显示的月份
    getShowMonth = () => {
        // 默认显示最近一年
        let {minDate, maxDate} = this.state
        if(!minDate) {
            minDate = new Date(maxDate.getFullYear() - 1, maxDate.getMonth() + 1, maxDate.getDate() + 1)
        }

        let minYear = minDate.getFullYear()
        let minMonth = minDate.getMonth()
        let maxYear = maxDate.getFullYear()
        let maxMongth = maxDate.getMonth()
        let start = new Date(minYear, minMonth, 1)
        let end = new Date(maxYear, maxMongth, 2)
        let monthArr = []
        while(start < end) {
            monthArr.push(start)
            minMonth++
            start = new Date(minYear, minMonth, 1)
        }
        this.setState({
            showMonth: monthArr,
            minDate
        })
    }

    // 点击选择时间
    selectDate = date => {
        let {minSelect, maxSelect} = this.state
        if(minSelect && maxSelect) {
            if(minSelect === date) {
                minSelect = null
            } else if(maxSelect === date) {
                maxSelect = null
            } else {
                minSelect = date
                maxSelect = null
            }
        } else if(minSelect || maxSelect) {
            if(minSelect) {
                if(minSelect === date) {
                    minSelect = null
                } else {
                    if(date > minSelect) {
                        maxSelect = date
                    } else {
                        maxSelect = minSelect
                        minSelect = date
                    }
                }
            } else {
                if(maxSelect === date) {
                    maxSelect = null
                } else {
                    if(date < maxSelect) {
                        minSelect = date
                    } else {
                        minSelect = maxSelect
                        maxSelect = date
                    }
                }
            }
        } else {
            minSelect = date
        }
        this.setState({
            minSelect,
            maxSelect
        })
    }

    render() {
        const {maxDate, minDate, maxSelect, minSelect, showMonth} = this.state
        const {close = () => {}, result = () => {}} = this.props
        return (
            <div className="calendar_content calendar_flex calendar_flex_direction_cloumn">
                <div className="calendar_clearfix">
                    <span className="calendar_close calendar_fl" onClick={() => {result(minSelect, maxSelect); close()}}>√</span>
                    <span className="calendar_close calendar_fr" onClick={() => close()}>X</span>
                </div>
                <div className="calendar_week_title calendar_row calendar_flex">
                    <div className="calendar_flex_1 calendar_text_red">日</div>
                    <div className="calendar_flex_1">一</div>
                    <div className="calendar_flex_1">二</div>
                    <div className="calendar_flex_1">三</div>
                    <div className="calendar_flex_1">四</div>
                    <div className="calendar_flex_1">五</div>
                    <div className="calendar_flex_1 calendar_text_red">六</div>
                </div>
                <div className="calendar_flex_1 calendar_date_wrap" ref="calendar">
                    { showMonth.map((item, index) => {
                        return <CalendarItem
                            key={index}
                            minSelect={minSelect} 
                            maxSelect={maxSelect} 
                            max={maxDate} 
                            min={minDate} 
                            date={item}
                            selectDate={this.selectDate}
                            id={`calendar_item_${index}`}
                        />
                    }) }
                </div>
                {/* <div className="calendar_ok">
                    <button onClick={() => {result(minSelect, maxSelect); close()}}>确认</button>
                </div> */}
            </div>
        )
    }
}

CalendarContent.defaultProps = {
    maxDate: new Date(),
    minDate: null,
    end: null,
    start: null
}

export default CalendarContent