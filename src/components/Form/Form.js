import React, { Component } from "react";
import "./Form.css";
import { connect } from "react-redux";
import { updateForm, editForm } from "../../store/reducers/formReducer";
import { withRouter } from "../shared/withRouter";

const BASE_URL = "http://first-app-service-by-qutub.azurewebsites.net";
export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      error: null
    };
  }
  componentDidMount() {
    console.log(this.props.params)
    const queryParams = new URLSearchParams(
      window.location.href.split("?").pop()
    );
    const id = queryParams.get("edit");
    this.setState({
      id: id && this.props.forms.length > 0,
    });
    if (id && this.props.forms.length > 0) {
      console.log(this.props.forms);
      const form = this.props.forms.find((f) => f._id === id);
      console.log(form);
      this.props.editForm({
        name: form.name,
        email: form.email,
        gender: form.gender,
        color: form.color,
        country: form.country,
        message: form.message,
      });
    } else {
      this.props.editForm({
        name: "",
        email: "",
        gender: "",
        color: [],
        country: "",
        message: "",
      });
    }
  }
  onChange = (e) => {
    if (e.target.name !== "color") {
      this.props.updateForm({ name: e.target.name, value: e.target.value });
    } else {
      const colors = this.props.form.color;
      // console.log(e.target.checked,e.target.value,e.target.name)
      let updatedColors = [];
      if (e.target.checked) {
        updatedColors = [...colors, e.target.value];
      } else {
        updatedColors = colors.filter((c) => c !== e.target.value);
      }
      this.props.updateForm({
        name: "color",
        value: updatedColors,
      });
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const validationError = {}
    if(!this.props.form.name.trim()){
      validationError.name = "Name is required"
    }
    if(this.props.form.name.trim() && this.props.form.name.length <= 3){
      validationError.name = "Name should be greater than 3"
    }
    if(!this.props.form.email.trim()){
      validationError.email = "Email is required"
    }

    this.setState({
      error: validationError
    })

    if(Object.keys(validationError).length === 0){
      const queryParams = new URLSearchParams(
        window.location.href.split("?").pop()
      );
      const id = queryParams.get("edit");
      try {
        if (this.state.id) {
          const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.props.form),
          };
          await fetch(BASE_URL + "/updateForm/" + id, options);
        } else {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.props.form),
          };
          await fetch(BASE_URL + "/createForm", options);
          //   redirect("/formDetails");
        }
      } catch (error) {
        console.log(error);
      }
      this.props.navigate("/formDetails");
    }
  };


  
  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.props.form.name}
            onChange={this.onChange}
            // required
          />
          <span style={{ color:"red"}}>{this.state.error?.name && this.state.error.name}</span>

          <label htmlFor="email">Email:</label>
          <input
            value={this.props.form.email}
            onChange={this.onChange}
            type="text"
            id="email"
            name="email"
            // required
          />
          <span style={{ color:"red"}}>{this.state.error?.email && this.state.error.email}</span>

          <label>Gender:</label>
          <label>
            <input
              onChange={this.onChange}
              checked={this.props.form.gender === "male"}
              type="radio"
              name="gender"
              value="male"
            />{" "}
            Male
          </label>
          <label>
            <input
              onChange={this.onChange}
              checked={this.props.form.gender === "female"}
              type="radio"
              name="gender"
              value="female"
            />{" "}
            Female
          </label>
          <label>
            <input
              onChange={this.onChange}
              checked={this.props.form.gender === "other"}
              type="radio"
              name="gender"
              value="other"
            />{" "}
            Other
          </label>

          <label>Favorite Color:</label>
          <label>
            <input
              onChange={this.onChange}
              checked={this.props.form.color.includes("red")}
              type="checkbox"
              name="color"
              value="red"
            />{" "}
            Red
          </label>
          <label>
            <input
              onChange={this.onChange}
              checked={this.props.form.color.includes("blue")}
              type="checkbox"
              name="color"
              value="blue"
            />{" "}
            Blue
          </label>
          <label>
            <input
              onChange={this.onChange}
              checked={this.props.form.color.includes("green")}
              type="checkbox"
              name="color"
              value="green"
            />{" "}
            Green
          </label>

          <label style={{ marginTop: "10px" }}>Country: </label>
          <select
            name="country"
            onChange={this.onChange}
            className="dropdown-content"
            value={this.props.form.country}
          >
            <option value="">--Select--</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
          </select>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            // required
            value={this.props.form.message}
            onChange={this.onChange}
          ></textarea>
          {this.state.id ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  form: state.form.formFields,
  forms: state.form.forms,
});

export default withRouter(
  connect(mapStateToProps, { updateForm, editForm })(Form)
);
