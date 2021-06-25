import React from 'react';
import classes from './SettingsView.css'

const SettingsView =({title,id,update,deleteHandler,index})=>(
         <div>
                           <p>{title}</p>
                           <button className={classes.Btn} onClick={(e)=>update(e,id)}><a href="#">update</a></button>
                           <button className={classes.Btn2} onClick={(e)=>deleteHandler(e,id,index)}><a href="#">delete</a></button>
         </div>
    
)


export default SettingsView