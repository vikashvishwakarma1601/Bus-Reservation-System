import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/core/Home';
import Navbar from './components/core/Navbar';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Bookings from './components/user/BookingDetail';
import Payment from './components/payment/Payment';
import Tickets from './components/user/Tickets';
import PrivateRoute from './components/auth/privateRoute';
import UserContext from './UserContext/UserContext'
import UserReducer from './reducer/UserReducer';


const initialState = {}


const Routes = () => {


    const [userBusDetail, dispatch] = useReducer(UserReducer, initialState)

    return (
        <BrowserRouter>
            <Navbar />
            <UserContext.Provider value={{userBusDetail,dispatch}}>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <PrivateRoute path="/user/book-ticket" exact component={Bookings}></PrivateRoute>
                    <PrivateRoute path="/user/ticket-history" exact component={Tickets}></PrivateRoute>
                    <PrivateRoute path="/user/payment" exact component={Payment}></PrivateRoute>
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Routes;

