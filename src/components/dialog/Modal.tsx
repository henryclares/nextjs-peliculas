"use client";
import React, { useState } from "react";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  onAdd?: () => void;
};

const Modal = ({ children, title }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Ver mas
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-base-200 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-700 rounded-t ">
                  <h3 className="text-3xl font=semibold">{title}</h3>
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>
                </div>

                {children}

                <div className="flex flex-col md:flex-row gap-4 justify-end p-4">
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
