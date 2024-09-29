import { useEffect, useState } from 'react'
import Button from './components/Button'
import PairSelector from './components/PairSelector'

function App(): JSX.Element {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [pair, setPair] = useState<string>('BTC-USDT')
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Handle Python output
    window.api.receive('python-output', (data: string) => {
      setOutput(data)
    })

    // Handle Python errors
    window.api.receive('python-error', (data: string) => {
      setError((prevError) => prevError + data)
    })

    return () => {
      // Cleanup event listeners
      window.api.receive('python-output', () => {})
      window.api.receive('python-error', () => {})
    }
  }, [])

  const handleRunScript = (): void => {
    if (window.api) {
      setIsRunning(true)
      window.api.send('run-python-script', pair)
    }
  }

  const handleStopScript = (): void => {
    if (window.api) {
      setIsRunning(false)
      window.api.send('stop-python-script')
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <h1 className="pb-8 text-3xl font-bold text-white">Ovládání Python Skriptu</h1>
      <div className="flex gap-4">
        <PairSelector
          onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setPair(e.target.value)}
          isRunning={isRunning}
        />
        <Button
          onClick={isRunning ? handleStopScript : handleRunScript}
          label={isRunning ? 'Zastavit skript' : 'Spustit skript'}
        />
      </div>
      <p className="pt-4 text-xl font-semibold text-white">{output}</p>
      {error && (
        <>
          <h2 className="text-xl font-semibold text-white">Chyby</h2>
          <p className="pt-4 text-xl font-semibold text-white">{error}</p>
        </>
      )}
    </div>
  )
}

export default App
