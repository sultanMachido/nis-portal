import React from 'react';
import classes from './Progress.css';
import TaskInput from '../../../../components/TaskInput/TaskInput';
import Button from '../../../../components/Forms/Button/Button';
import { connect } from 'react-redux'


const Progress=({tasks,state,next,submit,employeeOnboarding,change,disable,check,filePlaceholder})=>(
   
    <div>
         {console.log(filePlaceholder)}
        <div className={classes.CardHeader}>
            <p style={{marginLeft:'50px'}}></p> 
            <h3>{tasks[0]===undefined?null:tasks[0].category}</h3>
            <p className={classes.text}>{employeeOnboarding.stepsCount+'/'+employeeOnboarding.numberOfSteps}</p>
           
        </div>
        
        {state.formError?<p>{state.formError}</p>:null}
        {tasks.map(task=><TaskInput key={task.id} type={task.input_type} task={task.task} placeholder={task.input_placeholder} change={change} check={check} state={state} filePlaceholder={filePlaceholder}/>)}
        {state.showSubmitButton?<Button click={submit} disabled={disable}>Submit</Button>:state.showNextButton?<Button click={next} disabled={disable}>Next</Button>:null}
    </div>

)


const mapStateToProps = state =>{
    return {
        employeeOnboarding:state.employeeOnboarding
    }
}



export default connect(mapStateToProps)(Progress)