import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

 export const UserContext = createContext();

const UserProvider = ({children}) => {

  const [error, setError ] = useState("")

// user will be already present in database we can only get user detail match with login credentials and allow user to do some activity or not--->

  const [ user, setUser ] = useState(null);
  const handleSubmit = async(e) => {

    setError('');
    if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return;
    }

    // Mock authentication or API call
    // You can replace this with an actual API call
    let res = await fetch('http://localhost:5001/api/user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });
    
    if (res.ok) {
        res = await res.json();
    } else {
        setError('Login failed. Please try again.');
        console.error("Failed to login:", res.status, res.statusText, error);
    }

    console.log( 'name :', name ,"Email:", email, "Password:", password);
    alert('Logged in successfully!');
  };

  useEffect(()=>{

    // setUser({
    //   name : "test",
    //   email : "test@gmail.com",
    //   password : "test",
    // });
    
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
