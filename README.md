# 描述
[mobile-react-calendar](https://github.com/Li-DaDa/mobile-react-calendar)基于react的移动端日期选择组件，仿携程日历，可选区间日期，也可选一天

# 依赖关系
version ^0.0.1 -> React ^16.11.0

# 基础功能
- 选择一组日期，开始日期和结束日期
- 选择一个日期

# 扩展
- 可配置默认选择
- 可配置可选日期区间

# 安装
```shell
npm install --save mobile-react-calendar
```

# 使用
```js
import Calendar, {formatDate} from 'mobile-react-calendar'
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
            start: formatDate(start, 'yyyy-mm-dd'),
            end: formatDate(end, 'yyyy-mm-dd')
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

export default App;
```

# 接口
| Property | Description | Type | default | Remarks |
| --- | --- | --- | --- | --- |
| isShow | 是否显示 | Boolean | false | 必填 |
| result | 选择日期回调 | Function | -- | 必填 |
| close | 点击关闭按钮处理函数 | Function | -- | 必填 |
| maxDate | 可选日期最大值 | String/Date | '' | 选填 |
| minDate | 可选日期最小值 | String/Date | '' | 选填 |
| start | 默认显示时间最小值 | String/Date | '' | 选填 |
| end | 默认显示时间最大值 | String/Date | '' | 选填 |
