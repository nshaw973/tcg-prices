const router = require('express').Router();
const searchPKMN = require('./tcgAPI')

router.use('/', searchPKMN)

module.exports = router