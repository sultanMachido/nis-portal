import * as actionTypes from './actions';

const initialState ={
    employeeOnboarding:{
        tasks:[],
        numberOfSteps:0,
        stepsCount:1,
        priority:1,
        onboardingOrder:1,
        showNextButton:false,
        data_length:0,
        offset:0,
        showSubmitButton:false,
        paginationCount: 1,
        companyResources:[],
        inputsFilled:false,
        disableButton:true,
        employeeDetails:{},
        files:null,
        formError:'',
        error:false,
        onboardingProgress:false,
        filePlaceholder:'',
        staffs:[]
    },
    adminRecruitment:{
        cgpa:false,
        age:false,
        location:false
    },
    role:''
}



const reducer = (state= initialState,action) =>{

   
     
    switch (action.type) {
        case actionTypes.GET_TASK_WITH_LIMIT:
             return{
                ...state,
                employeeOnboarding:{
                    ...state.employeeOnboarding,
                    tasks: action.task,
                }
            }
        
        case actionTypes.GET_STEPS_COUNT:
                return{
                   ...state,
                   employeeOnboarding:{
                       ...state.employeeOnboarding,
                       numberOfSteps: action.numberOfSteps,
                   }
               }

        case actionTypes.GET_DATA_LENGTH:
            // console.log('hey1')
                return{
                   ...state,
                   employeeOnboarding:{
                       ...state.employeeOnboarding,
                       data_length: action.dataLength,
                   }
               }

        case actionTypes.DISPLAY_NEXT_BUTTON:
        //    console.log('hey2')
                return{
                   ...state,
                   employeeOnboarding:{
                       ...state.employeeOnboarding,
                       showNextButton: action.nextButton.button,
                       offset:action.nextButton.offset
                   }
               }
        case actionTypes.GET_PAGINATED_DATA:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               tasks: action.paginatedData.responseData,
                               paginationCount: action.paginatedData.paginationCount
                           }
                       }
         case actionTypes.SHOW_SUBMIT:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               showSubmitButton:action.submit
                               
                           }
                       }
        case actionTypes.SUBMIT:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               paginationCount:action.submit.paginationCount,
                               stepsCount: action.submit.stepsCount,
                               data_length:action.submit.data_length,
                               onboardingOrder:action.submit.onboardingOrder
                           }
                       }
        case actionTypes.GET_COMPANY_RESOURCES:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               companyResources:action.resources,
                               
                           }
                       }
        case actionTypes.CHECK_INPUTS_FILLED:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               inputsFilled: action.validate.validateInput,
                               showNextButton: action.validate.showNextButton,
                               offset : action.validate.offset
                           }
                       }    
       case actionTypes.RESET_INPUTS_FILLED:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               inputsFilled: action.validate.validateInput,
                               showNextButton:action.validate.showNextButton
                               
                           }
                       }               
        case actionTypes.ENABLE_BUTTON:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               disableButton:action.enable
                               
                           }
                       } 
        case actionTypes.STORE_EMPLOYEE_DETAILS:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               employeeDetails:{...state.employeeOnboarding.employeeDetails,...action.details}
                               
                           }
                       }  
        case actionTypes.UPLOAD_FILES:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               files:action.files.files,
                               filePlaceholder: action.files.placeholder  
                           }
                       }  
        case actionTypes.SHOW_ERROR:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               formError: action.errorMessage
                           }
                       }     
        case actionTypes.DISPLAY_ERROR:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               error: action.error
                           }
                       }     
        case actionTypes.ONBOARDING_PROGRESS:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               ...state.employeeOnboarding,
                               onboardingProgress: action.progress
                           }
                       }          
                       
        case actionTypes.GET_STAFF:
              
                        return{
                           ...state,
                           employeeOnboarding:{
                               staffs: action.staff
                           }
                       }    
        case actionTypes.SET_ACCOUNT_TYPE:
              
                        return{
                           ...state,
                           role:action.role
                       }       
    }
    
    return state
}


export default reducer