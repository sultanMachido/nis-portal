import React, { useState } from "react";
import { useHistory } from "react-router";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// path imports
import gohome from "../../images/gohome.png";
import doneIcon from "../../images/Doneicon.png";
import errorIcon from "../../images/Erroricon.png";
import classes from "./LoginPage.css";
import { Formik } from 'formik';
import{apiUrl} from '../../reusables/endpoints';

// const eye = <FontAwesomeIcon icon={faEye} />;

const FormReUse = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleFormClick = () => {
     if (props.pathname === "/login") {
      history.push("/dashboard");
    }
  };

  const toglePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={classes.formDiv}>
      <div className={classes.goback}>
        <img src={gohome} />
      </div>
      <div className={classes.company}>
        <p>Remi</p>
      </div>
      <div className={classes.form}>
      <Formik
       initialValues={{ 
           company_email: '', 
           password: ''
            }}

           validate={values => {
         const errors = {};
            if (!values.email) {
            errors.email = 'Required';
            } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
            errors.email = 'Invalid email address';
            }
            return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);

        // let Url = apiUrl();

        // fetch(`${Url}/v1/api/company`,{
        //     method:'POST',
        //     body:JSON.stringify(values, null, 2),
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }).then(res =>res.json())
        // .then(response => {
        //     console.log(response); 

        //     // console.log(this.props.history)
        //     // this.props.history.goBack()         
        //    })
        // .catch(err=>console.log(err))

        // window.location.reload(false)
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
              

               

           <div className={classes.formInput}>
            
            <input
              type="email"
              name="email"
              value={values.company_email}
              onChange={handleChange}
              onBlur={handleBlur}
            /> 
            <span style={{position: 'absolute', right: '30px'}}>
            <img className={classes.doneIcon} src={doneIcon} />
            <img
              className={(classes.errIcon, classes.nullDisplay )}
              src={errorIcon}
            />
            </span>
          </div>
          <div className={classes.formInput}>
            {/* <label >Password</label> */}
            <input
              // {showPassword ? "text" : "password"}
              type='password'
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
            <span onClick={toglePasswordShow} className={classes.passEyeDiv}>
              {/* <i className={classes.eyeIcon}>{eye}</i> */}
              <span
                className={!showPassword ? classes.nullDisplay : classes.slash}
              ></span>
            </span>
            <div className={classes.forgetPass}>
              <p>Forgot Password ?</p>
            </div>
          </div>
            <input
            onClick={(e)=> handleFormClick(e)}
            className={classes.loginBtn}
            type="submit"
            value="Log in"
          />
         </form>
       )}
     </Formik>
       
      </div>
    </div>
  );
};

export default FormReUse;
