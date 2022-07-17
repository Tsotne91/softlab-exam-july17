import {useEffect, useState} from "react";
import Login from "./Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "./api";
import ChatMainPage from "./ChatMainPage";
import UserContext from "./UserContext";


function App() {
  const [currentUser, setCurrentUser] = useState(null);

   useEffect(()=> {
      const token = localStorage.getItem('token');
      if (token) {
        api.get('users/current',)
            .then((res) => setCurrentUser(res.data))
            .catch(console.error);
      }
  }, [])

  return (
  <>
      {
          !currentUser ? <Login/> : (
              <UserContext.Provider value={currentUser}>
                  <ChatMainPage />
              </UserContext.Provider>
          )
      }
  </>
  );
}

export default App;
