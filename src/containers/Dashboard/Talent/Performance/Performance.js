import React,{Component} from 'react';
import Container from '@material-ui/core/Container';
import classes from './Performance.css';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';


class Performance extends Component{
    state={
        open:false
    }

    
    handleOpen = ()=>{
        this.setState({
           open:true 
        })
    }


    handleClose = ()=>{
        this.setState({
           open:false 
        })
    }

    render(){
        return(
            <div>
          <Container maxWidth="md" style={{backgroundColor:'white',height:'500px',marginTop:'20px'}} >
              <div className={classes.Container}>
                    <div>
                        <select placeholder="Change Category" className={classes.Inp}>
                            <option>Change Category</option>
                        </select>
                    </div>

                    <div>

                       <button className={classes.Btn} onClick={this.handleOpen} >create</button>

                    </div>
              </div>

              <div>
                    <table className={classes.table}>
                                
                                <tr>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Performance Objective</th>
                                    
                                </tr>
                                
                                
                            
                            
                                
                                
                            

           
                    </table>

            </div>

            <Modal   
                 open={this.state.open}
                 onClose={this.handleClose}
                 aria-labelledby="simple-modal-title"
                 aria-describedby="simple-modal-description"
            >
            </Modal>
              
          </Container>
    </div>
        )
    }
}
// const Performance=(props)=>(
//     <div>
//           <Container maxWidth="md" style={{backgroundColor:'white',height:'500px',marginTop:'20px'}} >
//               <div className={classes.Container}>
//                     <div>
//                         <select placeholder="Change Category" className={classes.Inp}>
//                             <option>Change Category</option>
//                         </select>
//                     </div>

//                     <div>

//                        <button className={classes.Btn} >create</button>

//                     </div>
//               </div>

//               <div>
//                     <table className={classes.table}>
                                
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Department</th>
//                                     <th>Performance Objective</th>
                                    
//                                 </tr>
                                
                                
                            
                            
                                
                                
                            

           
//                     </table>

//               </div>
              
//           </Container>
//     </div>
// )

export default Performance