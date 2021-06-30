import React from 'react';
import classes from './Button.css'

const Button =(props)=>{
     let style
     if (props.disabled) {
         style = classes.BtnDisabled
     }else if(!props.disabled){
          style = classes.Btn
     }else{
          style = props.style
     }
     return(
     <button  className={style} onClick={props.click?props.click:null} disabled={props.disabled?true:false}>{props.children}</button>
)};


export default Button;