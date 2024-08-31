import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [price, setPrice] = useState<string>('Loading...')

  useEffect(() => {
    // Přijímání aktualizované ceny z Node.js skriptu
    window.api.receive('price-update', (data: string) => {
      setPrice(data)
    })

    return () => {
      // Vyčištění listenerů při odchodu z komponenty
      window.api.removeAllListeners('price-update')
    }
  }, [])

  return (
    <div className="container">
      <h1>XMR-BTC Price Tracker</h1>
      <h2>Current Price</h2>
      <p>{price}</p>
    </div>
  )
}

export default App
