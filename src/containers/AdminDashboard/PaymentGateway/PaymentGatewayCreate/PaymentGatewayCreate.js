import React,{Component} from 'react';
import classes from './PaymentGatewayCreate.css'
import {apiUrl} from '../../../../reusables/endpoints';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';



class PaymentGatewayCreate extends Component{

    
    state={
        paymentGatewayDetails:{
           gateway_name:'',
           secret_key:'',
           public_key:''
        }
    }
    

   

   gateway_details={
    gatewayName:[],
    secretKey:[],
    publicKey:[]
    }

    change=(e)=>{
        let gatewayName;
        let secretKey;
        let publicKey;

         e.target.placeholder ==='payment gateway name'? this.gateway_details.gatewayName.push(e.target.value):gatewayName='';
         e.target.placeholder ==='secret key'?this.gateway_details.secretKey.push(e.target.value):secretKey='';
         e.target.placeholder ==='public key'?this.gateway_details.publicKey.push(e.target.value):publicKey='';
        
         console.log(this.gateway_details)
       

        let gatewayNameArrLength = this.gateway_details.gatewayName.length;
        let secretKeyArrLength = this.gateway_details.secretKey.length
        let publicKeyArrLength = this.gateway_details.publicKey.length

        this.setState({
            paymentGatewayDetails:{
                ...this.state.paymentGatewayDetails,
                gateway_name:this.gateway_details.gatewayName[gatewayNameArrLength-1],
                secret_key:this.gateway_details.secretKey[secretKeyArrLength-1],
                public_key:this.gateway_details.publicKey[publicKeyArrLength-1],
            }
        })
    }
    
   

    submitFormHandler =(e)=>{
       
        let Url = apiUrl()

       
              
        //create packages
         fetch(`${Url}/v1/api/paymentgateway`,{
            method:'POST',
            body:JSON.stringify(this.state.paymentGatewayDetails),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>res.json())
        .then(response => {
            console.log(response); 

            console.log(this.props.history)
            this.props.history.goBack()         
           })
        .catch(err=>console.log(err))



       


        
       
     
    }

    render(){
        return(
            <div style={{marginLeft:'30px'}}>
                 
                 <h2 style={{paddingLeft:'10px'}}>Add A Payment Gateway</h2>
           
             <hr style={{display:"block",width:"auto"}}/>  
              
             <div>
                <div>
                    <div>Payment Gateway Name</div>
                    <div>
                       <input type="text" placeholder="payment gateway name" onChange={(e)=>this.change(e)} />
                    </div>
                   
                </div> 
                <div>
                    <div>
                        Secret Key
                    </div>
                    <div>
                       <input type="text" placeholder="secret key" onChange={(e)=>this.change(e)}/>
                    </div>
                    
                </div> 
                <div>
                    <div>
                        Public Key
                    </div>
                    <div>
                       <input type="text" placeholder="public key" onChange={(e)=>this.change(e)}/>
                    </div>
                    
                </div>
              

                

               
             </div>   
             <div>
                    <button className={classes.Button} onClick={(e)=>this.submitFormHandler(e)}>add</button>
             </div>
       </div>
        )
    }
}


export default withRouter(PaymentGatewayCreate)