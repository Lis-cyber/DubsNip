import StyledLoading from "../StyledComponents/StyledLoading";
import StyledError from "../StyledComponents/StyledError";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/users";
import { MeStyles } from "./MeComponent_Styles";

const MeComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ users }) => users.user);
  const status = useSelector(({ users }) => users.status);


  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (status === "loading") return <StyledLoading />;
  else if (status === "failed") return <StyledError />;
  else if (user)
    return (
      <MeStyles>
        <div className="userContainer">
          <div className="userInfo">
            <img
              className="userPicture"
              alt="userPicture"
              src={
                user.photoUrl
                  ? user.photoUrl
                  : "https://pbs.twimg.com/profile_images/497135574243766273/zNjKQH4r.png"
              }

            />
            <div>Username: {user.givenName ? user.givenName : "NO EXISTE"}</div>
            <div>AKA: {user.familyName ? user.familyName : "NO EXISTE"}</div>
            <div>Email: {user.email ? user.email : "NO EXISTE"}</div>
            <div>City: {user.city ? user.city : "NO EXISTE"}</div>
            <div>Address: {user.Address ? user.Address : "NO EXISTE"}</div>
            <div>
              Postal Code: {user.postal_code ? user.postal_code : "NO EXISTE"}
            </div>
          </div>
        </div>
      </MeStyles>
    );
  else return <StyledError />;
};

export default MeComponent;
