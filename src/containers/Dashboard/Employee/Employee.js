import React,{Component} from 'react';
import classes from './Employee.css';
import { NavLink,Switch,Route,withRouter } from 'react-router-dom';
import Tier1 from './Tier1/Tier1';
import Tier2 from './Tier2/Tier2';
import Tier3 from './Tier3/Tier3';
import Modal from '@material-ui/core/Modal';
import{apiUrl} from '../../../reusables/endpoints'
import { Formik } from 'formik';
import StaffUpdate from './StaffUpdate/StaffUpdate';
import Paper from '@material-ui/core/Paper';
import { DataGrid , GridRowsProp, GridColDef } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';




const rows= [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  ];
  
  const columns = [
    { field: 'col1', headerName: 'Name', width: 150 },
    { field: 'col2', headerName: 'Email', width: 150 },
  ];
  


class Employee extends Component{


    state={
       open:false,
       openUpdate:false,
       titles:[],
       company_id:0,
       staffs:[],
       staffToDelete:0, 
       staffIdToUpdate:0,
       openDelete:false, 
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
        biometric_id:'',
       
    }
    }
   
    componentDidMount =()=>{
        let Url = apiUrl()
      
        
        

        let companyDetails = JSON.parse(localStorage.getItem('company_details'));

        let companyDetailsLength = companyDetails.length

        let company_id = companyDetails[companyDetailsLength-1].data.company_id

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

    }
    
    handleOpen = ()=>{
        this.setState({
           open:true 
        })
    }

    handleOpenDelete = (e,id)=>{
        this.setState({
           openDelete:true,
           staffToDelete:id 
        })
    }



    handleOpenUpdate = (staffId)=>{
        console.log(staffId)
        
        let Url = apiUrl()

        fetch(`${Url}/v1/api/staffs/${this.props.staffId}`)
        .then(res=>res.json())
        .then(response=>{

          let oldArr = [...this.state.staff]

           console.log(response.data)  
          this.setState({
              updatedValue:{
              // staff:oldArr.concat(response.data),
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

        this.setState({
           openUpdate:true, 
           staffIdToUpdate:staffId
        })
    }


    handleClose = ()=>{
        this.setState({
           open:false 
        })
    }

    handleCloseUpdate = ()=>{
        this.setState({
           openUpdate:false 
        })
    }

    handleCloseDelete = ()=>{
        this.setState({
           openDelete:false 
        })
    }

    deleteHandler=(e,id)=>{

        let Url = apiUrl()

        fetch(`${Url}/v1/api/staff/${id}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
 
            
            // let oldArr = [...this.state.staffs]
            // oldArr.splice(index,1)
 
            // console.log(oldArr)
            //  this.setState({
               
            //          staffs:oldArr
               
               
            //  })
          
        
            })
        .catch(err => console.log(err))

        window.location.reload(false)

    }

    updateHandler =()=>{

    }


    render(){
        
        const deleteModal=(
            <div className={classes.DeleteModal}>
                <h3 style={{color:'red',textAlign:'center'}}>Are you sure you want to delete Staff?</h3>
                <button className={classes.BtnDelete} onClick={(e)=>this.deleteHandler(e,this.state.staffToDelete)}>Yes</button>
                <button className={classes.BtnUpdate} onClick={(e)=>this.handleCloseDelete()}>No</button>
            </div>
        )

        const body = (
            <div className={classes.Paper}>
              <h2 style={{textAlign:'center'}}>Create Employee</h2>

             
             
              <Formik
       initialValues={{ 
           firstname:'',
           middlename:'',
           lastname:'',
           phone:'',
           email: '', 
           password: '',
           company_id:this.state.company_id,
           address:'',
           city:'',
           role:'',
           job_title:'',
           gender:'',
           date_of_birth:'',
           biometric_id:'jdhfhdyfbjhd',
           url:`` }}

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
        //  setTimeout(() => {
        //    alert(JSON.stringify(values, null, 2));
        //    setSubmitting(false);
        //  }, 400);

        let Url = apiUrl();

        fetch(`${Url}/v1/api/staff`,{
            method:'POST',
            body:JSON.stringify(values, null, 2),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>res.json())
        .then(response => {
            console.log(response); 

            // console.log(this.props.history)
            // this.props.history.goBack()         
           })
        .catch(err=>console.log(err))

        window.location.reload(false)
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
                      
                    <select  name="role" onChange={handleChange} onBlur={handleBlur}  value={values.role}  className={classes.Inp}>
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
                    <select name="job_title" onChange={handleChange} onBlur={handleBlur} value={values.job_title}  className={classes.Inp}>
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
                      
                    <select  name="gender" onChange={handleChange} onBlur={handleBlur}   value={values.gender}  className={classes.Inp}>
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
         
           
           <button className={classes.BtnCreate} type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik> 
              
            </div>
          );
        return(
            <div className={classes.Container}>

                <h4>Employee Staff List</h4>

                <div className={classes.TabHeader}>
                    {/* <div className={classes.TabNav}>
                        <NavLink exact activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url}>Tier 1</NavLink>
                        <NavLink  activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url+'/tier2'}>Tier 2</NavLink>
                        <NavLink  activeStyle={{color:'green',borderBottom:'2px solid green'}} to={this.props.match.url+'/tier3'}>Tier 3</NavLink>
                    </div> */}

                    <div>
                        {/* <button className={classes.Btn} onClick={this.handleOpen}>create</button> */}
                        <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                        onClick={this.handleOpen}
                        >
                           Add Employee
                        </Button>
                    </div>
                    
                    <Modal
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                    >
                   {body}
                   </Modal>


                   <Modal
                            open={this.state.openUpdate}
                            onClose={this.handleCloseUpdate}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                    >
                      <StaffUpdate staffId={this.state.staffIdToUpdate} updateValue={this.state.updatedValue}/>
                   </Modal>
                   
                   {/* delete modal */}
                   <Modal
                            open={this.state.openDelete}
                            onClose={this.handleCloseDelete}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                    >
                    {deleteModal}
                   </Modal>
                </div>
               
                {console.log(this.props.match.url)}

                <Paper elevation={3} className={classes.Background}>
                    {/* <Switch>
                        
                        <Route path={this.props.match.url+'/tier3'}  render={()=> <Tier3 />}/>
                        <Route path={this.props.match.url+'/tier2'}  render={()=> <Tier2 />}/>
                        <Route path={this.props.match.url+'/'} exact render={()=><Tier1 staffs={this.state.staffs} modal={this.handleOpenUpdate} delete={this.handleOpenDelete}  />} />
                    </Switch> */}
                     <DataGrid rows={rows} columns={columns} />
                </Paper>
            </div>
        )
    }
}



export default withRouter(Employee)
