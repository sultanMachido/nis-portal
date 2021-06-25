
import React from 'react'
import classes from './TabContainer.css'



const TabContainer =(props)=>(
    <div className={classes.Container}>
        {props.children}
    </div>
)


export default TabContainer