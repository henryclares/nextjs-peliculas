import axios, {
  AxiosError,
  Method,
  RawAxiosRequestHeaders,
  ResponseType,
} from "axios";

export type PeticionFormatoMetodo = {
  method?: Method;
} & PeticionFormato;

export type PeticionFormato = {
  url: string;
  headers?: RawAxiosRequestHeaders;
  body?: object;
  params?: any;
  responseType?: ResponseType;
  withCredentials?: boolean;
};

export const estadosCorrectos: number[] = [200, 201, 202, 204];
export const estadosSinPermiso: number[] = [401];

class ServiciosClass {
  peticionHTTP = ({
    url,
    method = "get",
    headers,
    body,
    params,
    responseType,
    withCredentials = true,
  }: PeticionFormatoMetodo) =>
    axios({
      method: method,
      url: url,
      headers: headers,
      timeout: 30000,
      data: body,
      params: params,
      responseType: responseType,
      withCredentials: withCredentials,
      validateStatus(status) {
        return estadosCorrectos.some((estado: number) => status === estado);
      },
    });

  isNetworkError(err: AxiosError | any) {
    return !!err.isAxiosError && !err.response;
  }

  async peticion({
    url,
    method = "get",
    headers,
    body,
    params,
    responseType,
    withCredentials = true,
  }: PeticionFormatoMetodo) {
    try {
      const response = await this.peticionHTTP({
        url,
        method: method,
        headers,
        body,
        params,
        responseType,
        withCredentials,
      });
      return response.data;
    } catch (e: AxiosError | any) {
      if (e.code === "ECONNABORTED") {
        throw new Error("La petición está tardando demasiado");
      }

      if (this.isNetworkError(e)) {
        throw new Error("Error en la conexión 🌎");
      }

      throw e.response?.data || "Ocurrio un error desconocido";
    }
  }

  async get({
    url,
    body = {},
    headers = {},
    params,
    responseType,
    withCredentials,
  }: PeticionFormato) {
    return await this.peticion({
      url,
      method: "get",
      headers,
      body,
      params,
      responseType,
      withCredentials,
    });
  }

  async post({
    url,
    body,
    headers,
    params,
    responseType,
    withCredentials,
  }: PeticionFormato) {
    return await this.peticion({
      url,
      method: "post",
      headers,
      body,
      params,
      responseType,
      withCredentials,
    });
  }

  async put({
    url,
    body,
    headers,
    params,
    responseType,
    withCredentials,
  }: PeticionFormato) {
    return await this.peticion({
      url,
      method: "put",
      headers,
      body,
      params,
      responseType,
      withCredentials,
    });
  }

  async patch({
    url,
    body,
    headers,
    params,
    responseType,
    withCredentials,
  }: PeticionFormato) {
    return await this.peticion({
      url,
      method: "patch",
      headers,
      body,
      params,
      responseType,
      withCredentials,
    });
  }

  async delete({
    url,
    body,
    headers,
    params,
    responseType,
    withCredentials,
  }: PeticionFormato) {
    return await this.peticion({
      url,
      method: "delete",
      headers,
      body,
      params,
      responseType,
      withCredentials,
    });
  }
}

export const Servicios = new ServiciosClass();
