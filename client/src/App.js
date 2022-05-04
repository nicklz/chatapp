import React from "react";
import socketIOClient from "socket.io-client";

import { Header } from './components/Header';
import { Chat } from './components/Chat';
import { Footer } from './components/Footer';


const ENDPOINT = "http://localhost:6868";

export const App = () => {
  const socket = socketIOClient(ENDPOINT);

  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <Chat socket={socket} />
      </main>
      <Footer />
    </div>
  );
}
