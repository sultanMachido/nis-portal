import React from 'react';
import classes from './TopBar.css';
import profileImage from '../../images/Ellipse 24.png';
import notificationImage from '../../images/bellnew.png';
import caret from '../../images/Vector (4).png';



const TopBar =(props) =>(
       
    <div className={classes.TopBar}>
        
        <div className={classes.TopBarContent}>
            <div style={{width:'70%',marginLeft:'5%'}}>
              <h1>Welcome,Adeyemi</h1>
            </div>
           
            <div style={{width:'30%',marginLeft:'29%',paddingTop:'10px',display:'flex'}}>
                <img style={{width:'15px',height:'15px',marginRight:'15px',marginTop:'20px'}} src={notificationImage} alt='notification image' />
                <img src={profileImage} alt='profile image'  />
                <h5>Adeyemi</h5>
                <img src={caret} alt='profile image' style={{width:'15px',height:'10px',paddingTop:'10px'}}  />
            </div>
            
        </div>
    </div> 
)

export default TopBar