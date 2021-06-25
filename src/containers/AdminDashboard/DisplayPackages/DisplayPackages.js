import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import SwitchButton from '@material-ui/core/Switch';

const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.black,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.grey[500],
          borderColor: theme.palette.grey[500],
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.black}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(SwitchButton);


const DisplayPackages = (props)=>
   ( 
   <div style={{backgroundColor:"white",margin:'10px',width:'90%',textAlign:'center',borderTop:'1px solid green'}} >
        <div style={{display:'flex',marginBottom:'30px'}}>
            <div style={{width:'80%',textAlign:'left',paddingLeft:'40px',paddingTop:'20px'}}>
            <p style={{display:'block',fontWeight:'bold'}}>{props.item.package_name}</p>
            <p style={{display:'block'}}>{props.item.amount}</p>
            </div>

            <div>

            </div>
        </div>
        

        <div style={{display:'flex'}}>
            {/* <a style={{color:'blue',paddingLeft:'20px'}} href={props.id} onClick={(e)=>props.update(e)}>update</a> 
            <a style={{color:'red',paddingLeft:'20px'}} href={props.id} onClick={(e)=>props.delete(e,props.index)}>delete</a> */}
            <div style={{width:'80%'}}>

            </div>

            <div>
               <AntSwitch />
            </div>
            
        </div>
        
       
    </div>
    
    )



export default DisplayPackages