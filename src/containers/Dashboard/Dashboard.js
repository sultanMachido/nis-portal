import React, { Component } from "react";
import ProgressBar from "../../components/Loader/ProgressBar/ProgressBar";
import classes from "./Dashboard.css";
import SideBar from "../../components/SideBar/SideBar";
import { Link, Switch, Route, withRouter } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Forms/Button/Button";
import WelcomeContent from "./WelcomeContent/WelcomeContent";
import HomeContent from "./HomeContent/HomeContent";
import Profile from "./Profile/Profile";
import OnboardingProgress from "./OnboardingProgress/OnboardingProgress";
import { connect } from "react-redux";
import Leave from "./Leave/Leave";
import Employee from "./Employee/Employee";
import AdminProfileView from "./AdminProfileView/AdminProfileView";
import Recruitment from "./Recruitment/Recruitment";
import Subscription from "./Subscription/Subscription";
import Drawer from "@material-ui/core/Drawer";
import NavButton from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MobileNav from "../../components/MobileNav/MobileNav";
import Settings from "./Settings/Settings";
import Talent from "./Talent/Talent";
import lineChart from "../../images/line.png";
import barChart from "../../images/bar.png";
import barOne from "../../images/Group 753.png";
import barTwo from "../../images/Group 12825.png";
import pieChart from "../../images/Pie Circular.png";
let apiUrl;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://api-remi-hr.herokuapp.com";
} else {
  apiUrl = "http://localhost:5000";
}

class Dashboard extends Component {
  //will change state to a central store using redux
  state = {
    displayLoader: true,
    firstname: "",
    unauthorised: false,
    onboardingComplete: true,
    role: "user",
    subscriptions: [],
    left: false,
  };

  componentDidMount() {
    console.log(this.props.role);

    // let userDetails = JSON.parse(localStorage.getItem('response_value'))
    let userId;
    // userDetails? userId = userDetails[userDetails.length-1].data.id: userId = null;

    let companyDetails = JSON.parse(localStorage.getItem("company_details"));
    let role = JSON.parse(localStorage.getItem("role"));

    let companyDetailsLength = companyDetails.length;

    let company_id = companyDetails[companyDetailsLength - 1].data.company_id;

    console.log(company_id, "company_id");
    console.log(userId, "user_id");

    console.log(role);

    console.log(companyDetails[companyDetailsLength - 1].data.company_id);

    // console.log(userDetails[0].id);
    //http://localhost/v1/api/staffs/
    //https://api-remi-hr.herokuapp.com/v1/api/staffs/
  }

  toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ ...this.state, left: open });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    let layout;
    let content;
    let role = JSON.parse(localStorage.getItem("role"));

    console.log(this.state.subscriptions.length);
    console.log(this.state.subscriptions);
    console.log(this.state.displayLoader);

    // if (role[0] === 'admin') {
    //     if (this.state.subscriptions.length && this.state.subscriptions.indexOf('Employee Integration Module')!==-1) {
    //         content=(
    //             <Switch>

    //              <Route path={this.props.match.url+'/setting'}  render={()=> <Settings />}/>
    //              <Route path={this.props.match.url+'/talent'}  render={()=> <Talent />}/>
    //              <Route path={this.props.match.url+'/recruitment'}  render={()=> <Recruitment />}/>
    //              <Route path={this.props.match.url+'/adminprofileview/:id'}  render={()=> <AdminProfileView/>}/>
    //              <Route path={this.props.match.url+'/subscription'}  render={()=> <Subscription/>}/>
    //              <Route path={this.props.match.url+'/'}  render={()=> <Employee />}/>
    //            </Switch>
    //       )
    //     }else{

    //         content=(
    //                 <Switch>

    //                 {/* <Route path={this.props.match.url+'/subscription'}  render={()=> <Subscription/>}/> */}
    //                 <Route path={this.props.match.url+'/'}  render={()=> <Subscription />}/>
    //             </Switch>
    //       )

    //     // content=(<p>hi</p>)

    //     }

    // }else if(role[0] ==='employee'){
    //     if (this.state.subscriptions.length && this.state.subscriptions.indexOf('Employee Integration Module')) {
    //           console.log('here check')
    //         content =(
    //             <Switch>
    //                     <Route path={this.props.match.url+'/leave'}  render={()=> <Leave/>}/>
    //                     <Route path={this.props.match.url+'/onboarding'} component={OnboardingProgress} />
    //                     <Route path={this.props.match.url+'/home'}  render={()=> <HomeContent/>}/>
    //                     {!this.props.employeeOnboarding.onboardingProgress?<Route path={this.props.match.url+'/'}  render={()=> <Profile/>}/>:<Route path={this.props.match.url+'/'} exact render={()=> <WelcomeContent state={this.state} />}/>}
    //                     {/* {console.log(this.props.employeeOnboarding.OnboardingProgress)}
    //                     {/* <Route path={this.props.match.url+'/'}  render={()=> <Profile/>}/> */}

    //             </Switch>
    //            )
    //     }else{
    //         content=(
    //             <div>
    //                 Subscription not available or inactive.Contact company admin.
    //             </div>
    //         )
    //     }

    // }

    layout = (
      <div>
        <div className={classes.MobileHeader}>
          <NavButton onClick={this.toggleDrawer(true)}>
            <HomeIcon />
          </NavButton>
          <NavButton onClick={() => this.goBack()}>
            <ArrowBackIcon />
          </NavButton>
        </div>

        <div className={classes.DashboardContainer}>
          <SideBar />

          <React.Fragment key="left">
            <Drawer
              anchor="left"
              open={this.state.left}
              onClose={this.toggleDrawer(false)}
            >
              <MobileNav role={this.state.role} show={this.state.left} />
            </Drawer>
          </React.Fragment>

          <MobileNav role={this.state.role} />
          <div className={classes.Right}>
            <TopBar state={this.state} />

            <div
              style={{
                display: "flex",
                width: "100%",
                height: "50%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "68%",
                  height: "50%",
                  display: "flex"
                }}
              >
                <div style={{ width: "22%",marginLeft:'13%'}}>
                  <img src={lineChart} />
                </div>
                <div style={{ width: "20%",marginLeft:'35%'}}>
                  <img src={barChart} />
                </div>
              </div>
              <div
                style={{ width: "23%", height: "50%",marginLeft:'2%' }}
              >
                <div >
                  
                      <img src={barOne} />
                </div>

                <div >
                  
                     <img src={barTwo} />
                 
                 </div>

                <div style={{marginLeft:'10%'}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h4>Lorem Ipsum</h4>
                         <p style={{paddingTop:'23px'}}>75%</p>   
                    </div>

                    <div style={{display:'block'}}>
                        <p>Number of passport processed this month</p>
                        <img src={pieChart} style={{marginTop:'20px'}}/>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    //check for unauthorised login
    let warning = (
      <div className={classes.Content}>
        <h2>You are not Authorised to perform this action</h2>
        <p>Login from your company's URL</p>
        <Button>
          <Link to="/">Get started</Link>
        </Button>
      </div>
    );

    return (
      <div>
        {layout}
        {this.state.unauthorised ? warning : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employeeOnboarding: state.employeeOnboarding,
    role: state.role,
  };
};

export default connect(mapStateToProps)(withRouter(Dashboard));
