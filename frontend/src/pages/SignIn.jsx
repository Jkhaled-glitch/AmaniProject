import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useStateContext } from '../contexts/ThemeContext';
import './SignIn.css'


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
    <section className="h-screen flex">
      {/* Left column */}
      <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 p-10">
        <div className="flex items-center justify-center h-full">
          <div className="w-full md:max-w-sm">
            <div className="text-center mb-12">
              <img
                className="mx-auto w-48"
                src="data:image/jpeg;base64,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"
                alt="logo"
              />
              <h4 className="mt-1 text-xl font-semibold" style={{ color: "#FF6600" }}>
                We are Flesk Team
              </h4>
            </div>
                <form onSubmit={handleSubmit}>
                      {/* Email input */}
                      <div className="relative mb-7" data-te-input-wrapper-init>
                      <input
                         type="email"
                         class="peer block min-h-[auto] w-full rounded border border-solid border-gray-300  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                         id="exampleFormControlInput1"
                         placeholder="Email address"
                         onChange={handleChange}
                         name="email"
                         value={res.email}
                      />
                      <label
                         for="exampleFormControlInput1"
                         class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                         >Email
                      </label>
                      </div>


                      {/* Password input */}
                      <div className="relative mb-6" data-te-input-wrapper-init>
                      <input
                        type="password"
                        class="peer block min-h-[auto] w-full rounded border border-solid border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput2"
                        placeholder="Password"
                        onChange={handleChange}
                        name="password"
                        value={res.password}
                      />

                    <label
                      for="exampleFormControlInput11"
                      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >Password
                    </label>
                     </div>

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white bg-gradient-to-r from-orange-700 to-yellow-600 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            background: "linear-gradient(to right, #FF6600, #FFCC00)"
                          }}
                        >
                         Sign In
                        </button>
                      </div>
                      <span
                        class="signup"
                        className="mt-1 text-xl font-semibold"
                        style={{
                          color: "#FF6600",
                          textDecoration: "none",  // Pour supprimer le soulignement initial
                          borderBottom: "2px solid transparent",  // Ligne invisible au départ
                          transition: "border-color 0.3s ease",  // Animation de transition
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderBottom = "2px solid #FF6600";  // Soulignement au survol
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderBottom = "2px solid transparent";  // Ligne invisible à la sortie du survol
                        }}
                        onClick={() => navigate("/register")}
                        >
                         Sign Up
                      </span>

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



      {/* Right column */}
      <div className="flex-1 bg-gradient-to-r from-orange-700 to-yellow-600 text-white p-10">
        <div className="flex items-center justify-center h-full">
          <div className="w-full md:max-w-sm">
            <div className="text-center">
              <h4 className="mb-0 text-xl font-bold">
                We are more than just a company
              </h4>
              <h2 className="mb-8 text-xl ">Between digital strategy, product design and agile development</h2>
              <p className="text-sm ">
 We provide the strategy, guidance and execution needed to launch, grow and energize businesses of all sizes, in all categories.              
Our methodology involves working as a unified team towards our goals. We collaborate closely throughout each project, sharing our progress through working sessions to make data-driven decisions. We constantly iterate and test instead of throwing designs over a wall.</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
