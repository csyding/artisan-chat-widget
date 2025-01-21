import React from 'react';

interface MessageProps {
    message: { id: number; content: string };
    onEdit: (id: number) => void;
}

const Message : React.FC<MessageProps> = ({ message, onEdit }) => {
    return (
        <div key={message.id} style={{ margin: '10px 0' }}>
            {message.content}
            <button onClick={() => onEdit(message.id)}>Edit</button>
        </div>
    );
}

export default Message;