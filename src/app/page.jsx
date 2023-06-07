"use client";
import { useRef, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import PredictorElement from "@/components/PredictorElement";

export default function Home() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [prediction, setPrediction] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accuracy, setAccuracy] = useState(null);
  const [model, setModel] = useState(null);
  const processImage = async () => {
    setPrediction(null);

    // Setting Image Data to FormData
    const data = canvasRef.current.toDataURL("image/png");
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("data", data);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
        method: "POST",
        body: formDataToSubmit,
      });
      if (!res.ok) {
        alert("API Not Working");
        return;
      }
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // Setting Up Canvas For Mobile and Desktop
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      }
    }

    // Getting Accuracy and Model Details
    const getAccuracy = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL);
        if (!res.ok) {
          alert("API Not Working");
          return;
        }
        const data = await res.json();
        setAccuracy(data?.accuracy);
        setModel(data?.model);
      } catch (err) {
        console.log(err);
      }
    };
    getAccuracy();
    // Wait for 2 seconds to load the model
    setTimeout(() => {
      setIsLoading(false);
    }, 2200);
  }, []);
  return (
    <main>
      {isLoading ? (
        <>
          <div className="flex items-center justify-center w-full min-h-screen">
            <RingLoader color="#ffffff" />
          </div>
        </>
      ) : (
        <PredictorElement
          prediction={prediction}
          accuracy={accuracy}
          model={model}
          isMobile={isMobile}
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          processImage={processImage}
          setPrediction={setPrediction}
        />
      )}
    </main>
  );
}
