import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import AddNewRoom from './AddNewRoom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function RoomAdmin(){
    const [ roomList, setRooms ] = useState([])

    const fetchRooms = () => {

        fetch('http://localhost:1337/Rooms')
        .then(response=>response.json()).then((response) => {
            console.log(response);
            setRooms(response)
        })
    }

    useEffect(()=>{
        fetchRooms();
      },[])
    
    return(
       <div>
           <div style={{margin:'30px'}}><Link className="btn btn-outline-primary" to="addnewroom">Add New Room</Link></div>
           
           <div className="row">
            {
                roomList.map(d=>(
                    <div className="col-lg-3">
                        <div className="container" >
                        <div className="card-deck" >
                            <div class="card text-center bg-light"  >
                                <img class="card-img-top" src='https://27mi124bz6zg1hqy6n192jkb-wpengine.netdna-ssl.com/wp-content/uploads/2020/05/Classroom-Management-for-an-Effective-Learning-Environment-scaled.jpg' alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Room:{d.room}</h5>
                                    {
                                        d.isavailable? <div>
                                            <p style={{color: 'green'}}>Available</p>
                                            <h5>Currently there is no class going on in this room</h5>
                                            <br></br>
                                            </div>
                                        :<div>
                                            <p style={{color: 'red'}}>Unavailable</p>
                                            <h5>Class for {d.course} by {d.faculty} is going on</h5>
                                            <br></br>
                                            
                                        </div>
                                    }
                                    <Link class="btn btn-primary" to={`/editroom/${d.id}`}>Update</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                
                ))
            }


        </div>
           
       </div>
       
    )
}
export default RoomAdmin