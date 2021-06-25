import React,{Component} from 'react';
import KPI from './KPI/KPI';
import Performance from './Performance/Performance';
import classes from './Talent.css';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';




class Talent extends Component{
     

    state={
        value:0
    }


    

    render(){
        return(

            <div>
                    
                   <h1 style={{paddingLeft:'100px'}}>Talent</h1>
                   <div className={classes.TabNav}>
                        <NavLink exact activeStyle={{color:'black'}} to={this.props.match.url}>Performance Objective</NavLink>
                        <NavLink  activeStyle={{color:'black'}} to={this.props.match.url+'/kpi'}>Key Performance Indicators</NavLink>
                    </div>
                   

                  <Switch>
                        <Route path={this.props.match.url+'/kpi'}  render={()=><KPI /> }/>
                        <Route path={this.props.match.url+'/'} exact render={()=><Performance />} />
                    </Switch>
            </div>
        )
    }

}



export default withRouter(Talent)
