import React from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const PairSelector: React.FC<Props> = ({ onChange }) => {
  return (
    <select onChange={onChange} className="px-2 rounded-xl font-bold">
      <optgroup label="USDT">
        <option value="BTC-USDT">BTC-USDT</option>
        <option value="XMR-USDT">XMR-USDT</option>
        <option value="LTC-USDT">LTC-USDT</option>
      </optgroup>
      <hr />
      <optgroup label="BTC">
        <option value="XMR-BTC">XMR-BTC</option>
        <option value="LTC-BTC">LTC-BTC</option>
        <option value="ETH-BTC">ETH-BTC</option>
      </optgroup>
      <hr />
    </select>
  )
}

export default PairSelector
