import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
} from "firebase/auth";

export async function signUpWithEmail({ email, password, displayName }) {
    const credintial = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
        await updateProfile(credintial.user, { displayName });
    }

    try {
        await sendEmailVerification(credintial.user);
    } catch (e) {
        console.warn("Failed to send verification email:", e);
    }

    return credintial; 
}


export function mapAuthError(code) {
    switch (code) {
        case "auth/email-already-in-use":
            return "This email is already in use.";
        case "auth/invalid-email":
            return "Invalid email format.";
        case "auth/weak-password":
            return "Weak password (please make it stronger).";
        case "auth/network-request-failed":
            return "Network connection issue. Please try again.";
        default:
            return "An unexpected error occurred. Please try again later.";
    }
}