import React, { Component } from 'react';
import classes from './MobileNav.css';
import img from '../../images/power_button.png';
import {Link,withRouter} from 'react-router-dom';
import{connect} from 'react-redux'




class MobileNav extends Component{
    render(){
        let sidebarNav;
        if (this.props.employeeOnboarding.onboardingProgress) {
            sidebarNav = null
        }else{
   
           if (this.props.role==='admin') {
   
               sidebarNav =(
                   <div style={{paddingLeft:'65px'}}>
                       {console.log(this.props)}
                      <div style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url+'/'}>Employee</Link>
                      </div> 
           
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/recruitment'}>Recruitment</Link>
                      </div>
           
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/learning'}>Learning</Link>
                      </div>
           
                      <div  style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url+'/feedback'}>Feedback</Link>
                      </div>
                      <div  style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url+'/subscription'}>Subscription</Link>
                      </div>
                       
                    </div> 
                    )
               
           }else if(this.props.role==='user'){
               sidebarNav =(
                   <div style={{paddingLeft:'65px'}}>
                       {console.log(this.props)}
                      <div style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url+'/profile'}>Profile</Link>
                      </div> 
           
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/leave'}>Leave</Link>
                      </div>
           
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/profile'}>Attendance</Link>
                      </div>
           
                      <div  style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url+'/profile'}>Learning</Link>
                      </div>
                     <div  style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url+'/profile'}>Payroll & Benefits</Link>
                     </div>
           
                     <div  style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url+'/profile'}>Salary History</Link>
                     </div>
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/profile'}>Files</Link>
                      </div>
           
                      <div  style={{marginBottom:'30px'}}>
                        <Link to={this.props.match.url+'/profile'}>Talent</Link>
                      </div>
           
                      <div  style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url+'/profile'}>Awards</Link>
                      </div>      
                    </div> 
                    )
           }else if(this.props.role==='superadmin'){
               sidebarNav =(
                   <div style={{paddingLeft:'65px'}}>
                       {console.log(this.props)}
                      <div style={{marginBottom:'30px'}}>
                         <Link to={this.props.match.url}>Modules</Link>
                      </div> 
           
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/packages'}>Packages</Link>
                      </div>
   
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/companies'}>Companies</Link>
                      </div>
   
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/paymentgateway'}>Payment Gateway</Link>
                      </div>
   
                      <div  style={{marginBottom:'30px'}}>
                          <Link to={this.props.match.url+'/subscriptions'}>Subscriptions</Link>
                      </div>
           
                       
                    </div> 
                    )
           }
           
        }
        return(
            
            <div className={!this.props.show?classes.Left:classes.ShowDrawer}>
            <h2 style={{color:'#65B765',textAlign:'center'}}>Logo</h2>
            <div style={{minHeight:'500px'}}>
               {sidebarNav}
            </div> 
            <div className={classes.Logout}>
                <img src={img} alt='logout button image' />
                <h6>Logout</h6>    
            </div>  
        </div>
        )
    }
}


const mapStateToProps = state =>{
    return {
        employeeOnboarding:state.employeeOnboarding
    }
}


export default connect(mapStateToProps)(withRouter(MobileNav))