import React,{Component} from 'react';
import ProgressBar from '../../components/Loader/ProgressBar/ProgressBar';
import classes from './AdminDashboard.css';
import SideBar from '../../components/SideBar/SideBar';
import {Link,Switch,Route,withRouter} from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import Modules from './Modules/Modules';
import Packages from './Packages/Packages';
import Companies from './Companies/Companies';
import PaymentGateway from './PaymentGateway/PaymentGateway';
import Subscriptions from './Subscriptions/Subscriptions';
import MobileNav from '../../components/MobileNav/MobileNav';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import { connect } from 'react-redux';


let apiUrl;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV ==='production') {
    apiUrl = 'https://api-remi-hr.herokuapp.com'
}else{
  
   apiUrl = 'http://localhost:5000'
}

class Dashboard extends Component{
    //will change state to a central store using redux
    state = {
        displayLoader:true,
        firstname:'',
        unauthorised:false,
        onboardingComplete:false,
        role:'superadmin',
        left:false,
    }

    componentDidMount(){
       

        setTimeout(()=>this.setState({
            displayLoader:false
            }),4000)
     

       
    }

    toggleDrawer = ( open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ ...this.state,left: open });
      };


      goBack =()=>{
        this.props.history.goBack();
      }
    
   
   
    render(){

        let layout;

        if (this.state.displayLoader) {
            layout =  <ProgressBar />
          }else{ 
             layout = (

                <div>
                    <div className={classes.MobileHeader}>
                    <Button onClick={this.toggleDrawer(true)}><HomeIcon /></Button>
                    <Button onClick={()=>this.goBack()}><ArrowBackIcon /></Button>
                    </div>

                    <div className={classes.DashboardContainer}>
                    <SideBar role={this.state.role}/>

                    <React.Fragment key='left'>
                        
                        <Drawer anchor='left' open={this.state.left} onClose={this.toggleDrawer(false)}>
                           <MobileNav role={this.state.role} show={this.state.left}/>
                        </Drawer>
                    </React.Fragment>

                    
                     <div className={classes.Right}>
                         <TopBar state={this.state}/>
                         <Switch> 
                  
                            <Route path={this.props.match.url+'/packages'}  render={()=> <Packages />}/>
                            <Route path={this.props.match.url+'/subscriptions'}  render={()=> <Subscriptions />}/>
                            <Route path={this.props.match.url+'/companies'}  render={()=> <Companies />}/>
                            <Route path={this.props.match.url+'/paymentgateway'}  render={()=> <PaymentGateway />}/>
                            <Route path={this.props.match.url+'/'}  render={()=> <Modules />}/>
                        </Switch>
                     </div>
                 </div>    
                </div>
                 
             )
          }
        
        return(
            <div>

                  
                 {layout} 

                 
                
                              
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        employeeOnboarding:state.employeeOnboarding
    }
}




export default connect(mapStateToProps)(withRouter(Dashboard))