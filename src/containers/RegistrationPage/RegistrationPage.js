import React,{Component} from 'react';
import classes from './RegistrationPage.css';
import {Link} from 'react-router-dom';
import Form from '../../components/Forms/Form/Form';
import Input from '../../components/Forms/Input/Input';
import Button from '../../components/Forms/Button/Button';
import {apiUrl} from '../../reusables/endpoints';
import Modal from '../../components/DisplayModal/DisplayModal';
import img from '../../images/loader.gif';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const generateCompanyName = require('../../reusables/generateCompanyName')



class RegistrationPage extends Component{

    state={
        company_info:{
            company_name:'',
            company_email:'',
            password:'',
            status:'',
            company_logo:'',
            onboardingplan_id:1,
            url:''
        },
        display_link: false,
        company_id:0,
        doesCompanyExist:'',
        displayModal:false,
        displayLoader:false,
        inputValidation:true,
        showPassword:false
    }

    company_details ={
        name:[],
        email:[],
        password:[]
    }
    onChangeHandler =(e) =>{
        let name;
        let email;
        let password

        e.target.type ==='text'? this.company_details.name.push(e.target.value):name='';
        e.target.type ==='email'?this.company_details.email.push(e.target.value):email='';
        e.target.type ==='password'?this.company_details.password.push(e.target.value):password='';

        console.log(this.company_details.name,this.company_details.email,this.company_details.password);

        let nameArrLength = this.company_details.name.length;
        let emailArrLength = this.company_details.email.length;
        let passwordArrLength = this.company_details.password.length;

        let data={
            company_name: this.company_details.name[nameArrLength-1],
            company_email:this.company_details.email[emailArrLength-1],
           password:this.company_details.password[passwordArrLength-1]
        }
        
        let Url = apiUrl()
        

        //find if company name already exist on every keystroke
        fetch(`${Url}/v1/api/companies/search`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>res.json())
        .then(response => {
             console.log(response)
             if (response.message==='company does not exist') {
                 this.setState({
                     doesCompanyExist:'no'
                 })
             }else if(response.message==='Company found'){
                this.setState({
                    doesCompanyExist:'yes'
                })
             }
            
             
           })
        .catch(err=>console.log(err))

           
       
      
     

        this.setState({
             company_info:{
                 company_name:this.company_details.name[nameArrLength-1],
                 company_email:this.company_details.email[emailArrLength-1],
                 password:this.company_details.password[passwordArrLength-1],
                 status:'active',
                 company_logo:'power_button.png',
                 onboardingplan_id:1,
                 url:``
             }
        })
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
    


    submitFormHandler =(e)=>{
        e.preventDefault();

        //check if input fields are not empty
        if (!this.state.company_info.company_name||!this.state.company_info.company_email||!this.state.company_info.password) {
            this.setState({
                inputValidation:false
            })

            return
        }

        if(this.state.doesCompanyExist==='yes'){
              return
        }
        
        this.setState({
            displayLoader:true
        })
        
        let Url = apiUrl();
        //    must refactor
        console.log(this.state.company_info)

      

       let company_name = this.state.company_info.company_name.split(' ').join('');

       let customizedCompanyName = generateCompanyName(company_name);

       console.log(customizedCompanyName)

       let company_info = {
            company_name:this.state.company_info.company_name,
            company_email:this.state.company_info.company_email,
            password:this.state.company_info.password,
            company_username:customizedCompanyName,
            status:'inactive',
            company_logo:'power_button.png',
            onboardingplan_id:1,
            company_url:`${window.location.origin}/login/${customizedCompanyName}`
        }


        console.log(company_info)

        
       

    //     console.log(this.state.company_info)
         
        //create company
         fetch(`${Url}/V1/api/companies`,{
             method:'POST',
             body:JSON.stringify(company_info),
             headers:{
                 'Content-Type':'application/json'
             }
         }).then(res =>res.json())
         .then(response => {
             console.log(response)
               
             this.setState({
                 display_link:true,
                 company_id: response.id,
                 displayModal:true,
                 displayLoader:false
             })
            })
         .catch(err=>console.log(err))


         //send email
        //  fetch(`${Url}/V1/api/sendmail`,{
        //     method:'POST',
        //     body:JSON.stringify(company_info),
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }).then(res =>res.json())
        // .then(response => {
        //     console.log(response)
              
           
        //    })
        // .catch(err=>console.log(err))



       
    }

    handleModalClose = ()=>{
        this.setState({
            displayModal:false
        })
    }



    render(){
        let notification;

        if (this.state.doesCompanyExist ==='yes') {
            notification = <p>Company name already exists.</p>
        }else if(this.state.doesCompanyExist ==='no'){
             notification =<p></p>
        }
        // console.log(this.state.doesCompanyExist)

        let modal;
        let loader;
        let inputValidation;

        this.state.displayModal? modal =  <Modal title="Successful!" text={`An email has been sent to ${this.state.company_info.company_email}.Follow the link to activate your account and login into your dashboard`} afterClose={this.handleModalClose}/>: modal = null;
        this.state.displayLoader? loader = <img className={classes.Loader} src={img} />: loader=null;
        this.state.inputValidation? inputValidation = '':inputValidation ='All fields are required!'

        return(
          <div className={classes.Background}>
              {/* show modal */}
              
              {modal}

            <div className={classes.Container}>
                    <div className={classes.Left}>
                        <h1>Register Company</h1>
                        <h4>Create your Company account</h4>
                    </div>
                    {console.log(this.props)}
                    {console.log(window.location.origin)}
                    <div className={classes.Right}>
                       
                        <p style={{textAlign:'left',fontWeight:'bold'}}><Link to="/">Go Home</Link></p>
                    
                        <h3>Remi</h3>
                        <Form submit={(e)=>this.submitFormHandler(e)}>
                                <p style={{textAlign:'center',color:'red'}}>{inputValidation}</p>
                                <Input type='text' placeholder='company name' change={(e)=> this.onChangeHandler(e)}/>
                                <Input type='email' placeholder='company email' change={(e)=> this.onChangeHandler(e)} />
                                <Input type='password' placeholder='password' change={(e)=> this.onChangeHandler(e)} icon={this.state.showPassword?<VisibilityOffIcon />:<VisibilityIcon />} toggle={this.togglePassword} style={{width:'50%'}}/>
                                {/* <p 
                                style={
                                    {
                                    margin:0,
                                    padding:0,
                                    color:'#65B765',
                                    paddingLeft:'172px',
                                    display:'inline'
                                    }}>Login Instead</p> */}
                                <Button submit={(e)=>this.submitFormHandler(e)}>Register</Button>
                        </Form>

                        
                        <div style={{margin:'0 auto'}}>
                            {notification}
                            {loader}
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}


export default RegistrationPage;