/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { mainWindow } from './createWindow'

export async function getXmrBtcPrice(): Promise<string> {
  const url = 'https://tradeogre.com/api/v1/markets'

  try {
    const response = await axios.get(url)
    const data = response.data

    for (const market of data) {
      if (market['XMR-BTC']) {
        const xmrBtcData = market['XMR-BTC']
        const price = xmrBtcData.price || 'N/A'
        return price
      }
    }
    return 'N/A'
  } catch (error: any) {
    return `Error: Unable to fetch data - ${error.message}`
  }
}

export function continuouslyUpdatePrice(): void {
  setInterval(async () => {
    const price = await getXmrBtcPrice()
    console.log(`The current XMR-BTC price is: ${price}`)
    if (mainWindow && mainWindow.webContents) {
      mainWindow.webContents.send('price-update', price)
    }
  }, 5000) // Aktualizace každých 5 sekund
}
