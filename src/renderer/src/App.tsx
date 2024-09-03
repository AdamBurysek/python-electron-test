import { useEffect, useState } from 'react'
import Button from './components/Button'

function App(): JSX.Element {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Přijímání výstupu z Python skriptu
    window.api.receive('python-output', (data: string) => {
      setOutput(data)
    })

    // Přijímání chybových zpráv z Python skriptu
    window.api.receive('python-error', (data: string) => {
      setError((prevError) => prevError + data)
    })

    // Reakce na ukončení Python skriptu
    window.api.receive('python-close', (message: string) => {
      setOutput(message)
    })

    return () => {
      // Vyčištění listenerů při odchodu z komponenty
      window.api.receive('python-output', () => {})
      window.api.receive('python-error', () => {})
      window.api.receive('python-close', () => {})
    }
  }, [])

  const handleRunScript = (): void => {
    if (window.api) {
      setIsRunning(true)
      window.api.send('run-python-script')
    }
  }

  const handleStopScript = (): void => {
    if (window.api) {
      setIsRunning(false)
      window.api.send('stop-python-script')
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Ovládání Python Skriptu</h1>
      <div className="flex gap-4">
        <Button
          onClick={isRunning ? handleStopScript : handleRunScript}
          label={isRunning ? 'Zastavit skript' : 'Spustit skript'}
        />
      </div>
      <p className="pt-4 text-xl font-semibold">{output}</p>
      {error && (
        <>
          <h2>Chyby</h2>
          <p>{error}</p>
        </>
      )}
    </div>
  )
}

export default App
