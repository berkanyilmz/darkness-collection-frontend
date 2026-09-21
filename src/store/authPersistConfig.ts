import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
    key: 'auth',
    storage,
    blacklist: ['accessToken', 'refreshToken', 'user', 'claimIds'],
};

export default authPersistConfig;