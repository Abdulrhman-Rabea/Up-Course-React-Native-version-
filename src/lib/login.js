
import { auth } from "./firebase";
import {
    // For Web
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    // Common
    sendPasswordResetEmail,
} from "firebase/auth";



///////////////// signInWithEmailFunction /////////////////////////

export async function signInWithEmail({ email, password }) {
    const credintial = await signInWithEmailAndPassword(auth, email, password);
    return credintial.user;
}


///////////////////// signInWithGoogleFunction ///////////////////////////

export async function signInWithGoogle() {
    // This implementation is for WEB ONLY using signInWithPopup.
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    return credential.user;
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
        case "auth/invalid-credential":
            return "Incorrect email or password.";
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";
        case "auth/network-request-failed":
            return "Network connection issue. Please try again.";
        default:
            return "An unexpected error occurred. Please try again later.";
    }
}
