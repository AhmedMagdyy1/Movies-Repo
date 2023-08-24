import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login({ saveUserData }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorsList, setErrorsList] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  let goToHome = () => {
    navigate("/Home");
  };
  let submitFormData = async (e) => {
    e.preventDefault();
    let validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details);
    } else {
      try {
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          user
        );
        
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          saveUserData();
          goToHome();
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
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password:Joi.string()
      .required()
      .pattern(new RegExp("^[A-Z][a-zA-Z0-9]*$"))
    });
    return schema.validate(user, { abortEarly: false });
  };

  let getInputValue = (e) => {
    let myUser = { ...user }; //deep copy of user in myUser Obj
    myUser[e.target.name] = e.target.value; //to save the user in the name
    setUser(myUser);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Noxe-Movies</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-75 m-auto py-5">
        <h2>Login Form</h2>
        {ErrorMsg ? (
          <div className="alert alert-danger p-2">{ErrorMsg}</div>
        ) : (
          ""
        )}
        <form onSubmit={submitFormData}>
          <div className="input-data">
            <label htmlFor="email">Email</label>
            <input
              onChange={getInputValue}
              type="email"
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
          <button className="btn btn-info my-3 float-end">Login</button>
          <div className="clear-fix"></div>
        </form>
      </div>
    </>
  );
}
