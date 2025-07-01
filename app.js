import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

let posts = [];

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get('/posts/new', (req, res) => {
  res.render("new.ejs");
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect('/');
});

app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  res.render("edit.ejs", { post });
});

app.put("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).send("Post not found");

  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id !== Number(req.params.id));
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
