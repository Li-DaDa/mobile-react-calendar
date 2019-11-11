import React from "react"
// import Calendar from '../build'
import Calendar from './components/Calendar'
import {dateFormate} from './components/Calendar'

class App extends React.Component {

    state = {
        isShow: false,
        maxDate: '2019-12-30',
        minDate: '2019-01-01',
        start: '2019-05-02',
        end: '2019-05-30'
    }

    result = (start, end) => {
        this.setState({
            start: dateFormate(start, 'yyyy-mm-dd'),
            end: dateFormate(end, 'yyyy-mm-dd')
        })
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.start} placeholder="开始时间" readOnly />
                    <input type="text" value={this.state.end} placeholder="结束时间" readOnly />
                </div>
                <button onClick={() => this.setState({isShow: true})}>按钮</button>
                <Calendar
                    {...this.state}
                    result={this.result}
                    close={()=> this.setState({isShow: false})}
                />
            </div>
        )
    }
}

export default App