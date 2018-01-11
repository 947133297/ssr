export default (state,action)=>{
    switch(action.type){
        case "add":
            return {
                data:state.data + 1
            }
        default:
            return state;
    }
}