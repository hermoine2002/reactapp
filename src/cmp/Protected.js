import React , {Component, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'
function Protected(props){

    const [ auth, setAuth ] = useState({})
    const [ role, setRole ] = useState("")

    const Cmp= props.cmp

    const authCheck = () => {

        if(Cookie.getJSON('auth')){

            setAuth(JSON.parse(Cookie.get('auth')))
            let role = auth['role']
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
        <div>{auth ? <Cmp /> : <Redirect to="/"></Redirect>} </div>

    )
}

export default Protected;