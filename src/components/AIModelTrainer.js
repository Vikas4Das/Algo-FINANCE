import React, { useState, useRef } from 'react';
import { Upload, Cpu, BrainCircuit, Database, LineChart, CheckCircle2, Loader2 } from 'lucide-react';

const AIModelTrainer = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0); 
  const fileInputRef = useRef(null);

  const startPipeline = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsProcessing(true);
      setStep(1);

      // Simulate Data Parsing
      setTimeout(() => {
        setStep(2);
        // Simulate TensorFlow.js Epoch Training
        setTimeout(() => {
          setStep(3);
          setIsProcessing(false);
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="bg-[#0D1117] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-20">
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">
              <BrainCircuit size={16} />
              <span>Advanced LLM Training</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Strategy Model Trainer</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-xl">Upload strategy forms or learning data. Our engine uses TensorFlow.js to retrain local LLM weights for dynamic portfolio alignment.</p>
          </div>

          <button 
            onClick={() => fileInputRef.current.click()}
            disabled={isProcessing}
            className="flex items-center gap-3 bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-[#00E599] transition-all disabled:opacity-50"
          >
            <Upload size={20} />
            {file ? file.name : "Upload Feedback Form"}
            <input type="file" ref={fileInputRef} onChange={startPipeline} className="hidden" />
          </button>
        </div>

        {/* Technical Pipeline Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl border ${step >= 1 ? 'border-blue-500/50 bg-blue-500/5' : 'border-slate-800 opacity-40'}`}>
            <Database size={24} className="mb-4 text-blue-400" />
            <h4 className="text-white font-bold text-sm mb-1">Tensor Parsing</h4>
            {step === 1 && <Loader2 className="animate-spin text-blue-400" size={14} />}
            {step > 1 && <CheckCircle2 className="text-[#00E599]" size={14} />}
          </div>
          <div className={`p-6 rounded-2xl border ${step >= 2 ? 'border-purple-500/50 bg-purple-500/5' : 'border-slate-800 opacity-40'}`}>
            <Cpu size={24} className="mb-4 text-purple-400" />
            <h4 className="text-white font-bold text-sm mb-1">Neural Retraining</h4>
            {step === 2 && <Loader2 className="animate-spin text-purple-400" size={14} />}
            {step > 2 && <CheckCircle2 className="text-[#00E599]" size={14} />}
          </div>
          <div className={`p-6 rounded-2xl border ${step >= 3 ? 'border-[#00E599]/50 bg-[#00E599]/5' : 'border-slate-800 opacity-40'}`}>
            <LineChart size={24} className="mb-4 text-[#00E599]" />
            <h4 className="text-white font-bold text-sm mb-1">Alpha Re-Aligned</h4>
            {step === 3 && <CheckCircle2 className="text-[#00E599]" size={14} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModelTrainer;