import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'

function CourseStudent () {


    const [ courses, setList ] = useState([])
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


    const fetchCourse = () => {

        let facId = auth.idnumber
        console.log(facId);
        fetch('http://localhost:1337/Courses')
        .then(response=>response.json()).then((response) => {
            console.log(response);
            let temp = response.filter((d) => (d.faculties.find((i)=>(i.idnumber == facId))))
            console.log(temp);
            setList(response)
        })
    }

    useEffect( () => {

        authCheck();
        console.log("idnumber",auth);
        fetchCourse();
    }, [] )

    return (
        <div>
            
        </div>
    )
}

export default CourseStudent