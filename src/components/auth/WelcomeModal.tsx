interface WelcomeModalProps {
  name: string
  onConfirm: () => void
}

export const WelcomeModal = ({ name, onConfirm }: WelcomeModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-dark-950/90 backdrop-blur-md" />
      
      <div className="relative w-full max-w-sm bg-dark-800 border border-brand-500/30 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-brand-600/20 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-600/30">
          <span className="text-4xl animate-bounce">🎬</span>
        </div>
        
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
          ¡Hola, {name}!
        </h2>
        <p className="text-gray-400 font-medium mb-8">
          Tu sesión se ha iniciado correctamente. Prepárate para disfrutar de la mejor experiencia de cine.
        </p>

        <button
          onClick={onConfirm}
          className="w-full bg-brand-600 hover:bg-brand-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-brand-600/20 uppercase tracking-widest"
        >
          Aceptar y continuar
        </button>
      </div>
    </div>
  )
}