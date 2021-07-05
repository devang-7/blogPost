//jshint esversion:6

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-devang:blog8920709210@cluster0.5pi3q.mongodb.net/blogDB", {
  useNewUrlParser: true,
});

const blogSchema = {
  title: String,
  content: String,
};

const Blog = mongoose.model("Blog", blogSchema);

const homeStartingContent =
  "This is a blog template. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const app = express();
let posts = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Blog.find({}, function (err, blogArr) {
    res.render("home", { hContent: homeStartingContent, posts: blogArr });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { abContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { coContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:postID", function (req, res) {
  const requestedID = req.params.postID;

  Blog.findOne({ _id: requestedID }, function (err, blog) {
    res.render("post", { title: blog.title, content: blog.content });
  });
});

app.post("/compose", function (req, res) {
  const blog = new Blog({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  blog.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
