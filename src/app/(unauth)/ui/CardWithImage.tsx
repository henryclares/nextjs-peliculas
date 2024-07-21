"use client";
import React, { useState } from "react";
import { Movie } from "../types/movies.type";
import Modal from "@/components/dialog/Modal";
import { imprimir } from "@/util/Imprimir";
import { Servicios } from "@/services/Service";
import { BaseUrl } from "@/config/constants";
import { leerCookie } from "@/util/Cookies";

type CardWithImageProps = {
  movie: Movie;
  quitar?: boolean;
};

export const CardWithImage = ({ movie, quitar }: CardWithImageProps) => {
  const handleAddFavorites = async (idPelicula: string) => {
    try {
      const token = leerCookie("token");
      await Servicios.post({
        url: `${BaseUrl}/movies/${quitar ? "quitar" : "agregar"}-favorito`,
        params: {
          idPelicula: idPelicula,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      imprimir("DEBUGPRINT[6]: CardWithImage.tsx:14: error=", error);
    }
  };

  return (
    <>
      <div className="card card-compact bg-base-200 w-72">
        <figure>
          <img src={movie.Poster} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{movie.Title}</h2>
          <p className="break-all truncate">{movie.Plot}</p>
          <div className="card-actions justify-center">
            <Modal
              title="Informacion adicional"
              onAdd={() => handleAddFavorites(movie.imdbID)}
            >
              <>
                <div>
                  <figure>
                    <img src={movie.Poster} alt="Movie" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {movie.Title}
                      <div className="badge badge-info">{movie.imdbRating}</div>

                      <p>({movie.Year})</p>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => handleAddFavorites(movie.imdbID)}
                      >
                        <span>
                          <svg
                            width="18"
                            className="h-5 w-5"
                            height="18"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="butt"
                              strokeLinejoin="bevel"
                            ></path>
                          </svg>
                        </span>
                        {quitar ? "Quitar de favoritos" : "Agregar a favoritos"}
                      </button>
                    </h2>

                    <p className="break-all">
                      <strong>Actores:</strong> {movie.Actors}
                    </p>
                    <p>
                      <strong>Descripcion:</strong>
                    </p>
                    <p className="break-all">{movie.Plot}</p>
                  </div>
                </div>
              </>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
