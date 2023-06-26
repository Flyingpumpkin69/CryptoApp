import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// require("dotenv").config()
const cryptoApiHeaders = {
  "X-RapidAPI-Key": "",
  "X-RapidAPI-Host": "",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinuuid, timeperiod }) =>
        createRequest(`coin/${coinuuid}/history?timeperiod=${timeperiod}`),
    }),

    getCryptoDetails: builder.query({
      query: (coinuuid) => createRequest(`/coin/${coinuuid}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'X-RapidAPI-Key': '8260355d9cmsh4973422c49e92c0p17fa1ejsn4e23ad0021ba',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };
