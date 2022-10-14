const verify = require('./verifyToken')

const router = require('express').Router()

router.get('/post', verify, (req, res) => {
  res.json({
    posts: {
      title: 'My first post',
      description: 'Random data you should not access',
    },
  })
})

module.exports = router
