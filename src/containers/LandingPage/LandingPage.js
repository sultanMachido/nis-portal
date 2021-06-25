import React,{Component} from 'react';
import classes from './LandingPage.css';
import Navigation from '../../components/Navigation/Navigation';
import BulletList from '../../images/bullet-list.png';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import LoginPage from '../LoginPage/LoginPage';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import {motion} from 'framer-motion';
import { NavLink,Link } from 'react-router-dom';


class LandingPage extends Component{
     
    state={
        showModal:0
    }

    showModalHandler = (e) =>{
        
        this.setState({
            showModal: 1
        })

        console.log(this.state.showModal)
    }

    closeModalHandler = (e) =>{
        console.log(e)
          this.setState({
              showModal:0
          })
    }

    render(){
        
        const displayModal = this.state.showModal?  classes.ModalShow: classes.ModalHide

        console.log(this.props);
        return(
          
        <motion.div 
         initial={{opacity:0}}
         animate={{opacity:1}}
         exit={{opacity:0}}
        className={classes.container} >
            <Route path='/login' exact component={LoginPage}/>
           
            <div className={classes.jumbotron}  >
                <Navigation showModal ={(e)=> this.showModalHandler(e)} />
                 
                <div className={classes.JumbotronText}>
                    <div className={classes.ContentTop}>
                        <h1 style={{color:'#65b765'}}>REMI is the HR Software you need</h1>
                        <p className={classes.txt}>Everything you will ever need to manage <br/>your Employees in one place</p>
                    </div>
                    <div className={classes.button}>
                        <Link to="/register">Get started</Link>
                    </div>
                </div>
            </div>


         
              <Modal modalDisplay = {displayModal} showModal={this.state.showModal} closeModal={(e)=> this.closeModalHandler(e)}/>
           
           <div className={classes.SegmentOne} >
                    
                    <div className={classes.Left}>
                        <div className={classes.segment1Left}>
                            <div className={classes.ContentTop}>
                                <h1 style={{color: '#011627'}}>Simplify the complexities</h1>
                                <p className={classes.segment1text}>REMI helps you bring order to complexities by taking full<br/>
                                control.Our Software is what you have always needed.
                                </p>
                            </div>
                            <div className={classes.button}>
                                <a href="#">Learn more</a>
                            </div>
                        </div>
                    </div>
                   
                
                    <div className={classes.Right}>
                        <div className={classes.segment1Right}>
                            <h1 className={classes.segment1Logo}>Logo</h1>
                            
                        </div>
                    </div>
            </div>
           
           <div className={classes.SegmentTwo} >
               <div className={classes.SegmenttwoLeft}>
                   <blockquote>"A quote about the<br/> product will be here, something catchy"</blockquote>
               </div>
           </div>
           
           <div className={classes.SegmentThree}>
               <div style={{width:'100%',margin:'0 auto'}}>
                   <h2 className={classes.SegmentthreeHeading}>Features</h2>
               </div>
             
              <div className={classes.SegmentThreeContainer}>
                     
                     <div className={classes.SegmentthreeLeft}>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Employee Information Management</h3>
                         </div>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Recruitment and Hiring</h3>
                         </div>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Talent Management</h3>
                         </div>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Reviews and Feedback</h3>
                         </div>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Reward and recognition</h3>
                         </div>
                       
                     </div>
    
                     <div className={classes.SegmentthreeRight}>

                     <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Learning and development</h3>
                         </div>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Payroll and benefits management</h3>
                         </div>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Leave and attendance management</h3>
                         </div>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>Employee Engagement</h3>
                         </div>

                         <div className={classes.BulletList}>
                             <img src={BulletList}/>
                             <h3>User dashboard</h3>
                         </div>
    
                     </div>
                </div>
                 
          </div>
            

            <div className={classes.SegmentFour}>
                <div className={classes.SegmentfourLeft}>
                </div>

                <div className={classes.SegmentfourRight}>

                        
                            <blockquote>"A quote about the<br/> product will be here, something catchy"</blockquote>
                        

                </div>
            
            </div>

          <div style={{width:'100%'}}>
              <Footer />
          </div>
            
        </motion.div>)
    }
}


export default LandingPage;