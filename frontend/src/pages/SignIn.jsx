import '../styles/signin.css'


import { useState,useContext,useEffect } from "react";
import axios from "axios";

import { AuthContext } from "../contexts/AuthContext";


import { useNavigate } from "react-router-dom";
import { useStateContext } from '../contexts/ThemeContext';

export default function SignIn() {
  
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
useEffect(() => {
  const currentThemeColor = localStorage.getItem('colorMode');
  const currentThemeMode = localStorage.getItem('themeMode');
  if (currentThemeColor && currentThemeMode) {
    setCurrentColor(currentThemeColor);
    setCurrentMode(currentThemeMode);
  }
}, []);

  const { dispatch, currentUser } = useContext(AuthContext);

  
  const navigate = useNavigate()

  
    
  
  const [res, setRes] = useState({
    email: "",
    password: "",
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
  
    if (res.email === "" || res.password === "") {
      setMessage("Please fill in all the fields");
    } else {
      // Authentification
      const user = {
        email: res.email,
        password: res.password,
      };

      
  
      axios
        .post("http://localhost:5000/users/login", user)
        .then((response) => {
          console.log("response.status: "+response.status)
          // Vérifier le statut de la réponse
          if (response.status === 200) {
            // Authentification réussie
            console.log("Login successful");
            console.log(response.data); // Utilisateur retourné par l'API
  
            const user = response.data;
  
            // Effectuer vos actions après la connexion réussie
            dispatch( { type: "LOGIN", payload: user } );
            console.log(window.localStorage)
            navigate("/");
          } else{
            if (response.status === 404) {
              // Utilisateur non trouvé
              setMessage(response.data.message);
            } else{
              if (response.status === 401) {
                // Mot de passe incorrect
                setMessage(response.data.message);
              } else{
                if (response.status === 422) {
                  // Champ(s) manquant(s)
                  setMessage(response.data.message);
                } else {
                  if (response.status === 500) {
                    // Erreur interne du serveur
                    setMessage(response.data.message);
                  } 
                  else {
                    // Statut de réponse inattendu
                    setMessage("Unexpected error occurred");
                  }
                }
              }
            } 
          }
          
        })
        .catch((error) => {
          // Erreur lors de la requête
          console.error(error);
  
          // Vérifier si une réponse d'erreur est renvoyée par l'API
          if (error.response) {
            setMessage(error.response.data);
          } else {
            // Erreur inconnue
            setMessage("Unknown error occurred");
          }
        });
    }
  
    // Effacer le message après 2 secondes
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  
  // Function to determine the CSS class for the message based on its content
  function getMessageClassName() {
    
  }
useEffect(()=>{
  //redirection if user connected
  if(currentUser){
    navigate("/");
  }
},[])
  

  return (
    

      <div className='app' >
        <h1 >Sign In</h1>
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
                type="password"
                placeholder="Password"

                onChange={handleChange}
                name="password"
                value={res.password}
              />

              <button >Sign In</button>
              <span>or</span>
              <span class="signup"
              onClick={()=>navigate("/register")}
              >Sign Up</span>

            </form>
            
          </div>
        </div>
        <div >
          {message && (
            <div className='message' >
              {message}
            </div>
          )}
        </div>
      </div>
    
 
  
  );

}




