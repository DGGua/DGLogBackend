import { appendFile } from "fs";
import { createServer } from "http";
import { AppDataSource } from "./data-source";
import { Blog } from "./entity/Blog";
import { User } from "./entity/User";
import * as express from "express";
import * as cors from "cors";
import { BlogDetail } from "./entity/BlogDetail";
import { json } from "body-parser";
import { resData } from "./template/resTemp";
const app = express();
app.use(cors());
app.use(json());

async function init() {
  await AppDataSource.initialize();
}
app.get("/blog/list", async (req, res) => {
  const blogs = await AppDataSource.manager.find(Blog);
  res.send(resData(200000, blogs));
});
app.get("/blog/detail", async (req, res) => {
  const id = req.query["id"];
  if (typeof id != "string") return;

  const blog = await AppDataSource.manager.findOneBy(Blog, {
    blog_id: Number.parseInt(id),
  });

  const blogDetail = await AppDataSource.manager.findOneBy(BlogDetail, {
    blog_id: Number.parseInt(id),
  });

  res.send(resData(200000, { ...blog, ...blogDetail }));
});
app.post<{}, any, { title: string; content: string; brief?: string }>(
  "/blog/create",
  async (req, res) => {
    const { title, content, brief = content } = req.body;
    const blog = new Blog();
    blog.title = title;
    blog.brief = brief;
    blog.create_time = new Date();
    blog.last_modify = new Date();
    await AppDataSource.manager.insert(Blog, blog);

    const blogDetail = new BlogDetail();
    blogDetail.blog_id = blog.blog_id;
    blogDetail.content = content;
    await AppDataSource.manager.insert(BlogDetail, blogDetail);

    res.send(resData(200000, blog.blog_id));
  }
);
init().then(() => {
  app.listen(3000);
});
