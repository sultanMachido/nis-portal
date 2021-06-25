import React,{Component} from 'react';
import { PaystackButton } from 'react-paystack'
import{apiUrl} from '../../../../reusables/endpoints';
import classes from './DisplayPackages.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


class  DisplayPackages extends Component{
    
    state={
        modules:'',
        day:'',
        expiryDaay:''

    }

    componentDidMount=()=>{

        let date = new Date

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        console.log(`${year}-${month}-${day}`)

       

        

        this.setState({
            day:`${year}-${month}-${day}`
        })
    }

   
    paystackSuccess=()=>{
       
        console.log('paid')
    }
    
    componentProps = {
        email:'opehardesina@gmail.com',
        amount:this.props.item.amount*100,
        publicKey:'pk_test_78800ad863fae1004b3acffea2b1d368624497f2',
        text: "Subscribe",
        onSuccess: () =>{



        let d = new Date();
        d.setDate(d.getDate() + (30*this.props.item.validity));

        console.log(d)

        let newYear = d.getFullYear();
        let newMonth = d.getMonth()+1;
        let newDate =  d.getDate();


        this.setState({
            expiryDay:`${newYear}-${newMonth}-${newDate}`
        })

        console.log(newYear,newMonth,newDate)
       
        let companyDetails = JSON.parse(localStorage.getItem('company_details'));    
        let companyDetailsLength = companyDetails.length
        let Url = apiUrl()
        let subscriptionDetails={
            modules:this.props.item.modules,
            purchase_date:this.state.day,
            expiry_date:this.state.expiryDay,
            status:'active',
            company_id:companyDetails[companyDetailsLength-1].data.company_id,
            package_id:this.props.item.package_id
        }

        console.log(subscriptionDetails)
       

        fetch(`${Url}/v1/api/subscriptions`,{
            method:'POST',
            body:JSON.stringify(subscriptionDetails),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>res.json())
        .then(response => {
            console.log(response);  
            window.location.reload(false)           
           })
        .catch(err=>console.log(err))
           
        },
         
        onClose: () => alert("Wait! Don't leave"),
      }

    render(){
        return(
            
            // <div style={{backgroundColor:"white",margin:'10px',width:'30%',textAlign:'center'}} >
            <Paper elevation={3} className={classes.Card}>
             

    
            <div>
              <h3>{this.props.item.package_name}</h3>
              <p>{this.props.item.amount}</p>
            </div>

            <div>
                <ul>
                    <li>Employee Management</li>
                    <li>Tech enhanced recruitment</li>
                    <li>Employee Management</li>
                </ul>
            </div>
    
            <div>
                {/* <a style={{color:'blue',paddingLeft:'20px'}} href={this.props.id} onClick={(e)=>this.props.subscribe(e,this.props.index)}>Subscribe</a>  */}
                {/* <PaystackButton amount={this.props.item.amount*100} email={this.props.companyEmail} text='Pay with Paystack' publicKey='pk_test_c88b47c51718db7d74d7efecf57b2a8a180fc692' onClose={() => alert("Thanks for doing business with us! Come back soon!!")}/> */}
                <PaystackButton className={classes.btn}  {...this.componentProps}/>
                
            </div>
            
            </Paper>
        // </div>
        )
    }
}





export default DisplayPackages