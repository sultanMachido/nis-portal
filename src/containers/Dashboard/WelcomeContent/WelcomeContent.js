import React from 'react';
import classes from './WelcomeContent.css';
import Button from '../../../components/Forms/Button/Button';
import{Link} from 'react-router-dom';



const WelcomeContent =(props)=>{
    let companyDetails = JSON.parse(localStorage.getItem('company_details'));
    return(
        <div className={classes.Content}>
            <h4>{companyDetails[0].data.name}</h4>
            <h2>{`Welcome to the team,${' '+ props.state.firstname}`}</h2>
            <p>Let us help you stay on top of your onboarding tasks.<br/>
                You'll also find team insights and helpful company<br/>
                resources
            </p>
            <Button><Link to='/dashboard/home'>Get started</Link></Button>
        </div> 
)}

export default WelcomeContent