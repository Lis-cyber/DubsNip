require("dotenv").config();
const { Order, User } = require("../db");
const mercadopago = require("mercadopago");
const { sendPaymentMail } = require("../mailmodels/mail.controller");
const { MERCADOPAGO_ACCESS_TOKEN, API_URL, CLIENT_URL } = process.env;

mercadopago.configure({
  access_token: MERCADOPAGO_ACCESS_TOKEN,
});

const generateMpUrl = async (req, res, next) => {
  const { cart, orderId } = req.body;

  //Changing cart format to match ml's
  const cartMl = cart.map((product) => ({
    title: product.name,
    unit_price: product.price - (product.discount * product.price) / 100,
    quantity: product.Order_Product.quantity,
  }));

  //Setting up MP preferences
  const preference = {
    items: cartMl,
    external_reference: `${orderId}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm",
        },
      ],
      installments: 3, //Cantidad máximo de cuotas
    },
    back_urls: {
      success: `${API_URL}/mercadopago/payment/`,
      failure: `${API_URL}/mercadopago/payment/failure`,
      pending: `${API_URL}/mercadopago/payment/pending`,
    },
  };

  try {
    const { body } = await mercadopago.preferences.create(preference);

    // console.log(body);
    res.json({ id: body.id });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getPaymentInfo = async (req, res, next) => {
  const {
    payment_id,
    status,
    external_reference,
    merchant_order_id,
  } = req.query;

  //Here we update the order
  try {
    order = await Order.findByPk(external_reference);
    await order.update(
      {
        payment_id,
        payment_status: status,
        merchant_order_id,
        state: "paid",
      },
      {
        returning: true,
        plain: true,
      }
    );

    user = await User.findByPk(order.dataValues.userId);

    sendPaymentMail(external_reference, user);
    return res.redirect(`${CLIENT_URL}/payment/success/${order.id}`);
  } catch (err) {
    console.log(err);
    next(err);
  }
  //proceso los datos del pago
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
};

const getPaymentInfoById = async (req, res, next) => {
  const mp = new mercadopago(MERCADOPAGO_ACCESS_TOKEN);
  const { id } = req.params;
  console.info("Buscando el id", id);
  try {
    const mpResponse = await mp.get(`/v1/payments/search`, {
      external_reference: id,
    });
    res.json({ response: mpResponse });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  generateMpUrl,
  getPaymentInfo,
  getPaymentInfoById,
};
