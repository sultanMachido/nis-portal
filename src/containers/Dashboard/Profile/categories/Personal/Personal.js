import React from 'react';
import classes from './Personal.css'



const Personal =(props)=>(
    <div style={{width:'90%',margin:'0 auto'}}>
    <h6 style={{color:'rgba(1, 22, 39, 0.5)'}}>Personal information</h6>
    <div className={classes.PersonalInfo}>
        <h5>Full name:</h5>
         <h5>{props.state.firstname +' '+ props.state.lastname}</h5>
    </div>

    <div className={classes.PersonalInfo}>
        <h5>Email address:</h5>
         <h5>{props.state.email}</h5>
    </div>

    <div className={classes.PersonalInfo}>
        <h5>Phone number:</h5>
         <h5>{props.state.phone}</h5>
    </div>

    <div className={classes.PersonalInfo}>
        <h5>Street address:</h5>
         <h5>{props.state.address}</h5>
    </div>

    <div className={classes.PersonalInfo}>
        <h5>City, State:</h5>
         <h5>{props.state.city}</h5>
    </div>

    <div className={classes.PersonalInfo}>
        <h5>Date of birth:</h5>
         <h5>{props.state.date_of_birth}</h5>
    </div>

    <div className={classes.PersonalInfo}>
        <h5>Nationality:</h5>
         <h5>{}</h5>
    </div>
 </div> 
)

export default Personal