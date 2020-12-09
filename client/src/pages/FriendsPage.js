import React, { useCallback, useEffect, useState } from "react";
import "./FriendsPage.css";
import { TextField } from "@material-ui/core";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFriend, deleteFriend } from "../store/friend/actions";

import SearchFriend from "../components/SearchFriend";
import Friend from "../components/Friend";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const [friend, setFriend] = useState("");
  const [dataUsers, setDataUsers] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const friends = useSelector((state) => state.friends.friends);

  const changeForm = (e) => {
    setFriend(e.target.value);
  };

  const handleSearch = useCallback(() => {
    if (friend !== "") {
      axios.get(`/api/friends/?q=${friend}&id=${user.userId}`).then((res) => {
        setDataUsers(res.data);
      });
    }
  }, [friend, user.userId]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const checkIfFriend = useCallback(
    (userFriend) => {
      friends.map((friend) => {
        console.log(friend)
        console.log(userFriend)
        if (friend._id === userFriend._id) {
          setIsFriend(true);
        }
      });
    },
    [friends]
  );

  const handleAddFriend = (friend) => {
    console.log(friend)
    axios.post("/api/friends/addFriend/", { userFriendId: friend._id, currentUserId: user.userId })
      .then((res) => console.log(res.data));
    dispatch(addFriend(friend));
  };

  const handleDeleteFriend = useCallback(
    (friend) => {
      dispatch(deleteFriend(friend));
      setIsFriend(false);
    },
    [dispatch]
  );

  useEffect(() => {
    dataUsers.map((friend) => {
      checkIfFriend(friend);
    });
  }, [checkIfFriend, dataUsers]);

  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="main-container__content">
          <div className="search-friends-container">
            <form noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                onChange={changeForm}
                value={friend}
                name="friend"
                label="Find friends..."
              />
            </form>
            {dataUsers.length !== 0 &&
              dataUsers.map((searchFriend) => {
                return (
                  <div key={searchFriend._id}>
                    <SearchFriend
                      friend={searchFriend}
                      isFriend={isFriend}
                      onAdd={handleAddFriend}
                    />
                  </div>
                );
              })}
          </div>
          <div className="my-friends-container">
            My friends
            <div>
              {friends.length !== 0 &&
                friends.map((friend) => {
                  return (
                    <div key={friend._id}>
                      <Friend
                        friend={friend}
                        handleDeleteFriend={handleDeleteFriend}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /*return (
    <>
      <Header />
      <div className="home--container friends">
        <div className="home--top">
          <form className="auth--form" noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              onChange={changeForm}
              value={friend}
              name="friend"
              label="Find friends..."
            />
          </form>
          <div className="auth--form">
            <p
              style={{ textAlign: "center", fontWeight: 500, color: "#1f1f1e" }}
            >
              Friend list:
            </p>
            <div>
              {friends.map((friend) => {
                return (
                  <div className="auth--user" key={friend._id}>
                    <span style={{ fontSize: 19 }}>{friend.name}</span>
                    <HighlightOffIcon
                      onClick={() => handleDeleteFriend(friend)}
                      style={{ cursor: "pointer" }}
                    />
                    <ChatBubbleIcon style={{ cursor: "pointer" }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="home--bottom">
          <div className="auth--form friend--auth">
            <p
              style={{ textAlign: "center", fontWeight: 500, color: "#1f1f1e" }}
            >
              Users list:
            </p>
            <div>
              {dataUsers.length !== 0 ? (
                dataUsers.map((user) => {
                  return (
                    <div className="auth--user" key={user._id}>
                      <span style={{ fontSize: 19 }}>{user.name}</span>
                      {isFriend === true && <AdjustIcon />}
                      {isFriend === false && (
                        <AddIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleAddFriend(user)}
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <span>Find some users</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );*/
};

export default FriendsPage;
