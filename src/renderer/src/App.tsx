import { useEffect, useState } from 'react'

function App(): JSX.Element {
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
      setOutput((prevOutput) => prevOutput + '\n' + message)
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
      window.api.send('run-python-script')
    }
  }

  const handleStopScript = (): void => {
    if (window.api) {
      window.api.send('stop-python-script')
    }
  }
  return (
    <div className="container">
      <h1>Ovládání Python Skriptu</h1>
      <button onClick={handleRunScript}>Spustit skript</button>
      <button onClick={handleStopScript}>Zastavit skript</button>
      <h2>Výstup</h2>
      <p>{output}</p>
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
