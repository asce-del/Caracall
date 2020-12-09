import React from "react";
import Profile from "./Profile";
import Chat from "./Chat";
import FriendsDialog from "./FriendsDialog";
import Header from "../../components/Header";
import "./MessangerStyles.css";

const MessangerIndex = () => {
  return (
    <>
      <Header />
      <div className="messanger">
        <Profile />
        <FriendsDialog />
        <Chat />
      </div>
    </>
  );
};

export default MessangerIndex;
