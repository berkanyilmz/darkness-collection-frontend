import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
    key: 'auth',
    storage,
    blacklist: ['accessToken'],
};

export default authPersistConfig;