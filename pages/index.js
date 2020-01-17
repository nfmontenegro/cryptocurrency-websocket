import React, { useEffect, useState } from 'react'
import Head from 'next/head'

const WAValidator = require('@swyftx/api-crypto-address-validator')
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

import Nav from '../components/nav'

const Home = () => {
  const [coin, setCoin] = useState([])

  useEffect(() => {
    const ws = new WebSocket('wss://ws.blockchain.info/inv')

    ws.onopen = () => {
      const message = JSON.stringify({
        op: 'unconfirmed_sub'
      })

      ws.send(message)
    }

    ws.onerror = err => {
      console.error('Socket encountered error: ', err.message, 'Closing socket')
      ws.close()
    }

    ws.onmessage = async event => {
      const socketMessage = JSON.parse(event.data)
      setCoin(prevValues => {
        const mapData = socketMessage.x.inputs.map(coin => {
          const litecoin = WAValidator.validate(coin.prev_out.addr, 'litecoin')
          const btc = WAValidator.validate(coin.prev_out.addr, 'BTC')
          let coinName
          if (litecoin) {
            console.log('Litecoin')
            coinName = 'Litecoin'
          }

          if (btc) {
            console.log('BTC')
            coinName = 'BTC'
          }

          return {
            name: coinName,
            uv: coin.value,
            pv: coin.prev_out.value,
            amt: coin.script
          }
        })
        return [...prevValues, ...mapData]
      })
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <LineChart width={1000} height={700} data={coin}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
}

export default Home
