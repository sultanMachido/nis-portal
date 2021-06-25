import React,{Component} from 'react';
import classes from './Profile.css'
import profileImageBig from '../../../images/Ellipse3.png'
import lineManagerImage from '../../../images/Ellipse4.png'
import { NavLink,Switch,Route } from 'react-router-dom';
import Personal from './categories/Personal/Personal';
import Physical from './categories/Physical/Physical';
import Payroll from './categories/Payroll/Payroll';
import {withRouter} from 'react-router-dom';
import user from '../../../images/SVG/General/User.svg'
import NextOfKin from './categories/NextOfKin/NextOfKin';


let apiUrl;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV ==='production') {
    apiUrl = 'https://api-remi-hr.herokuapp.com'
}else{
  
   apiUrl = 'http://localhost:5000'
}

class Profile extends Component{

    state={
        firstname:'',
        lastname:'',
        phone:'',
        address:'',
        email:'',
        job_title:'',
        categories:[],
        currentCategory:'personal',
        value:0
    }

    componentDidMount(){
        
        let userDetails = JSON.parse(localStorage.getItem('response_value'))
        let userId;
        let userToken;
        userDetails? userId = userDetails[0].data.id: userId = null;
        userDetails? userToken = userDetails[0].data.token: userToken = null

        // console.log(userDetails[0].id);
        //http://localhost/v1/api/staffs/
        //https://api-remi-hr.herokuapp.com/v1/api/staffs/
        if (userId) {
            fetch(`${apiUrl}/v1/api/staffs/${userId}`)
            .then(res => res.json())
            .then(response => {
                console.log(response)
               
                this.setState({
                    firstname:response.data.firstname,
                    lastname:response.data.lastname,
                    phone:response.data.phone,
                    email:response.data.email,
                    job_title:response.data.job_title,
                    address:response.data.address
                    })
                })
            .catch(err => console.log(err))
        }else{
            this.setState({
                unauthorised: true
            })
        }


        let companyDetails = JSON.parse(localStorage.getItem('response_value'))
        let onboardingplanId;
        companyDetails? onboardingplanId = companyDetails[0].data.onboardingplanId: onboardingplanId = null;

        // console.log(userDetails[0].id);
        //http://localhost:5000/v1/api/staffs/
        //https://api-remi-hr.herokuapp.com/v1/api/staffs/
        if (onboardingplanId) {
            fetch(`${apiUrl}/v1/api/onboardingtasks/categories/${onboardingplanId}`,{
                headers:{
                    'auth-token': userToken
                }
            })
            .then(res => res.json())
            .then(response => {
                console.log(response.data)
                let oldState = [...this.state.categories]
                let newState = response.data;
                this.setState({
                    categories:oldState.concat(newState)
                   })
            })
            .catch(err => console.log(err))
        }else{
            this.setState({
                unauthorised: true
            })
        }  

    }


    render(){
        let cat;

      
        return(

            <div>
         

            <div className={classes.gridContainer}>
                <div className={classes.image}>
                   <img src={profileImageBig} alt="Staff profile image"/>
                </div>
                <div className={classes.companyCard}>
                    <div style={{width:'90%'}}>
                        <h6 style={{color:'rgba(1, 22, 39, 0.5)'}}>Company card</h6>
    
                        <div className={classes.CompanyInfo}>
                            <div style={{width:'100%'}}>
                                 <div className={classes.CompanyInfoList}> 
                                     <img src={user}/>
                                     <h5>{this.state.firstname +' '+ this.state.lastname}</h5>
                                 </div>
                                 <div className={classes.CompanyInfoList}>
                                     <img />
                                     <h5>Finance</h5>
                                 </div>
                                 <div className={classes.CompanyInfoList}>
                                     <img />
                                     <h5>01 - 23456788</h5>
                                 </div>
                                 <div className={classes.CompanyInfoList}>
                                     <img />
                                     <h5>{this.state.email}</h5>
                                 </div>
                            </div>
    
                            <div>
                                 <div className={classes.CompanyInfoList}>
                                     <img />
                                     <h5>{this.state.job_title}</h5>
                                 </div>
                                 <div className={classes.CompanyInfoList}>
                                     <img />
                                     <h5>{this.state.address}</h5>
                                 </div>
                                 <div className={classes.CompanyInfoList}>
                                     <img />
                                     <h5>{this.state.phone}</h5>
                                 </div>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <div className={classes.role}>
                    <div style={{width:'90%',margin:'0 auto'}}>
                       <h6 style={{color:'rgba(1, 22, 39, 0.5)'}}>Line Manager</h6>
                       <div className={classes.RoleInfo}>

                           <img style={{height:'19px',marginRight:'10px'}}src={lineManagerImage}/>
                           <div>
                                <h5 style={{margin:0}}>Matthew Oluwatobi</h5>
                                <p style={{fontSize:'14px'}}>Chief Account Officer</p>
                            </div>
                          
                       </div>

                       <div>
                           <img />
                           <h5 style={{margin:0}}>01 - 74456788</h5>
                       </div>
                    </div> 
                </div>
                <div className={classes.personals}>

                    {this.state.categories.map(category=>
                    <div>
                        <NavLink exact activeStyle={{color:'red'}} to={ 
                            category.category==='Personal Details'?cat=this.props.match.url+'/profile/':category.category==='Physical Features & Medicals'?cat=this.props.match.url+'/profile/physical':category.category==='Payroll'?cat=this.props.match.url+'/profile/payroll':category.category==='Next Of Kin'?cat=this.props.match.url+'/profile/nextofkin':category.category==='Upload documents'?cat='#':null
                           }>{category.category}
                        </NavLink>
                    </div>)}
                    
                </div>
                <div className={classes.information}>
                            <Switch>
                                <Route path={this.props.match.url+'/profile/nextofkin'}  render={()=> <NextOfKin />}/>
                                <Route path={this.props.match.url+'/profile/physical'}  render={()=> <Physical />}/>
                                <Route path={this.props.match.url+'/profile/payroll'}  render={()=> <Payroll />}/>
                                <Route path={this.props.match.url+'/profile/:id'} exact render={()=><Personal state={this.state}/>} />
                                <Route path={this.props.match.url+'/profile/'} exact render={()=><Personal state={this.state}/>} />
                                
                            </Switch>
    
                </div>
                <div className={classes.skillset}>
                   <div style={{width:'90%',margin:'0 auto'}}>
                       <h6 style={{color:'rgba(1, 22, 39, 0.5)'}}>Skillset</h6>

                       <div className={classes.subSkillset}>
                         <p>Communication</p>
                            <progress value='100' max='100'></progress>
                         <p>100%</p>
                       </div>

                       <div className={classes.subSkillset}>
                         <p>Analytics</p>
                            <progress value='100' max='100'></progress>
                         <p>100%</p>
                       </div>

                       <div className={classes.subSkillset}>
                         <p>Critical Thinking</p>
                            <progress value='95' max='100'></progress>
                         <p>95%</p>
                       </div>


                       <div className={classes.subSkillset}>
                         <p>Team Collaboration</p>
                           <progress value='95' max='100'></progress>
                         <p>95%</p>
                       </div>
                        
                    </div> 
                </div>
               
    
            </div>
    
            
        </div>
        )
    }
}



export default withRouter(Profile)