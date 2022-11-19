import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [load, setLoad] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generarImagen = async () => {
    setLoad(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setResult(res.data.data[0].url);
    document.getElementById("text").classList.remove("mb-40");
    setLoad(false);
  };

  return (
    <div className="flex-col w-full h-screen">
      <h3
        id="text"
        className="p-8 m-8 mb-40 text-3xl font-bold text-center transition-all duration-300"
      >
        Genera tu imagen con DALL-E 2
      </h3>
      <form action="" id="form">
        <input
          className="block mx-auto mt-1 w-80 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          type="text"
          placeholder="Ingresa tu busqueda"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        {load ? (
          <Loader />
        ) : (
          <button
            onClick={generarImagen}
            className="flex bg-orange-400 hover:bg-orange-500 px-7 py-2 rounded-full mx-auto mt-10"
          >
            Generar
          </button>
        )}
      </form>

      {result.length > 0 ? (
        <img
          loading="lazy"
          className="mt-10 w-96 mx-auto rounded shadow-xl object-cover transition-all duration-300"
          src={result}
          alt="result"
        />
      ) : (
        <></>
      )}

      <Footer />
    </div>
  );
}

export default App;
