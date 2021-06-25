import React from 'react'


const Display = (props)=>
   ( 
   <div >
        <p>{props.item}</p>
        {/* <a style={{color:'blue',paddingLeft:'20px'}} href={props.id} onClick={(e)=>props.update(e)}>update</a> 
        <a style={{color:'red',paddingLeft:'20px'}} href={props.id} onClick={(e)=>props.delete(e,props.index)}>delete</a> */}
    </div>
    
    )



export default Display