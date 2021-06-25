import React,{Component} from 'react';
import classes from './LoginPage.css';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import Form from '../../components/Forms/Form/Form';
import Input from '../../components/Forms/Input/Input';
import Button from '../../components/Forms/Button/Button';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/DisplayModal/DisplayModal';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

 
let apiUrl;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV ==='production') {
    apiUrl = 'https://api-remi-hr.herokuapp.com'
}else{
  
   apiUrl = 'http://localhost:5000'
}


class LoginPage extends Component{





    state={
        login:{
            email:'',
            password:'',
            company_id:0,
            company_name:''
        },
        response:{
            id:'',
            token:'',
            
        },
        displayLoader:false,
        displayContent:false,
        displayUnauthorisedWarning:false,
        isAdmin:false,
        displayModal:false,
        showPassword:false
    }

    newlogin={
        email:[],
        password:[]
    }


    componentDidMount =() =>{

        let companyName

         
        //   console.log(this.props.match.params.name)
        // let data = {
        //     company_name:this.props.match.params.name
        // }
        this.props.match.params.name ? companyName = this.props.match.params.name: companyName = '';
        this.props.match.params.admin? this.props.role('admin'):this.props.role('employee')
       
        console.log(companyName)

        if (companyName) {
                //find company based on name from URL Link
       //http://localhost:5000/V1/api/companies/search
       //https://api-remi-hr.herokuapp.com/v1/api/companies/search
        fetch(`${apiUrl}/v1/api/companies?username=${companyName}`,{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>res.json())
        .then(response => {
             console.log(response)

             if (response.status ===200) {
                    let key = 'company_details';
                    this.addToLocalStorage(response,key)
                    this.setState({
                        displayContent:true,
                        login:{
                            company_id:response.data.company_id,
                            company_name:response.data.company_name
                        }
                    })

                    console.log(response.data.id)
             }else if(response.status ===404){
                this.setState({
                    displayUnauthorisedWarning:true
                })
             }
            
             
           })
        .catch(err=>console.log(err))
       
        }else{
            this.setState({
                displayUnauthorisedWarning:true
            })
        }
      
    }
   
    onChangeHandler =(e) =>{
        let email;
        let password;

          e.target.type ==='email'? this.newlogin.email.push(e.target.value):email='';
         e.target.type ==='password'?this.newlogin.password.push(e.target.value):password='';
       
        console.log(this.newlogin.email,this.newlogin.password)

        let emailArrLength = this.newlogin.email.length;
        let passwordArrLength = this.newlogin.password.length

        this.setState({
            login:{
                email:this.newlogin.email[emailArrLength-1],
                password:this.newlogin.password[passwordArrLength-1],
                // company_id:this.state.login.company_id
            }
        })
    }

    submitFormHandler =(e)=>{
        e.preventDefault();
        
        let loginUrl;
        let loginDetails

        
            
        if (this.props.roles==='admin') {
            loginUrl = `${apiUrl}/v1/api/company`
            loginDetails = {
                company_email:this.state.login.email,
                password:this.state.login.password
            }
        }else{
            loginUrl = `${apiUrl}/v1/api/login`
            loginDetails = {
                email:this.state.login.email,
                password:this.state.login.password
            }
        }
        

        console.log(loginUrl)
        console.log(loginDetails)
    
         fetch(loginUrl,{
             method:'POST',
             body:JSON.stringify(loginDetails),
             headers:{
                 'Content-Type':'application/json'
             }
         }).then(res =>res.json())
         .then(response => {
             console.log(response);
              
             if (response.data) {

                   //save to Local Storage
              let key = 'response_value'
              this.addToLocalStorage(response,key)
              this.addToLocalStorage(this.props.roles,'role')
              this.setState({
                  response:{
                       id: response.id,
                       token: response.token
                  }
               })
              this.props.history.push('/dashboard')
             }else{
                 this.setState({
                     displayModal:true
                 })
             }
            
            })
         .catch(err=>console.log(err))
    }

    addToLocalStorage =(response,key)=>{
        let item;
        if (localStorage.getItem(key)===null) {
            item = []
        }else{
          item = JSON.parse(localStorage.getItem(key))
        }

        item.push(response)

         localStorage.setItem(key,JSON.stringify(item))

    }

    handleModalClose = ()=>{
        this.setState({
            displayModal:false
        })
    }

    handleIcon=()=>{
        return <VisibilityIcon />
    }

    togglePassword =(e)=>{
         
        e.persist()
        
       
        if(e.target.tagName==='path'){
            // console.log('hey')
            // console.log(e.target.parentElement.parentElement.previousElementSibling)
            // console.log(e)

            if (e.target.parentElement.parentElement.previousElementSibling.type==='password') {
                e.target.parentElement.parentElement.previousElementSibling.type='text';
                this.setState({showPassword:!this.state.showPassword})
            }else if(e.target.parentElement.parentElement.previousElementSibling.type==='text'){
                e.target.parentElement.parentElement.previousElementSibling.type='password';
                this.setState({showPassword:!this.state.showPassword})
            }
        }
    }

    render(){
          let content;
          let modal

          this.state.displayModal?modal=<Modal afterClose={this.handleModalClose} />:modal=null

         if (this.state.displayContent) {
            //get company details from Local storage
            let companyDetails = JSON.parse(localStorage.getItem('company_details'));
              
             content = (
                <div className={classes.Container}>
                    {modal}
                <div className={classes.Left}>

                    <div className={classes.Logo}>
                       <img src={window.location.origin + `/images/${companyDetails[0].data.logo}`}/>
                    </div>
                    <h4>Log into your account</h4>
                </div>
                 {console.log(this.state.login)}
                <div className={classes.Right}>
                    <p><Link to="/">Go Home</Link></p>

                    <h3>{this.state.login.company_name}</h3>
                    <Form submit={(e)=>this.submitFormHandler(e)}>
                            <Input type='email' placeholder='email' change={(e)=> this.onChangeHandler(e)}/>
                            <Input type='password' placeholder='password' change={(e)=> this.onChangeHandler(e)} icon={this.state.showPassword?<VisibilityOffIcon />:<VisibilityIcon />} toggle={this.togglePassword} style={{width:'50%'}}/>
                            <p 
                            style={
                                {
                                margin:0,
                                padding:0,
                                color:'#65B765',
                                paddingLeft:'172px',
                                display:'inline'
                                }}>Forgot password?</p>
                            <Button submit={(e)=>this.submitFormHandler(e)}>Log In</Button>
                    </Form>
                </div>
            </div>
             ) 
         }else if(this.state.displayUnauthorisedWarning===true){
                content =   (
                    <div className={classes.Warning}>
                   
                    <h2>You are not Authorised to perform this action</h2>
                    <p>Company not found.Check URL</p>
                    <Button><Link to='/'>Go Back</Link></Button>
                    </div> 
                )
         }
         else{
             content ='loading...'
         }

        
        return(
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:1}}
            className={classes.Background}>
                 {content}
                
                
            </motion.div>
        )
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        role:(role) => dispatch({type:actionTypes.SET_ACCOUNT_TYPE,role:role})
    }
}

const mapStateToProps = state =>{
    return {
        roles:state.role
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginPage))