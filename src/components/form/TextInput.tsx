"use client";
import React, { InputHTMLAttributes, useState } from "react";

import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";

type TextInput<T extends FieldValues> = {
  id: string;
  label: string;
  name: Path<T>;
  control: Control<T, object>;
  type?: InputHTMLAttributes<unknown>["type"];

  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  placeholder?: string;
};

export const TextInput = <T extends FieldValues>({
  label,
  name,
  id,
  control,
  type,
  rules,
  disabled,
  placeholder,
}: TextInput<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div>
        {label !== "" && (
          <label htmlFor="email" className="label block">
            {label}
          </label>
        )}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <>
              <div className="relative">
                <input
                  id={id}
                  name={name}
                  className="input block input-bordered w-full max-w-xs text-white"
                  type={showPassword ? "text" : type}
                  placeholder={placeholder}
                  onChange={(event) => {
                    // if (onChange) {
                    //   onChange(event)
                    // }
                    field.onChange(event);
                  }}
                  // inputRef={field.ref}
                  onKeyUp={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      // if (onEnter) {
                      //   onEnter()
                      // }
                    }
                  }}
                  value={field.value}
                  disabled={disabled}
                />
              </div>
              {!!error && (
                <p className="text-sm text-red-500">{error?.message}</p>
              )}
            </>
          )}
          defaultValue={"" as PathValue<T, Path<T>>}
        />
      </div>
    </>
  );
};
