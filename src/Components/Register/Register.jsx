import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });
  const [errorsList, setErrorsList] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  let goToLogin = () => {
    navigate("/");
  };
  let submitFormData = async (e) => {
    e.preventDefault();
    let validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details);
    } else {
      try {
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          user
        );
        
        if (data.message === "success") {
          goToLogin();
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        console.error("API Error:", error);
        setErrorMsg(error.response.data.errors.msg);
      }
    }
  };

  let validateFormData = () => {
    const schema = Joi.object({
      name: Joi.string().alphanum().required().min(2).max(10),
      phone: Joi.string().pattern(/^(01)[0-9]{9}$/).required(),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
      .required()
      .pattern(new RegExp("^[A-Z][a-zA-Z0-9]*$")),
        rePassword:Joi.string()
        .required()
        .pattern(new RegExp("^[A-Z][a-zA-Z0-9]*$")),
    });
    return schema.validate(user, { abortEarly: false });
  };
  let getInputValue = (e) => {
    let myUser = { ...user }; //deep copy of user in myUser Obj
    myUser[e.target.name] = e.target.value; //3shan a5od ale bktbo w yt5zn gwa name
    setUser(myUser);
  };
  return (
    <>
      <div className="w-75 m-auto py-5">
        <h2 className="mb-5">Registration Form</h2>
        {ErrorMsg ? (
          <div className="alert alert-danger p-2">{ErrorMsg}</div>
        ) : (
          ""
        )}
        <form onSubmit={submitFormData}>
          <div className="input-data">
            <label htmlFor="name">First Name</label>
            <input
              onChange={getInputValue}
              type="text"
              className="form-control my-2"
              name="name"
            />
            {errorsList.map((error, index) => {
                    if (error.path.includes('name')) {
                      return (
                        <div key={index} className="alert alert-danger p-2">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
          </div>
          <div className="input-data">
            <label htmlFor="email">Email</label>
            <input
              onChange={getInputValue}
              type="text"
              className="form-control my-2"
              name="email"
            />
            {errorsList.map((error, index) => {
                    if (error.path.includes('email')) {
                      return (
                        <div key={index} className="alert alert-danger p-2">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
          </div>
          <div className="input-data">
            <label htmlFor="phone">Phone Number</label>
            <input
              onChange={getInputValue}
              type="number"
              className="form-control my-2"
              name="phone"
            />
            {errorsList.map((error, index) => {
                  if (error.path.includes('phone')) {
                    return (
                      <div key={index} className="alert alert-danger p-2">
                        {error.message}
                      </div>
                    );
                  }
                  return null;
                })}
          </div>
          <div className="input-data">
            <label htmlFor="password">Password</label>
            <input
              onChange={getInputValue}
              type="password"
              className="form-control my-2"
              name="password"
            />
             {errorsList.map((error, index) => {
                    if (error.path.includes('password')) {
                      if(error.message.includes('fails to match the required pattern') || error.message.includes('')){
                        return (
                          <div key={index} className="alert alert-danger p-2">
                            Password should start with an uppercase letter and can contain letters and numbers
                          </div>
                        );
                      }
                    }
                    return null;
                  })}
          </div>
          <div className="input-data">
            <label htmlFor="rePassword">Re-Password</label>
            <input
              onChange={getInputValue}
              type="password"
              className="form-control my-2"
              name="rePassword"
            />
            {errorsList.map((error, index) => {
                    if (error.path.includes('rePassword')) {
                      if(error.message.includes('fails to match the required pattern') || error.message.includes('')){
                        return (
                          <div key={index} className="alert alert-danger p-2">
                            Re-Password should Match exactly the Password and start with an uppercase letter and can contain letters and numbers
                          </div>
                        );
                      }
                    }
                    return null;
                  })}
          </div>
          <button className="btn btn-info my-3 float-end">Register</button>
          <div className="clear-fix"></div>
        </form>
      </div>
    </>
  );
}
