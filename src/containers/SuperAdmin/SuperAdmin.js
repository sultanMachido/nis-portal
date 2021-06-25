import React,{Component} from 'react';
import classes from './SuperAdmin.css';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import Form from '../../components/Forms/Form/Form';
import Input from '../../components/Forms/Input/Input';
import Button from '../../components/Forms/Button/Button';



 
let apiUrl;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV ==='production') {
    apiUrl = 'https://api-remi-hr.herokuapp.com'
}else{
  
   apiUrl = 'http://localhost:5000'
}


class SuperAdmin extends Component{





    state={
        login:{
            email:'',
            password:''
        },
        response:{
            id:'',
            token:''
        },
        displayLoader:false,
        displayContent:false,
        displayUnauthorisedWarning:false
    }

    newlogin={
        email:[],
        password:[]
    }


    componentDidMount =() =>{

    
      
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
                password:this.newlogin.password[passwordArrLength-1]
            }
        })
    }

    submitFormHandler =(e)=>{
        e.preventDefault();
       
        console.log(this.state.login)
        //log user in
        //localhost:5000/V1/api/login
        //https://api-remi-hr.herokuapp.com/v1/api/login
         fetch(`${apiUrl}/v1/api/login`,{
             method:'POST',
             body:JSON.stringify(this.state.login),
             headers:{
                 'Content-Type':'application/json'
             }
         }).then(res =>res.json())
         .then(response => {
             console.log(response);

             //save to Local Storage
              let key = 'response_value'
              console.log(this.props)
              this.addToLocalStorage(response,key)
              this.setState({
                  response:{
                       id: response.id,
                       token: response.token
                  }
              })
              this.props.history.push('admindashboard')
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

    render(){
         
        return(
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:1}}
            className={classes.Background}>
            <div className={classes.Container}>

               
                <div className={classes.Left}>
                      

                   <div className={classes.Logo}>
                       <h4>Welcome SuperAdmin</h4>
                    </div>
                   
                    <h4>Log into your account</h4>
                </div>
                 {console.log(this.state.login)}
                <div className={classes.Right}>
                    <p><Link to="/">Go Home</Link></p>

                  
                    <Form submit={(e)=>this.submitFormHandler(e)}>
                            <Input type='email' placeholder='email' change={(e)=> this.onChangeHandler(e)}/>
                            <Input type='password' placeholder='password' change={(e)=> this.onChangeHandler(e)} />
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
                
                
            </motion.div>
        )
    }
}





export default SuperAdmin