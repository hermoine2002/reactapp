import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditRoom = () => {
  let history = useHistory();
  const { id } = useParams();
  const [newroom,setRoom]= useState({
    room: "",
    isavailable: "",
    course: "",  
    faculty: ""
  });

  const { room, isavailable, course, faculty} = newroom;

  const onInputChange = e => {
    setRoom({ ...newroom, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadRoom();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:1337/rooms/${id}`, newroom);
    history.push("/home");
  };

  const loadRoom = async () => {
    const result = await axios.get(`http://localhost:1337/rooms/${id}`);
    setRoom(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5" style={{marginTop:'30px'}}>
        <h2 className="text-center mb-4">Update Class</h2>
        <form onSubmit={e => onSubmit(e)}>
         <div class="container">
           <div class="form-group row  " >
                <label for="room" class="col-sm-2 col-form-label">Room name</label>
                <div class="col-md-3">
                    <input
                     type="text"
                     class="form-control " 
                     id="room" 
                     name="room"
                     placeholder="Enter The Room"
                     value={room}
                     
                     onChange={e => onInputChange(e)} />
                </div>
           </div>
           
           <fieldset class="form-group">
                <div class="row">
                <legend class="col-form-label col-sm-2 pt-0">Availability</legend>
                <div class="col-md-3">
                    <div class="form-check">
                    <input 
                    class="form-check-input"
                    type="radio" 
                    name="isavailable" 
                    id="gridRadios1" 
                    value={false}
                    onChange={e => onInputChange(e)} 
                    />
                    <label class="form-check-label" for="gridRadios1">
                        not available
                    </label>

                    </div>
                    <div class="form-check">
                    <input 
                    class="form-check-input" 
                    type="radio" 
                    name="isavailable" 
                    id="gridRadios2"
                    value={true}
                    
                    
                    onChange={e => onInputChange(e)} 
                    />
                    <label class="form-check-label" for="gridRadios2">
                        is available
                    </label>
                    </div>
                    
                </div>
                </div>
            </fieldset>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">course name</label>
                <div class="col-md-3">
                    <input 
                    type="text" 
                    class="form-control" 
                    name="course"
                    placeholder="course name"
                    value={course}
                    onChange={e => onInputChange(e)} 
                    />
                </div>
                <label for="inputEmail3" class="col-sm-2 col-form-label">faculty name</label>
                <div class="col-md-3">
                    <input 
                    type="text" 
                    class="form-control" 
                    name="faculty"
                    placeholder="faculty name"
                    value={faculty}
                    onChange={e => onInputChange(e)} 
                    />
                </div>
           </div>
           <button className="btn btn-primary mb-2" style={{marginTop:'30px'}}>Submit</button>
           <br></br>
           <br></br>
           </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
