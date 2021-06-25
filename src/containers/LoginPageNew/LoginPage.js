import React, { Component } from "react";
import classes from "./LoginPage.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Form from "../../components/Forms/Form/Form";
import Input from "../../components/Forms/Input/Input";
import Button from "../../components/Forms/Button/Button";
import FormReUse from './formReuse';
import { Formik } from 'formik';
// import gohome from "../../images/gohome.png";
// import doneIcon from "../../images/Doneicon.png";
// import errorIcon from "../../images/Erroricon.png";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// const eye = <FontAwesomeIcon icon={faEye} />;

let apiUrl;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://api-remi-hr.herokuapp.com";
} else {
  apiUrl = "http://localhost:5000";
}

class LoginPage extends Component {
  state = {
    login: {
      email: "",
      password: "",
      company_id: 0,
    },
    response: {
      id: "",
      token: "",
    },
    displayLoader: false,
    displayContent: false,
    displayUnauthorisedWarning: false,
    showPassword: false,
  };
  toglePasswordShow = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  newlogin = {
    email: [],
    password: [],
  };

  componentDidMount = () => {
    let data = {
      company_name: this.props.match.params.name,
    };

    if (data.company_name) {
      //find company based on name from URL Link
      //http://localhost:5000/V1/api/companies/search
      //https://api-remi-hr.herokuapp.com/v1/api/companies/search
      fetch(`${apiUrl}/v1/api/companies/search`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            let key = "company_details";
            this.addToLocalStorage(response, key);
            this.setState({
              displayContent: true,
              login: {
                company_id: response.data.id,
              },
            });

            console.log(response.data.id);
          } else if (response.status === 404) {
            this.setState({
              displayUnauthorisedWarning: true,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        displayUnauthorisedWarning: false,
      });
    }
  };

  onChangeHandler = (e) => {
    let email;
    let password;

    e.target.type === "email"
      ? this.newlogin.email.push(e.target.value)
      : (email = "");
    e.target.type === "password"
      ? this.newlogin.password.push(e.target.value)
      : (password = "");

    console.log(this.newlogin.email, this.newlogin.password);

    let emailArrLength = this.newlogin.email.length;
    let passwordArrLength = this.newlogin.password.length;

    this.setState({
      login: {
        email: this.newlogin.email[emailArrLength - 1],
        password: this.newlogin.password[passwordArrLength - 1],
        company_id: this.state.login.company_id,
      },
    });
  };

  submitFormHandler = (e) => {
    e.preventDefault();

    console.log(this.state.login);
    //log user in
    //localhost:5000/V1/api/login
    //https://api-remi-hr.herokuapp.com/v1/api/login
    fetch(`${apiUrl}/v1/api/login`, {
      method: "POST",
      body: JSON.stringify(this.state.login),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        //save to Local Storage
        let key = "response_value";
        this.addToLocalStorage(response, key);
        this.setState({
          response: {
            id: response.id,
            token: response.token,
          },
        });
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  addToLocalStorage = (response, key) => {
    let item;
    if (localStorage.getItem(key) === null) {
      item = [];
    } else {
      item = JSON.parse(localStorage.getItem(key));
    }

    item.push(response);

    localStorage.setItem(key, JSON.stringify(item));
  };

  render() {
    let content = (
      <div className={classes.showcaseDiv}>
        <div className={classes.leftDiv}>
          <p className={classes.login}>Login</p>
          <p className={classes.loginText}>Log in to your account...</p>
        </div>
        <div className={classes.rightDiv}>
          <FormReUse pathname={this.props.history.location.pathname}/>
        </div>
      </div>
    );
    //  if (this.state.displayContent) {
    //     //get company details from Local storage
    //     let companyDetails = JSON.parse(localStorage.getItem('company_details'));

    //      content = (
    //     //     <div className={classes.Container}>
    //     //     <div className={classes.Left}>

    //     //         <div className={classes.Logo}>
    //     //            <img src={window.location.origin + `/images/${companyDetails[0].data.logo}`}/>
    //     //            {console.log(window.location.origin + `/images/${companyDetails[0].data.logo}`)}
    //     //         </div>
    //     //         <h4>Log into your account</h4>
    //     //     </div>
    //     //      {console.log(this.state.login)}
    //     //     <div className={classes.Right}>
    //     //         <p><Link to="/">Go Home</Link></p>

    //     //         <h3>{companyDetails[0].data.name}</h3>
    //     //         <Form submit={(e)=>this.submitFormHandler(e)}>
    //     //                 <Input type='email' placeholder='email' change={(e)=> this.onChangeHandler(e)}/>
    //     //                 <Input type='password' placeholder='password' change={(e)=> this.onChangeHandler(e)} />
    //     //                 <p
    //     //                 style={
    //     //                     {
    //     //                     margin:0,
    //     //                     padding:0,
    //     //                     color:'#65B765',
    //     //                     paddingLeft:'172px',
    //     //                     display:'inline'
    //     //                     }}>Forgot password?</p>
    //     //                 <Button submit={(e)=>this.submitFormHandler(e)}>Log In</Button>
    //     //         </Form>
    //     //     </div>
    //     // </div>
    //     <div>

    //     </div>
    //      )
    //  }else if(this.state.displayUnauthorisedWarning===true){
    //         content =   (
    //             <div className={classes.Warning}>

    //             <h2>You are not Authorised to perform this action</h2>
    //             <p>Company not found.Check URL</p>
    //             <Button><Link to='/'>Go Back</Link></Button>
    //             </div>
    //         )
    //  }
    //  else{
    //      content ='loading...'
    //  }
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        className={classes.Background}
      >
        {content}
      </motion.div>
    );
  }
}

export default LoginPage;
