import { ipcMain } from 'electron'
import { getXmrBtcPrice } from './price'

export function setupIpcHandlers(): void {
  ipcMain.on('get-current-price', async (event) => {
    const price = await getXmrBtcPrice()
    event.sender.send('price-update', price) // Pošle aktuální cenu na žádost
  })
}
