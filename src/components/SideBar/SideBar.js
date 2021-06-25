import React,{useState,useRef} from 'react';
import classes from './SideBar.css';
import img from '../../images/power_button.png';
import {Link,withRouter} from 'react-router-dom';
import{connect} from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import logo from '../../images/image 2.png';
import img1 from '../../images/Vector.png'
import img2 from '../../images/Vector (1).png'
import img3 from '../../images/Vector (2).png'




function ListItemLink(props) {
    const { icon, primary, to } = props;
  
    const CustomLink = props => <Link to={to} {...props} />;
  
    return (
      <li>
        <ListItem button component={CustomLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }



const Sidebar = (props)=>{

    const[moveIndicator,setMoveIndicator] = useState(0);
     
    let  sidebar = useRef();
    let changeTab = (e) => {
      e.persist();
      e.stopPropagation()
      console.log(e);
      // console.log(this.tabHeader.current.childElementCount)
      console.log([sidebar.current.children])
        
      for (let index = 0; index < sidebar.current.children.length; index++) {
        const element = sidebar.current.children[index];
    
        if(element === e.target.parentElement){
          console.log(element)
          console.log(e.target.clientHeight)
          console.log(index)
      
            let move = index * 47 - 47
            
            setMoveIndicator(move)
         
        }
        
      }
    
      
      
  
      
    };
   
    const logout=()=>{
        // console.log('hey')
        // console.log(props)
        localStorage.clear()
        props.history.push('/')
     }
     let sidebarNav;

    

  
    

            sidebarNav =(
                <div ref={sidebar} onClick={(e) => changeTab(e)} style={{paddingLeft:'40px',backgroundColor:'#fdf9f9',position:'relative'}}>
                    <div className={classes.Indicator} style={{top:`${moveIndicator}px`}}>

                    </div>
                   <div className={classes.ListItem}>
                     {/* <PersonIcon style={{fontSize:'15px',padding:'3px'}} /> */}
                      <img src={img1} style={{padding:'3px'}} className="App-logo" alt="logo" />
                      <Link style={{fontSize:'14px',paddingTop:'3px'}} >Central One Home</Link>
                   </div> 

        
                   <div  className={classes.ListItem}>
                   
                       
                   <img src={img2} style={{padding:'3px'}} className="App-logo" alt="logo" />
                       <Link style={{fontSize:'14px',paddingTop:'3px'}} >Employees Management</Link>
                   </div>
        
                   <div  className={classes.ListItem}>
                      <img src={img2} style={{padding:'3px'}} className="App-logo" alt="logo" />
                       <Link style={{fontSize:'14px',paddingTop:'3px'}} >Vendors Management</Link>
                   </div>
        
                   <div  className={classes.ListItem}>
                   <img src={img3} style={{padding:'3px'}} className="App-logo" alt="logo" /> 
                      <Link style={{fontSize:'14px',paddingTop:'3px'}} >Settings</Link>
                   </div>
                 
                 </div> 
                 )
            
        
        
    

   return (
        <div className={classes.Left} >
            <img src={logo} className="App-logo" alt="logo" />
            <div style={{minHeight:'500px'}}>
               {sidebarNav}
            </div> 
            <div className={classes.Logout} onClick={(e)=>logout(e)}>
                <img src={img} alt='logout button image' />
                <h6 >Logout</h6>    
            </div>  
        </div>

    
    )
}

const mapStateToProps = state =>{
    return {
        employeeOnboarding:state.employeeOnboarding
    }
}


export default connect(mapStateToProps)(withRouter(Sidebar))