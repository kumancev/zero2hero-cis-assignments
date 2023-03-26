import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import save from '../images/Save.svg'

export default function BetBox() {
  const [cookies, setCookie] = useCookies(['bet'])
  const [value, setValue] = useState(cookies.bet ?? 0.001)

  const handleChange = (event) => {
    const inputValue = parseFloat(event.target.value)
    if (inputValue >= 0.001 && inputValue <= 0.1) {
      setValue(inputValue)
    }
  }

  return (
    <div className="wrapper">
      <div className="text">Bet:</div>

      <input
        type="number"
        step="0.001"
        max="0.1"
        value={value}
        onChange={handleChange}
        className="input"
      />
      <button
        onClick={() => {
          setCookie('bet', value, { path: '/' })
        }}
        className="btn"
      >
        <img src={save} alt="save" />
      </button>
    </div>
  )
}
