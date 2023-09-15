import React, { Component } from "react";
import "./FormDetails.css";
import { connect } from "react-redux";
import {
  fetchForms,
  editForm,
  setLoading,
} from "../../store/reducers/formReducer";
import { withRouter } from "../shared/withRouter";


const BASE_URL = "http://first-app-service-by-qutub.azurewebsites.net";
export class FormDetails extends Component {
  async componentDidMount() {
    this.fetchForm();
  }
  fetchForm = async () => {
    try {
      this.props.setLoading(true);
      const response = await fetch(BASE_URL + "/getForm");
      const result = await response.json();
      this.props.fetchForms(result);
      this.props.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  onEdit = (form) => {
    // this.props.editForm({
    //   name: form.name,
    //   email: form.email,
    //   gender: form.gender,
    //   color: form.color,
    //   country: form.country,
    //   message: form.message,
    // });
    this.props.navigate("/form?edit=" + form._id);
  };
  onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(BASE_URL + "/deleteForm/" + id, options);
      await response.json();
      this.fetchForm();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div className="customer-display">
        {this.props.loading && <h1>Loading.....</h1>}
        {!this.props.loading && this.props.forms.length === 0 && (
          <h1>No form found</h1>
        )}
        {!this.props.loading &&
          this.props.forms?.length !== 0 &&
          this.props.forms.map((form) => (
            <div className="customer-info" style={{ backgroundColor: form.color[0]}} key={form._id}>
              <p>
                Name: <b>{form.name}</b>
              </p>
              <p>
                Email: <b>{form.email}</b>
              </p>
              <p>
                Gender: <b>{form.gender}</b>
              </p>
              <p>
                Favorite Color: <b>{form.color.map((c) => `${c} `)}</b>
              </p>
              <p>
                Country: <b>{form.country}</b>
              </p>
              <p>
                Message: <b>{form.message}</b>
              </p>
              <div className="button-container">
                <button className="edit-btn" onClick={() => this.onEdit(form)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => this.onDelete(form._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  forms: state.form.forms,
  loading: state.form.loading,
});
export default withRouter(
  connect(mapStateToProps, { fetchForms, setLoading, editForm })(FormDetails)
);
