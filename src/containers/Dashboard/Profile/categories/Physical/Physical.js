import React,{Component}from 'react';
import classes from './Physical.css';
import {apiUrl} from '../../../../../reusables/endpoints'



class Physical extends Component{
    
    state={
        physicalDetails:{}
    }

    componentDidMount=()=>{

        let userDetails = JSON.parse(localStorage.getItem('response_value'))
        let userId;
        userDetails? userId = userDetails[0].data.id: userId = null;
       
        console.log(apiUrl)

        let Url = apiUrl()

        console.log(Url)
       
        fetch(`${Url}/v1/api/physical/${userId}`)
        .then(res => res.json())
        .then(response => {
            console.log(response.data)
            let oldState = {...this.state.physicalDetails}
            let newState = response.data;
            this.setState({
                physicalDetails:{...oldState,...newState}
               })
        })
        .catch(err => console.log(err))
 
    }


    render(){
        return(
            <div style={{width:'90%',margin:'0 auto'}}>
            <h6 style={{color:'rgba(1, 22, 39, 0.5)'}}>Physical and Medical Information</h6>
             <div className={classes.PhysicalInfo}>
                <h5>Weight:</h5>
                <h5>{this.state.physicalDetails.weight}</h5>
            </div>
        
            <div className={classes.PhysicalInfo}>
                <h5>Height:</h5>
                 <h5>{this.state.physicalDetails.height}</h5>
            </div>
        
            <div className={classes.PhysicalInfo}>
                <h5>BMI:</h5>
                 <h5>{this.state.physicalDetails.BMI}</h5>
            </div>
        
            <div className={classes.PhysicalInfo}>
                <h5>Blood Group:</h5>
                 <h5>{this.state.physicalDetails.blood_group}</h5>
            </div>
        
            <div className={classes.PhysicalInfo}>
                <h5>Genotype:</h5>
                 <h5>{this.state.physicalDetails.genotype}</h5>
            </div>
        
            
         </div> 
        )
    }
}




export default Physical