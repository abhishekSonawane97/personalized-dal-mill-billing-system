import React, { createContext, useState, useEffect } from 'react';

 export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [error, setError ] = useState("");
  const [ user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);


  // setUser({
  //   name : "test",
  //   email : "test@gmail.com",
  //   password : "test",
  // });

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
        const response = await fetch("http://localhost:5001/api/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
            
        } 
        const data = await response.json();
            console.log('providing user : ', data);
            setUser(data);
    } catch (err) {
        console.log("Error fetching user:", err);
        setError(err.message);
        setUser(null);
    }
    finally {
      setLoading(false);
    }
};

  

  useEffect(() => {
    fetchUser();
}, []);


  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, error, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
