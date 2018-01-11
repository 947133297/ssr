import React from 'react'
export default class extends React.Component{
    componentDidMount (){
        setInterval(()=>{
            this.props.add()
        },1000)
    }
    render(){
        return <div>这是数据：{this.props.data}</div>
    }
}