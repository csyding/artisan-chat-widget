import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

   function App() {
     const [data, setData] = useState(null);
     useEffect(() => {
        fetch('http://localhost:8000/api/message')
         .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTPError! status: ${response.status}`)
            }
            return response.json();
         })
         .then(data => setData(data))
         .catch(error => console.error('Error fetching data:', error));
     }, []);
     
    return (
        <div>
          {data ? <p>{data.message}</p> : <p>Loading...</p>}
        </div>
      );
   }

   export default App;