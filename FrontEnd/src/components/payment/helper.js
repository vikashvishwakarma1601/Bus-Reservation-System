import { API } from '../backend'


export const bookTicket = (ticketDetail) => {

    if (localStorage.getItem("authToken")) {
        const User_ID = JSON.parse(localStorage.getItem("UserID"));
        const token = JSON.parse(localStorage.getItem("authToken"));
        console.log(`${API}user/${User_ID}/bookTicket`)

        return fetch(`${API}user/${User_ID}/bookTicket`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization':'Bearer '+token,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(ticketDetail)
        })
        .then((response) => {
            console.log(response)
                return response.json()
            })
        .catch((err) => { console.log(err) });
    }


}

