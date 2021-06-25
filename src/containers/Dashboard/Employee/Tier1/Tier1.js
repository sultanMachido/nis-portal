import React,{Component} from 'react';
import {apiUrl} from '../../../../reusables/endpoints';
import Staffs from '../staffs/Staffs';
import classes from './Tier1.css';





class Tier1 extends Component {


    state={
        staffs:this.props.staffs
    }

    componentDidMount=()=>{
            console.log('hey')

            console.log(this.props.hello)


    let Url = apiUrl()

   let companyDetails = JSON.parse(localStorage.getItem('company_details'));

   let company_id = companyDetails[0].data.company_id;


   console.log(company_id)

    // let oldStaffs = [...this.state.staffs]

    fetch(`${Url}/v1/api/staffs/company/${company_id}`)
        .then(res => res.json())
        .then(response =>{
            console.log(response.data)
            this.setState({
                staffs:response.data
            }) 
            
        })
        
    }

    render(){
        return(
            <div>

                <table className={classes.table}>
                        
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th></th>
                                
                            </tr>

                        
                        
                         
                             {this.state.staffs.map((staff,index)=><Staffs key={staff.staff_id} name={staff.firstname+' '+staff.middlename+' '+staff.lastname} role={staff.role} id={staff.staff_id} index={index} deleteHandler={this.props.delete} staffs={this.state.staffs} modalOpen={this.props.modal} />)} 
                             
                          

                        
                   
                    
                        
                         
                    
                </table>

            </div>
        )
    }
}



export default Tier1