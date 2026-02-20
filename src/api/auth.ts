import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import type { User } from "@/types";

export const authService = {
  /**
   * Permite iniciar sesión con su cuenta de Google 
   */
  loginWithGoogle: async (): Promise<User> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log({user});
      
      return {
        name: user.displayName || "Usuario Cineplanet",
        email: user.email || "",
        isGuest: false
      };
    } catch (error) {
      console.error("Error en Firebase Login:", error);
      throw error;
    }
  }
};