var express = require('express');
const { connectDb, getDb } = require('../db');
const { ObjectId } = require('mongodb');
var router = express.Router();
let db;

connectDb((err) => {
  if (!err) {
    db = getDb()
  }
})

router.get('/', async (req, res) => {
  const { name, sort } = req.query
  const sortQuery = {}
  if (sort === 'minage') sortQuery.age = 1
  if (sort === 'maxage') sortQuery.age = -1
  let users = await db.collection('users').find().sort(sortQuery).toArray()
  if (name) {
    users = users.filter(u =>
      u.firstname.toLowerCase().includes(name.toLowerCase())
    )
  }

  res.render('index', { users });
});

router.get('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await db.collection('users').findOne({ _id: new ObjectId(id) })
  res.render("user", { user })
})

router.post('/register', async (req, res) => {
  const body = req.body
  body.age = Number(body.age)
  await db.collection('users').insertOne(body)
  res.redirect('/')
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await db.collection('users').deleteOne({ _id: new ObjectId(id) })
  res.json({ message: "Account removed" })
})

router.patch('/user/:id', async (req, res) => {
  const { id } = req.params
  const updates = req.body
  if (updates.age) updates.age = Number(updates.age)
  await db.collection('users').updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  )
  res.json({ message: 'User updated' })
})


module.exports = router;
