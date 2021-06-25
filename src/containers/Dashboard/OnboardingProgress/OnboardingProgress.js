import React,{Component} from 'react';
import classes from './OnboardingProgress.css';
import Auxil from '../../../hoc/Auxil/Auxil';
import {Link,Route,withRouter} from 'react-router-dom';
import Progress from './Progress/Progress';
import Button from '../../../components/Forms/Button/Button';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions'

let apiUrl;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV ==='production') {
    apiUrl = 'https://api-remi-hr.herokuapp.com'
}else{
  
   apiUrl = 'http://localhost:5000'
}

class OnboardingProgress extends Component{

  

    componentDidMount(){
        
        console.log('hey2')
        
        //category count determines number of onboarding steps
        fetch(`${apiUrl}/v1/api/onboardingtasks/count`)
        .then(res => res.json())
        .then(response =>{
            console.log(response.data[0][0].category_count)
            // this.setState({
            //     numberOfSteps:response.data[0][0].category_count
            // }) 
            this.props.getStepsCount(response.data[0][0].category_count)
        })

        let order = this.props.employeeOnboarding.onboardingOrder
        
        fetch(`${apiUrl}/v1/api/onboardingtasks/order/${order}`)
        .then(res => res.json())
        .then(response =>{
           
            // this.setState({
            //     data_length:response.data[0].length
            // })
            this.props.getDataLength(response.data[0].length) 
            // console.log(this.state.data_length)  
            console.log(this.props.employeeOnboarding.data_length)

            //display 'next' button if input tasks are more than 5
            if (this.props.employeeOnboarding.data_length > 5 ) {
                // this.setState({
                //     showNextButton: true,
                //     offset: this.state.offset + 5
                // })
                console.log(this.props.employeeOnboarding.offset)
                let button = true;
                let offset = this.props.employeeOnboarding.offset + 5;
                this.props.displayNextButton(button,offset)
            }

        })


        fetch(`${apiUrl}/v1/api/onboardingtasks/limit/${this.props.employeeOnboarding.onboardingOrder}/1`)
        .then(res => res.json())
        .then(response =>{
            console.log(response.data[0])

            // this.setState({
            //     tasks:response.data[0]
            // }) 

            //getTask with Limit

            this.props.getTaskWithLimit(response.data[0])
            console.log(this.props)
            console.log(response.data[0])
            // this.props.history.push('onboarding')

        })




    }

    onClickHandler =(e)=>{

        let order = this.props.employeeOnboarding.onboarding_order

        fetch(`${apiUrl}/v1/api/onboardingtasks/limit/${order}/1`)
        .then(res => res.json())
        .then(response =>{
            console.log(response.data[0])
            this.setState({
                tasks:response.data[0]
            }) 
            this.props.history.push(this.props.match.url+'/progress')
        })
        
        //display 'next' button if input tasks are more than 5 and all input have been filled
       if (this.props.employeeOnboarding.data_length > 5 && this.props.employeeOnboarding.inputsFilled) {
           this.setState({
               showNextButton: true,
               offset: this.state.offset + 5
           })
       }
        
    }

    nextButtonHandler =(e)=>{
        let order = this.props.employeeOnboarding.onboardingOrder
        console.log(this.props.employeeOnboarding.offset)
        this.validateInput ={}
        
        this.props.enableButton(true)
        //fetch paginated data from API
        fetch(`${apiUrl}/v1/api/onboardingtasks/paginated/${order}/1/${this.props.employeeOnboarding.offset}`)
        .then(res => res.json())
        .then(response =>{
            console.log(response.data[0])
            // this.setState({
            //     tasks:response.data[0],
            //     paginationCount:this.state.paginationCount + 1
            // }) 
            let paginationCount=this.props.employeeOnboarding.paginationCount + 1
            this.props.getPaginatedData(response.data[0],paginationCount);
            // console.log(this.state.paginationCount);
             //show submit button if data_length is greater than or equal to expected count
       
                    let expectedCount = 5 * this.props.employeeOnboarding.paginationCount;
                    console.log(this.props.employeeOnboarding.paginationCount)

                    if (expectedCount >= this.props.employeeOnboarding.data_length ) {
                        // this.setState({
                        //     showSubmitButton:true
                        // })
                        console.log('hey')
                        let submit = true;
                        this.props.showSubmit(submit)
                    }
                    // console.log(this.state.showSubmitButton)
        })

       
    }

