const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req,res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Tudo ok com o metodo GET na raiz!'})
})

router.post('/', (req,res) => {
    return res.send({message: 'Tudo ok com o metodo POST na raiz!'})
})

module.exports = router;