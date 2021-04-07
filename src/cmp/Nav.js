import React, { Component , useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Cookie from 'js-cookie'

class Nav extends Component{

    constructor(){
        super()
        this.state={
            isAuth:false,
            uname:""
        }

    }

    removeExistingItem(key) {
        if (Cookie.get(key) === null)
            return false;
        Cookie.set(key,null);
        console.log(key);
        return true;
    }
    
    logout(event){
        event.preventDefault();
        console.warn("state", Cookie.get('auth'))
        
        
        this.removeExistingItem('auth')
        this.checkAuth('auth')
     
    }

    checkAuth(key) {
        const auth = Cookie.get(key)
        console.log("checkLoggedIn",auth);
        

        if(auth){
            this.setState({ isAuth : true })
            // let userName = JSON.parse(Cookie.get('auth'))['name']
            // console.log(userName);
            // this.setState({ uname : userName })
            
        }
        else{
            this.setState({ isAuth : false })
            
        }
    }

    

    componentDidMount() {
        this.checkAuth('auth')
        console.log("reBooted");
      }

      
    render(){
        console.log("Logged",this.state.isAuth)

        return(
            // <div className="navbar navbar-dark bg-dark">
            //     <Link to="home">Home</Link>
            //     <Link to="about">About</Link>
            //     <Link to="/">Login</Link>
            // </div>
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/home">CMS</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    {this.state.isAuth ?
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active" style={{marginRight:'10px'},{marginLeft:'5px'}}>
                        <Link to="home">Home <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item" style={{marginRight:'10px'},{marginLeft:'11px'}}>
                        <Link to="courses">Courses</Link>
                        </li>
                    </ul>
                    
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                    <span class="navbar-text">
                        {this.state.uname}
                    </span>
                    </li>
                    <li class="nav-item">
                    <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.logout.bind(this)} type="submit"><Link to="/">Logout</Link></button>
                    </li>
                    
                   </ul> 
                   </div>
                    :
                    null}
                    
                    
{/*                     
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                        <Link to="/">Login</Link>
                        </li>
                        <li class="nav-item">
                         <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.logout.bind(this)} type="submit">Logout</button> 
                        </li>
                    </ul> */}

                </div>
          </div>
        );
    }
}

export default Nav;