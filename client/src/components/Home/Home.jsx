import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import img from "../../media/imgs/img.jpg";
import { HomeStyle } from "./Home_style";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { replace } = useHistory();
  const user = useSelector(({ users }) => users.user);
  useEffect(() => {
    if (!user?.isAdmin) replace("/");
  }, [user, replace]);
  return (
    <HomeStyle>
      <div>
        <div className="btns">
          <Link to={`/addproduct`}>
            <button className="addP">ADD Product</button>
          </Link>
          <Link to={`/categories`}>
            <button className="cat">Categories</button>
          </Link>
          <Link to={`/category`}>
            <button className="addC">ADD Category</button>
          </Link>
          <Link to={`/admin/orders`}>
            <button className="addP">Show All Orders</button>
          </Link>
          <Link to={`/admin/users`}>
            <button className="cat">Show All Users</button>
          </Link>
        </div>

        <div>
          <img src={img} alt="home" />
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;
