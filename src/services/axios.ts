import axios, { Axios, AxiosPromise } from "axios";

interface AxiosRequestProps {
  method: "get" | "post" | "delete" | "put";
  target: string;
  token?: string;
  data?: any;
}

export const axiosRequest = async ({
  method,
  target,
  data,
  token,
}: AxiosRequestProps): AxiosPromise => {
  if (data) {
    return await axios[method](
      `${import.meta.env.VITE_API_HOST}/${target}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return await axios[method](`${import.meta.env.VITE_API_HOST}/${target}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
