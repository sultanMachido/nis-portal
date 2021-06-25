import React,{Component} from 'react';
import classes from './HomeContent.css';
import Auxil from '../../../hoc/Auxil/Auxil';
import TaskInput from '../../../components/TaskInput/TaskInput';
import Button from '../../../components/Forms/Button/Button';
import{Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import * as Storage from '../../../reusables/LocalStorage';

let apiUrl;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV ==='production') {
    apiUrl = 'https://api-remi-hr.herokuapp.com'
}else{
  
   apiUrl = 'http://localhost:5000'
}




class HomeContent extends Component{
    
    state={
        onboardingTask:[],
        category:{}
    }


    componentDidMount=()=>{

        let companyDetails = JSON.parse(localStorage.getItem('response_value'))
        let onboardingplanId;
        companyDetails? onboardingplanId = companyDetails[0].data.id: onboardingplanId = null;

        // console.log(userDetails[0].id);
        //http://localhost:5000/v1/api/staffs/
        //https://api-remi-hr.herokuapp.com/v1/api/staffs/
        if (onboardingplanId) {
            fetch(`${apiUrl}/v1/api/onboardingtasks/categories/${onboardingplanId}`)
            .then(res => res.json())
            .then(response => {
                console.log(response.data)
                let oldState = [...this.state.onboardingTask]
                let newState = response.data;
                this.setState({
                    onboardingTask:oldState.concat(newState)
                   })
            })
            .catch(err => console.log(err))
        }else{
            this.setState({
                unauthorised: true
            })
        }  
        
        //load company resources
        fetch(`${apiUrl}/v1/api/companyresources/1`)
            .then(res => res.json())
            .then(response => {
                console.log(response.data)
                // let oldState = [...this.state.onboardingTask]
                // let newState = response.data;
                // this.setState({
                //     onboardingTask:oldState.concat(newState)
                //    })
                Storage.addToLocalStorage(response.data,'company_resources')
                this.props.getCompanyResources(response.data)
            })
            .catch(err => console.log(err))



    }

    onClickHandler =(e)=>{
        e.preventDefault()
        
        // http://localhost:5000/v1/api
        //https://api-remi-hr.herokuapp.com/v1/api
        fetch(`${apiUrl}/v1/api/onboardingtasks/limit/${this.props.employeeOnboarding.onboardingOrder}/1`)
        .then(res => res.json())
        .then(response =>{
            console.log(response.data[0])

            // this.setState({
            //     tasks:response.data[0]
            // }) 

            //getTask with Limit

            this.props.getTaskWithLimit(response.data[0])
            console.log(this.props)
            console.log(response.data[0])
            this.props.history.push('onboarding')

        })
        
        //display 'next' button if input tasks are more than 5
    //    if (this.state.data_length > 5) {
    //        this.setState({
    //            showNextButton: true,
    //            offset: this.state.offset + 5
    //        })
    //        //displayNextButton
    //    }
        
    }
   
    render(){
         {console.log(this.props.employeeOnboarding.tasks)}
       
        return(

            <div className={classes.HomeContent}>
                <Auxil style={{width:'40%',backgroundColor:'#FFFFFF',margin:'0 auto',marginTop:'50px'}}>
                    <h3>Todo List</h3>
                    <p style={{textAlign:'left',paddingBottom:'20px'}}>Fill the forms in the following section with accurate details</p>
                    <form style={{marginTop:'15px'}}>
                            {this.state.onboardingTask.map(task=>{
                                return(

                                    <TaskInput key={task.id} type='checkbox' hr='true' style={{width:'15px'}}>{task.category}</TaskInput>
                                    
                                    )
                                })}
                        {!this.props.employeeOnboarding.showNextButton?<Button click={(e)=>this.onClickHandler(e)}>Get Started</Button>:null}
                        
                    </form>
                </Auxil>
               
                <div className={classes.RightSidebar}>
                     <h3>Resources</h3>
                      {this.props.employeeOnboarding.companyResources.map(resource=> <div><p style={{textAlign:'left',display:'block',marginLeft:'120px'}}>{resource.company_resource}</p><hr style={{marginLeft:'120px',width:'50%'}} /></div>
                             
                          
                      )}
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

const mapDispatchToProps = dispatch =>{
    return{
         getTaskWithLimit:(responseData) => dispatch({type:actionTypes.GET_TASK_WITH_LIMIT,task:responseData}),
         getCompanyResources:(responseData) => dispatch({type:actionTypes.GET_COMPANY_RESOURCES,resources:responseData})

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContent))