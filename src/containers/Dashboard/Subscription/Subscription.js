import React,{Component} from 'react'
import{apiUrl} from '../../../reusables/endpoints';
import DisplayPackages from './DisplayPackages/DisplayPackages';
import SubscriptionHistory from './SubscriptionHistory/SubscriptionHistory'
import {Route,Switch,withRouter} from 'react-router-dom'
import PaymentGateway from '../../AdminDashboard/PaymentGateway/PaymentGateway'




class Subscription extends Component{
     state={
         packageDetails:{
             packages:[]
         },
         subscriptions:[],
         displayPaymentGateway:false, 
         company_email:'',
         modules:''
     }

    componentDidMount =()=>{
        let Url = apiUrl()
        let companyDetails = JSON.parse(localStorage.getItem('company_details'));

        let companyDetailsLength = companyDetails.length


        this.setState({
            company_email:companyDetails[companyDetailsLength-1].data.email
        })
        
         
        //get packages
        fetch(`${Url}/v1/api/packages`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            let newArr = [...this.state.packageDetails.packages]
           this.setState({
                 packageDetails:{
                    packages:newArr.concat(response.data)
                 }
                
                })
            })
        .catch(err => console.log(err))


        //get subscriptions    
       if (companyDetails[0].data.id) {
           
        fetch(`${Url}/v1/api/subscriptions/${companyDetails[companyDetailsLength-1].data.id}`)
        .then(res => res.json())
        .then(response => {
            console.log(response.data)
            let newArr = [...this.state.subscriptions]
           this.setState({
                   
                    subscriptions:newArr.concat(response.data)
          
                
                })
            })
        .catch(err => console.log(err))
       } 
        
    }


    subscribe=(e,index)=>{
       let selectedPackage;
       let Url = apiUrl()
       e.preventDefault()

         this.setState({
             displayPaymentGateway: true
         })
      
        // console.log(this.state.packageDetails.packages[index])  
         
        // selectedPackage = this.state.packageDetails.packages[index]

        // let companyDetails = JSON.parse(localStorage.getItem('company_details'));

        
        // let subscriptionDetails={
        //     modules:selectedPackage.modules,
        //     purchase_date:'28/08/20',
        //     expiry_date:'28/08/20',
        //     status:'active',
        //     company_id:companyDetails[0].data.id,
        //     package_id:selectedPackage.package_id
        // }
       

        // fetch(`${Url}/v1/api/subscriptions`,{
        //     method:'POST',
        //     body:JSON.stringify(subscriptionDetails),
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

        let modal;

        console.log(this.state.subscriptions)

        if (this.state.displayPaymentGateway) {
           modal = (
            <div style={{width:'500px',margin:'0 auto',backgroundColor:'white',height:'437px',zIndex:'1',position:'absolute',top:'10px',display:'flex'}}>
                    <div>
                        <img />
                        <button>Pay</button>
                    </div>

                    <a href='#'>Close</a>
           </div>
           ) 
        }else{
            modal= null;
        }
       
        return(
            <div style={{marginLeft:'30px',zIndex:'0'}}>
                <h1>Subscription Packages</h1>
               <div style={{position:'relative',display:'flex'}}>
               {this.state.packageDetails.packages.map((packages,index) => <DisplayPackages id={packages.package_id} key={packages.package_id} index={index} item={packages} subscribe={this.subscribe} companyEmail={this.state.company_email}/>)}
               </div> 

             <h3>Subscription History</h3>
            
             {/* {this.state.subscriptions.map((subscription,index) => <SubscriptionHistory id={subscription.subscription_id} key={subscription.subscription_id} index={index} item={subscription}  />)} */}
             

              {modal}
            
             
       </div>
        )
    }
}


export default withRouter(Subscription)