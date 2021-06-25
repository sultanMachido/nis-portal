import React,{Component} from 'react';
import classes from './Recruitment.css';
import { NavLink,Switch,Route,withRouter} from 'react-router-dom';
import PageOne from './PageOne/PageOne';
import PageTwo from './PageTwo/PageTwo';
import PageThree from './PageThree/PageThree';
import PageFour from './PageFour/PageFour';
import PageFive from './PageFive/PageFive';

class Recruitment extends Component{


    render(){
        return(
            <div>
                <Switch> 
                  <Route path={this.props.match.url+'/confirmation'}  render={()=> <PageFive/>}/>
                  <Route path={this.props.match.url+'/qualification'}  render={()=> <PageFour/>}/>
                  <Route path={this.props.match.url+'/description'}  render={()=> <PageThree/>}/>
                  <Route path={this.props.match.url+'/role'}  render={()=> <PageTwo/>}/>
                  <Route path={this.props.match.url+'/'}  render={()=> <PageOne/>}/>
                </Switch>
            </div>

        )
    }
}


export default withRouter(Recruitment)

