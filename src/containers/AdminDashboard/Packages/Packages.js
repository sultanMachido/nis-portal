import React,{Component} from 'react';
import classes from './Packages.css';
import {apiUrl} from '../../../reusables/endpoints';
import PackageView from './PackageView/PackageView';
import PackageCreate from './PackageCreate/PackageCreate';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';

class Packages extends Component{
    

  
   
    

    

    render(){
        return(
       <div >
            {/* <div className={classes.TabNav}>
                    <NavLink exact activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url}>View Packages</NavLink>
                    <NavLink  activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url+'/create'}>Create Packages</NavLink>
            </div>  */}

            <div>
                   <Switch>
                        
                       
                        <Route path={this.props.match.url+'/create'}  render={()=> <PackageCreate/>}/>
                        <Route path={this.props.match.url+'/'} exact render={()=><PackageView />} />
                    </Switch>
            </div>
          
           
       </div>
        )
    }
}


export default withRouter(Packages)