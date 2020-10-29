import React,{useState} from 'react';
import SearchBus from './SearchBus'
import '../stylesheets/style.css'

const Home = ({history}) => {
    

    const [toggle,setToggle] = useState(false)

    return ( <>
            <div className="main-content">
                <div className="content-text">
                    <div className="title">
                        <h1>Comfort and Style<br /> Over Every Mile</h1>
                        <p>BusExpress is the leading go-to website for booking bus online.</p>
                        <button onClick={e=>setToggle(!toggle)} className="book-btn">Book Ticket</button>
                    </div>
                </div>
                <div className="content-image">
                    <img src="./images/bus.svg" alt="bus station" />
                </div>
            </div>
        
            {toggle?<SearchBus history={history} />:null}
            
        </>
    )
}

export default Home;