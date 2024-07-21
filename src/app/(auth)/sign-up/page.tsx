"use client";
import { TextInput } from "@/components/form/TextInput";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type LoginForm = {
  user: string;
  password: string;

  nombres: string;
  primerApellido: string;
  segundoApellido: string;
};

export default function SignUp() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {},
  });

  const onSubmitRegister = (data: LoginForm) => {
    console.log(data);
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=400"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Registrate
        </h2>
      </div>

      <div className="">
        <form onSubmit={handleSubmit(onSubmitRegister)}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
            <div className="col-span-2">
              <TextInput
                label="Usuario"
                id={"user"}
                name={"user"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El usuario es requerido",
                  },
                }}
              />
            </div>

            <div className="col-span-2">
              <TextInput
                label="Nombres"
                id={"nombres"}
                name={"nombres"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Los nombres son requeridos",
                  },
                }}
              />
            </div>

            <div className="col-span-2">
              <TextInput
                label="Primer apellido"
                id={"primerApellido"}
                name={"primerApellido"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El primer apellido es requerido",
                  },
                }}
              />
            </div>

            <div className="col-span-2">
              <TextInput
                label="Segundo apellido"
                id={"segundoApellido"}
                name={"segundoApellido"}
                control={control}
              />
            </div>

            <div className="col-span-2">
              <TextInput
                label="Contraseña"
                id={"password"}
                name={"password"}
                type={"password"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              type="button"
              className="btn w-full btn-ghost col-span-2"
              onClick={goToHome}
            >
              Volver
            </button>

            <button type="submit" className="btn btn-primary w-full col-span-2">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
