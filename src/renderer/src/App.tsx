function App(): JSX.Element {
  const handleRunScript = () => {
    window.api.send('run-python-script')
  }

  const handleStopScript = () => {
    window.api.send('stop-python-script')
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
