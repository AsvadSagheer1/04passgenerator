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
      <div className="row justify-content-center text-white">
        <div className="col-md-6 bg-secondary rounded py-5 my-5">
          <h3 className="text-center my-3">Password Generator</h3>
          <div className="row justify-content-center">
            <div className="col-6">
              <input
                type="text"
                value={pass}
                placeholder='Password'
                readOnly
                ref={passRef}
                className='m-2 p-1 form-control'
              />
              </div>
            <div className="col-7 text-center">
              <button
                className='btn btn-primary'
                onClick={copyPasswordToClipboard}>
                Copy</button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className='form-range'
                onChange={(e) => setLength(e.target.value)}
              />
              <label className='form-label'>Length: {length}</label>
              <br />
              <div class="form-check">
                <label
                  htmlFor='numInput'
                  className='form-check-label'>
                  Numbers {numberAllowed}</label>
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  className='form-check-input'
                  id='numInput'
                  onChange={() =>
                    setnumberAllowed((prev) => !prev)
                  }
                />
              </div>
              <div class="form-check">
                <label
                  htmlFor='charInput'
                  className='form-check-label'
                >Characters {charAllowed}</label>
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id='charInput'
                  className='form-check-input'
                  onChange={() =>
                    setcharAllowed((prev) => !prev)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
