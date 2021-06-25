import React,{Component}from 'react';
import classes from './NextOfKin.css';
import {apiUrl} from '../../../../../reusables/endpoints'



class NextOfKin extends Component{
    
    state={
        nextofkinDetails:{}
    }

    componentDidMount=()=>{

        let userDetails = JSON.parse(localStorage.getItem('response_value'))
        let userId;
        userDetails? userId = userDetails[0].data.id: userId = null;
       
        console.log(apiUrl)

        let Url = apiUrl()

        console.log(Url)
       
        fetch(`${Url}/v1/api/nextofkin/${userId}`)
        .then(res => res.json())
        .then(response => {
            console.log(response.data)
            let oldState = {...this.state.nextofkinDetails}
            let newState = response.data;
            this.setState({
                nextofkinDetails:{...oldState,...newState}
               })
        })
        .catch(err => console.log(err))
 
    }


    render(){
        return(
            <div style={{width:'90%',margin:'0 auto'}}>
            <h6 style={{color:'rgba(1, 22, 39, 0.5)'}}>Next Of Kin</h6>
             <div className={classes.NextOfKinInfo}>
                <h5>Firstname:</h5>
                <h5>{this.state.nextofkinDetails.firstname}</h5>
            </div>
        
            <div className={classes.NextOfKinInfo}>
                <h5>Middlename:</h5>
                 <h5>{this.state.nextofkinDetails.middlename}</h5>
            </div>
        
            <div className={classes.NextOfKinInfo}>
                <h5>Lastname:</h5>
                 <h5>{this.state.nextofkinDetails.lastname}</h5>
            </div>
        
            <div className={classes.NextOfKinInfo}>
                <h5>Gender:</h5>
                 <h5>{this.state.nextofkinDetails.gender}</h5>
            </div>
        
            <div className={classes.NextOfKinInfo}>
                <h5>Occupation:</h5>
                 <h5>{this.state.nextofkinDetails.occupation}</h5>
            </div>

            <div className={classes.NextOfKinInfo}>
                <h5>Relationship:</h5>
                 <h5>{this.state.nextofkinDetails.relationship}</h5>
            </div>
            
            <div className={classes.NextOfKinInfo}>
                <h5>Date Of Birth:</h5>
                 <h5>{this.state.nextofkinDetails.date_of_birth}</h5>
            </div>
            
         </div> 
        )
    }
}




export default NextOfKin