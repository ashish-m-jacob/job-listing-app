import { React, useState } from "react";
import { register } from "../services/index";
import styles from "./styles/register.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  //e.target.name pulls out the 'name' attribute in the input elements, allowing us to use one function to control all form inputs
  const handleChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //checking if all fields have entries
    if (
      user.name.trim().length === 0 ||
      user.email.trim().length === 0 ||
      user.password.trim().length === 0 ||
      user.mobile.trim().length === 0 ||
      !document.getElementById("terms").checked
    ) {
      alert("Please fill all the fields!");
      return;
    }
    const res = await register(user);

    if (res.status === 201) {
      navigate("/login");
      alert("User created successfully!");

      //setting all placeholders to blank
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("password").value = "";
      document.getElementById("terms").checked = false;
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Create an account</h2>
        <p className={styles.subtext}>Your personal job finder is here</p>
        <form>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            id="name"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            id="email"
          />
          <input
            type="text"
            placeholder="Mobile"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            id="mobile"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            id="password"
          />

          <div className={styles.termsConditions}>
            <input type="checkbox" name="terms" id="terms" />

            <label htmlFor="terms">
              By creating an account, I agree to our terms of use and privacy
              policy
            </label>
          </div>
          <button onClick={handleSubmit} className={styles.registerButton}>
            Create Account
          </button>

          <p className={styles.toLoginText}>
            Already have an account?{" "}
            <span
              className={styles.toLoginLink}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <p>Your Personal Job Finder</p>
      </div>
    </div>
  );
};

export default Register;
