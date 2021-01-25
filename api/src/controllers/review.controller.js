const { Review } = require("../db.js");

async function createReview(req, res) {
  const { id } = req.params;
  const { description, rating, userId } = req.body;

  try {
    let review = await Review.create({
      description,
      rating,
      userId,
      productId: id,
    });
    
    return res.send(review);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function getReview(req, res) {
  const { id } = req.params;
  try {
    let review = await Review.findAll({
      where: {
        productId: id,
      },
    });
    return res.send(review);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function updateReview(req, res) {
  const { id, idReview } = req.params;
  const { description, rating } = req.body;

  try {
    let review = await Review.update(
      {
        description,
        rating,
      },
      {
        where: {
          id: idReview,
          productId: id,
        },
        returning: true,
      }
    );
    res.json(review[1]).status(200);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function deleteReview(req, res) {
  const { id, idReview } = req.params;

  try {
    let review = await Review.destroy({
      where: {
        id: idReview,
        productId: id,
      },
    });
    return res.json({ message: "Review deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}


module.exports = {
  createReview,
  getReview,
  updateReview,
  deleteReview  
}