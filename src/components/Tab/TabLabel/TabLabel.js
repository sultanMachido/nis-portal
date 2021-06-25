
import React from 'react'
import classes from './TabLabel.css'



const TabLabel=(props)=>(
    
    <div className={classes.Label}>
        {props.children}
    </div>

)

export default TabLabel