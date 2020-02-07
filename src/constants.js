module.exports = {
    MEAL_TYPE: {
        FOOD: 'food',
        RECIPE: 'recipe'
    },

    MEASURE_UNITS: {
        0: 'À Vontade',
        1: 'Unidade(s)',
        2: 'Grama(s)',
        3: 'Colher(es)'
    },

    ACCESS_LEVEL: {
        UNAUTHENTICATED: -1,
        USER: 0,
        ADMIN: 1
    },

    ERROR_CODES: {
        GENERAL_ERROR: 40000,
        INVALID_USER_PASS: 40001,

        ACCESS_ERROR: 40100,
        INVALID_TOKEN: 40101,
        EXPIRED_TOKEN: 40102,
        INVALID_ACCESS: 40103

    },

    JWT_ERRORS: {
        TOKEN_EXPIRED_ERROR: 'TokenExpiredError',
        JSON_WEB_TOKEN_ERROR: 'JsonWebTokenError'
    }
};