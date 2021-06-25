import React,{Component} from 'react';
import classes from './Subscriptions.css';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import SubscriptionView from './SubscriptionView/SubscriptionView';




class Subscriptions extends Component{


    render(){
        return(
             <div>
                <div className={classes.TabNav}>
                    <NavLink exact activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url}>View Active Subscriptions</NavLink>
                    <NavLink  activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url+'/create'}>Expiring </NavLink>
            </div> 

            <div>
                   <Switch>
                        
                       
                        
                        <Route path={this.props.match.url+'/'} exact render={()=><SubscriptionView />} />
                    </Switch>
            </div>

             </div>
            
        )
    }
}



export default withRouter(Subscriptions)
