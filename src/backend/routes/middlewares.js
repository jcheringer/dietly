const Constants = require('../../constants');
const jwt = require('jsonwebtoken');

const middlewares = {
    validateUser(req, res, next) {
        const jwtToken = req.headers.authorization;

        jwt.verify(jwtToken, process.env.JWT_SECRET, (error, data) => {
            if (error) {
                let errorCode = Constants.ERROR_CODES.ACCESS_ERROR;

                switch (error.name) {
                    case Constants.JWT_ERRORS.JSON_WEB_TOKEN_ERROR:
                        errorCode = Constants.ERROR_CODES.INVALID_TOKEN;
                        break;
                    case Constants.JWT_ERRORS.TOKEN_EXPIRED_ERROR:
                        errorCode = Constants.ERROR_CODES.EXPIRED_TOKEN;
                        break;
                }

                res.status(401).json({ msg: 'Access denied', code: errorCode });
                return;
            }

            res.locals.userData = data;
            next();
        });
    },
    validateAdmin(req, res, next) {
        middlewares.validateUser(req, res, () => {
            const userData = res.locals.userData || {};

            if (userData.accessLevel !== Constants.ACCESS_LEVEL.ADMIN) {
                res.status(401).json({ msg: 'Access denied', code: Constants.ERROR_CODES.INVALID_ACCESS });
                return;
            }

            next();
        })
    }
};

module.exports = middlewares;