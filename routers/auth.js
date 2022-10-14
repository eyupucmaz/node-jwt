const router = require('express').Router()
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation/User')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
  // Validate data before creating a user
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send({ err: error.details[0].message })

  // Check if user is already in the database
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send({ err: 'Email already exists' })

  //Hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  try {
    const savedUser = await user.save()
    res.send({ user: savedUser._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  // validate request body
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send({ err: error.details[0].message })

  // check the email if exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ err: "Email or password is wrong" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ err: "Invalid password" });

  res.send('login success')


})

module.exports = router
