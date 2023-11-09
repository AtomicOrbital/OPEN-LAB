import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN, FIREBASE_TOKEN, settings } from '../util/config';

interface FirebaseAuthGuardProps {
    children: ReactNode;
}

const FirebaseAuthGuard: React.FC<FirebaseAuthGuardProps> = ({ children }) => {
    const token = settings.getStore(ACCESS_TOKEN);
    const firebaseToken = settings.getStore(FIREBASE_TOKEN);


    if (!token || !firebaseToken) {

        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default FirebaseAuthGuard;
