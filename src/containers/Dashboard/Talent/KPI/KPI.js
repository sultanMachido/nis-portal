import React,{Component} from 'react';
import Container from '@material-ui/core/Container';
import classes from './KPI.css';


class Kpi extends Component{

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

                       <button className={classes.Btn} >create</button>

                    </div>
              </div>

              <div>
                    <table className={classes.table}>
                                
                                <tr>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Key Performance Indicator</th>
                                    
                                </tr>
                                
                                
                            
                            
                                
                                
                            

           
                    </table>

              </div>
        </Container>

               
    </div> 
        
        )
    }
}


      

export default Kpi