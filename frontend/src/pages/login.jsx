import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/login.module.css";
import { login } from "../services/index";
const Login = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(user);

    console.log(res.status);
    if (res.status === 200) {
      alert("login successful!");
      navigate("/home");
    } else {
      alert(res.data.message);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Already have an account?</h2>
        <p className={styles.subtext}>Your personal job finder is here</p>
        <form>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            id="password"
          />

          <button onClick={handleSubmit} className={styles.signInButton}>
            Sign in
          </button>

          <p className={styles.toLoginText}>
            Don't have an account?{" "}
            <span
              className={styles.toLoginLink}
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
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

export default Login;
