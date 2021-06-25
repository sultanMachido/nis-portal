import React from 'react';



const DisplayModule =(props)=>(
    <div>
        <input type="checkbox" value={props.module.module_name}  onClick={(e)=>props.clicked(e,props.index)}/>
        <p>{props.module.module_name}</p>
    </div>
)

export default DisplayModule