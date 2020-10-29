
const userReducer = (state,action)=>{
    let {type} = action
    switch(type){

        case 'STORE_BOOKING_DETAILS' :
            let {BusDetails} = action
            return BusDetails

        case 'REMOVE_BOOKING_DETAILS':
            return {}
            
        default:
            return state 
    }   
}

export default userReducer;