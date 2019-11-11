import React from "react"
import ReactDOM from 'react-dom'
import CalendarWrap from './CalendarWrap'
import {formatDate} from './common'

class Calendar extends React.Component {

    constructor(props) {
        super(props)
        this.node = document.createElement('div')
    }

    componentDidMount = () => {
        document.body.appendChild(this.node);
    }

    componentWillUnmount = () => {
        document.body.removeChild(this.node);
    }

    render() {
        return ReactDOM.createPortal(
            <CalendarWrap
              {...this.props}
            />,
            this.node,
        )
    }
}

export const dateFormate = formatDate

export default Calendar