import React from "react";
import { Link } from "react-router-dom";
// import swal from "sweetalert";
import { CategoryBody } from "./CategoryCard_style";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../redux/actions/categories";

// Este componente muestra la previsualización de un producto
const CategoryCard = ({ id, name, description }) => {
  const dispatch = useDispatch();

  function displayConfirm() {
    let html = document.querySelector("#root");
    let cont = document.createElement("div");
    cont.setAttribute("class", "alert");
    html.appendChild(cont);
    let msg = document.createElement("p");
    msg.textContent = "Do you really want to delete " + name + "?";
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
      msg.textContent = name + " has been deleted";
      cont2.appendChild(msg);
      let closeBtn = document.createElement("button");
      closeBtn.textContent = "ok";
      cont2.appendChild(closeBtn);
      closeBtn.onclick = function () {
        dispatch(deleteCategory(id));
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
      msg.textContent = name + " has not been deleted";
      cont3.appendChild(msg);
      let closeBtn1 = document.createElement("button");
      closeBtn1.textContent = "ok";
      cont3.appendChild(closeBtn1);
      closeBtn1.onclick = function () {
        cont3.parentNode.removeChild(cont3);
      };
    };
  }

  const deleteCategoryFunction = () => {
    displayConfirm();
  };

  return (
    <CategoryBody>
      <div className="card_header">
        <h3>{name}</h3>
        <div className="admin_btns">
          <Link to={`/editcategory/${id}`}>edit</Link>
          <button className="delete_btn" onClick={deleteCategoryFunction}>
            x
          </button>
        </div>
      </div>
      <div className="card_info">
        <div className="bottom_info">
          <div className="card_description">
            <p>{description}</p>
          </div>
          <Link className="btnInfo" to={`/categories/${id}`}>
            +
          </Link>
        </div>
      </div>
    </CategoryBody>
  );
};

export default CategoryCard;
