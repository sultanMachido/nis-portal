import React,{Component}from 'react';
import classes from './Payroll.css';
import {apiUrl} from '../../../../../reusables/endpoints'



class Payroll extends Component{
    
    state={
        payrollDetails:{}
    }

    componentDidMount=()=>{

        let userDetails = JSON.parse(localStorage.getItem('response_value'))
        let userId;
        userDetails? userId = userDetails[0].data.id: userId = null;
       
        console.log(apiUrl)

        let Url = apiUrl()

        console.log(Url)
       
        fetch(`${Url}/v1/api/payroll/${userId}`)
        .then(res => res.json())
        .then(response => {
            console.log(response.data)
            let oldState = {...this.state.payrollDetails}
            let newState = response.data;
            this.setState({
                payrollDetails:{...oldState,...newState}
               })
        })
        .catch(err => console.log(err))
 
    }


    render(){
        return(
            <div style={{width:'90%',margin:'0 auto'}}>
            <h6 style={{color:'rgba(1, 22, 39, 0.5)'}}>Payroll</h6>
             <div className={classes.PayrollInfo}>
                <h5>Bank Name:</h5>
                <h5>{this.state.payrollDetails.bank_name}</h5>
            </div>
        
            <div className={classes.PayrollInfo}>
                <h5>Bank Account Number:</h5>
                 <h5>{this.state.payrollDetails.bank_account_number}</h5>
            </div>
        
            <div className={classes.PayrollInfo}>
                <h5>Taxer Payer ID:</h5>
                 <h5>{this.state.payrollDetails.tax_payer_id}</h5>
            </div>
        
            <div className={classes.PayrollInfo}>
                <h5>Pension Remittance ID:</h5>
                 <h5>{this.state.payrollDetails.pension_remittance_id}</h5>
            </div>
        
            <div className={classes.PayrollInfo}>
                <h5>Insurance Policy Number:</h5>
                 <h5>{this.state.payrollDetails.insurance_policy_number}</h5>
            </div>
        
            
         </div> 
        )
    }
}




export default Payroll