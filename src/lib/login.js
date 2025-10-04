
import { auth } from "./firebase";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
} from "firebase/auth";



//////////////////// Remember User ///////////////////
async function setAuthPersistence(remember) {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
}

///////////////// signInWithEmailFunction /////////////////////////

export async function signInWithEmail({ email, password, remember = false }) {
    
    await setAuthPersistence(remember);
    const credintial = await signInWithEmailAndPassword(auth, email, password);
    return credintial.user;
}





///////////////////// signInWithGoogleFunction ///////////////////////////

export async function signInWithGoogle({ remember = false } = {}) {
    await setAuthPersistence(remember);
    const provider = new GoogleAuthProvider();
    const credintial = await signInWithPopup(auth, provider);
    return credintial.user;
}

///////////////////// resetPasswordFunction ///////////////////////////

export async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
}


export { resetPassword as requestPasswordReset };
///////////////////// Map Error ///////////////////////////

export function mapLoginError(code) {
    switch (code) {
        case "auth/invalid-email":
            return "Invalid email format.";
        case "auth/user-not-found":
            return "No account exists with this email.";
        case "auth/wrong-password":
        case "auth/invalid-credintialential":
            return "Incorrect email or password.";
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";
        case "auth/network-request-failed":
            return "Network connection issue. Please try again.";
        default:
            return "An unexpected error occurred. Please try again later.";
    }
}
