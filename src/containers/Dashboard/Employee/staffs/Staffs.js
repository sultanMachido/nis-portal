import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Staffs.css';



const staffs =({name,role,id,deleteHandler,index,staffs,modalOpen})=>(
    <tr>
        <td>{name}</td>
        <td>{role}</td>
        
        <td className={classes.ActionDisplay }><Link  to={'/dashboard/adminprofileview/'+id+'/profile/'}>View</Link></td>
        <td  className={classes.ActionDisplay} onClick={(e)=>modalOpen(id)}><button className={classes.BtnUpdate}>Update</button></td>
        <td  className={classes.ActionDisplay} ><button className={classes.BtnDelete} onClick={(e)=>deleteHandler(e,id)}>Delete</button></td>
        
    </tr>
)


export default staffs