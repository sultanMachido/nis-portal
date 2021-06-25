import React from 'react';
import classes from './Navigation.css';
import {Link} from 'react-router-dom'

const Nav = ({showModal}) =>{
    //get auth token
    let response = JSON.parse(localStorage.getItem('response'));
    let token;
    
    response ? token = response[0].token: token = null

    let navLink;
    //display login button if user is logged in
    token ?  navLink =  <h4><Link to="/login">Log in</Link></h4>:  navLink = <h4></h4>

    return (
    <div className={classes.NavContainer} >
        
        <div className={classes.NavLogo}>
            <h2 style={{color:'#65B765'}}>LOGO</h2>
        </div>

        <div className={classes.SubNavigation}>
           <div className={classes.NavLocation}> 
              {navLink}
           </div>

            <div className={classes.NavIcon} onClick ={showModal} > 
                <p className={classes.hamburg}>&#9776;</p>
            </div>
        </div>
        

    </div>
)}


export default Nav