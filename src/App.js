import React, { Component } from "react";
import "./App.css";

// const BASE_URL = "http://localhost:8000";
const BASE_URL = "http://first-app-service-by-qutub.azurewebsites.net";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleForm: false,
      formFields: {
        name: "",
        email: "",
        gender: "other",
        color: [],
        country: "",
        message: "",
      },
      forms: [],
      editMode: {
        edit: false,
        id: "",
      },
      loading: false
    };
  }

  async componentDidMount() {
    this.fetchForm();
  }

  fetchForm = async () => {
    this.setState({
      loading: true
    })
    const response = await fetch(BASE_URL + "/getForm");
    const result = await response.json();
    console.log(result);
    this.setState({
      forms: result,
      loading: false
    });
  };

  onChange = (e) => {
    if (e.target.name !== "color") {
      this.setState({
        formFields: {
          ...this.state.formFields,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      const colors = this.state.formFields.color;
      // console.log(e.target.checked,e.target.value,e.target.name)
      if (e.target.checked) {
        const updatedColors = [...colors, e.target.value];
        this.setState({
          formFields: {
            ...this.state.formFields,
            color: updatedColors,
          },
        });
      } else {
        const updatedColors = colors.filter((c) => c !== e.target.value);
        this.setState({
          formFields: {
            ...this.state.formFields,
            color: updatedColors,
          },
        });
      }
    }
  };

  toggleForm = () => {
    this.setState({
      toggleForm: !this.state.toggleForm,
    });
  };


  onDelete = async (id) => {
    const options = {
      method: "DELETE"
    };
    const response = await fetch(BASE_URL + "/deleteform/" + id, options);
    await response.json();
    this.setState({
      toggleForm: false
    })
    this.fetchForm()
  }
  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.formFields);
    if (!this.state.editMode.edit) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.formFields),
      };
      const response = await fetch(BASE_URL + "/createform", options);
      await response.json();
    } else {
      await this.updateForm();
    }
    this.setState({
      formFields: {
        name: "",
        email: "",
        gender: "other",
        color: [],
        country: "",
        message: "",
      },
      toggleForm: false,
      editMode: {
        edit: false,
        id: "",
      },
    });
    this.fetchForm();
  };

  onEdit = async (id) => {
    const response = await fetch(BASE_URL + "/getForm/" + id);
    const result = await response.json();
    // console.log(result)
    this.setState({
      formFields: {
        ...result,
      },
      toggleForm: true,
      editMode: {
        edit: true,
        id,
      },
    });
  };

  updateForm = async () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.formFields),
    };
    const response = await fetch(
      BASE_URL + "/updateForm/" + this.state.editMode.id,
      options
    );
    await response.json();
  };

  render() {
    return (
      <>
        <button
          type="button"
          className="button"
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onClick={this.toggleForm}
        >
          Toggle Form
        </button>
        {this.state.loading && <h1>Loading.....</h1>}
        {this.state.forms?.length === 0 && <h1>No Data</h1>}
        {!this.state.toggleForm &&
          this.state.forms?.length !== 0 &&
          this.state.forms.map((form) => (
            <div className="customer-display">
              <div className="customer-info">
                <p>Name: {form.name}</p>
                <p>Email: {form.email}</p>
                <p>Gender: {form.gender}</p>
                <p>Favorite Color: {form.color}</p>
                <p>Country: {form.country}</p>
                <p>Message: {form.message}</p>
                <div className="button-container">
                  <button
                    className="edit-btn"
                    onClick={() => this.onEdit(form._id)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => this.onDelete(form._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        {this.state.toggleForm && (
          <div className="form-container">
            <form onSubmit={this.onSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={this.state.formFields.name}
                onChange={this.onChange}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                value={this.state.formFields.email}
                onChange={this.onChange}
                type="text"
                id="email"
                name="email"
                required
              />

              <label>Gender:</label>
              <label>
                <input
                  onChange={this.onChange}
                  checked={this.state.formFields.gender === "male"}
                  type="radio"
                  name="gender"
                  value="male"
                />{" "}
                Male
              </label>
              <label>
                <input
                  onChange={this.onChange}
                  checked={this.state.formFields.gender === "female"}
                  type="radio"
                  name="gender"
                  value="female"
                />{" "}
                Female
              </label>
              <label>
                <input
                  onChange={this.onChange}
                  checked={this.state.formFields.gender === "other"}
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
                  checked={this.state.formFields.color.includes("red")}
                  type="checkbox"
                  name="color"
                  value="red"
                />{" "}
                Red
              </label>
              <label>
                <input
                  onChange={this.onChange}
                  checked={this.state.formFields.color.includes("blue")}
                  type="checkbox"
                  name="color"
                  value="blue"
                />{" "}
                Blue
              </label>
              <label>
                <input
                  onChange={this.onChange}
                  checked={this.state.formFields.color.includes("green")}
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
                class="dropdown-content"
                value={this.state.formFields.country}
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
                required
                value={this.state.formFields.message}
                onChange={this.onChange}
              ></textarea>
              {this.state.editMode.edit ? (
                <button type="submit">Update</button>
              ) : (
                <button type="submit">Submit</button>
              )}
            </form>
          </div>
        )}
      </>
    );
  }
}

export default App;
