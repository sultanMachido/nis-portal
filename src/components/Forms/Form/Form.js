import React from 'react';
import classes from './Form.css';

const Form =(props)=>(
    <form 
    className={classes.Forms} 
    action={props.action?props.action:null} 
    method={props.method?props.method:null} 
    onSubmit={props.submit}>
        {props.children}
    </form>
) 


export default Form

