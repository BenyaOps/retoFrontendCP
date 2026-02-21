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
  },

  loginWithEmail: async (email: string, password: string): Promise<User> => {
    // Para simplificar, este método simula un login exitoso con email/password
    // En un caso real, aquí iría la lógica de autenticación con Firebase o backend propio
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 6;

     if (!isValidPassword) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
    if (!isValidEmail) {
      throw new Error("Correo electrónico no válido");
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      name: email.split('@')[0],
      email,
      isGuest: false
    };
  }
};