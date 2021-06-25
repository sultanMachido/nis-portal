import React,{ useState,useEffect } from 'react';
import classes from './DisplayModal.css';













const DisplayModal =({title,text,afterClose})=>{
    const [displayModal, setDisplayModal] = useState(true);

    
    let modalVisibilty=()=>{
        setDisplayModal(false)

        if (afterClose) {
            afterClose()
        }
    }


    useEffect(() => {
        // Update the document title using the browser API
       
        
      });
    
    let modal = (
        <div className={classes.BackDrop} >
         <div id='modal' className={classes.Modal}>
            <h2 style={{textAlign:'center',color:'#65B765'}}>{title}</h2>
           
           <hr style={{display:"block",width:"80%"}}/>  
            
           <div style={{textAlign:'center',fontSize:'16px'}}>
              
            

             <p >{text}</p> 

             
           </div>   
            
            
            <div>
               <button className={classes.Button} onClick={(e)=>modalVisibilty()}>close</button>
               {/* <button className={classes.Button} onClick={(e)=>this.submitFormHandler(e)}>add</button> */}
            </div>
            
           

          </div>
         </div>
    )
    
    return(
     <div>
         {displayModal?modal:null}
     </div>
)}


export default DisplayModal