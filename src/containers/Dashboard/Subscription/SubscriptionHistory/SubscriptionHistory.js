import React from 'react'


const SubscriptionHistory = (props)=>
   ( 
   <div style={{margin:'10px'}}>

        <div>
             <p style={{fontWeight:'bold'}}>Package Name:</p> 
             <p>{props.item.package.package_name}</p>
              
          </div>
        
          <div>
             <p style={{fontWeight:'bold'}}>Modules:</p> 
             <p>{props.item.modules}</p>
              
          </div>

          <div>
              <p style={{fontWeight:'bold'}}>Purchased:</p> 
              <p>{props.item.createdAt}</p>
          </div>
       
    </div>
    
    )



export default SubscriptionHistory