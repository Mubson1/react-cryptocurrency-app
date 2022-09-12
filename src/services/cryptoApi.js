import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//Here, we have used rapid api and searched for coin ranking api. Then from the code snippets, we got url and the headers

const cryptoApiHeader = {
    'X-RapidAPI-Key': '87d5f82377msh5937a22ac372175p1e9130jsn0d336bfdd656',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({
    url,
    headers: cryptoApiHeader
})

export const cryptoApi = 

createApi({
    reducerPath: 'cryptoApi',        //this is just a name
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        //getCryptos is also just a name of the endpoint
        getCryptos: builder.query({
            //query should be a function that points to the specific request. Here, we want to get the information for the exchanges of coins, so /coins.
            //Also, if we want to make request, we also need to pass the header, so, we have created a createRequest function that includes the header
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        }),
    })
})


export const {
    //redux toolkit actually creates a hook that you can call instantly to get all the data for your query. So when importing this useGetCryptosQuery, it behaves as a hook-look at homepage
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;