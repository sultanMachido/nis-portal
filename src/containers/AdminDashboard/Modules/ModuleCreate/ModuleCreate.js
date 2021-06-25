import React,{Component} from 'react';
import classes from './ModuleCreate.css'
import {apiUrl} from '../../../../reusables/endpoints';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';



class ModuleCreate extends Component{

    
    state={
        moduleDetails:{
            module_name:'',
            sub_url:'',
            date:new Date().toString(),
        }
    }
    

    module_details={
        moduleName:[],
        subUrl:[]
    }

    change=(e)=>{
        let module_name;
        let sub_url;

         e.target.placeholder ==='module name'? this.module_details.moduleName.push(e.target.value):module_name='';
         e.target.placeholder ==='sub url'?this.module_details.subUrl.push(e.target.value):sub_url='';
       
        console.log(this.module_details.moduleName,this.module_details.subUrl)

        let moduleNameArrLength = this.module_details.moduleName.length;
        let subUrlArrLength = this.module_details.subUrl.length

        this.setState({
            moduleDetails:{
                module_name:this.module_details.moduleName[moduleNameArrLength-1],
                sub_url:this.module_details.subUrl[subUrlArrLength-1],
               date:new Date().toDateString()
            }
        })
    }


    submitFormHandler =(e)=>{
        e.preventDefault();
        console.log(new Date().toDateString())
        let Url = apiUrl()
       
        //create module
         fetch(`${Url}/v1/api/modules`,{
             method:'POST',
             body:JSON.stringify(this.state.moduleDetails),
             headers:{
                 'Content-Type':'application/json'
             }
         }).then(res =>res.json())
         .then(response => {
             console.log(response);
             this.props.history.goBack()             
            })
         .catch(err=>console.log(err))
    }

    render(){
        return(
            <div style={{marginLeft:'30px'}}>
                 
            <div>
               <p style={{fontSize:'20px'}}>Modules</p>
           </div> 
             <div>

             </div>
            <div style={{width:'388px',margin:'0 auto',backgroundColor:'white',height:'437px'}}>
                 <div style={{textAlign:'center',paddingTop:'20px'}}>
                    <p style={{fontSize:'20px'}}>Add New Module</p>
                 </div>
                 
                 <div style={{paddingTop:'50px'}} >
                     
                     <input className={classes.Inp} placeholder="module name" onChange={(e)=>this.change(e)} />

                 </div>
                 <div style={{paddingTop:'50px'}} >
                     
                     <input className={classes.Inp} placeholder="sub url" onChange={(e)=>this.change(e)} />

                 </div>
                 <div>
                    <button className={classes.Button} onClick={(e)=>this.submitFormHandler(e)}>add</button>
                 </div>
                 
                

            </div>

       </div>
        )
    }
}


export default ModuleCreate