    onSubmitHandler=(e)=>{
        // let order = this.props.employeeOnboarding.onboarding_order
        console.log('submitted')
        this.validateInput ={}
        this.props.enableButton(true)

       //check if you are at the end of the onboarding process
        if (this.props.employeeOnboarding.stepsCount < this.props.employeeOnboarding.numberOfSteps) {
            //update details
            if (this.props.employeeOnboarding.tasks[0].category === 'Personal Details'||
                this.props.employeeOnboarding.tasks[0].category ==="Physical Features & Medicals" ||
                this.props.employeeOnboarding.tasks[0].category ==="Payroll" ||
                this.props.employeeOnboarding.tasks[0].category ==="Upload documents") {
                console.log('yes')
    
               let data = {
                    ...this.props.employeeOnboarding.employeeDetails
                }
    
                fetch(`${apiUrl}/v1/api/staffs/1`,{
                method:'PUT',
                body:JSON.stringify(data),
                headers:{
                    'Content-Type':'application/json'
                  }
                }).then(res =>res.json())
                .then(response => {
                    console.log(response)
    
                    if (response.message ==='Fullname field requires firstname middlename and lastname') {
                          console.log(response.message);
                          this.props.displayError(true);
                          this.props.showErrorMessage(response.message)
                    }else{
                        this.props.displayError(false);
                    }
                    
                    if (response.status===200) {

                        //if updating details returns no error,go to next stage of onboarding
                          console.log(this.props.employeeOnboarding.error)

                        if (!this.props.employeeOnboarding.error) {
                            console.log('GOMD!')
                            let paginationCount = 1;
                            let stepsCount = this.props.employeeOnboarding.stepsCount + 1;
                            let data_length = 0;
                            let onboardingOrder = this.props.employeeOnboarding.onboardingOrder + 1;
                            this.props.submit(paginationCount,stepsCount,data_length,onboardingOrder)
                            // console.log(this.state.stepsCount)
                    
                    
                            fetch(`${apiUrl}/v1/api/onboardingtasks/limit/${onboardingOrder}/1`)
                            .then(res => res.json())
                            .then(response =>{
                                console.log(response.data[0])
                                
                                this.props.getTaskWithLimit(response.data[0])
                                // this.props.history.push(this.props.match.url+'/progress')
                            })
                    
                            fetch(`${apiUrl}/v1/api/onboardingtasks/order/${onboardingOrder}`)
                            .then(res => res.json())
                            .then(response =>{
                                console.log(response.data[0]);
                               
                                this.props.getDataLength(response.data[0].length) 
                                // this.props.history.push(this.props.match.url+'/progress')
                            })
                            
                            //display 'next' button if input tasks are more than 5
                           if (this.props.employeeOnboarding.data_length > 5) {
                           
                            let button= true;
                            let offset = this.props.employeeOnboarding.offset + 5;
                            this.props.displayNextButton(button,offset)
                           }
                        }
                        
                    }

                    
                   
                
                 
               })
             .catch(err=>console.log(err))
            }

           if (this.props.employeeOnboarding.tasks[0].category ==="Next Of Kin" ) {
                     
            let paginationCount = 1;
            let stepsCount = this.props.employeeOnboarding.stepsCount + 1;
            let data_length = 0;
            let onboardingOrder = this.props.employeeOnboarding.onboardingOrder + 1;
            this.props.submit(paginationCount,stepsCount,data_length,onboardingOrder)
            // console.log(this.state.stepsCount)
    
    
            fetch(`${apiUrl}/v1/api/onboardingtasks/limit/${onboardingOrder}/1`)
            .then(res => res.json())
            .then(response =>{
                console.log(response.data[0])
                
                this.props.getTaskWithLimit(response.data[0])
                // this.props.history.push(this.props.match.url+'/progress')
            })
    
            fetch(`${apiUrl}/v1/api/onboardingtasks/order/${onboardingOrder}`)
            .then(res => res.json())
            .then(response =>{
                console.log(response.data[0]);
               
                this.props.getDataLength(response.data[0].length) 
                // this.props.history.push(this.props.match.url+'/progress')
            })
            
            //display 'next' button if input tasks are more than 5
           if (this.props.employeeOnboarding.data_length > 5) {
           
            let button= true;
            let offset = this.props.employeeOnboarding.offset + 5;
            this.props.displayNextButton(button,offset)
           }
               
           }
           

            //post details
            // if (this.props.employeeOnboarding.tasks[0].category === 'Upload Documents') {
            //    console.log('documents')
                  
            //    //if updating details returns no error,go to next stage of onboarding
            //    console.log(this.props.employeeOnboarding.error)

            //    if (!this.props.employeeOnboarding.error) {
               
            //        let paginationCount = 1;
            //        let stepsCount = this.props.employeeOnboarding.stepsCount + 1;
            //        let data_length = 0;
            //        let onboardingOrder = this.props.employeeOnboarding.onboardingOrder + 1;
            //        this.props.submit(paginationCount,stepsCount,data_length,onboardingOrder)
            //        console.log(this.state.stepsCount)
           
           
            //        fetch(`http://localhost:5000/v1/api/onboardingtasks/limit/${onboardingOrder}/1`)
            //        .then(res => res.json())
            //        .then(response =>{
            //            console.log(response.data[0])
                       
            //            this.props.getTaskWithLimit(response.data[0])
            //            // this.props.history.push(this.props.match.url+'/progress')
            //        })
           
            //        fetch(`http://localhost:5000/v1/api/onboardingtasks/order/${onboardingOrder}`)
            //        .then(res => res.json())
            //        .then(response =>{
            //            console.log(response.data[0]);
                      
            //            this.props.getDataLength(response.data[0].length) 
            //            // this.props.history.push(this.props.match.url+'/progress')
            //        })
                   
            //        //display 'next' button if input tasks are more than 5
            //       if (this.props.employeeOnboarding.data_length > 5) {
                  
            //        let button= true;
            //        let offset = this.props.employeeOnboarding.offset + 5;
            //        this.props.displayNextButton(button,offset)
            //       }
            //    }
            // }

           

            
            
          
        }

        
        console.log(this.props.employeeOnboarding.stepsCount,this.props.employeeOnboarding.numberOfSteps)
        if (this.props.employeeOnboarding.stepsCount === this.props.employeeOnboarding.numberOfSteps) {
            console.log('document')
            const formData = new FormData()

            formData.append(
                'file',
                this.props.employeeOnboarding.files,
                this.props.employeeOnboarding.files.name
              )


              fetch(`${apiUrl}/v1/api/staffs/upload`,{
             method:'POST',
             body:formData
         }).then(res=>res.json())
           .then(response=>{
               console.log(response)

               this.props.onboardingProgressComplete(false)

               this.props.history.push('./')
           })
            .catch()
        }
        

        
       
    }
    
