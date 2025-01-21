import React from 'react';
import Message from './Message.tsx';

interface DisplayMessageProps {
    messages: { id: number; content: string }[];
    onEdit: (id: number) => void;
}

const DisplayMessage : React.FC<DisplayMessageProps> = ({ messages, onEdit }) => {
    return (
    <div>
        {messages.map((msg) => (
            <Message key={msg.id} message={msg} onEdit={onEdit} />
        ))}
    </div>
  );
}


export default DisplayMessage;