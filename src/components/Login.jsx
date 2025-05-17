import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;

    } else if (!validateEmail.test(email)) {
      setEmailError('Email Address is not valid');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      localStorage.setItem('email', email);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      setTimeout(() => {
        navigate('/welcome');
      }, 1000);
    }  
  };

  return (
    <div className="login_page">
      <h1>Sign in</h1>
      <p className="sign_up_Page">or
        <Link to='/' className="signUp_link"> create an account</Link>
      </p>

      <form className="login_form" onSubmit={ handleSubmit } autoComplete="on">
        <div className="input_fields">
          <div className="email_container">
            <input
              type="text"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {emailError && <p className="error_message">{emailError}</p>}

          </div>
          

          <div className="password_container">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {passwordError && <p className="error_message"> {passwordError} </p>}
          </div>
        </div>

        <div className="checkbox_container">
          <input
            type="checkbox"
            name="checkbox"
            className="login_checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="checkbox">Rememeber me</label>
        </div>

        <button type="submit" className="login_button">Sign in</button>
      </form>
      
    </div>
  ) 
};

export default Login;