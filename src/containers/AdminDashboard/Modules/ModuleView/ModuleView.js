import React,{Component} from 'react';
import classes from './ModuleView.css'
import {apiUrl} from '../../../../reusables/endpoints';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import Display from '../../Display/Display';
import SwitchButton from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



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


  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

class ModuleView extends Component{

    
    state={
        packageDetails:{
            modules:[],
            displayModal:false,
            moduleToDisplay:0,
            module_name:'',
            sub_url:'',
            moduleDetails:{
                module_name:'',
                sub_url:'',
                date:new Date().toString(),
            }
        }
    }

    componentDidMount =()=>{


        let Url = apiUrl()
           
        fetch(`${Url}/v1/api/modules`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            let newArr = [...this.state.packageDetails.modules]
           this.setState({
                 packageDetails:{
                    modules:newArr.concat(response.data)
                 }
                
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
            moduleToDisplay: moduleId,
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

       fetch(`${Url}/v1/api/modules/${moduleId}`,{
           method:'DELETE'
       })
       .then(res => res.json())
       .then(response => {
           console.log(response)
           
           let oldArr = [...this.state.packageDetails.modules]
           oldArr.splice(index,1)

           console.log(oldArr)
            this.setState({
                packageDetails:{
                    modules:oldArr
                }
              
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
        console.log(e)
        let Url = apiUrl()
        let moduleDetails={
            module_name :'',
            sub_url:''
        }

        if (!this.state.moduleDetails.module_name && !this.state.moduleDetails.sub_url) {
            moduleDetails.module_name=this.state.module_name
            moduleDetails.module_name=this.state.sub_url
        }else{
            moduleDetails={...this.state.moduleDetails}
        }
       
        //create module
         fetch(`${Url}/v1/api/modules/${this.state.moduleToDisplay}`,{
             method:'PUT',
             body:JSON.stringify(this.state.moduleDetails),
             headers:{
                 'Content-Type':'application/json'
             }
         }).then(res =>res.json())
         .then(response => {
             console.log(response);    
             console.log(window.href)         
            })
         .catch(err=>console.log(err))

         //reload page after updating
         window.location.reload(false)
    }
    


    render(){
         let modal
        if (this.state.displayModal) {
           modal =(
            <div style={{width:'388px',margin:'0 auto',backgroundColor:'white',height:'437px',zIndex:'1',position:'absolute',top:'10px'}}>
            <div style={{textAlign:'center',paddingTop:'20px'}}>
               <p style={{fontSize:'20px'}}>Update Module</p>
            </div>
            
            <div style={{paddingTop:'50px'}} >
                
                <input className={classes.Inp} placeholder="module name" value={this.state.module_name} onChange={(e)=>this.change(e)} />

            </div>
            <div style={{paddingTop:'50px'}} >
                
                <input className={classes.Inp} placeholder="sub url" value={this.state.sub_url} onChange={(e)=>this.change(e)} />

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
        <div className={classes.Container}>
               <div className={classes.ModuleContainer}>
               <h4>Modules</h4>
               {this.state.packageDetails.modules.map((module,index) => (

               <div className={classes.Module}>
                   
                  <Display id={module.module_id} key={module.module_id} index={index} item={module.module_name} update={this.displayUpdateModal} delete={this.deleteHandler}/> 
                  <AntSwitch />
               </div>    
               
               ))}
             </div> 
           
             
              {modal}
       </div>
        )
    }
}






export default ModuleView