import React,{Component} from 'react';
import classes from './TaskInput.css';




class TaskInput extends Component{
  

  render(){


     //return input type based on type props
     let input;
     if (this.props.type ==='text' || this.props.type ==='email' || this.props.type==='password'|| this.props.type==='number') {
          input = <input type={this.props.type} placeholder={this.props.placeholder} className={classes.Inp} onChange={this.props.change} required/>
     }else if(this.props.type ==='checkbox'){
          input = ( 
            <div style={{display:'flex'}}>
               <input type={this.props.type} placeholder={this.props.placeholder} style={this.props.style} className={classes.Inp} onChange={this.props.change} required/>
               <p style={{paddingLeft:'15px'}}>{this.props.children}</p>
           </div>
           )
     }else if(this.props.type ==='file'){
       input =  ( 
       <div style={{width:'100%'}}>
          <h5 style={{textAlign:'left'}}>{this.props.task}</h5>
          <div style={{display:'flex'}}>
               <div style={{border:'1px solid grey',width:'70%',padding:'5px'}}>
                   <p>{this.props.filePlaceholder[this.props.placeholder.split(' ').join('_')]?this.props.filePlaceholder[this.props.placeholder.split(' ').join('_')]:this.props.placeholder}</p>
               </div>
               {console.log(this.props.filePlaceholder)}
               <div>
                 {console.log(this.props)}
                 <input type={this.props.type} placeholder={this.props.placeholder} name='file' id={this.props.placeholder.split(' ').join('_')} className={classes.Inp}  onChange={this.props.check} required/>
                 <button style={{paddingLeft:'25px',paddingRight:'25px',paddingBottom:'8px',paddingTop:'8px'}}><label for={this.props.placeholder.split(' ').join('_')} style={{fontWeight:'bold'}}>Browse</label></button>
               </div>
 
               
               
          </div>
          
       </div>)
     }else if(this.props.type==='dropdown'){
      input = <input type={this.props.type} placeholder={this.props.placeholder} className={classes.Inp} onChange={this.props.change}  required/>
     }
 

    return(
      <div>
          <div className={classes.Container}>
               {input}
          </div>
          
           {this.props.hr?<hr />:null}
        </div>
    )
  }
}




export default TaskInput