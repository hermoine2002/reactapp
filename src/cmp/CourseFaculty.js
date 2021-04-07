import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'


function CourseFaculty () {


    const [ courses, setList ] = useState([])
    const [ auth, setAuth ] = useState({})
    const [ role, setRole ] = useState("")
    const [facultyName, setName]=useState("")


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

        let facId = JSON.parse(Cookie.get('auth'))['id']
        let facName = JSON.parse(Cookie.get('auth'))['name']
        console.log(facName);
        setName(facName)
        fetch('http://localhost:1337/Courses')
        .then(response=>response.json()).then((response) => {
            console.log(response);
            let temp = response.filter((d) => (d.faculties.find((i)=>(i.idnumber == facId))))
            console.log("list",temp);
            setList(temp)
        })
    }

    useEffect( () => {

        authCheck();
        console.log("idnumber",auth.id);
        fetchCourse();
    }, [] )


    return(
            <div class="container">
                <h3>
                    Courses of {facultyName}
                    
                </h3>
                <table class="table" style={{marginTop:'10px'}}>
                    
                <thead class="thead-light">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">course ID</th>
                    <th scope="col">course Name</th>
                    </tr>
                </thead>
                <tbody>
                    { courses.map(d => (
                            <tr>
                            <th scope="row">{d.id}</th>
                            <td>{d.courseid}</td>
                            <td>{d.coursename}</td>
                            
                            </tr>
                    )) }

                </tbody>
            </table>
        </div>
        )
}

export default CourseFaculty