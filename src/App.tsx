import { useCallback, useEffect, useState } from "react"

export default function App(){
    const[length, setLength] = useState<number>(8)
    const[numberAllowed, setnumberAllowed] = useState(false)
    const[specialCharAllowed, setSpecialCharAllowed] = useState(false)
    const[password, setPassword] = useState<string>("")
    
    const CopyPassword = ()=>{
        window.navigator.clipboard.writeText(password)
        alert("Copied")
    }

        const GeneratePassword = useCallback(()=>{
            let pass = ""
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            
            if(numberAllowed) str += "0123456789"  
            if(specialCharAllowed) str += "!@#$%^&*()_+{}:[]`"  

            for (let i = 1; i <=length; i++) {
              let char = Math.floor(Math.random() * str.length + 1)
              pass += str.charAt(char)
            }
            setPassword(pass)
              
        },[length, numberAllowed, specialCharAllowed, setPassword])

        useEffect(()=>{
            GeneratePassword()
        },[length, specialCharAllowed, numberAllowed, GeneratePassword])

  return <>
  <div className="w-full h-screen bg-black p-10">
    <div className="text-center w-full bg-gray-800 max-w-lg mx-auto px-4 py-3 shadow-lg rounded-lg text-white ">
      <h1 className="text-white text-3xl"> Password generator </h1>
      <div className="flex my-6">
        <input type="text"
        value={password}
        placeholder="password"
        readOnly
        className="outline-none w-full py-1 px-3 rounded-xl text-black"
         />
         <button onClick={CopyPassword} className="outline-none bg-red-700 text-white rounded-xl px-3 ml-2 shrink-0">Copy</button>
       </div>
       <div className="flex text-md gap-x-2">
        <div className="flex place-items-center gap-x-2">
        <input type="range"
        min={6}
        max={20}
        value={length}
        onChange={(e)=>{setLength(Number(e.target.value))}}
        />
        <label >Length {length}</label>
        </div>
        <div className="flex place-items-center gap-x-2 pl-4">
          <input type="checkbox"
          defaultChecked={specialCharAllowed}
          onChange={() => {
            setSpecialCharAllowed((prev)=> !prev)}}
          />
          <label>Spl-Characters</label>
        </div>
        <div className="flex place-items-center gap-x-2 pl-4">
          <input type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            setnumberAllowed((prev)=> !prev)}}
          />
          <label>Numbers</label>
        </div>
       </div>
    </div>
  </div>
  </>
}