    validateInput ={}
    numberOfInputsFilled = 0;
    numberExpectedToBeFilled = 0;

    onChangeHandler=(e)=>{
          console.log(e.target.placeholder)
          let key = e.target.placeholder.split(' ').join('_')
          this.validateInput[key]= e.target.value
          console.log(this.validateInput)
         this.numberOfInputsFilled = Object.keys(this.validateInput).length;
         this.numberExpectedToBeFilled = this.props.employeeOnboarding.tasks.length;
         //store employee details in state
         this.props.storeEmployeeDetails(this.validateInput);
         //if user has not filled all inputs field with details
         let button;
         let validateInput;
         let offset;

        
         if (this.numberOfInputsFilled === this.numberExpectedToBeFilled) {
             button = false
            this.props.enableButton(button)
         }          
    }

    displayPrevious =(e) =>{
         console.log(this.props.employeeOnboarding.offset);

         let displayPreviousData = this.props.employeeOnboarding.offset - 5;
         let onboardingOrder = this.props.employeeOnboarding.onboardingOrder;

         if (displayPreviousData === 0) {

            //https://api-remi-hr.herokuapp.com/v1/api
             
            fetch(`${apiUrl}/v1/api/onboardingtasks/limit/${onboardingOrder}/1`)
            .then(res => res.json())
            .then(response =>{
                console.log(response.data[0])
                
                this.props.getTaskWithLimit(response.data[0])
                // this.props.history.push(this.props.match.url+'/progress')
            })
         }else if(displayPreviousData > 0){

         }
    }
    
