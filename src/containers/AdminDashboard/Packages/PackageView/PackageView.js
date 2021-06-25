import React,{Component} from 'react';
import classes from './PackageView.css';
import {apiUrl} from '../../../../reusables/endpoints';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import Display from '../../Display/Display';
import DisplayPackages from '../../DisplayPackages/DisplayPackages';
import {removeDuplicates} from '../../../../reusables/removeDuplicates'
import DisplayModule from '../DisplayModule/DisplayModule';
import { withStyles } from '@material-ui/core/styles';
import SwitchButton from '@material-ui/core/Switch';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';


const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.black,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.grey[500],
          borderColor: theme.palette.grey[500],
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.black}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(SwitchButton);

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

class PackageView extends Component{

    
    state={
        packageDetails:{
            packages:[],
            
            modules:[]
        },
        displayModal:false,
        packageToDisplay:0,
        moduleDetails:{
            modules:[],
        },
        package_details:{
            modules:[],
            package_name:[],
            amount:[],
            subscription:'',
            validity:'',
            package_order:'',
            logo:'',
            admin_id:3,
            date:new Date().toString()
        }
    }

    componentDidMount =()=>{


        let Url = apiUrl()
           
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

    
    displayUpdateModal=(e)=>{
        let url;
        let urlLength;
        let packageId
        let Url = apiUrl()
        console.log(e.target.href)
       e.preventDefault();
       url = e.target.href.split('');
       urlLength = url.length
       let slashPosition = url.lastIndexOf('/')
       slashPosition++  
       console.log(url)
       packageId = url.splice(slashPosition).join('')
      
        console.log(packageId)  


            this.setState({
               
                 packageToDisplay: packageId,
                 displayModal:true
             
                
               })
           

            

            
    }

    deleteHandler =(e,index)=>{
        let url;
        let urlLength;
        let packageId
        let Url = apiUrl()
        console.log(e.target.href)
       e.preventDefault();
       url = e.target.href.split('');
       urlLength = url.length
       let slashPosition = url.lastIndexOf('/')
       slashPosition++  
       console.log(url)
       packageId = url.splice(slashPosition).join('')
      
        console.log(packageId)  
      

       fetch(`${Url}/v1/api/packages/${packageId}`,{
           method:'DELETE'
       })
       .then(res => res.json())
       .then(response => {
           console.log(response)

             
           let oldArr = [...this.state.packageDetails.packages]
           oldArr.splice(index,1)

           console.log(oldArr)
            this.setState({
                packageDetails:{
                    packages:oldArr
                }
              
            })
         
       
           })
       .catch(err => console.log(err))

    }

    package_details={
        packageName:[],
        amount:[]
        }
    
        // change=(e)=>{
        //     let package_name;
        //     let amount;
    
        //      e.target.placeholder ==='package name'? this.package_details.packageName.push(e.target.value):package_name='';
        //      e.target.placeholder ==='amount'?this.package_details.amount.push(e.target.value):amount='';
           
        //     console.log(this.package_details.packageName,this.package_details.amount)
    
        //     let packageNameArrLength = this.package_details.packageName.length;
        //     let amountArrLength = this.package_details.amount.length
    
        //     this.setState({
        //         packageDetails:{
        //             ...this.state.packageDetails,
        //             package_name:this.package_details.packageName[packageNameArrLength-1],
        //             amount:this.package_details.amount[amountArrLength-1]
        //         }
        //     })
        // }
        
    closeModal =()=>{
        this.setState({
            displayModal:false
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
        for (const property in this.state.package_details) {
                if(this.state.package_details[property]===''){
                    console.log(`${property}: ${this.state.package_details[property]}`);
                    delete this.state.package_details[property]
                }    
        }


        this.setState({
            package_details:{
                ...this.state.package_details,
            }
        },()=>{

            console.log(this.state.package_details)
            console.log(this.state.packageToDisplay)
              
        //create packages
         fetch(`${Url}/v1/api/packages/${this.state.packageToDisplay}`,{
            method:'PUT',
            body:JSON.stringify(this.state.package_details),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>res.json())
        .then(response => {
            console.log(response);             
           })
        .catch(err=>console.log(err))



        })



         //reload page after updating
         window.location.reload(false)

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


    //update functions

    package_details={
        modules:[],
        package_name:[],
        amount:[],
        subscription:'',
        validity:'',
        package_order:'',
        logo:'',
        admin_id:3,
        date:new Date().toString()
        }
    
        changeUpdate=(e)=>{
            let package_name;
            let amount;
    
             e.target.placeholder ==='package name'? this.package_details.package_name.push(e.target.value):package_name='';
             e.target.placeholder ==='amount'?this.package_details.amount.push(e.target.value):amount='';
           
            console.log(this.package_details.package_name,this.package_details.amount)
    
            let packageNameArrLength = this.package_details.package_name.length;
            let amountArrLength = this.package_details.amount.length


            

            
    
            this.setState({
                package_details:{
                    ...this.state.package_details,
                    package_name:this.package_details.package_name[packageNameArrLength-1],
                    amount:this.package_details.amount[amountArrLength-1]
                }
            })
        }

        getPackageDetails=()=>{

            let Url = apiUrl()
             
            if (this.state.packageDetails.packageToDisplay) {
                fetch(`${Url}/v1/api/packages/${this.state.packageDetails.packageToDisplay}`)
                .then(res => res.json())
                .then(response => {
                    console.log(response)
                    // let newArr = [...this.state.moduleDetails.modules]
                    
                    return response.data
                // this.setState({
                //         moduleDetails:{
                //             modules:newArr.concat(response.data)
                //         }
                        
                //         })
                    })
                .catch(err => console.log(err))
            }else{
                return 'Package Id not found'
            }
           
        }
        
        modules =[]
        getModule=(e,index)=>{
           
           console.log(this.state.packageDetails)
            let oldArr = [...this.package_details.modules]
            
            console.log(index);
            console.log(e.target.checked)

            if (e.target.checked) {
                 this.package_details.modules.push(e.target.value)
            }else{
                this.package_details.modules.splice(index)
            }

            let newArr;
            let arr=this.package_details.modules
           
                newArr = arr.join(',')
           
            
                       
           

            console.log(this.package_details.modules)
            
            //remove duplicate items pushed into the array even when a checkbox has been unclicked
            // let  removed = removeDuplicates(this.package_details.modules)

            //  console.log(removed)

             //


            // this.package_details.modules = this.state.packageDetails.concat(e.target.value)
            this.setState({
                package_details:{
                   ...this.state.package_details,
                    modules:newArr
                }
            })
        }
    
        getSubscription=(e)=>{
           
            console.log(e.target.value)
            this.package_details.subscription = e.target.value
            // this.setState({
            //     packageDetails:{
            //         ...this.state.packageDetails,
            //         subscription:e.target.value
            //     }
            // })
        }
    
        getOrder=(e)=>{
           
            console.log(e.target.value)

            this.package_details.package_order = e.target.value
            // this.setState({
            //     packageDetails:{
            //         ...this.state.packageDetails,
            //         package_order:e.target.value
            //     }
            // })
        }
    
        getValidity=(e)=>{
           
            console.log(e.target.value)
            this.package_details.validity = e.target.value
            // this.setState({
            //     packageDetails:{
            //         ...this.state.packageDetails,
            //         validity:e.target.value
            //     }
            // })
        }
        

        getLogo=(e)=>{

            console.log(e.target.value)
            console.log(e.target.files[0].name)
            this.package_details.validity = e.target.value

        }


    render(){
         let modal
        if (this.state.displayModal) {
           modal =(
            <div style={{width:'388px',margin:'0 auto',backgroundColor:'white',height:'437px',zIndex:'1',position:'absolute',top:'10px'}}>
              
              <h2 style={{paddingLeft:'10px'}}>Create A Package</h2>
             <div>
                <h4>Modules</h4>
        {this.state.moduleDetails.modules.map((module,index) => <DisplayModule key={module.module_id} module={module} index={index} clicked={this.getModule}/>)}
             </div>
             <hr style={{display:"block",width:"auto"}}/>  
              
             <div>
                <div>
                    <div>Package Name</div>
                    <div>
                       <input type="text" placeholder="package name" onChange={(e)=>this.changeUpdate(e)} />
                    </div>
                   
                </div> 
                <div>
                    <div>
                        Amount
                    </div>
                    <div>
                       <input type="text" placeholder="amount" onChange={(e)=>this.changeUpdate(e)}/>
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

             {/* <div>
             <label for="myfile">Select a file:</label>
                 <input type="file" id="myfile" name="file"  onChange={(e)=>this.getLogo(e)}/><br/><br/>
            </div>  */}

            <button className={classes.Button} onClick={(e)=>this.closeModal(e)}>close</button>
               <button className={classes.Button} onClick={(e)=>this.submitFormHandler(e)}>add</button>
               
           
            
           

       </div>
           )
        }else{
            modal = null
        }
        return(
        <div className={classes.Container}>
               <div className={classes.PackageContainer}>
               {this.state.packageDetails.packages.map((packages,index) => 
               (
                <div classname={classes.Package}>
                    <DisplayPackages id={packages.package_id} key={packages.package_id} index={index} item={packages} update={this.displayUpdateModal} delete={this.deleteHandler} />
                    
                </div>
               ))}
             </div> 

             <div>
                 
                 <ThemeProvider theme={theme}> 
                 <Button variant="contained" color="primary" ><NavLink  activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url+'/create'}>Create Packages</NavLink></Button>
               </ThemeProvider>
             </div>
              {modal}
       </div>
        )
    }
}





export default withRouter(PackageView)