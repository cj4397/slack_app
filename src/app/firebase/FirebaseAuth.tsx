'use client'
import React, { useEffect, useState, useMemo, useContext, createContext } from 'react'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { getDatabase, set, ref, update, get, child, serverTimestamp } from 'firebase/database'
import firebase_app from './Config';
import useLocalStorage from '../components/Storage';

const initialState = {
    userName: '',
    email: '',
    user: {},
    signIn: (email: string) => { },
    signUp: (name: string, email: string, uid: string) => { },
    logout: () => { },
}

const auth: any = getAuth(firebase_app)

const AuthContext = createContext(initialState);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default function FirebaseAuth(props: { children: React.ReactNode }) {
    const [email, setEmail] = useLocalStorage("Email", '');
    const [userName, setUserName] = useLocalStorage("Username", '');
    const [user, setUser]: any = useState('');
    const [loading, setLoading] = useState(true);
    // const [userID, setUserID] = useState('')
    const db = getDatabase();
    const dbRef = ref(getDatabase())

    useEffect(() => {

        const unsubscribe = async () => {
            const result = await onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser('');
                }
                setLoading(false);
            })
            return result
        };

        unsubscribe()
    }, []);

    const signIn = (email: string) => {
        update(ref(db, 'users/' + email.split('.').join('')), {
            status: 'online'
        });

        get(child(dbRef, `users/${email.split('.').join('')}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const result = snapshot.val()
                setEmail(result.email)
                setUserName(result.username)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    const signUp = (name: string, email: string, uid: string) => {
        set(ref(db, 'users/' + email.split('.').join('')), {
            username: name,
            email: email,
            status: 'online',
            created_at: serverTimestamp()
        });

    }



    const logout = () => {
        signOut(auth)
        setUser('');
    };

    const value = useMemo(
        () => ({
            signIn,
            signUp,
            user,
            logout,
            email,
            userName
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={value}>{loading ? <div>Loading...</div> : props.children}</AuthContext.Provider>
    )
}
