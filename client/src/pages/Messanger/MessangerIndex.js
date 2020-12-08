import React from "react";
import Profile from "./Profile";
import Chat from "./Chat";
import FriendsDialog from "./FriendsDialog";
import "./MessangerStyles.css"

const MessangerIndex = () => {
  return (
    <>
      <Profile />
      <FriendsDialog />
      <Chat />
    </>
  );
};

export default MessangerIndex;
