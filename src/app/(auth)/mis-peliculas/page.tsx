"use client";

import { Movie } from "@/app/(unauth)/types/movies.type";
import { CardWithImage } from "@/app/(unauth)/ui/CardWithImage";
import { BaseUrl } from "@/config/constants";
import { Servicios } from "@/services/Service";
import { leerCookie } from "@/util/Cookies";
import { imprimir } from "@/util/Imprimir";
import { useEffect, useState } from "react";

export default function MisPeliculas() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const obtenerMovies = async () => {
    setLoading(true);
    try {
      const respuesta = await Servicios.get({
        url: `${BaseUrl}/movies/favoritos`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${leerCookie("token")}`,
        },
      });
      setMovies([respuesta[0]]);
      imprimir("DEBUGPRINT[4]: page.tsx:22: respuesta=", respuesta);
    } catch (error) {
      imprimir("DEBUGPRINT[5]: page.tsx:30: error=", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    obtenerMovies();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Mis Peliculas</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {loading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton h-44 w-72 lg:w-96"></div>
            ))}
          </>
        ) : (
          <>
            {movies.map((movie) => (
              <CardWithImage key={movie.imdbID} movie={movie} quitar />
            ))}
          </>
        )}
      </div>
      {movies.length > 1 && (
        <>
          <div className="join">
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="1"
              defaultChecked
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="2"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="3"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="4"
            />
          </div>
        </>
      )}
    </>
  );
}
