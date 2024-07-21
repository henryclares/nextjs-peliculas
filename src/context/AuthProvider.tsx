"use client";
import { BaseUrl } from "@/config/constants";
import { Servicios } from "@/services/Service";
import { eliminarCookie, guardarCookie, leerCookie } from "@/util/Cookies";
import { imprimir } from "@/util/Imprimir";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

type Credentials = {
  user: string;
  password: string;
};
type Persona = {
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
};

type User = {
  id: number;
  persona: Persona;
};

type ContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User;
  initUser: () => Promise<void>;
  logIn: (user: Credentials) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<ContextProps>({} as ContextProps);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<User>({} as User);

  const [isLoading, setIsLoading] = useState(false);

  const logIn = async ({ user, password }: Credentials) => {
    setIsLoading(true);
    try {
      const respuesta = await Servicios.post({
        url: `${BaseUrl}/auth/sign-in`,
        body: { user, password },
        headers: {},
      });

      imprimir("DEBUGPRINT[2]: AuthProvider.tsx:29: respuesta=", respuesta);

      guardarCookie("token", respuesta.access_token);
      setUser({ ...respuesta });

      setIsLoggedIn(true);
      router.push("/");
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const borrarCookiesSesion = () => {
    setIsLoggedIn(false);
    eliminarCookie("token"); // Eliminando access_token
  };

  const logOut = async () => {
    try {
      const token = leerCookie("token");
      borrarCookiesSesion();

      const respuesta = await Servicios.get({
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BaseUrl}/auth/logout`,
      });

      imprimir(`finalizando con respuesta`, respuesta);

      if (respuesta?.url) {
        window.location.href = respuesta?.url;
      } else {
        // router.refresh()
        window.location.reload();
      }
    } catch (e) {
      imprimir(`Error al cerrar sesión: `, e);
      window.location.reload();
    } finally {
    }
  };

  const initUser = async () => {
    const token = leerCookie("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      await obtenerUser();
      // await delay(1000)
    } catch (error: Error | any) {
      imprimir(`Error durante inicializarUsuario 🚨`, typeof error, error);
      borrarCookiesSesion();

      router.replace("/");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const obtenerUser = async () => {
    const respuestaUsuario = await Servicios.get({
      url: `${BaseUrl}/auth/profile`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${leerCookie("token")}`,
      },
    });

    setUser(respuestaUsuario);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        logIn,
        logOut,
        isLoading,
        initUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
