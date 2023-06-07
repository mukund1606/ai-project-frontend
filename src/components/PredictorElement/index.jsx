import Canvas from "@/components/CanvasElement";
import { motion } from "framer-motion";

const numberNames = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

const PredictorElement = ({
  prediction,
  accuracy,
  model,
  isMobile,
  canvasRef,
  ctxRef,
  processImage,
  setPrediction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 py-5">
      <motion.div
        initial={{ opacity: 0, height: "0", y: "50%" }}
        animate={{ opacity: 1, height: "auto", y: "0%" }}
        exit={{ opacity: 0, width: "0%" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center gap-5 p-4 overflow-hidden bg-white rounded-xl"
      >
        <div className="p-2 px-4 text-center rounded-xl w-fit">
          <h1 className="text-3xl font-bold text-black">Number Predictor</h1>
          <h1 className="text-lg font-normal text-black">
            <span className="font-bold">Model:</span> {model}
          </h1>
          <h1 className="text-lg font-normal text-black">
            <span className="font-bold">Accuracy:</span> {accuracy}
          </h1>
        </div>
        <Canvas
          width={isMobile ? 300 : 420}
          height={isMobile ? 300 : 420}
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          isMobile={isMobile}
        />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 text-white bg-black rounded"
            onClick={() => {
              setPrediction(null);
              if (canvasRef.current !== null) {
                ctxRef.current.clearRect(
                  0,
                  0,
                  canvasRef.current.width,
                  canvasRef.current.height
                );
              }
            }}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 text-white bg-black rounded"
            onClick={processImage}
          >
            Predict
          </button>
        </div>
        <div className="flex flex-col h-[150px] px-8 py-3 text-center bg-black rounded-xl">
          <h1 className="text-xl font-extrabold text-white">Prediction</h1>
          <h1 className="text-[50px] font-medium text-white">{prediction}</h1>
          <h1 className="text-[20px] font-medium text-white">
            {numberNames[prediction]}
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

export default PredictorElement;
