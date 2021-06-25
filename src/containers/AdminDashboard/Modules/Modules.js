import React,{Component} from 'react';
import classes from './Modules.css';
import {apiUrl} from '../../../reusables/endpoints';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import ModuleCreate from './ModuleCreate/ModuleCreate';
import ModuleView from './ModuleView/ModuleView';


class Modules extends Component{
    

    state={
        moduleDetails:{
            module_name:'',
            sub_url:'',
            date:'20/08/2020'
        }
    }

   

    render(){
        return(
         <div style={{marginLeft:'30px'}}>
                 
            {/* <div className={classes.TabNav}>
                    <NavLink exact activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url}>View Modules</NavLink>
                    <NavLink  activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url+'/create'}>Create Modules</NavLink>
            </div>  */}

            <div>
                   <Switch>
                        
                       
                        <Route path={this.props.match.url+'/create'}  render={()=> <ModuleCreate/>}/>
                        <Route path={this.props.match.url+'/'} exact render={()=><ModuleView />} />
                    </Switch>
            </div>

        
            

       </div>
        )
    }
}


export default withRouter(Modules)