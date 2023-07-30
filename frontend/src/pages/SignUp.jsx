import { useState } from "react";
import '../styles/signup.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function App() {
  const navigate = useNavigate()
  const [res, setRes] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    accountType:"user"
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setRes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (res.email === "" || res.userName === "" || res.password === "" || res.confirmPassword === "") {
      setMessage("Please fill in all the fields");
    } else if (res.password === res.confirmPassword) {
      
      const user = {
        userName: res.userName,
        email: res.email,
        password: res.password,
      };
      
      await axios
        .post(
          "http://localhost:5000/users/register",
          user
        )
        .then(()=>{
          setMessage("Successfully signed up");
          setTimeout(() => {
            navigate("/login")
          }, 2000);
        })
        .catch((err)=>setMessage(err.response.data))
        
     
        
      
     

    } else {
      setMessage("Passwords do not match");
    }

    // Clear message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // Function to determine the CSS class for the message based on its content
  const getMessageClassName = (message) => {
    if (typeof message === 'string') {
      return message.includes('success') ? 'success' : 'error';
    } else if (Array.isArray(message)) {
      let hasSuccessMessage = false;
      let hasErrorMessage = false;
  
      for (let i = 0; i < message.length; i++) {
        if (typeof message[i] === 'string') {
          if (message[i].includes('success')) {
            hasSuccessMessage = true;
          } else if (message[i].includes('error')) {
            hasErrorMessage = true;
          }
        }
      }
  
      if (hasSuccessMessage && hasErrorMessage) {
        return 'both'; // Both success and error messages present
      } else if (hasSuccessMessage) {
        return 'success'; // Only success messages present
      } else if (hasErrorMessage) {
        return 'error'; // Only error messages present
      }
    }
  
    return ''; // Default value if message is not a string or an array
  };
  

  return (
  
      <div className="signup-container">
        <h2 style={{marginBottom:"30px"}}>Sign Up</h2>
        <div >
         
          <div >
            <form  onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                
                onChange={handleChange}
                name="email"
                value={res.email}
              />
              <input
                type="username"
                placeholder="user name"
              
                onChange={handleChange}
                name="userName"
                value={res.userName}
              />
              <input
                type="password"
                placeholder="Password"
                
                onChange={handleChange}
                name="password"
                value={res.password}
              />
              <input
                type="password"
                placeholder="Confirm password"
              
                onChange={handleChange}
                name="confirmPassword"
                value={res.confirmPassword}
              />
              
              <button >Sign up</button>
              <span>or</span>
              <span className="login"
              onClick={ ()=>navigate("/login") }
              >Login</span>
            </form>
          </div>
        </div>
        <div >
          {message && (
            <div className="message">
              {message}
            </div>
          )}
        </div>
      </div>
     
  
  );
}

