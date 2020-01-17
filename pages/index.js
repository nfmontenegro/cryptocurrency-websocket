import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import Head from 'next/head'

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
      console.log(socketMessage)
      setCoin(prevValues => {
        const mapData = socketMessage.x.inputs.map(coin => {
          return {
            name: coin.sequence,
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
      <LineChart width={1200} height={600} data={coin}>
        <YAxis type="number" yAxisId={0} domain={[0, 1020]} />
        <YAxis type="number" orientation="right" yAxisId={1} />
        <YAxis type="number" orientation="right" yAxisId={2} />
        <XAxis dataKey="name" />
        <CartesianGrid stroke="#f5f5f5" />
        <Line dataKey="uv" stroke="#ff7300" strokeWidth={2} yAxisId={0} />
        <Line dataKey="pv" stroke="#387908" strokeWidth={2} yAxisId={1} />
        <Line dataKey="amt" stroke="#38abc8" strokeWidth={2} yAxisId={2} />
      </LineChart>
    </div>
  )
}

export default Home
