import { useState } from 'react';
import { useNavigate } from 'react-router';
import { OrderSummary } from '@/components/pago/OrderSummary';
import { PaymentForm } from '@/components/pago/PaymentForm';
import { payuService, cinemaApi } from '@/api/services';
import { useStore } from '@/store';

export const PagoPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; date: string } | null>(null);
  const clearCart = useStore((state) => state.clearCart);
  const navigate = useNavigate();

  const handleProcessPayment = async (formData: any) => {
    setIsProcessing(true);
    try {
      // 1. Confirmación del servicio de PayU [cite: 57]
      const payuRes = await payuService.processPayment(formData); // [cite: 54-56]

      // 2. Servicio 'complete' para terminar la transacción [cite: 58]
      const res = await cinemaApi.completeTransaction({
        email: formData.email, // [cite: 60]
        nombres: formData.name, // [cite: 61]
        dni: formData.docNumber, // [cite: 62]
        operationDate: payuRes.operationDate, // [cite: 63]
        transactionId: payuRes.transactionId // [cite: 64]
      });

      if (res.responseCode === "0") { // [cite: 65]
        setSuccessData({ id: payuRes.transactionId, date: payuRes.operationDate });
        clearCart();
      }
    } catch (error) {
      alert("Error en el procesamiento del pago.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (successData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="max-w-md w-full bg-dark-800 border border-brand-500/30 rounded-3xl p-10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
            <span className="text-4xl">🎬</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">¡Compra Correcta!</h2> {/* [cite: 66] */}
          <p className="text-gray-400 mb-6">Tu reserva ha sido confirmada con éxito.</p>
          <div className="bg-dark-900 rounded-2xl p-4 mb-8 text-left space-y-2 border border-dark-600">
            <p className="text-[10px] text-gray-500 font-bold uppercase">ID Transacción: <span className="text-gray-300">{successData.id}</span></p>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Fecha: <span className="text-gray-300">{new Date(successData.date).toLocaleString()}</span></p>
          </div>
          <button onClick={() => navigate('/')} className="w-full bg-brand-600 hover:bg-brand-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-brand-600/20 uppercase tracking-widest text-xs">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-10">Proceso de <span className="text-brand-500">Checkout</span></h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <PaymentForm onSubmit={handleProcessPayment} isProcessing={isProcessing} />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};