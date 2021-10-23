const fs = require('fs');
const path = require('path');
const BlogModel = require('./models/blog.model');
const SentenceModel = require('./models/sentence.model');
const WordModel = require('./models/word.model');

const SENTENCES = JSON.parse(
  fs.readFileSync(path.resolve('sample-database', 'sentences.json'), {
    encoding: 'utf-8',
  }),
);

const WORDS = JSON.parse(
  fs.readFileSync(path.resolve('sample-database', 'words.json'), {
    encoding: 'utf-8',
  }),
);

const BLOGS = JSON.parse(
  fs.readFileSync(path.resolve('sample-database', 'blogs.json'), {
    encoding: 'utf-8',
  }),
);

const promises = BLOGS.map(async (blog) => {
  const newBlog = await BlogModel.create({
    title: blog.title,
    desc: blog.desc,
    html: blog.html,
  });

  return newBlog;
});

async function generateBlogs() {
  const blogs = await Promise.all(promises);
  console.log(blogs);
}

console.log(WORDS);
generateBlogs();
