import React from 'react'
import {Provider,connect} from 'react-redux'
import App from './App.jsx'

export default (store)=>{
    const mapStateToProps = (state)=>{
        return {
            data:state.data
        }
    }
    const mapDispatchToProps = (dispatch)=>{
       return {
           add:()=>{
               dispatch({type:'add'})
           }
       }
    }
    const _App = connect(mapStateToProps,mapDispatchToProps)(App)
    return <Provider store={store}>
                <_App></_App>
           </Provider>
}