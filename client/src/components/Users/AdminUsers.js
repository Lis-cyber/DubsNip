import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  promoteUser,
} from "../../redux/actions/users";
import StyledLoading from "../StyledComponents/StyledLoading";
import StyledError from "../StyledComponents/StyledError";
import { useHistory } from "react-router-dom";
import { ListUsersBody } from "./AdminUsers_style";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users.users);
  const user = useSelector(({ users }) => users.user);
  const status = useSelector(({ users }) => users.status);
  const { replace } = useHistory();

  useEffect(() => {
    if (!user?.isAdmin) replace("/");
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function displayConfirm(user) {
    let html = document.querySelector("#root");
    let cont = document.createElement("div");
    cont.setAttribute("class", "alert");
    html.appendChild(cont);
    let msg = document.createElement("p");
    msg.textContent =
      "Do you really want to delete " +
      user.givenName +
      " " +
      user.familyName +
      "?";
    cont.appendChild(msg);
    let noBtn = document.createElement("button");
    noBtn.textContent = "no";
    let yesBtn = document.createElement("button");
    yesBtn.textContent = "yes";
    cont.appendChild(yesBtn);
    cont.appendChild(noBtn);
    yesBtn.onclick = function () {
      cont.parentNode.removeChild(cont);
      let html = document.querySelector("#root");
      let cont2 = document.createElement("div");
      cont2.setAttribute("class", "alert");
      html.appendChild(cont2);
      let msg = document.createElement("p");
      msg.textContent = user.givenName + " has been deleted";
      cont2.appendChild(msg);
      let closeBtn = document.createElement("button");
      closeBtn.textContent = "ok";
      cont2.appendChild(closeBtn);
      closeBtn.onclick = function () {
        dispatch(deleteUser(user.id));
        cont2.parentNode.removeChild(cont2);
      };
    };
    noBtn.onclick = function () {
      cont.parentNode.removeChild(cont);
      let html = document.querySelector("#root");
      let cont3 = document.createElement("div");
      cont3.setAttribute("class", "alert");
      html.appendChild(cont3);
      let msg = document.createElement("p");
      msg.textContent = user.givenName + " has not been deleted";
      cont3.appendChild(msg);
      let closeBtn1 = document.createElement("button");
      closeBtn1.textContent = "ok";
      cont3.appendChild(closeBtn1);
      closeBtn1.onclick = function () {
        cont3.parentNode.removeChild(cont3);
      };
    };
  }

  function displayConfirmPromote(user) {
    let html = document.querySelector("#root");
    let cont = document.createElement("div");
    cont.setAttribute("class", "alert");
    html.appendChild(cont);
    let msg = document.createElement("p");
    if (user.isAdmin) {
      msg.textContent =
        "Do you really want to degrade " +
        user.givenName +
        " " +
        user.familyName +
        " to common User?";
    }
    if (!user.isAdmin) {
      msg.textContent =
        "Do you really want to promote " +
        user.givenName +
        " " +
        user.familyName +
        " to Admin?";
    }
    cont.appendChild(msg);
    let noBtn = document.createElement("button");
    noBtn.textContent = "no";
    let yesBtn = document.createElement("button");
    yesBtn.textContent = "yes";
    cont.appendChild(yesBtn);
    cont.appendChild(noBtn);
    yesBtn.onclick = function () {
      cont.parentNode.removeChild(cont);
      let html = document.querySelector("#root");
      let cont2 = document.createElement("div");
      cont2.setAttribute("class", "alert");
      html.appendChild(cont2);
      let msg = document.createElement("p");
      if (user.isAdmin) {
        msg.textContent = user.givenName + " has been degraded";
      }
      if (!user.isAdmin) {
        msg.textContent = user.givenName + " has been promoted";
      }
      cont2.appendChild(msg);
      let closeBtn = document.createElement("button");
      closeBtn.textContent = "ok";
      cont2.appendChild(closeBtn);
      closeBtn.onclick = function () {
        dispatch(promoteUser(user.id, !user.isAdmin));
        cont2.parentNode.removeChild(cont2);
      };
    };
    noBtn.onclick = function () {
      cont.parentNode.removeChild(cont);
      let html = document.querySelector("#root");
      let cont3 = document.createElement("div");
      cont3.setAttribute("class", "alert");
      html.appendChild(cont3);
      let msg = document.createElement("p");
      if (user.isAdmin) {
        msg.textContent = user.givenName + " has not been degraded";
      }
      if (!user.isAdmin) {
        msg.textContent = user.givenName + " has not been promoted";
      }
      cont3.appendChild(msg);
      let closeBtn1 = document.createElement("button");
      closeBtn1.textContent = "ok";
      cont3.appendChild(closeBtn1);
      closeBtn1.onclick = function () {
        cont3.parentNode.removeChild(cont3);
      };
    };
  }

  const handleDeleteUser = (user) => {
    displayConfirm(user);
  };

  const handlePromoteUser = (user) => {
    displayConfirmPromote(user);
  };

  if (status === "loading") return <StyledLoading />;
  if (status === "failed") return <StyledError />;
  if (users.length === 0) return <StyledError />;

  return (
    <ListUsersBody>
      <h2>All Users</h2>
      <div className="usersCont">
        {users.map((user, i) => {
          return (
            <div key={i} className="users">
              <p className="userName">
                User: {user.givenName} {user.familyName}
              </p>
              <p className="userEmail">Mail: {user.email}</p>
              <p className="userEmail">id: {user.id}</p>
              <p className="userIsAdmin">
                Is admin:{" "}
                {user.isAdmin === undefined ? "unde" : user.isAdmin.toString()}
              </p>
              <div className="buttons">
                <button className="b" onClick={() => handleDeleteUser(user)}>
                  Delete User
                </button>

                <button
                  onClick={() => handlePromoteUser(user)}
                  className={user.isAdmin ? "bPG" : "bPA"}
                >
                  {user.isAdmin ? (
                    <p>Admin to User</p>
                  ) : (
                    <p>Promote to Admin</p>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ListUsersBody>
  );
};

export default AdminUsers;
