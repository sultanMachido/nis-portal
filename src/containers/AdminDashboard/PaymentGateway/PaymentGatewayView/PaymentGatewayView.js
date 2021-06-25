import React,{Component} from 'react';
import classes from './PaymentGatewayView.css'
import {apiUrl} from '../../../../reusables/endpoints';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import Display from '../../Display/Display';



class PaymentGatewayView extends Component{

    
    state={
        paymentgateway:[],
        displayModal:false,
        paymentGatewayToDisplay:0,
        paymentGatewayDetails:{
            gateway_name:'',
            secret_key:'',
            public_key:''
        },
        reload:false
    }

    componentDidMount =()=>{


        let Url = apiUrl()
           
        fetch(`${Url}/v1/api/paymentgateway`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            let newArr = [...this.state.paymentgateway]
           this.setState({
                 paymentgateway:newArr.concat(response.data)
                
                })
            })
        .catch(err => console.log(err))

    }

    
    displayUpdateModal=(e)=>{
        let url;
        let urlLength;
        let moduleId
        let Url = apiUrl()
        console.log(e.target.href)
       e.preventDefault();
       url = e.target.href.split('');
       urlLength = url.length
       let slashPosition = url.lastIndexOf('/')
       slashPosition++  
       console.log(url)
       moduleId = url.splice(slashPosition).join('')
      
        console.log(moduleId) 
        
        this.setState({
            paymentGatewayToDisplay: moduleId,
             displayModal:true
           })
   

            // fetch(`${Url}/v1/api/modules/${moduleId}`,{
            //     method:'PUT'
            // })
            // .then(res => res.json())
            // .then(response => {
            //     console.log(response)
              
           
            // .catch(err => console.log(err))

            
    }

    deleteHandler =(e,index)=>{
        let url;
        let urlLength;
        let moduleId
        let Url = apiUrl()
        console.log(e.target.href)
       e.preventDefault();
       url = e.target.href.split('');
       urlLength = url.length
       let slashPosition = url.lastIndexOf('/')
       slashPosition++  
       console.log(url)
       moduleId = url.splice(slashPosition).join('')
      
        console.log(moduleId)  

       fetch(`${Url}/v1/api/paymentgateway/${moduleId}`,{
           method:'DELETE'
       })
       .then(res => res.json())
       .then(response => {
           console.log(response)
           
           let oldArr = [...this.state.paymentgateway]
           oldArr.splice(index,1)

           console.log(oldArr)
            this.setState({
               
                paymentgateway:oldArr
               
              
            })
           })
       .catch(err => console.log(err))

    }

    module_details={
        moduleName:[],
        subUrl:[]
    }

    closeModal =()=>{
        this.setState({
            displayModal:false
        })
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
        e.preventDefault();
        console.log(this.state.package_details)
        let Url = apiUrl()

        let newArr
        // let arr=this.state.package_details.modules
        // if (this.state.package_details.modules.length) {
        //     newArr = arr.join(',')
        // }
       
         
      
        
           //remove object properties that are empty
        for (const property in this.state.paymentGatewayDetails) {
                if(this.state.paymentGatewayDetails[property]===''||this.state.paymentGatewayDetails[property]===undefined){
                    console.log(`${property}: ${this.state.paymentGatewayDetails[property]}`);
                    delete this.state.paymentGatewayDetails[property]
                }    
        }


        this.setState({
            paymentGatewayDetails:{
                ...this.state.paymentGatewayDetails,
            }
        },()=>{

            console.log(this.state.paymentGatewayDetails)
            // console.log(this.state.packageToDisplay)
              
        //create packages
         fetch(`${Url}/v1/api/paymentgateway/${this.state.paymentGatewayToDisplay}`,{
            method:'PUT',
            body:JSON.stringify(this.state.paymentGatewayDetails),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>res.json())
        .then(response => {
            console.log(response);   
            
            // location.reload();
            //   return false;
           
           })
        .catch(err=>console.log(err))

           
          //reload page after updating
          window.location.reload(false)

        })

        // this.package_details.modules = newArr
        // console.log(this.state.packageDetails.moduleToDisplay)
        // console.log(this.package_details)

        // fetch(`${Url}/v1/api/packages/${}`,{
        //     method:'PUT',
        //     body:JSON.stringify(this.state.packageDetails),
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }).then(res =>res.json())
        // .then(response => {
        //     console.log(response);             
        //    })
        // .catch(err=>console.log(err))


    }
    


    render(){
         let modal
        if (this.state.displayModal) {
           modal =(
            <div style={{width:'388px',margin:'0 auto',backgroundColor:'white',height:'437px',zIndex:'1',position:'absolute',top:'10px'}}>
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
            <button className={classes.Button} onClick={(e)=>this.closeModal(e)}>close</button>
               <button className={classes.Button} onClick={(e)=>this.submitFormHandler(e)}>add</button>
            </div>
            
           

       </div>
           )
        }else{
            modal = null
        }
        return(
        <div style={{marginLeft:'30px',zIndex:'0'}}>
               <div style={{position:'relative'}}>
               {this.state.paymentgateway.map((item,index) => <Display id={item.gateway_id} key={item.gateway_id} index={index} item={item.gateway_name} update={this.displayUpdateModal} delete={this.deleteHandler}/>)}
               </div> 
              {modal}
       </div>
        )
    }
}






export default PaymentGatewayView