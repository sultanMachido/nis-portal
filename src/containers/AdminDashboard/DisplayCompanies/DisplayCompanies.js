import React from 'react'


const DisplayPackages = (props)=>
   ( 
   <div style={{backgroundColor:"white",margin:'10px',width:'50%',textAlign:'center',display:'flex'}} >
        {/* <div>
           <img src="http://api-remi-hr.herokuapp.com/dashboard.png"  style={{width:'260px',height:'300px'}}/>
        </div>

        <div>
          <p style={{fontWeight:'bold',display:'block'}}>Company Name:</p><p>{props.item.company_name}</p>
          <p style={{fontWeight:'bold',display:'block'}}>Company Email:</p><p>{props.item.company_email}</p>
        
        </div>

        <div>
           {props.item.status==='inactive'?<a style={{color:'blue',paddingLeft:'20px'}} href={props.id} onClick={()=>props.activate(props.item.company_id)}>Activate</a>:null} 
            {props.item.status==='active'?<a style={{color:'red',paddingLeft:'20px'}} href={props.id} onClick={()=>props.deactivate(props.item.company_id)}>Deactivate</a>:null}
            <a href="">Update</a>
        </div> */}




        <div style={{width:'80%',textAlign:'left',paddingLeft:'30px'}}>
          <p>{props.item.company_name}</p>
          
        </div>

        <div>
          
            <a style={{textDecoration:'none',color:'green'}} href="">View</a>
        </div>
        
       
    </div>
    
    )



export default DisplayPackages