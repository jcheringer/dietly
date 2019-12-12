const promiseMiddleware = () => {
    return next => action => {
        const { promise, type, params } = action;

        if (promise !== 0 && !promise) {
            return next(action);
        }

        const SUCCESS = type + '_SUCCESS';
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAIL';

        next({ type: REQUEST, params });

        if (typeof promise.then === 'function') {
            return promise.then(res => {
                next({ data: res.data.data || res.data, params, type: SUCCESS });
                return true;
            }).catch(error => {
                let err;

                if (error.data && error.data.errors) {
                    err = error.data.errors;
                } else {
                    err = error;
                }

                next({ error: err, params, type: FAILURE });
                return false;
            });
        }

        next({ data: promise, params, type: SUCCESS });
        return true;
    };
};

export default promiseMiddleware;