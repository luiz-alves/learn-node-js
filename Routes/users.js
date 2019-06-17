const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass , { expiresIn: config.jwt_expires_in } );
}

router.get('/', async (req,res) => {
    try {
        const users = await Users.find({});
        return res.status(201).send(users);
    } catch(err){
        return res.send({error: "Deu erro na consulta de usuário"})
    }
});

router.post('/create', async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password ) return res.send({error: 'Dados insuficientes!'});

    try{
        if(await Users.findOne({ email })) return res.send({error: 'Usuario ja registrado'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send({ user, token: createUserToken(user.id) });

    }catch(err){
        return res.send({error: 'Erro ao buscar usuario!'});
    }
});

router.post('/auth', async (req,res) => {
    const { email, password } = req.body;

    if (!email || !password ) return res.send({error: 'Dados insuficientes!'});

    try{
        const user = await Users.findOne({ email }).select('+password');
        if(!user) return res.send({error: 'Usuario não registrado'});

        const pass_ok = await bcrypt.compare(password,user.password);
        if(!pass_ok) return res.send({error: 'Erro ao autenticar usuario'});
        user.password = undefined;
        return res.send({ user, token: createUserToken(user.id) });
    }catch(err){
        return res.send({error: 'Erro ao buscar usuario! ' + err});
    }
});

module.exports = router;