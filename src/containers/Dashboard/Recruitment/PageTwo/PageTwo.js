import React,{Component} from 'react';
import classes from './PageTwo.css';
import {withRouter, NavLink} from 'react-router-dom';




class PageTwo extends Component{



    next =(e)=>{
        this.props.history.push('description')
    } 

   

    render(){

       
        
        return(
            <div style={{marginLeft:'30px'}}>
                 
                 <div>
                    <p style={{fontSize:'20px'}}>Recruitment/Post a job</p>
                </div> 

                 <div style={{width:'388px',margin:'0 auto',backgroundColor:'white',height:'437px'}}>
                      <div style={{paddingTop:'150px'}} >
                          <p style={{paddingLeft:'30px'}}>What is the job role?</p>
                          <input className={classes.Inp} />

                      </div>
                      <div>
                         <button className={classes.Button} onClick={(e)=>this.next(e)}>Next</button>
                      </div>
                      
                     

                 </div>

            </div>
           
        )
    }

}


export default withRouter(PageTwo)

