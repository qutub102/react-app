import { Outlet, NavLink } from "react-router-dom";
import "./App.css";
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="navbar">
          <NavLink to='/' className={({isActive}) => isActive ? 'bg' : ''}>
            Home
          </NavLink>
          <NavLink to='/form' className={({isActive}) => isActive ? 'bg' : ''}>
            Form
          </NavLink>
          <NavLink to='/formDetails' className={({isActive}) => isActive ? 'bg' : ''}>
            Form List
          </NavLink>
        </div>
        <Outlet />
      </div>
    );
  }
}

export default App;
