import { invalidateAll } from "$app/navigation";
import { getAuth, signOut } from "firebase/auth";

export const logout = async () => {
    const firebaseAuth = getAuth();
    await signOut(firebaseAuth);
    await fetch('/logout', { method: 'POST' });
    await invalidateAll();
}
