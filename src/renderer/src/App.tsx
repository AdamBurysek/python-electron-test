function App(): JSX.Element {
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
    </div>
  )
}

export default App
