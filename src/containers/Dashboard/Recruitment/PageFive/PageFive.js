import React,{Component} from 'react';
import classes from './PageFive.css';
import {NavLink,withRouter} from 'react-router-dom';




class PageFive extends Component{



    next =(e)=>{
        this.props.history.push('recruitment')
    } 

   

    render(){
        
        console.log(this.props.location.search)

        let params = this.props.location.search

       let paramsString = params.slice(1)
        let edited = paramsString.split("cgpa").join('')
        let edited2 = edited.split("age").join('')
        let edited3 = edited2.split("location").join('')
        let edited4 = edited3.split("=").join('')
        let edited5 = edited4.split("&")
        console.log(edited5)
        
        let cgpa;
        let age;
        let location;

        if (edited5[0]==='true') {
            cgpa = (
            <div style={{paddingTop:'50px'}} >
                <p style={{paddingLeft:'30px'}}>CGPA</p>
                <input className={classes.Inp} />

            </div>
           )
        }

        if(edited5[1]==='true'){
            age =(
               
                <div style={{paddingTop:'10px'}} >
                                <p style={{paddingLeft:'30px'}}>Age</p>

                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <input className={classes.AgeInpLeft} placeholder="Min"/>
                                    <input className={classes.AgeInpRight}  placeholder="Max" />
                                </div>
                                


                </div>
            )
        }


        if (edited5[2]==='true') {
            location =(
              <div style={{paddingTop:'10px'}} >
                <p style={{paddingLeft:'30px'}}>Location</p>
                <input className={classes.Inp} />

               </div>
            )
        }

       
        
        return(
            <div style={{marginLeft:'30px'}}>
                 
                 <div>
                    <p style={{fontSize:'20px'}}>Recruitment/Post a job</p>
                </div> 

                 <div style={{width:'388px',margin:'0 auto',backgroundColor:'white',height:'437px'}}>
                     <div className={classes.Header}>
                          <p>Pre-qualification parameters</p>

                          {cgpa}

                          {age} 
                           
                           {location}
                         

                         
                        
                     </div>

                     <div className={classes.Navigation}>

                                <div style={{width:'50%'}}>
                                <NavLink className={classes.Backlink} to='description'>prev</NavLink> 
                                </div>

                                <div style={{width:'27%'}}>
                                <button className={classes.Button} onClick={(e)=>this.next(e)} >Next</button>
                                </div>

                            </div>
                      
                     

                 </div>

            </div>
           
        )
    }

}


export default withRouter(PageFive)

