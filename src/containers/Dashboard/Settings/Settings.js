import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import classes from "./Settings.css";
import Modal from "@material-ui/core/Modal";
import { apiUrl } from "../../../reusables/endpoints";
import SettingsView from "./SettingsView/SettingsView";
import { StylesProvider, withStyles } from "@material-ui/core/styles";
import Sample from "./sample";
import TabContainer from "../../../components/Tab/TabContainer/TabContainer";
import TabLabel from "../../../components/Tab/TabLabel/TabLabel";
import TabContent from "../../../components/Tab/TabContent/TabContent";
import TabIndicator from "../../../components/Tab/TabIndicator/TabIndicator";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import { Formik } from "formik";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

const TabEdit = withStyles({
  root: {
    "& .PrivateTabIndicator-colorSecondary-4": { backgroundColor: "green" },
  },
})(AppBar);

class Settings extends Component {
  state = {
    value: 0,
    openJobTitle: false,
    openJobTitleUpdate: false,
    openDepartment: false,
    openDepartmentUpdate: false,
    jobTitle: "",
    titles: [],
    updatedTitle: "",
    selectedJobTitle: 0,
    departments: [],
    department: "",
    selectedDepartment: 0,
    index: 0,
    left: 0,
  };

  company_id = 0;

  componentDidMount = () => {
    let Url = apiUrl();

    let companyDetails = JSON.parse(localStorage.getItem("company_details"));
    console.log(companyDetails);

    let companyDetailsLength = companyDetails.length;

    this.company_id = companyDetails[companyDetailsLength - 1].data.company_id;

    console.log(this.company_id);
    // get job titles
    fetch(`${Url}/v1/api/jobtitle/${this.company_id}`)
      .then((res) => res.json())
      .then((response) => {
        let oldArr = [...this.state.titles];

        console.log(response.data);
        this.setState({
          titles: oldArr.concat(response.data),
        });
      })
      .catch((err) => console.log(err));

    // get departments
    fetch(`${Url}/v1/api/department/${this.company_id}`)
      .then((res) => res.json())
      .then((response) => {
        let oldArr = [...this.state.departments];

        console.log(response.data);
        this.setState({
          departments: oldArr.concat(response.data),
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  handleOpen = () => {
    this.setState({
      openJobTitle: true,
    });
  };

  handleOpenDepartment = () => {
    this.setState({
      openDepartment: true,
    });
  };

  handleClose = () => {
    this.setState({
      openJobTitle: false,
    });
  };

  handleCloseDepartment = () => {
    this.setState({
      openDepartment: false,
    });
  };

  tabHeader = React.createRef();
  changeTab = (e) => {
    e.persist();
    console.log("changing");
    // console.log(this.tabHeader.current.childElementCount)
    console.log(
      [...this.tabHeader.current.children].indexOf(e.target),
      "index of"
    );
    // console.log(e)
    let chlidElementIndex = [...this.tabHeader.current.children].indexOf(
      e.target
    );
    let childElementCount = this.tabHeader.current.childElementCount;
    let childElementWidth = e.target.clientWidth;

    console.log(e.target.clientWidth);

    let moveIndicator = childElementWidth * chlidElementIndex;
    this.setState({
      index: chlidElementIndex,
      left: moveIndicator,
    });

    console.log(this.state.index);
  };

  jobTitle_details = {
    jobTitle: [],
  };

  change = (e) => {
    let job_title;

    e.target.placeholder === "job title"
      ? this.jobTitle_details.jobTitle.push(e.target.value)
      : (job_title = "");

    console.log(this.jobTitle_details);

    let jobTitleArrLength = this.jobTitle_details.jobTitle.length;

    this.setState({
      jobTitle: this.jobTitle_details.jobTitle[jobTitleArrLength - 1],
    });
  };

  displayUpdateModal = (e, id) => {
    this.setState({
      openJobTitleUpdate: true,
      selectedJobTitle: id,
    });
  };

  displayUpdateModalClose = (e, id) => {
    this.setState({
      openJobTitleUpdate: false,
    });
  };

  deleteHandler = (e, id, index) => {
    let Url = apiUrl();

    fetch(`${Url}/v1/api/jobtitle/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        let oldArr = [...this.state.titles];
        oldArr.splice(index, 1);

        console.log(oldArr);
        this.setState({
          titles: oldArr,
        });
      })
      .catch((err) => console.log(err));
  };

  submitFormHandler = (values, actions) => {
    let Url = apiUrl();
    // let companyDetails = JSON.parse(localStorage.getItem('company_details'));

    // let companyDetailsLength = companyDetails.length

    //  let jobTitleDetails = {
    //     job_title:this.state.jobTitle,
    //     company_id:companyDetails[companyDetailsLength-1].data.id
    //  }

    let companyDetails = JSON.parse(localStorage.getItem("company_details"));
    console.log(companyDetails);

    let companyDetailsLength = companyDetails.length;
    console.log(values);

    let company_id = companyDetails[companyDetailsLength - 1].data.company_id;
    let newValues = { ...values, company_id };
    //create packages
    fetch(`${Url}/v1/api/jobtitle`, {
      method: "POST",
      body: JSON.stringify(newValues),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        let titles = [...this.state.titles];
        // console.log(this.props.history)
        // this.props.history.goBack()
        this.setState({
          ...this.state,
          titles: titles.concat(response.data),
        });
      })
      .catch((err) => console.log(err));
  };

  submitUpdatedFormHandler = (e) => {
    let Url = apiUrl();
    let companyDetails = JSON.parse(localStorage.getItem("company_details"));

    let companyDetailsLength = companyDetails.length;

    let jobTitleDetails = {
      job_title: this.state.jobTitle,
      company_id: companyDetails[companyDetailsLength - 1].data.id,
    };

    console.log(this.state.selectedJobTitle);

    //create packages
    fetch(`${Url}/v1/api/jobtitle/${this.state.selectedJobTitle}`, {
      method: "PUT",
      body: JSON.stringify(jobTitleDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        // console.log(this.props.history)
        // this.props.history.goBack()
      })
      .catch((err) => console.log(err));
  };

  getUpdatedTitle = (e) => {
    let job_title;

    e.target.placeholder === "job title"
      ? this.jobTitle_details.jobTitle.push(e.target.value)
      : (job_title = "");

    console.log(this.jobTitle_details);

    let jobTitleArrLength = this.jobTitle_details.jobTitle.length;

    this.setState({
      updatedTitle: this.jobTitle_details.jobTitle[jobTitleArrLength - 1],
    });
  };

  //  department CRUD Logic

  department_details = {
    department: [],
  };

  changeDepartment = (e) => {
    let department;

    e.target.placeholder === "department"
      ? this.department_details.department.push(e.target.value)
      : (department = "");

    console.log(this.department_details);

    let departmentArrLength = this.department_details.department.length;

    console.log(this.department_details.department[departmentArrLength - 1]);
    this.setState({
      department: this.department_details.department[departmentArrLength - 1],
    });
  };

  displayDepartmentUpdateModal = (e, id) => {
    this.setState({
      openDepartmentUpdate: true,
      selectedDepartment: id,
    });
  };

  displayDepartmentUpdateModalClose = (e, id) => {
    this.setState({
      openDepartmentUpdate: false,
    });
  };

  deleteDepartmentHandler = (e, id, index) => {
    let Url = apiUrl();

    fetch(`${Url}/v1/api/department/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        let oldArr = [...this.state.departments];
        oldArr.splice(index, 1);

        console.log(oldArr);
        this.setState({
          departments: oldArr,
        });
      })
      .catch((err) => console.log(err));
  };

  submitDepartmentFormHandler = (e) => {
    let Url = apiUrl();
    let companyDetails = JSON.parse(localStorage.getItem("company_details"));

    let companyDetailsLength = companyDetails.length;

    let departmentDetails = {
      department_name: this.state.department,
      company_id: companyDetails[companyDetailsLength - 1].data.id,
    };

    console.log(departmentDetails);

    //create packages
    fetch(`${Url}/v1/api/department`, {
      method: "POST",
      body: JSON.stringify(departmentDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        // console.log(this.props.history)
        // this.props.history.goBack()
      })
      .catch((err) => console.log(err));
  };

  submitUpdatedDepartmentFormHandler = (e) => {
    let Url = apiUrl();
    let companyDetails = JSON.parse(localStorage.getItem("company_details"));

    let companyDetailsLength = companyDetails.length;

    let departmentDetails = {
      department_name: this.state.department,
      company_id: companyDetails[companyDetailsLength - 1].data.id,
    };

    console.log(this.state.selectedDepartment);

    //create packages
    fetch(`${Url}/v1/api/department/${this.state.selectedDepartment}`, {
      method: "PUT",
      body: JSON.stringify(departmentDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        // console.log(this.props.history)
        // this.props.history.goBack()
      })
      .catch((err) => console.log(err));
  };

  getUpdatedDepartment = (e) => {
    let department;

    e.target.placeholder === "department"
      ? this.department_details.department.push(e.target.value)
      : (department = "");

    console.log(this.department_details);

    let departmentArrLength = this.department_details.department.length;

    this.setState({
      departments: this.department_details.department[departmentArrLength - 1],
    });
  };

  render() {
    let body = (
      <div>
        <div className={classes.Paper}>
          <h2 style={{ textAlign: "center" }}>Create Job Titles</h2>
          <div>
            <div>
              <div>Job Title</div>
              <div>
                <input
                  type="text"
                  placeholder="job title"
                  onChange={(e) => this.change(e)}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className={classes.Button}
              onClick={(e) => this.submitFormHandler(e)}
            >
              add
            </button>
          </div>
        </div>
      </div>
    );

    let updateBody = (
      <div>
        <div className={classes.Paper}>
          <h2 style={{ textAlign: "center" }}>Update Job Titles</h2>

          <div>
            <div>
              <div>Job Title</div>
              <div>
                <input
                  type="text"
                  placeholder="job title"
                  onChange={(e) => this.change(e)}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className={classes.Button}
              onClick={(e) => this.submitUpdatedFormHandler(e)}
            >
              edit
            </button>
          </div>
        </div>
      </div>
    );

    //department tab display
    let departmentBody = (
      <div>
        <div className={classes.Paper}>
          <h2 style={{ textAlign: "center" }}>Create Department</h2>
          <div>
            <div>
              <div>Department</div>
              <div>
                <input
                  type="text"
                  placeholder="department"
                  onChange={(e) => this.changeDepartment(e)}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className={classes.Button}
              onClick={(e) => this.submitDepartmentFormHandler(e)}
            >
              add
            </button>
          </div>
        </div>
      </div>
    );

    let updateDepartmentBody = (
      <div>
        <div className={classes.Paper}>
          <h2 style={{ textAlign: "center" }}>Update Department</h2>

          <div>
            <div>
              <div>Department</div>
              <div>
                <input
                  type="text"
                  placeholder="department"
                  onChange={(e) => this.changeDepartment(e)}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className={classes.Button}
              onClick={(e) => this.submitUpdatedDepartmentFormHandler(e)}
            >
              edit
            </button>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <Paper elevation={3} className={classes.Background}>
          <TabContainer>
            <div
              ref={this.tabHeader}
              className={classes.TabHeader}
              onClick={this.changeTab}
            >
              <TabLabel>Job Roles</TabLabel>
              <TabLabel>Department</TabLabel>
              <TabLabel>Tab Three</TabLabel>
            </div>

            <TabIndicator left={`${this.state.left}px`} />
            <TabContent index={this.state.index}>
              <div style={{ marginTop: "20px" }}>
                <Formik
                  initialValues={{
                    job_title: "",
                    company_id: "",
                  }}
                  onSubmit={(values, actions) => {
                    this.submitFormHandler(values, actions);
                  }}
                >
                  {(props) => (
                    <form
                      style={{ display: "flex", justifyContent: "center" }}
                      onSubmit={props.handleSubmit}
                    >
                      <TextField
                        id="standard-basic"
                        label="Add Job Roles"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        // value={props.values.job_title}
                        name="job_title"
                      />
                      {props.errors.name && (
                        <div id="feedback">{props.errors.name}</div>
                      )}
                      {/* <button type="submit">Submit</button> */}
                      <div className={classes.BtnDiv}>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="submit"
                          className={classes.Btn}
                          endIcon={<SendIcon />}
                          // onClick={this.submitFormHandler}
                        >
                          Add
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
                <div style={{ marginTop: "20px" }}>
                  {this.state.titles.map((title, index) => (
                    <Chip
                      key={title.title_id}
                      label={title.job_title}
                      variant="outlined"
                      style={{ margin: "5px" }}
                      color="secondary"
                      clickable
                      onDelete={(e) =>
                        this.deleteHandler(e, title.title_id, index)
                      }
                    />
                  ))}
                </div>
              </div>
              <div>Content two</div>
              <div>Content three</div>
            </TabContent>
          </TabContainer>
        </Paper>
      </div>
    );
  }
}

export default Settings;
