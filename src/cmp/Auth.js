import React,{Component} from 'react';
import Cookie from 'js-cookie'
import { Redirect } from 'react-router-dom'

class Auth extends Component{

    constructor(){
        super()
        this.state={
            isRegister:false
        }

    }
    login(event) {

        event.preventDefault();
        console.log("state", this.state)
        console.log('test',Cookie.get("cred"));
        fetch('http://localhost:1337/Enrolls').then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                let data = resp.filter(d=> (d.idnumber === this.state.idnumber && d.password === this.state.password))[0]

                console.log(data);
                if(data != null){

                    Cookie.set('auth',JSON.stringify(data))
                    this.setState({isCorrect: true}) 
                    this.setState({authDetails: Cookie.get("auth")})   
                }
                else{
                    console.log("wrong credentials");
                    alert("wrong credentials, please fill the correct ones" )
                }
                
            })
        })
    }
    register() {


        console.log("state", this.state)
        fetch('http://localhost:1337/Enrolls',{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                Cookie.set("cred",JSON.stringify(resp))
                
            })
        })
         

        if(this.state.role==="faculty"){
            console.log("state", this.state)
            fetch('http://localhost:1337/Faculties',{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify(this.state)
            }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                // localStorage.setItem("auth",JSON.stringify(resp))
            })
        })
        }
 
    }
    

    render(){

        // useEffect(() => {
        //     let isAuth = localStorage.getItem('auth')
        //     if(isAuth & isAuth !== 'undefined') {
        //        props.history.push('/home')
        //     }
        //  }, [])
        var auth = JSON.parse(Cookie.get("auth"))
        console.warn('auth',auth);
        return(
            <div >
            <div className="container" style={{marginTop:'50px'}} >
                <div className="w-50 mx-auto shadow p-5" style={{backgroundColor:'#facc98'}}>
                    <form>
                    {console.log(this.state.authDetails)}
                {auth ? <Redirect to="home"/>: null}
                {/* {this.state.isCorrect ? <Redirect to="home"/>: null} */}
                {
                    
                    !this.state.isRegister?
                    <div className="form-group ">
                        <input type="text" class="form-control input-sm" placeholder="enrol ID" onChange={(e)=>{this.setState({idnumber:e.target.value})}} required/> <br /><br />
                        <input type="text" class="form-control input-sm" placeholder="Password" onChange={(e)=>{this.setState({password:e.target.value})}} /> <br /><br />
                        <button type="button" class="btn btn-secondary btn-block" onClick={this.login.bind(this)} style={{margin:'3px'}}>Login</button>
                        <button type="button" class="btn btn-outline-secondary btn-sm float-right" onClick={()=> this.setState({isRegister: true})} style={{marginTop:'15px'}}>Not Registered?</button>
                    </div>
                    :
                    <div className="form-group ">
                        <input class="form-control input-sm"  type="text" placeholder="name" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} required/> <br /><br />

                        <input class="form-control input-sm" type="text" placeholder="idnumber" value={this.state.idnumber} onChange={(e)=>{this.setState({idnumber:e.target.value})}} required/> <br /><br />

                        <input class="form-control input-sm" type="text" placeholder="e-mail " value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} required/> <br /><br />
                        
                        <input class="form-control input-sm" type="text" placeholder="set password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} required/> <br /><br />

                        <div class="form-group">
                        <select 
                        name="role"
                        value={this.state.role}
                        onChange={(e)=>{this.setState({role:e.target.value})}} >

                            <option value="student" >Student</option>
                            <option value="faculty" >Faculty</option>

                        </select>
                        </div>

                        <button type="button" class="btn btn-secondary btn-block" style={{marginTop:'15px'}} onClick={this.register.bind(this)}>register</button>
                        <button type="button" class="btn btn-outline-secondary btn-sm float-right" style={{marginTop:'15px'}} onClick={()=> this.setState({isRegister: false})}>Go to Login</button>

                        
                    </div>
                }
                 </form>
                 </div>    
            </div>
            </div>
        );
    }
}

export default Auth;