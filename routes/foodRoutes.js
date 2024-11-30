const express = require("express");
const router = express.Router();
const Food = require("../models/food");
const FoodReview = require("../models/foodReview");
const mongodb = require("mongodb");

router.get("/", (req, res) => {
  Food.find()
    .then(f => res.json(f))
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.get("/:id", getFood, (_, res) => {
  res.json(res.Food);
});

router.get("/reviews/:id", (req, res) => {
  FoodReview.find({ comidinhaId: req.params.id })
    .then(res.json)
    .catch((err) => res.status(400).json({ message: err.message }));
});

router.post("/reviews", (req, res) => {
  const userAlreadyCommented =
    FoodReview.countDocuments({
      user: req.body.user,
      comidinhaId: req.body.comidinhaId,
    }) > 0;

  if (userAlreadyCommented) {
    res
      .status(400)
      .json({ message: `User ${req.body.user} already commented here` });

    return;
  }

  const review = new FoodReview({
    user: req.body.user,
    comment: req.body.comment,
    rating: req.body.rating,
    comidinhaId: req.body.comidinhaId,
  });

  review
    .save()
    .then(res.json)
    .catch((err) => res.status(400).json({ message: err.message }));
});

// Rota para criar um livro contato
router.post("/", (req, res) => {
  const food = new Food({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    description: req.body.description,
    alergenics: req.body.alergenics,
    image: req.body.image
  });

  food
    .save()
    .then((f) => res.status(201).json(f))
    .catch((err) => res.status(400).json({ message: err.message }));
});

// Rota para atualizar um livro por ID
router.put("/:id", getFood, (req, res) => {
  const requiredFields = ["name", "type", "price", "description", "alergenics", "image"];
  requiredFields.sort();

  const keys = Object.keys(req.body);
  keys.sort();

  if (
    requiredFields != keys ||
    Object.values(req.body).reduce((acc, cur) => acc || cur === null, false)
  ) {
    res.status(400).json({ message: "Invalid food item" });
  }

  res.Food.save()
    .then(res.json)
    .catch((err) => res.status(400).json({ message: err.message }));
});

// Rota para excluir um livro por ID
router.delete("/:id", getFood, async (req, res) => {
  try {
    await res.Food.deleteOne();
    res.json({ message: "Food deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getFood(req, res, next) {
  try {
    const food = await Food.findById(
      mongodb.ObjectId.createFromHexString(req.params.id)
    );
    if (food == null)
      return res.status(404).json({ message: "Food not found" });

    res.Food = food;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
