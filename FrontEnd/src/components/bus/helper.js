import { API } from '../backend'


export const searchBus = ({Source,Destination,travelDate}) => {
    return fetch(`${API}bus/search/${Source}/${Destination}`,{
        method:'GET'
    })
    .then((response)=>{ 
        return response.json()
    })
    .catch((err)=>{ console.log(err)})
}

