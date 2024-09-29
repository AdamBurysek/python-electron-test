import React from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  isRunning: boolean
}

const PairSelector: React.FC<Props> = ({ onChange, isRunning }) => {
  return (
    <select
      onChange={onChange}
      disabled={isRunning}
      className="rounded-xl px-2 text-center font-bold"
    >
      <optgroup label="USDT">
        <option value="BTC-USDT">BTC-USDT</option>
        <option value="ETH-USDT">ETH-USDT</option>
        <option value="XMR-USDT">XMR-USDT</option>
        <option value="LTC-USDT">LTC-USDT</option>
      </optgroup>
      <optgroup label="BTC">
        <option value="XMR-BTC">XMR-BTC</option>
        <option value="LTC-BTC">LTC-BTC</option>
        <option value="ETH-BTC">ETH-BTC</option>
      </optgroup>
    </select>
  )
}

export default PairSelector
