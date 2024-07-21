"use client";
import { useState } from "react";
import { CardWithImage } from "./ui/CardWithImage";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/form/TextInput";
import { Servicios } from "@/services/Service";
import { BaseUrl } from "@/config/constants";
import { imprimir } from "@/util/Imprimir";
import { Movie } from "./types/movies.type";

type BusquedaForm = {
  t: string;
  y: number;
  i: number;
};

export default function Movies() {
  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);

  const { control, handleSubmit } = useForm<BusquedaForm>();

  const onSubmit = async (data: BusquedaForm) => {
    setLoading(true);
    try {
      const respuesta = await Servicios.get({
        url: `${BaseUrl}/movies`,
        params: {
          t: data.t,
        },
      });
      setMovies([respuesta]);
      imprimir("DEBUGPRINT[4]: page.tsx:22: respuesta=", respuesta);
    } catch (error) {
      imprimir("DEBUGPRINT[5]: page.tsx:30: error=", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:join">
          <div>
            <div>
              <TextInput
                label=""
                id={"titulo"}
                name={"t"}
                control={control}
                placeholder="Busca una película"
                disabled={loading}
                rules={{
                  required: { value: true, message: "Este campo es requerido" },
                  minLength: {
                    value: 3,
                    message: "Al menos debe tener 3 caracteres",
                  },
                }}
              />
            </div>
          </div>
          <div className="indicator">
            <button type="submit" className="btn join-item">
              Buscar
            </button>
          </div>
        </div>
      </form>
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
              <CardWithImage key={movie.imdbID} movie={movie} />
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
