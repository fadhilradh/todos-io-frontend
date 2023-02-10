import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Input } from "../components/atoms/Input";
let socket;

const Spcket = () => {
  const chatRef = useRef([]);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    // socket.on("update-input", (msg) => {
    //   setInput(msg);
    // });

    socket.on("message-receive", (newMessage) => {});
  };

  async function sendMessage() {
    console.log(
      "🚀 ~ file: socket.tsx:26 ~ sendMessage ~ Ref.current",
      chatRef.current.values
    );

    // socket.emit("message-deliver", chatRef.current);
  }

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update-input");
      socket.off("message-deliver");
    };
  }, []);

  console.log("I am rerendering");

  return (
    <div className="flex flex-col items-center justify-center">
      <Input
        placeholder="Type something"
        ref={chatRef}
        className="mt-10 w-56"
        onKeyDown={(e) => {
          if (e.key === "Enter" && chatRef.current) {
            sendMessage();
          }
        }}
      />
      {chatRef?.current?.map((message, idx) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
};

export default Spcket;
