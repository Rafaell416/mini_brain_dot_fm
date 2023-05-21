import axios, {AxiosInstance } from "axios";
import { getEndpoint } from "./getEndpoint";
import { Dictionary } from "@reduxjs/toolkit";

type headersType = Dictionary<string>;

function http(baseURL?: string, headers?: headersType): AxiosInstance {

  const apiURL = getEndpoint();
  const defaulHeaders: headersType = { "Content-type": "application/json" };
  return axios.create({
    baseURL: baseURL ?? apiURL,
    headers: headers ?? defaulHeaders
  });
};

export default http;