import React from 'react';
import classes from './TabContent.css'



const TabContent = ({children,index})=>(
    <div className={classes.TabContent}>
       {console.log(index)} 
       {children[index]}
    </div>
)


export default TabContent