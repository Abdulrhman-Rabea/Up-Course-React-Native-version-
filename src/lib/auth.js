import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signOut,
} from "firebase/auth";

/**
 * Create an account and send a verification email.
 * @returns {import("firebase/auth").UserCredential}
 */
export async function signUpWithEmail({ email, password, displayName }) {
    // Create the user
    const credential = await createUserWithEmailAndPassword(auth, email, password);

    // Optionally set displayName
    if (displayName) {
        await updateProfile(credential.user, { displayName });
    }

    // Try to send a verification email (non-fatal if it fails)
    try {
        await sendEmailVerification(credential.user);
    } catch (e) {
        console.warn("Failed to send verification email:", e);
    }

    // Return the full credential (fixes previous typo/merge issue)
    return credential;
}

/**
 * Sign out the current user.
 */
export async function logout() {
    console.log("Logout: Starting logout process");
    try {
        await signOut(auth);
        console.log("Logout: Successfully signed out");
    } catch (error) {
        console.error("Logout: Failed to sign out", error);
        throw error;
    }
}

/**
 * Map Firebase auth error codes to user-friendly messages.
 */
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
