import React, { useState, useEffect } from 'react';
import EditRoom from './EditRoom';
import Cookie from 'js-cookie'
import CourseStudent from './CourseStudent'
import CourseFaculty from './CourseFaculty'
import CourseAdmin from './CourseAdmin'

function Courses() {

    // const [ roomList, setRooms ] = useState([])

    // const fetchRooms = () => {

    //     fetch('http://localhost:1337/Courses')
    //     .then(response=>response.json()).then((response) => {
    //         console.log(response);
    //         setRooms(response)
    //     })
    // }

    // useEffect(()=>{
    //     fetchRooms();
    // },[])

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

    return (
        <div>


            {
                role==='student'?<CourseStudent />: null
            }
            {
                role==='faculty'?<div className="container"><CourseFaculty /></div>: null
            }
            {
                role==='admin'?<CourseAdmin />: null
            }
        




        {/* <table class="table">
            <thead class="thead-light">
                <tr>
                <th scope="col">#</th>
                <th scope="col">course ID</th>
                <th scope="col">course Name</th>
                <th scope="col">Faculty</th>
                </tr>
            </thead>
            <tbody>
                { roomList.map(d => (
                        <tr>
                        <th scope="row">{d.id}</th>
                        <td>{d.courseid}</td>
                        <td>{d.coursename}</td>
                        <td>{d.faculty_1.name}</td>
                        </tr>
                )) }

            </tbody>
        </table> */}
        
        </div>
    )
}

export default Courses;