import React, { useEffect, useState } from "react";
import { uid } from "react-uid";

export const Chat = ({ socket }) => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const chatHistory = [...history]
    chatHistory.push(message)

    setHistory(chatHistory);
    setMessage('')
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on("message", data => {
      const chatHistory = [...history]
      chatHistory.push(data)

      setHistory(chatHistory);
    });

  }, [history]);

  return (
    <div className="form">
      <div className="history">
        <ul>
          <>
            {
              history.map((item, index) => {
                return (<li key={uid(index)}>{item}</li>)
              })
            }
          </>
        </ul>
      </div>
      <form className="bidder-form" onSubmit={handleSubmit}>
        <label>Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </div >
  );
}
