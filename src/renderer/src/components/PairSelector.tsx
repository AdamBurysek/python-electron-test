import React from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const PairSelector: React.FC<Props> = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="XMR-BTC">XMR-BTC</option>
      <option value="LTC-BTC">LTC-BTC</option>
      <option value="ETH-BTC">ETH-BTC</option>
      <option value="XMR-USDT">XMR-USDT</option>
      <option value="LTC-USDT">LTC-USDT</option>
      <option value="BTC-USDT">BTC-USDT</option>
    </select>
  )
}

export default PairSelector
