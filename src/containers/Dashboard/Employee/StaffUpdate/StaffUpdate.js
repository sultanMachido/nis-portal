import React,{Component} from 'react';
import { Formik } from 'formik';
import{apiUrl} from '../../../../reusables/endpoints'
import classes from  './StaffUpdate.css'

class StaffUpdate extends Component{

    
    state={
        
        titles:[],
        company_id:0,
        staff:[],
        updatedValue:{
            firstname:'',
            middlename:'',
            lastname:'',
            phone:'',
            email: '', 
            password: '',
            company_id:'',
            address:'',
            city:'',
            role:'',
            job_title:'',
            gender:'',
            date_of_birth:'',
            biometric_id:'' 
        },
        displayForm:true
       
     }



     componentDidMount =()=>{
        let Url = apiUrl()
      
        console.log('component did mount')
        

        let companyDetails = JSON.parse(localStorage.getItem('company_details'));

        let companyDetailsLength = companyDetails.length

        let company_id = companyDetails[companyDetailsLength-1].data.id

        //get company id
        this.setState({
            company_id:company_id
        })

        // get job titles
        fetch(`${Url}/v1/api/jobtitle/${company_id}`)
          .then(res=>res.json())
          .then(response=>{

            let oldArr = [...this.state.titles]

             console.log(response.data)  
            this.setState({
                titles:oldArr.concat(response.data)
            })

          })
          .catch(err=>console.log(err))


          //get staffs
          fetch(`${Url}/v1/api/staffs/company/${company_id}`)
          .then(res=>res.json())
          .then(response=>{

            let oldArr = [...this.state.staffs]

             console.log(response.data)  
            this.setState({
                staffs:oldArr.concat(response.data)
            })

            // this.props.getStaffs(response.data)

          })
          .catch(err=>console.log(err))


          //get staff

          fetch(`${Url}/v1/api/staffs/${this.props.staffId}`)
          .then(res=>res.json())
          .then(response=>{

            let oldArr = [...this.state.staff]

             console.log(response.data.firstname)  
            this.setState({
                updatedValue:{
               
                firstname:response.data.firstname,
                middlename:response.data.middlename,
                lastname:response.data.lastname,
                phone:response.data.phone,
                email:response.data.email,
                password:response.data.password,
                company_id:response.data.company_id,
                address:response.data.address,
                city:response.data.city,
                role:response.data.role,
                job_title:response.data.job_title,
                gender:response.data.gender,
                date_of_birth:response.data.date_of_birth,
                biometric_id:response.data.biometric_id
            }})

          })
          .catch(err=>console.log(err))



      
         
         
    }
   

    render(){
         
        console.log(this.state.updatedValue.firstname)

       
        let formik = (
            <Formik
          
       enableReinitialize
       initialValues={{ 
        firstname:this.state.updatedValue.firstname,
        middlename:this.state.updatedValue.middlename,
        lastname:this.state.updatedValue.lastname,
        phone:this.state.updatedValue.phone,
        email:this.state.updatedValue.email, 
        password: this.state.updatedValue.password,
        company_id:this.state.company_id,
        address:this.state.updatedValue.address,
        city:this.state.updatedValue.city,
        role:this.state.updatedValue.role,
        job_title:this.state.updatedValue.job_title,
        gender:this.state.updatedValue.gender,
        date_of_birth:this.state.updatedValue.date_of_birth,
        biometric_id:'jdhfhdyfbjhd' }}

           validate={values => {

            console.log(values)
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
        
       console.log(values)
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);

        // let Url = apiUrl();

        // fetch(`${Url}/v1/api/staff/${this.state.company_id}`,{
        //     method:'PUT',
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
              <div>

                <div>
                <p>Firstname</p>
                </div>


                <div>
                      
                <input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                    className={classes.Inp}
                />
                </div>
                
               
               
             </div>

             <div>
                <div>
                    <p>Middlename</p>
                </div>

                <div>
                    <input
                        type="text"
                        name="middlename"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.middlename}
                        className={classes.Inp}
                    />
                </div>
                
               
             </div>

             <div>

                 <div>
                   <p>Lastname</p>
                 </div>

                 <div>
                    <input
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastname}
                        className={classes.Inp}
                    />
                 </div>
                
                
               
             </div>
             <div>
                 <div>
                   <p>Email</p>
                 </div>
                
                <div>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={classes.Inp}
                    />
                </div>
                
                {errors.email && touched.email && errors.email}
             </div>

             
             <div>
                 <div>
                   <p>Phone Number</p>
                 </div>

                 <div>
                            
                    <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        className={classes.Inp}
                    />

                 </div>
                
                
               
             </div>


             <div>
                 <div>
                 <p>Password</p> 
                 </div>

                 <div>
                        <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={classes.Inp}
                    />
                 </div>
                
               
               {errors.password && touched.password && errors.password}

             </div>

             <div>
                 <div>
                    <p>Address</p>
                 </div>

                 <div>
                        
                    <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        className={classes.Inp}
                    />

                 </div>
                
                
               
             </div>

             <div>

                 <div>
                    <p>City</p>
                </div>


                <div>

                    <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        className={classes.Inp}
                    />

                </div>
                
                
               
             </div>

             <div>
                 <div>
                 <p>Role</p>
                 </div>
               
                {/* <input
                    type="text"
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                /> */}

                <div>
                      
                    <select  name="role" onChange={handleChange} onBlur={handleBlur}  value={values.role} className={classes.Inp}>
                        <option value="">----</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                </div>

               
               
             </div>

             <div>
                 <div>
                    <p>Job Title</p>
                 </div>
                
                {/* <input
                    type="text"
                    name="job_title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.job_title}
                /> */}

                <div>
                    <select name="job_title" onChange={handleChange} onBlur={handleBlur} value={values.job_title} className={classes.Inp}>
                        <option value="">----</option>
                    {this.state.titles.map(title=>(<option value={title.job_title}>{title.job_title}</option>))}
                    </select>
                </div>

                
               
             </div>

             <div>
                 <div>
                    <p>Gender</p>
                 </div>
                
                {/* <input
                    type="text"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                /> */}


                <div>
                      
                    <select  name="gender" onChange={handleChange} onBlur={handleBlur}   value={values.gender} className={classes.Inp}>
                        <option value="">----</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                </div>

                
               
             </div>

             <div>

                 <div>
                    <p>Date of Birth</p>
                 </div>


                 <div>
                        <input
                            type="date"
                            name="date_of_birth"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.date_of_birth}
                            className={classes.Inp}
                        />
                     
                 </div>
                
                
               
             </div>
         
           
           <button className={classes.Btn} type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik> 
              
        )
        
        return(
           
            <div className={classes.Paper}>
              <h2 style={{textAlign:'center'}}>Update Employee Details</h2>

                {this.state.displayForm?formik:null}
               
    
            </div>

        )
    }
}


export default StaffUpdate