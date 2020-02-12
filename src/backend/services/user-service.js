const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const Exception = require('../utils/exception');

const User = require('../models/user');

const TOKEN_EXPIRE_TIME = '72h';

const userService = {
    async list() {
        return User.find().lean().exec();
    },
    async get(id) {
        return User.findById(id).lean().exec();
    },
    async getByEmail(email) {
        return User.findOne({ email: email }).lean().exec();
    },
    async insert(data) {
        const user = {
            name: data.name,
            email: data.email,
            image: data.image
        };

        if (data.password) {
            user.password = bcrypt.hashSync(data.password, 8);
        }

        return new User(user).save();
    },
    async update(id, data) {
        const user = {
            name: data.name,
            email: data.email,
            image: data.image
        };

        if (data.password) {
            user.password = bcrypt.hashSync(data.password, 8);
        }

        return User.findByIdAndUpdate(id, user, { new: true }).exec();
    },
    async delete(id) {
        return User.findByIdAndDelete(id).exec();
    },
    async register(data) {
        const userData = {
            name: data.name,
            email: data.email,
            password: data.password
        };

        const user = await userService.getByEmail(userData.email);

        if (user) {
            throw new Exception('Falha ao realizar cadastro. E-mail em uso', 400);
        }

        const newUser = await userService.insert(userData);

        //TODO: Improve this
        const newPlayerData = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        };

        const token = jwt.sign({
            id: newUser._id,
            accessLevel: newUser.accessLevel
        }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRE_TIME });

        return { token: token, user: newPlayerData };
    },
    async commonLogin({ email, password }) {
        const invalidLoginException = new Exception('Falha ao realizar login. Usuário ou senha inválidos', 401);

        if (!email || !password) {
            throw invalidLoginException;
        }

        const user = await userService.getByEmail(email);

        if (!user) {
            throw invalidLoginException;
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw invalidLoginException;
        }

        //TODO: Improve this
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        };

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRE_TIME });

        return { token: token, user: userData };
    },
    async googleLogin(data) {
        const idToken = data.idToken;
        const client = new OAuth2Client(process.env.CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.CLIENT_ID
        });

        const { aud, email, name, picture } = ticket.getPayload();

        if (aud !== process.env.CLIENT_ID) {
            throw new Exception('Falha ao realizar login. Token do Google inválido', 401);
        }

        let user = await userService.getByEmail(email);

        if (!user) {
            user = await userService.insert({ email, name, image: picture, googleLogin: true }); //FIXME: Save property google login
        } else if (picture && (!user.image || user.image !== picture)) {
            user.image = picture;
            await userService.update(user._id, user);
        }

        //TODO: Improve this
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        };

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRE_TIME });

        return { token: token, user: userData };
    }
};

module.exports = userService;
