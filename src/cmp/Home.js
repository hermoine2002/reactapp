import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie'
import RoomStudent from './RoomStudent'
import RoomAdmin from './RoomAdmin' 
import RoomFaculty from './RoomFaculty'


function Home () {

    const [ auth, setAuth ] = useState({})
    const [ role, setRole ] = useState("")


    const authCheck = () => {

        if(Cookie.getJSON('auth')){

            setAuth(JSON.parse(Cookie.get('auth')))
            let role = JSON.parse(Cookie.get('auth'))['role']
            setRole(role)
            console.log('role',role);
        }
        else{
            setAuth(null)
        }
    }

    useEffect(()=>{
        
        authCheck();
    },[])

    return(
        <div>
            {
                role==='student'?<RoomStudent />: null
            }
            {
                role==='faculty'?<div className="container"><RoomFaculty /></div>: null
            }
            {
                role==='admin'?<RoomAdmin />: null
            }
        </div>
    )

}

export default Home