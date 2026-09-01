import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Eye, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto-play when visible and scrub/react to scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if container is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const total = windowHeight + rect.height;
        const current = windowHeight - rect.top;
        const progress = Math.min(Math.max(current / total, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section id="proceso" ref={containerRef} className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Proceso de Producción & Calidad
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Tecnología, Selección Textil y Rigor en Cada Fardo
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400">
            Mira cómo procesamos las mermas de algodón puro, garantizando paños libres de botones y metales, con costuras circulares de alta resistencia.
          </p>
        </div>

        {/* Video Showcase Player */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/20 bg-slate-900 shadow-2xl group">
          
          {/* Main Video Element */}
          <div className="relative aspect-video sm:aspect-[21/9] bg-slate-900 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/Recursos/e39bc2a7-0915-43f9-9ca2-05b23089665c.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none"></div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-xl bg-white text-slate-950 hover:bg-sky-400 transition-colors flex items-center justify-center font-bold"
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
                  aria-label={isMuted ? "Activar audio" : "Silenciar"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={restartVideo}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center hidden sm:flex"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="hidden sm:inline font-mono text-[11px] bg-white/10 px-2.5 py-1 rounded-lg">
                  TRAPEX VIDEO TOUR
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  En Vivo
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* 4-Step Process Timeline below video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Paso 01</div>
            <h4 className="text-sm font-bold text-white mb-1.5">Acopio y Selección Textil</h4>
            <p className="text-xs text-slate-400">Compramos y seleccionamos mermas textiles 100% algodón de fábricas formales.</p>
          </div>

          <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Paso 02</div>
            <h4 className="text-sm font-bold text-white mb-1.5">Depuración Manual Rigurosa</h4>
            <p className="text-xs text-slate-400">Retiro manual y exhaustivo de botones, metales, elásticos y cierres.</p>
          </div>

          <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Paso 03</div>
            <h4 className="text-sm font-bold text-white mb-1.5">Costura Espiral y Cardado</h4>
            <p className="text-xs text-slate-400">Confección de trapos cosidos de alta absorción y procesamiento de waype fino.</p>
          </div>

          <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Paso 04</div>
            <h4 className="text-sm font-bold text-white mb-1.5">Pesaje Exacto y Despacho</h4>
            <p className="text-xs text-slate-400">Embalaje en sacos prensados con balanza calibrada para entrega inmediata.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
