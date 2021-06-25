import React from 'react';
import classes from './Modal.css';


const Modal = ({modalDisplay,showModal,closeModal}) =>{
     
    const show = showModal?modalDisplay:classes.Modal
    
    return  (
    <div className={show} >
        <div className={classes.Container}>
            <div>
                <ul className={classes.NavList}>
                    <li>Product Features</li>
                    <li>Contact Us</li>
                    <li>About Us</li>
                </ul>
            </div>

            <div >
                <h1 onClick={closeModal}>X</h1>
            </div>


        </div>
        
    </div>
     )

}

export default Modal