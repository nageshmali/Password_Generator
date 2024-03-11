import React, { useEffect, useState, useRef } from 'react';

function App() {

  const [password, setPassword] = useState("");

  const [numbersallow, setNumbersAllow] = useState(false);

  const [charsallow, setCharsAllow] = useState(false);

  const [length, setLength] = useState(10);

  const passRef = useRef(null);

  const passGenerator = () => {

    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numbersallow){
      str += "0123456789012345678923456789876534";
    }

    if(charsallow){
      str += "~`!@#$%^&*()_-+!@#$%^&*()_+={}:";
    }


    for(let i=1;i<=length;i++){
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);  
  }

  useEffect(()=>{
    passGenerator();
  },[length,numbersallow,charsallow])
  
  const copyPassword = () => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <div className="screen bg-slate-500 h-screen md:h-[100vh] flex justify-center">
        <div className="mainContainer h-[220px] bg-slate-100 flex mt-32 md:mt-20 px-10 py-6 rounded-md border-2 flex-col items-center justify-center gap-6 w-[320px] md:w-[500px]">
          <h1 className=" text-xl md:text-3xl font-semibold">Password Generator</h1>

          <div className="inputs flex gap-2">
            <input 
            className="border-2 outline-none font-medium rounded w-48 md:w-56 text-lg" 
            type="text" name="" id=""
            value={password}
            placeholder='password'
            ref={passRef}
            readOnly />
            
            <button onClick={copyPassword} className="text-lg bg-yellow-400 outline-none py-1 px-4 rounded font-semibold">copy</button>
          </div>

          <div className="ctrls flex md:flex-row flex-col md:gap-4">
            <div className="ranges w-[220px] flex gap-2">
              <input onChange={(e) => {setLength(e.target.value)}} className="accent-yellow-400 outline-none" type="range" min={6} max={16} defaultValue={length} name="" id=""/>
              <label>Length : {length}</label>
            </div>

            <div className="numbers flex gap-1">
              <input onChange={()=>{setNumbersAllow((prev) => !prev)}} defaultChecked={numbersallow} type="checkbox" name="" id="" />
              <label>Numbers</label>
            </div>

            <div className="characters flex gap-1">
              <input onChange={() => {setCharsAllow((prev) => !prev)}} defaultChecked={charsallow} type="checkbox" name="" id="" />
              <label>Characters</label>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
