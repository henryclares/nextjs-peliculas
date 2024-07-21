"use client";
import { TextInput } from "@/components/form/TextInput";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type LoginForm = {
  user: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const { logIn, isLoading } = useAuth();
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {},
  });

  const goToBack = () => {
    router.push("/");
  };

  return (
    <>
      {isLoading && (
        <progress className="progress progress-info w-56"></progress>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Inicia sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(logIn)} className="space-y-6">
          <TextInput
            label="Usuario"
            id={"user"}
            name={"user"}
            control={control}
            disabled={isLoading}
            rules={{
              required: { value: true, message: "Este campo es requerido" },
            }}
          />

          <TextInput
            label="Contraseña"
            id={"password"}
            name={"password"}
            type={"password"}
            disabled={isLoading}
            control={control}
            rules={{
              required: { value: true, message: "Este campo es requerido" },
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={goToBack}
              className="btn btn-ghost col-span-2"
              disabled={isLoading}
            >
              Volver
            </button>
            <button
              type="submit"
              className="btn btn-primary col-span-2"
              disabled={isLoading}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
