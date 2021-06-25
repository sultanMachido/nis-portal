import React,{useState} from 'react';
import classes from './Input.css';







const Input = ({type,value,placeholder,style,change,icon,toggle}) =>{
    const [inputType,setInputType] = useState('')

    
    return(
    <div style={{display:'flex'}}>
        

        <input 
        style={style?style:{}}
        className={classes.Inp?classes.Inp:''} 
        type={type||inputType} 
        placeholder={placeholder} 
        value={value}
        onChange = {change}   
        />

        {icon?<span style={{width:'28%',paddingTop:'20px',color:'red'}} onClick={(e)=>toggle(e)}>{icon}</span>:null}
        

        
    </div>

    
)};


export default Input