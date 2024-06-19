import firebase_app from "./Config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "./FirebaseAuth";


const auth = getAuth(firebase_app);

export function FirebaseApi() {
    const { signIn, signUp } = useAuth()
    const route = useRouter();


    const signin = async (email: string, password: string) => {

        try {
            const result: any = await signInWithEmailAndPassword(auth, email, password);
            if (!result.error) {
                signIn(email)

                route.push('/Dashboard');

            } else {
                console.log("error")
            }
        } catch (e) {
            alert(e)
            console.log(e)
        }



    }

    const signup = async (name: string, email: string, password: string) => {

        try {
            const result: any = await createUserWithEmailAndPassword(auth, email, password);
            if (!result.error) {
                signUp(name, email, result.user.uid)
                route.push('/Dashboard');
            }
            console.log(result)

        } catch (e) {
            alert(e)
            console.log(e)
        }


    }


    return {
        signin,
        signup
    }
}