import { API } from '../backend'


export const getTickets = (ticketDetail) => {

    if (localStorage.getItem("authToken")) {
        const User_ID = JSON.parse(localStorage.getItem("UserID"));
        const token = JSON.parse(localStorage.getItem("authToken"));

        return fetch(`${API}tickets/user/${User_ID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
        }).then((response) => {
            return response.json()
        })

            .catch((err) => { console.log(err) })
    }
}


