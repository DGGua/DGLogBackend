import { appendFile } from "fs";
import { createServer } from "http";
import { AppDataSource } from "./data-source";
import { Blog } from "./entity/Blog";
import { User } from "./entity/User";
import * as express from "express";

const app = express();

async function init() {
  await AppDataSource.initialize();
  console.log("Inserting a new user into the database...");
  const blog = new Blog();
  blog.content = "你好你好你好";
  blog.title = "你好";
  blog.create_time = new Date();
  blog.last_modify = new Date();
  await AppDataSource.manager.save(blog);
  console.log("Saved a new user with id: " + blog.blog_id);
  console.log("Loading users from the database...");
  const users = await AppDataSource.manager.find(Blog);
  console.log("Loaded users: ", users);
}
app.get("/blog/list", async (req, res) => {
  const users = await AppDataSource.manager.find(Blog);
  res.send({ code: 2, data: users, msg: "hi1" });
});
init().then(() => {
  app.listen(3000);
});
