import { AuthState } from '@/features/auth/types/authTypes';
import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig: PersistConfig<AuthState> = {
    key: 'auth',
    storage,
    blacklist: ['accessToken'],
};

export default authPersistConfig;