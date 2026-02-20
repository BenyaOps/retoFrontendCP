import { Modal } from '@/components/ui/Modal';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  successData?: { id: string; date: string } | null;
}

export const PaymentSuccessModal = ({ isOpen, onClose, successData }: PaymentSuccessModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="¡Compra Exitosa!">
    <div className="flex flex-col items-center gap-4">
      <span className="text-5xl">🎉</span>
      <p className="text-lg font-bold text-white">¡Tu pago fue procesado correctamente!</p>
      {successData && (
        <div className="bg-dark-900 rounded-2xl p-4 mb-2 text-left space-y-2 border border-dark-600 w-full">
          <p className="text-xs text-gray-500 font-bold uppercase">ID Transacción: <span className="text-gray-300">{successData.id}</span></p>
          <p className="text-xs text-gray-500 font-bold uppercase">Fecha: <span className="text-gray-300">{new Date(successData.date).toLocaleString()}</span></p>
        </div>
      )}
      <button onClick={onClose} className="w-full bg-brand-600 hover:bg-brand-500 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-brand-600/20 uppercase tracking-widest text-xs">
        Volver al Inicio
      </button>
    </div>
  </Modal>
);
