import React,{Component} from 'react';
import classes from './PageFour.css';
import {NavLink,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';





class PageFour extends Component{

    state={
        checked:true,
        unchecked:false,
        value:'',
        cgpa:false,
        age:false,
        location:false,
        buttonState:true,
        truthyCount:0
    }

    next =(e)=>{
        this.props.history.push(`confirmation?cgpa=${this.state.cgpa}&age=${this.state.age}&location=${this.state.location}`)
    } 


    selectQualificationParameters=(e)=>{
        if (e.target.value==='CGPA') {
            this.setState({
                cgpa:!this.state.cgpa
            },()=>{
                this.checkboxClickCount(this.state.cgpa)
            })
            
         

        }else if(e.target.value==='Age'){
            this.setState({
                age:!this.state.age
            },()=>{
                this.checkboxClickCount(this.state.age)
            })
           
           
            
        }else if(e.target.value==='Location'){
           this.setState({
               location:!this.state.location
           },()=>{
            this.checkboxClickCount(this.state.location)
        })
           
          
        
        }
    }

    checkboxClickCount=(stateProperty)=>{
          //check if checkbox is clicked  and increment truthy count if it is true else decrement
          //this logic helps determine if the 'next' button should be enabled
          console.log(stateProperty)
        if (stateProperty) {
            this.setState({
                truthyCount:this.state.truthyCount + 1
            })
           }else{
            this.setState({
                truthyCount:this.state.truthyCount - 1
            })
           }   
        
    }

    check =(e) =>{
        console.log(e.target.value)
        if (e.target.value==='moderate') {
              this.setState({
            value:'moderate'
          },()=>{
            if (this.state.truthyCount >=1 && this.state.value) {
                this.setState({
                    buttonState:false
                  }) 
            }else if(this.state.truthyCount < 1 && this.state.value){
                this.setState({
                    buttonState:false
                  }) 
            }
          })
        }else if(e.target.value==='strict'){
            this.setState({
                value:'strict'
              },()=>{
                if (this.state.truthyCount >=1 && this.state.value) {
                    this.setState({
                        buttonState:false
                      }) 
                }else if(this.state.truthyCount < 1 && this.state.value){
                    this.setState({
                        buttonState:false
                      }) 
                }
              })
               
        }

        console.log(this.state.value)

       
      
    }

   

    render(){

        console.log(this.state.cgpa)
        console.log(this.state.age)

        console.log(this.state.truthyCount)
        
        return(
            <div style={{marginLeft:'30px'}}>
                 
                 <div>
                    <p style={{fontSize:'20px'}}>Recruitment/Post a job</p>
                </div> 

                 <div style={{width:'388px',margin:'0 auto',backgroundColor:'white',height:'437px'}}>
                     <div className={classes.Header}>
                          <p>Pre-qualification parameters</p>
                          <div style={{marginTop:'40px'}}>
                              <div>
                                <input type="checkbox" value="CGPA" onChange={(e)=>this.selectQualificationParameters(e)}/>
                                <p>CGPA</p>
                                
                              </div>
                              <div>
                                <input type="checkbox" value="Age" onChange={(e)=>this.selectQualificationParameters(e)}/>
                                <p>Age</p>
                              </div>
                              <div>
                                <input type="checkbox" value="Location" onChange={(e)=>this.selectQualificationParameters(e)}/>
                                <p>Location</p>
                               </div>
                          </div>
                        
                     </div>

                     <div style={{marginTop:'40px'}} className={classes.Header}>
                     <p>Qualification rule</p>
                          <div style={{marginTop:'20px'}}>
                             
                              <div>
                                <input type="checkbox"  checked={this.state.value==='strict'?this.state.checked:this.state.value!=='strict'?this.state.unchecked:null} onChange={(e)=>this.check(e)} value='strict'/>
                                <p>strict</p>
                                
                              </div>
                              <div>
                                <input type="checkbox"  checked={this.state.value==='moderate'?this.state.checked:this.state.value!=='moderate'?this.state.unchecked:null} onChange={(e)=>this.check(e)} value='moderate'/>
                                <p>moderate</p>
                              </div>

                             
                             
                          </div>

                           <div className={classes.Navigation}>

                                <div style={{width:'50%'}}>
                                <NavLink className={classes.Backlink} to='description'>prev</NavLink> 
                                </div>

                                <div style={{width:'27%'}}>
                                <button className={this.state.buttonState?classes.DisabledButton:classes.Button} onClick={(e)=>this.next(e)} disabled={this.state.buttonState}>Next</button>
                                </div>

                            </div>
                     </div>
                      
                     

                 </div>

            </div>
          
        )
    }

}

const mapDispatchProps = dispatch =>{
    return {
     cgpa:{},
     age:{},
     location:{}   
    }
}


export default connect(mapDispatchProps)(withRouter(PageFour))

