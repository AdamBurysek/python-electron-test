/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      send: (channel: string, data?: any) => void
      receive: (channel: string, func: (...args: any[]) => void) => void
    }
  }
}
