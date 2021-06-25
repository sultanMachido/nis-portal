import React from 'react';
import classes from './Footer.css';


const Footer = () => (
    <div className={classes.Footer}>
        <div className={classes.Footer1}>
            <ul>
                <li>Home</li>
                <li>What we do</li>
                <li>About Us</li>
                <li>Pricing</li>
            </ul>
        </div>
        <div className={classes.Footer2}>
            <p>5 Erie Close, Off Erie Crescent, Off Nile Street, Maitama, Abuja. info@rhizomeng.com www.rhizomeng.com +234-(0)-9-290-0567 Hours: Mon-Fri 9:00am - 5:30pm Created by Rhizome Consulting .</p>
        </div>
        <div className={classes.Footer3}>
            <p>Copyright 2020-All rights reserved.</p>
        </div>
    </div>
);


export default Footer