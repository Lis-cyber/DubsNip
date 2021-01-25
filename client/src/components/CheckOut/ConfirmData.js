import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ConData } from "./ConfirmData_style";

export default function ConfirmData() {
  const status = useSelector(({ order }) => order.status);
  const order = useSelector(({ order }) => order.one);
  const cart = useSelector(({ cart }) => cart.cart);

  useEffect(() => {
    (async () => {
      const script = document.createElement("script"); //Crea un elemento html script
      const attr_data_preference = document.createAttribute(
        "data-preference-id"
      ); //Crea un nodo atribute
      const { data } = await axios.post("/mercadopago", {
        cart,
        orderId: order.id,
      });

      attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP
      //Agrega atributos al elemento script
      let dataArticle = document.getElementById("article");
      dataArticle = dataArticle.appendChild(script);
      console.log(dataArticle);
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);
      //Agrega el script como nodo hijo del elemento form
    })();
  }, [cart, order.id, status]);

  if (status === "loading") return <h2>Loading...</h2>;
  if (order) {
    return (
      <ConData id="article">
        <h2>Confirm Shipping Information </h2>
        <div className="data">
          <div className="orderData">
            <p>Shipping Address -- {order?.shippingAddress}</p>
            <p>PC -- {order?.postalCode}</p>
            <p>Phone Number -- {order?.phoneNumber}</p>
            <p>Comments -- {order?.comments}</p>
            <h4>Total -- $ {order?.total}</h4>
          </div>
          <h3>Products</h3>
          <div className="prodList">
            <ol className="products">
              {cart?.map((product, i) => {
                const prodDiscount =
                  product.price - (product.discount * product.price) / 100;
                return (
                  <li key={i}>
                    <p>{product.name}</p>
                    {product.discount ? (
                      <p>Price: ${prodDiscount}</p>
                    ) : (
                      <p>Price: ${product.price}</p>
                    )}
                    <p>Quantity: {product.Order_Product.quantity}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </ConData>
    );
  }
}
