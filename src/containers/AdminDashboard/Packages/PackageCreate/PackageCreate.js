import React,{Component} from 'react';
import classes from './PackageCreate.css'
import {apiUrl} from '../../../../reusables/endpoints';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';



class PackageCreate extends Component{

    
    state={
        packageDetails:{
            modules:[],
           package_name:'',
           amount:'',
           subscription:'1',
           validity:'0',
           package_order:'1',
           logo:'ghgfhgfhtftft',
           admin_id:3,
           date:new Date().toString()
        },
        moduleDetails:{
            modules:[],
        }
    }
    

   componentDidMount =()=>{
    let Url = apiUrl()
           
    fetch(`${Url}/v1/api/modules`)
    .then(res => res.json())
    .then(response => {
        console.log(response)
        let newArr = [...this.state.moduleDetails.modules]
       this.setState({
             moduleDetails:{
                modules:newArr.concat(response.data)
             }
            
            })
        })
    .catch(err => console.log(err))

   }

   package_details={
    packageName:[],
    amount:[]
    }

    change=(e)=>{
        let package_name;
        let amount;

         e.target.placeholder ==='package name'? this.package_details.packageName.push(e.target.value):package_name='';
         e.target.placeholder ==='amount'?this.package_details.amount.push(e.target.value):amount='';
       
        console.log(this.package_details.packageName,this.package_details.amount)

        let packageNameArrLength = this.package_details.packageName.length;
        let amountArrLength = this.package_details.amount.length

        this.setState({
            packageDetails:{
                ...this.state.packageDetails,
                package_name:this.package_details.packageName[packageNameArrLength-1],
                amount:this.package_details.amount[amountArrLength-1]
            }
        })
    }
    
    modules =[]
    getModule=(e)=>{
       
     
        let oldArr = [...this.state.packageDetails.modules]
       
        this.setState({
            packageDetails:{
                ...this.state.packageDetails,
                modules:oldArr.concat(e.target.value)
            }
        })
    }

    getSubscription=(e)=>{
       
        console.log(e.target.value)
        this.setState({
            packageDetails:{
                ...this.state.packageDetails,
                subscription:e.target.value
            }
        })
    }

    getOrder=(e)=>{
       
        console.log(e.target.value)
        this.setState({
            packageDetails:{
                ...this.state.packageDetails,
                package_order:e.target.value
            }
        })
    }

    getValidity=(e)=>{
       
        console.log(e.target.value)
        this.setState({
            packageDetails:{
                ...this.state.packageDetails,
                validity:e.target.value
            }
        })
    }

    submitFormHandler =(e)=>{
       
        let Url = apiUrl()

        let arr=this.state.packageDetails.modules

        let newArr = arr.join(',')

        console.log(newArr)

        this.setState({
            packageDetails:{
                ...this.state.packageDetails,
                modules:newArr
            }
        },()=>{
              
        //create packages
         fetch(`${Url}/v1/api/packages`,{
            method:'POST',
            body:JSON.stringify(this.state.packageDetails),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>res.json())
        .then(response => {
            console.log(response);  
            this.props.history.goBack();           
           })
        .catch(err=>console.log(err))



        })


        
       
     
    }

    render(){
        return(
            <div style={{marginLeft:'30px'}}>
                 
                 <h2 style={{paddingLeft:'10px'}}>Create A Package</h2>
             <div>
                <h4>Modules</h4>
        {this.state.moduleDetails.modules.map(module => (<div><input type="checkbox" value={module.module_name} onClick={(e)=>this.getModule(e)}/><p>{module.module_name}</p></div>))}
             </div>
             <hr style={{display:"block",width:"auto"}}/>  
              
             <div>
                <div>
                    <div>Package Name</div>
                    <div>
                       <input type="text" placeholder="package name" onChange={(e)=>this.change(e)} />
                    </div>
                   
                </div> 
                <div>
                    <div>
                        Amount
                    </div>
                    <div>
                       <input type="text" placeholder="amount" onChange={(e)=>this.change(e)}/>
                    </div>
                    
                </div> 
                <div>
                    <div>
                       Order
                    </div>
                    <div>
                       <select onChange={(e)=>this.getOrder(e)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                       </select>
                    </div>
                    
                </div> 

                <div>
                    <div>
                       Subscription
                    </div>
                    <div>
                       <select onChange={(e)=>this.getSubscription(e)}>
                            <option value='1'>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            
                       </select>
                    </div>
                    
                </div> 

                <div>
                    <div>
                       Validity
                    </div>
                    <div>
                    <select onChange={(e)=>this.getValidity(e)}>
                            <option value='0'></option>
                            <option value='1'>1 month</option>
                            <option value="2">2 months</option>
                            <option value="3">3 months</option>
                            <option value="4">4 months</option>
                            <option value="5">5 months</option>
                            <option value="6">6 months</option>
                            <option value="7">7 months</option>
                            <option value="8">8 months</option>
                            <option value="9">9 months</option>
                            <option value="10">10 months</option>
                            <option value="11">11 months</option>
                            <option value="12">12 months</option>
                            
                       </select>
                    </div>
                    
                </div> 
             </div>   
             <div>
                    <button className={classes.Button} onClick={(e)=>this.submitFormHandler(e)}>add</button>
                    <button className={classes.MobileButton} onClick={(e)=>this.submitFormHandler(e)}>add</button>
             </div>
       </div>
        )
    }
}


export default withRouter(PackageCreate)