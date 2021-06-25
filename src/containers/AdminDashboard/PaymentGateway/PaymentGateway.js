import React,{Component} from 'react';
import classes from './PaymentGateway.css';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import PaymentGatewayView from './PaymentGatewayView/PaymentGatewayView';
import PaymentGatewayCreate from './PaymentGatewayCreate/PaymentGatewayCreate';



class PaymentGateway extends Component{


    render(){
        return(
             <div>
                <div className={classes.TabNav}>
                    <NavLink exact activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url}>View Payment Gateways</NavLink>
                    <NavLink  activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url+'/create'}>Create Payment Gateway</NavLink>
            </div> 

            <div>
                   <Switch>
                        
                       
                        <Route path={this.props.match.url+'/create'}  render={()=> <PaymentGatewayCreate/>}/>
                        <Route path={this.props.match.url+'/'} exact render={()=><PaymentGatewayView />} />
                    </Switch>
            </div>

             </div>
            
        )
    }
}



export default withRouter(PaymentGateway)
