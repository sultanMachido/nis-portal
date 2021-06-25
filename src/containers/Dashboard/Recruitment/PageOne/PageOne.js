import React,{Component} from 'react';
import classes from './PageOne.css';
import {apiUrl} from '../../../../reusables/endpoints';
import blankFile from '../../../../images/recruitment.png'
import Button from '../../../../components/Forms/Button/Button'
import {withRouter} from 'react-router-dom';
import addButton from '../../../../images/icon-only.png'


class PageOne extends Component{

    state={
        blank:false
    }


    componentDidMount =()=>{

        let Url = apiUrl()

        let companyDetails = JSON.parse(localStorage.getItem('response_value'))
        let companyId;
        companyDetails? companyId= companyDetails[0].data.id: companyId = null;

        console.log(companyId)

        if (companyId) {
            fetch(`${Url}/v1/api/recruitments/${companyId}`)
            .then(res => res.json())
            .then(response => {
                console.log(response.data.length)
                    if (response.data.length === 0) {
                        this.setState({
                            blank:false
                        })
                    }else{
                        this.setState({
                            blank:false
                        }) 
                    }
                 
                })
            .catch(err => console.log(err))
        }else{
            this.setState({
                unauthorised: true
            })
        }
    }

    next =(e)=>{
        this.props.history.push(this.props.match.url+'/role')
    }

    render(){

        let content

        if (this.state.blank) {
            content =(
              <div className={classes.Container}>
                <div style={{display:'block',margin:'0 auto',width:'30%'}}>
                     <img src={blankFile} style={{display:'block'}}/>
                     
                </div>

                <div style={{paddingLeft:'350px',marginTop:'10px'}}>
                   <p style={{color:'rgba(1, 22, 39, 0.3)'}}>You currently have no job posting</p>
                </div>
               
               <div style={{marginTop:'30px'}}>

                   <button className={classes.Button} onClick={(e)=>this.next(e)}>Post a job</button>
                
               </div>
              </div>


            )
        }else{

            content=(
                <div className={classes.CardContainer}>
                    <div className={classes.Card}>
                       <div>
                           <p>Create new <br />job posting</p>
                       </div>
                       <div>
                           <img className={classes.AddButton} src={addButton} />
                        </div>
                    </div>
                </div>
            )
        }
        
        return(
            <div style={{marginLeft:'30px'}}>
                <div>
                    <p style={{fontSize:'20px'}}>Recruitment</p>
                </div>

               
                {content}
                


            </div>
           
        )
    }

}


export default withRouter(PageOne)