    uploadFile ={}
    fileCheck =(e) =>{
        console.log(e.target.files[0])
        console.log(e.target.files)
        let path = e.target.value.split('');
        console.log(path);
        let newPath = path.splice(12).join('');
        console.log(newPath);
        let key = e.target.placeholder.split(' ').join('_')
        console.log(e.target.placeholder);
        this.uploadFile[key] = e.target.files[0].name
        console.log(e.target.files[0].name)
        
        this.uploadFile[key] = newPath
        console.log(this.uploadFile)
        
        this.props.uploadFiles(e.target.files[0],e.target.value)
        //sending to server

        const formData = new FormData()

        formData.append(
            'file',
            e.target.files[0],
            e.target.files[0].name
            )

      fetch(`${apiUrl}/v1/api/staffs/upload`,{
            method:'POST',
            body:formData
        }).then(res=>res.json())
        .then(response=>{
            console.log(response)  
        })
        .catch()


        this.numberOfInputsFilled = Object.keys(this.uploadFile).length;
        this.numberExpectedToBeFilled = this.props.employeeOnboarding.tasks.length;

        if (this.numberOfInputsFilled === this.numberExpectedToBeFilled) {
           let button = false
           this.props.enableButton(button)
        }     
    }

    render(){
        //get company resources from local storage
        let resources = JSON.parse(localStorage.getItem('company_resources')) 
        
        return(
            <div className={classes.HomeContent}>

                
              
                <Auxil style={{width:'40%',backgroundColor:'#FFFFFF',margin:'0 auto',marginTop:'50px',minHeight:'371px'}}>
                
                    <Route path={this.props.match.url+'/'} render={()=>
                            <Progress tasks={this.props.employeeOnboarding.tasks} 
                               state={this.props.employeeOnboarding} 
                               next={(e)=>this.nextButtonHandler(e)} 
                               submit={(e)=>this.onSubmitHandler(e)} 
                               change={(e)=>this.onChangeHandler(e) } 
                               disable={this.props.employeeOnboarding.disableButton} 
                               check ={(e)=>this.fileCheck(e)}
                               filePlaceholder={this.uploadFile}
                               /> }
                        />
                    
                    
                </Auxil>
                {console.log(this.props.employeeOnboarding)}
                <div className={classes.RightSidebar}>
                    <h3>Resources</h3>
                    {resources[0].map(resource=> <div><p style={{textAlign:'left',display:'block',marginLeft:'120px'}}>{resource.company_resource}</p><hr style={{marginLeft:'120px',width:'50%'}} /></div>)}
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state =>{
    return {
        employeeOnboarding:state.employeeOnboarding
    }
}

const mapDispatchProps = dispatch =>{
    return{
        getStepsCount:(responseData) => dispatch({type:actionTypes.GET_STEPS_COUNT,numberOfSteps:responseData}),
        getDataLength: responseData => dispatch({type:actionTypes.GET_DATA_LENGTH,dataLength:responseData}),
        displayNextButton: (button,offset) => dispatch({type:actionTypes.DISPLAY_NEXT_BUTTON,nextButton:{button:button,offset:offset}}),
        getPaginatedData: (responseData,paginationCount) => dispatch({type:actionTypes.GET_PAGINATED_DATA,paginatedData:{responseData:responseData,paginationCount:paginationCount}}),
        showSubmit: submit => dispatch({type:actionTypes.SHOW_SUBMIT,submit:submit}),
        submit: (paginationCount,stepsCount,data_length,onboardingOrder) => dispatch({type:actionTypes.SUBMIT,submit:{paginationCount,stepsCount,data_length,onboardingOrder}}),
        getTaskWithLimit:(responseData) => dispatch({type:actionTypes.GET_TASK_WITH_LIMIT,task:responseData}),
        checkInputsFilled:(validateInput,showNextButton,offset) => dispatch({type:actionTypes.CHECK_INPUTS_FILLED,validate:{validateInput,showNextButton,offset}}),
        resetInputsFilled:(validateInput,showNextButton) => dispatch({type:actionTypes.RESET_INPUTS_FILLED,validate:{validateInput,showNextButton}}),
        enableButton:(enable) => dispatch({type:actionTypes.ENABLE_BUTTON,enable:enable}),
        storeEmployeeDetails:(details) => dispatch({type:actionTypes.STORE_EMPLOYEE_DETAILS,details}),
        uploadFiles:(files,placeholder) => dispatch({type:actionTypes.UPLOAD_FILES,files:{files,placeholder}}),
        showErrorMessage:(errorMessage) => dispatch({type:actionTypes.SHOW_ERROR,errorMessage:errorMessage}),
        displayError:(error) => dispatch({type:actionTypes.DISPLAY_ERROR,error:error}),
        onboardingProgressComplete:(progress) => dispatch({type:actionTypes.ONBOARDING_PROGRESS,progress}),
   }
}


export default connect(mapStateToProps,mapDispatchProps)(withRouter(OnboardingProgress))