const express = require('express');

const router = express.Router();
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function readList() {
  const data = await readFile('./lectures.json');
  const json = JSON.parse(data);
  return json;
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function list(req, res) {
  const title = 'Fyrirlestrar';
  const underTitle = 'Vefforritun';
  const data = await readList();
  const { lectures } = data;


  res.render('lectures', { title, underTitle, lectures, frontPages: true });

}

async function lecture(req, res, next) {
  const { slug } = req.params;

  const data = await readList();
  const { lectures } = data;
  const rightLecture = lectures.find(a => a.slug === slug);

  if (!rightLecture){
    return next();
  }

  res.render('lecture', { title:rightLecture.title, underTitle:rightLecture.category,
    lecture:rightLecture, frontPages:false });
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
