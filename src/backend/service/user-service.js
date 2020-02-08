const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const Exception = require('../util/exception');

const User = require('../model/user');

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
            email: data.email
        };

        return new User(user).save();
    },
    async update(id, data) {
        const user = {
            name: data.name,
            email: data.email
        };

        return User.findByIdAndUpdate(id, user, { new: true }).exec();
    },
    async delete(id) {
        return User.findByIdAndDelete(id).exec();
    },
    async googleLogin(data) {
        const idToken = data.idToken;
        const client = new OAuth2Client(process.env.CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.CLIENT_ID
        });

        const { aud, email, name } = ticket.getPayload();

        if (aud !== process.env.CLIENT_ID) {
            throw new Exception('Falha ao realizar login. Token do Google inválido', 401);
        }

        let user = await userService.getByEmail(email);

        if (!user) {
            user = await userService.insert({ email, name, googleLogin: true }); //FIXME: Save property google login
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '72h' });

        return { token: token, user: user };
    }
};

module.exports = userService;
