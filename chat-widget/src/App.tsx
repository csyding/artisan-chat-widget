import './App.css';
import React, { useState, useEffect } from 'react';
import SendEditMessage from './components/SendEditMessage.tsx';
import DisplayMessage from './components/DisplayMessage.tsx';

interface Message {
    id: number;
    content: string;
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [editingMessage, setEditingMessage] = useState<Message | null>(null);
    const [deletingMessage, setDeletingMessage] = useState<Message | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/messages')
            .then((response) => response.json())
            .then((messages) => setMessages(messages))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const sendMessage = (content: string) => {
        fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        })
            .then((res) => res.json())
            .then((newMessage) => setMessages((prev) => [...prev, newMessage]))
            .catch((err) => console.error('Error sending message:', err));
    };

    const editMessage = (id: number) => {
        const messageToEdit = messages.find((msg) => msg.id === id);
        if (messageToEdit) {
            setEditingMessage(messageToEdit);
        }
    };

    const saveEditedMessage = (newContent: string) => {
        if (editingMessage) {
            fetch(`http://localhost:8000/api/messages/${editingMessage.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newContent }),
            })
                .then((data) => {
                    console.log("the data coming in", data)
                    if (!data.ok) {
                        console.log("This data isn't okay")
                    }
                    return data
                })
                .then((res) => res.json())
                .then((updatedMessage) => {
                    setMessages(messages.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)));
                    setEditingMessage(null);
                })
                .catch((err) => console.error('Error editing message:', err));
            fetch('http://localhost:8000/api/messages')
                .then((response) => response.json())
                .then((messages) => setMessages(messages))
                .catch((error) => console.error('Error fetching data:', error));
        }
    };

    const deleteMessage = (id: number) => {
        const messageToDelete = messages.find((msg) => msg.id === id);
        if (messageToDelete != null) {
            fetch(`http://localhost:8000/api/messages/${messageToDelete.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .catch((err) => console.error('Error deelting:', err));
            fetch('http://localhost:8000/api/messages')
                .then((response) => response.json())
                .then((messages) => setMessages(messages))
                .catch((error) => console.error('Error fetching data:', error));
        }

    };

    return (
        <div>
            <DisplayMessage messages={messages} onEdit={editMessage} onDelete={deleteMessage} />
            <SendEditMessage
                onSubmit={editingMessage ? saveEditedMessage : sendMessage}
                messageToEdit={editingMessage || undefined}
            />
        </div>
    );
};

export default App;
