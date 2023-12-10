import './App.css';
import { useState, useEffect, useCallback, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [pass, setPass] = useState("")
  const [charAllowed, setcharAllowed] = useState(false)
  const [numberAllowed, setnumberAllowed] = useState(false)

  const passGenerator = useCallback(
    () => {
      let pass = ""
      let str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if (charAllowed) str += "~`!@#$%^&*()-_=+|]}[{';:/?.>,<"
      if (numberAllowed) str += "0123456789"

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random() * str.length)
        pass += str.charAt(char)

      }
      setPass(pass)

    },
    [length, setPass, charAllowed, numberAllowed],
  )

  useEffect(() => {
    passGenerator()
  },
    [length, numberAllowed, charAllowed, passGenerator])

  const passRef = useRef(null)
  const copyPasswordToClipboard = useCallback(() => { 
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(pass) 
  
},
    [pass])

  return (
    <>
      <h1 className="text-center">Password Generator</h1>
      <input
        type="text"
        value={pass}
        placeholder='Password'
        readOnly
        ref={passRef}
      />
      <button
        className='btn btn-primary'
        onClick={copyPasswordToClipboard}>
        Copy</button>
      <input
        type="range"
        min={6}
        max={100}
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <label>Length: {length}</label>
      <label htmlFor='numInput'>Numbers {numberAllowed}</label>
      <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id='numInput'
        onChange={() =>
          setnumberAllowed((prev) => !prev)
        }
      />
      <label htmlFor='charInput'>Characters {charAllowed}</label>
      <input
        type="checkbox"
        defaultChecked={charAllowed}
        id='charInput'
        onChange={() =>
          setcharAllowed((prev) => !prev)
        }
      />
    </>
  );
}

export default App;
