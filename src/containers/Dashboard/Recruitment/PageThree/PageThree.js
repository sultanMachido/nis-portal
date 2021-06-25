import React,{Component} from 'react';
import classes from './PageThree.css';
import {NavLink,withRouter} from 'react-router-dom';




class PageThree extends Component{



    next =(e)=>{
        this.props.history.push('qualification')
    } 

   

    render(){

       
        
        return(
            <div style={{marginLeft:'30px'}}>
                 
                 <div>
                    <p style={{fontSize:'20px'}}>Recruitment/Post a job</p>
                </div> 

                 <div style={{width:'388px',margin:'0 auto',backgroundColor:'white',height:'437px'}}>
                      <div style={{paddingTop:'100px'}} >
                          <p style={{paddingLeft:'30px'}}>What is the job description?</p>
                          <textarea className={classes.Inp}  rows='10' column='50'/>

                      </div>
                      <div className={classes.Navigation}>

                          <div style={{width:'50%'}}>
                             <NavLink className={classes.Backlink} to='role'>Go Back</NavLink> 
                          </div>

                          <div style={{width:'27%'}}>
                            <button className={classes.Button} onClick={(e)=>this.next(e)}>Next</button>
                          </div>
                     
                      </div>
                      
                     

                 </div>

            </div>
           
        )
    }

}


export default withRouter(PageThree)

