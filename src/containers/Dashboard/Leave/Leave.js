import React,{Component} from 'react';
import Calendar from 'react-calendar';
import classes from './Leave.css';
import './calendar.css';
import Button from '../../../components/Forms/Button/Button'




class Leave extends Component{
   
    state={
        date:new Date()
    }
   

    onChange=()=> console.log('yes')


    render(){
        return(
            <div>
                <div className={classes.gridContainer}>
                    <div className={classes.calendar}>

                        <Calendar onChange={this.onChange}
                           value={this.state.date}/>

                    </div>

                    <div className={classes.recentLeaveRequest}>
                         <h5>View leave request log</h5>
                    </div>

                    <div className={classes.availableLeaveTime}>
                          <button>Make a leave Request</button>
                    </div>
                </div>
            </div>
        )
    }
}



export default Leave