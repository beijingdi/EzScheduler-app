import axios from "axios";
import React, { useState } from "react";
import classes from "./Register.module.css";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nameRegister = (e) => {
    setName(e.target.value);
  };

  const emailRegister = (e) => {
    setEmail(e.target.value);
  };

  const passwordRegister = (e) => {
    setPassword(e.target.value);
  };

  function cookieSetter(newName) {
    props.setCookie("user", newName, { path: "/" });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    //const userData = { name, email, password };
    axios
      .post("/users/register", { name: name, email: email, password: password })
      .then((user) => {
        if (user.data.status === 200) {
          console.log("USER ID = ", user.data.id);
          cookieSetter({ id: user.data.id, name: user.data.name });
          props.setLogin(true);
          props.close();
          props.setName(name);
        }
        if (user.data.status === 401) {
          setError(true);
          setErrorMessage(user.data.message);
        }
      });
  };

  const formClass = `${classes.center} row`;
  return (
    <div className={classes.container}>
      <form className={classes.login_overlay} onSubmit={submitHandler}>
        <div className={`${classes.center} align-self-end`}>
          <i
            onClick={props.close}
            className={`${classes.close} bi bi-x-lg`}
          ></i>
        </div>
        <div className={`${classes.center} row`}>
          <h3 className={classes.title}>REGISTER</h3>
          <div className={formClass}>
            <label>Name:</label>
            <input
              className={classes.input}
              type="text"
              value={name}
              onChange={nameRegister}
              placeholder="John Doe"
              required
            />
          </div>
          <div className={formClass}>
            <label>Email:</label>
            <input
              className={classes.input}
              type="email"
              value={email}
              onChange={emailRegister}
              placeholder="name@email.com"
              required
            />
          </div>
          <div className={formClass}>
            <label>Password:</label>
            <input
              className={classes.input}
              type="password"
              value={password}
              onChange={passwordRegister}
              required
            />
          </div>
          {error && <h4>{errorMessage}</h4>}
          <button className={classes.btn} type="submit">
            REGISTER!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
