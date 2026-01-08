
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ImageSize } from '../types';

const AiImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ImageSize>('1K');
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<{ title?: string; uri?: string }[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setSources([]);

    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) { await window.aistudio.openSelectKey(); }

      // Fix: Always create a new GoogleGenAI instance right before making an API call 
      // to ensure it uses the most up-to-date API key from the dialog.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio: "16:9", imageSize: selectedSize },
          // Fix: Use 'google_search' as specified in the Generate Images section for gemini-3-pro-image-preview.
          tools: [{ google_search: {} }]
        }
      });

      let foundImage = false;
      if (response.candidates && response.candidates.length > 0) {
        const firstCandidate = response.candidates[0];
        // Fix: Iterate through all parts to find the image part, do not assume it is the first part.
        for (const part of firstCandidate.content.parts) {
          if (part.inlineData) {
            setGeneratedImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
        
        // Fix: Extract website URLs from groundingMetadata for Search Grounding transparency.
        const groundingChunks = firstCandidate.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
          setSources(groundingChunks.map((chunk: any) => chunk.web).filter((web: any) => web && web.uri));
        }
      }
      if (!foundImage) setError("Design Intelligence couldn't visualize this. Try another prompt.");
    } catch (err: any) {
      // Fix: Handle cases where the entity is not found by prompting for API key selection again.
      if (err.message?.includes("Requested entity was not found")) {
        setError("Session expired. Please re-select your key.");
        await window.aistudio.openSelectKey();
      } else setError("An error occurred during vision generation.");
    } finally { setIsGenerating(false); }
  };

  return (
    <section id="ai-visualizer" className="py-32 px-6 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[11px] uppercase tracking-[0.6em] text-[#D4AF37] mb-6 font-bold">Concept Visualizer</h2>
          <h3 className="text-4xl md:text-6xl font-light font-display">AI Powered <span className="italic text-[#D4AF37]">Vision</span></h3>
          <p className="text-gray-500 mt-6 max-w-xl mx-auto font-light leading-relaxed">
            Harnessing Design Intelligence to manifest architectural concepts in high fidelity.
          </p>
        </div>

        <div className="bg-black border border-[#D4AF37]/20 rounded-[40px] overflow-hidden p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/60 mb-3 font-black">Architectural Prompt</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A golden futuristic microservices topology map..."
                className="w-full bg-[#111] border border-[#D4AF37]/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-white text-sm"
              />
            </div>
            <div className="md:w-56">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/60 mb-3 font-black">Fidelity</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as ImageSize)}
                className="w-full bg-[#111] border border-[#D4AF37]/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none text-white text-sm"
              >
                <option value="1K">1K Draft</option>
                <option value="2K">2K Production</option>
                <option value="4K">4K Masterpiece</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full md:w-auto bg-[#D4AF37] text-black font-black uppercase tracking-widest px-10 py-4 rounded-2xl hover:bg-[#F9E2AF] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
              >
                {isGenerating ? 'Manifesting...' : 'Visualize'}
              </button>
            </div>
          </div>

          <div className="relative aspect-video bg-[#0a0a0a] border border-[#D4AF37]/5 rounded-[30px] overflow-hidden flex items-center justify-center">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-2 border-[#D4AF37]/10 border-t-[#D4AF37] rounded-full animate-spin" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold animate-pulse">Rendering Concept...</p>
              </div>
            ) : generatedImageUrl ? (
              <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-cover animate-in fade-in duration-1000" />
            ) : (
              <div className="text-center p-12 opacity-10">
                <p className="text-2xl font-display italic text-[#D4AF37]">Architectural Void</p>
                <p className="text-xs uppercase tracking-widest mt-2">Enter prompt to generate</p>
              </div>
            )}
            
            {error && <div className="absolute inset-0 bg-red-950/30 backdrop-blur-md flex items-center justify-center p-8 text-center"><p className="text-red-300 text-sm font-bold uppercase tracking-widest">{error}</p></div>}
          </div>

          {sources.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[#D4AF37]/10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/40 mb-4 font-black">Grounding References</p>
              <div className="flex flex-wrap gap-6">
                {sources.map((source, idx) => (
                  <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-400 hover:text-[#D4AF37] transition-colors border-b border-[#D4AF37]/10 pb-1 italic font-light">{source.title || 'Enterprise Data'}</a>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex items-center justify-between opacity-30 text-[9px] uppercase tracking-widest font-black">
            <p>Design Intelligence Logic v3.2</p>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">API Governance</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiImageGenerator;
