import { useState } from 'react';
import { useNavigate } from 'react-router';
import { OrderSummary } from '@/components/pago/OrderSummary';
import { PaymentForm } from '@/components/pago/PaymentForm';
import { payuService, cinemaApi } from '@/api/services';
import { useCartStore } from '@/store';
import { PaymentSuccessModal } from '@/components/pago/PaymentSuccessModal';
import { ItemsVacio } from '@/components/pagos/ItemsVacio';

export const PagoPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; date: string } | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const { items } = useCartStore();

  const handleProcessPayment = async (formData: any) => {
    setIsProcessing(true);
    try {
      console.log({formData});
      
      // 1. Confirmación del servicio de PayU
      const payuRes = await payuService.processPayment(formData); 
      console.log({payuRes});
      // 2. Servicio 'complete' para terminar la transacción 
      const res = await cinemaApi.completeTransaction({
        email: formData.email,
        nombres: formData.name, 
        dni: formData.docNumber, 
        operationDate: payuRes.operationDate, 
        transactionId: payuRes.transactionId
      });
      console.log({res});
      
      if (res.code === "0") {
        console.log({payuRes});
        
        setSuccessData({ id: payuRes.transactionId, date: payuRes.operationDate });
        setShowSuccess(true);
        clearCart();
      }
    } catch (error) {
      alert("Error en el procesamiento del pago.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Modal de confirmación de pago
  const handleCloseModal = () => {
    setShowSuccess(false);
    navigate('/');
  };

  if (items.length === 0 && !showSuccess) {
    return <ItemsVacio />;
  }

  return (
    <>
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

      {/* Modal de éxito */}
      <PaymentSuccessModal isOpen={showSuccess} onClose={handleCloseModal} successData={successData} />
    </>
  );
};