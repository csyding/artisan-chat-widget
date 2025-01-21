import './App.css';
import React, { useState, useEffect } from 'react';

interface Message {
    id: number;
    content: string;
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        fetch('http://localhost:8000/api/messages')
          .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
              throw new Error(`HTTPError! status: ${response.status}`);
            }
            return response.json();
          })
          .then(messages => {
            console.log("Fetched messages:", messages); // Log fetched data
            setMessages(messages); // Ensure this matches the data structure
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    const sendMessage = () => {
        console.log("this is the input", input)
        fetch("http://localhost:8000/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: input }),
        })
          .then((res) => res.json())
          .then((newMessage) => {
            console.log("New message:", newMessage); // Log the new message
            setMessages((prev) => [...prev, newMessage]); // Update state
            setInput("");
          })
          .catch((err) => console.error("Error sending message:", err));
    };
      

    return (
     <div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: "10px 0" }}>
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;