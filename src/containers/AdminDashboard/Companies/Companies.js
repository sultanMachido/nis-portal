import React,{Component} from 'react';
import {apiUrl} from '../../../reusables/endpoints';
import DisplayCompanies from '../DisplayCompanies/DisplayCompanies'


class Companies extends Component{
   state={
       companies:[],
       company_details:{
        company_email:'',
        company_name:''
       }
      
   }
    componentDidMount=()=>{

        let Url = apiUrl()
       
        fetch(`${Url}/v1/api/companies`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            let newArr = [...this.state.companies]
           this.setState({
                
                    companies:newArr.concat(response.data)
                
                })
            })
        .catch(err => console.log(err))
    
    }


    deactivateHandler=(companyId)=>{

        let Url = apiUrl()

        console.log(companyId);
       let  detail={
            status:'inactive'
        }
         
        fetch(`${Url}/v1/api/companies/${companyId}`,{
            method:'PUT',
            body:JSON.stringify(detail),
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
    }

    activateHandler=(companyId)=>{

        let Url = apiUrl()

        console.log(companyId);
       let  detail={
            status:'active'
        }
         
        fetch(`${Url}/v1/api/companies/${companyId}`,{
            method:'PUT',
            body:JSON.stringify(detail),
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
    }

    
    subscriptionHandler=()=>{

    }




   

    updateHandler=()=>{

    }

    render(){
        return(
             <div style={{backgroundColor:'white',width:'80%',flexWrap:'wrap',margin:'0 auto'}}>
                 <h4 style={{paddingLeft:'40px',paddingTop:'20px'}}>Name</h4>
                 <hr style={{width:'98%'}}/>
                 {this.state.companies.map(company=><DisplayCompanies key={company.company_id} item={company} deactivate={this.deactivateHandler} activate={this.activateHandler}/>)}
                 
             </div>
        )
    }
}


export default Companies
