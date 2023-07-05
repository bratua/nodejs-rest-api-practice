const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Joi = require("joi");

// const { customAlphabet } = require("nanoid");
// const nanoid = customAlphabet("1234567890", 3);

let posts = [
   { id: "1", title: "post1", text: "text1" },
   { id: "2", title: "post2", text: "text2" },
   { id: "3", title: "post3", text: "text3" },
   { id: "4", title: "post4", text: "text4" },
   { id: "5", title: "post5", text: "text5" },
];

// /api/posts
router.get("/", (req, res) => {
   res.status(200).json({ posts, status: "success" });
});

router.get("/:id", (req, res) => {
   const id = req.params.id;
   const [post] = posts.filter((el) => el.id === id);

   if (!post) {
      res.status(400).json({ status: `Post with id:${id} was not found!` });
      return null;
   }

   res.status(200).json({ post, status: "success" });
});

router.post("/", (req, res) => {
   const schema = Joi.object({
      title: Joi.string().min(4).max(20).alphanum().required(),
      text: Joi.string().min(20).max(500).required(),
   });

   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).json(validationResult.error.message);
   }
   const { title, text } = req.body;

   const post = {
      id: nanoid(),
      title,
      text,
   };

   posts.push(post);

   res.status(200).json({ post, status: "success" });
});

//* PUT with splice
router.put("/:id", (req, res) => {
   const id = req.params.id;
   const [post] = posts.filter((el) => el.id === id);
   // console.log("post, ", post);

   if (!post) {
      return res.status(400).json({ status: `Post with id:${id} was not found!` });
   }

   const index = posts.findIndex((el) => el.id === id);
   // console.log("index, ", index);

   const schema = Joi.object({
      title: Joi.string().min(4).max(20).alphanum().required(),
      text: Joi.string().min(20).max(500).required(),
   });

   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).json(validationResult.error.message);
   }

   const { title, text } = req.body;

   post.title = title;
   post.text = text;

   console.log("post ", post);

   posts.splice(index, 1, post);

   res.status(200).json({ post, status: "success" });
});

router.patch("/:id", (req, res) => {
   const schema = Joi.object({
      title: Joi.string().min(4).max(20).alphanum().optional(),
      text: Joi.string().min(20).max(500).optional(),
   });

   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).json(validationResult.error.message);
   }

   const { title, text } = req.body;
   const id = req.params.id;
   const [post] = posts.filter((el) => el.id === id);
   const index = posts.findIndex((el) => el.id === id);

   if (!post) {
      res.status(400).json({ status: `Post with id:${id} was not found!` });
      return null;
   }

   if (title) {
      post.title = title;
   }
   if (text) {
      post.text = text;
   }

   console.log("post ", post);

   posts.splice(index, 1, post);

   res.status(200).json({ post, status: "success" });
});

//* PUT with forEach
// router.put("/:id", (req, res) => {
//    const { title, text } = req.body;

//    posts.forEach((post) => {
//       if (post.id === req.params.id) {
//          post.title = title;
//          post.text = text;
//       }
//    });

//    res.status(200).json({ status: "success" });
// });

// router.delete("/:id", (req, res) => {
//    posts = posts.filter((el) => el.id !== req.params.id);
//    res.status(200).json({ posts, status: "success" });
// });

router.delete("/:id", (req, res) => {
   const id = req.params.id;
   const index = posts.findIndex((el) => el.id === id);

   if (index === -1) {
      res.status(400).json({ status: `Post with id:${id} was not found!` });
      return null;
   }

   const post = posts.splice(index, 1);

   res.status(200).json({ post, status: "success" });
});

module.exports = {
   postsRouter: router,
};
