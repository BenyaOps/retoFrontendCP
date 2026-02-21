import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { useUserStore } from '@/store';

const paymentSchema = z.object({
  cardNumber: z.string().length(16, "La tarjeta debe tener 16 dígitos"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY"),
  cvv: z.string().min(3, "CVV debe tener al menos 3 dígitos").max(4, "CVV debe tener entre 3 y 4 dígitos"), 
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo electrónico inválido"),
  name: z.string().min(3, "Nombre completo requerido"), 
  docType: z.enum(["DNI", "CE"]),
  docNumber: z.string().min(8, "Número de documento inválido"),
});

type PaymentValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentValues) => Promise<void>;
  isProcessing: boolean;
}

export const PaymentForm = ({ onSubmit, isProcessing }: PaymentFormProps) => {
  const user = useUserStore((state) => state.user);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      email: user?.email || '', // 
      name: user?.name || '',   // 
      docType: 'DNI'
    }
  });

  const keyMMYY = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, '');
              if (value.length >= 2) {
                e.currentTarget.value = value.slice(0, 2) + '/' + value.slice(2, 4);
              } else {
                e.currentTarget.value = value;
              }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-dark-800 border border-dark-600 rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-2">
        <CreditCard className="text-brand-500" />
        <h2 className="text-xl font-black text-white uppercase tracking-tight">Información de Pago</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1">
          <input {...register('cardNumber')} placeholder="Número de Tarjeta (16 dígitos)" className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-all" />
          {errors.cardNumber && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.cardNumber.message}</p>}
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 space-y-1">
            <input {...register('expiry')} 
            placeholder="MM/YY" 
             onKeyUp={(e) =>keyMMYY(e)} 
            className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-all" />
            {errors.expiry && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.expiry.message}</p>}
          </div>
          <div className="w-1/2 space-y-1">
            <input {...register('cvv')} 
            placeholder="CVV" 
            className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-all" 
            />
            
            {errors.cvv && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.cvv.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <input {...register('name')} placeholder="Nombre completo" className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-all" />
          {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
            <input {...register('email')} placeholder="Correo electrónico" className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-all" />
          {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.email.message}</p>}
        </div>
        
        <div className="flex gap-4">
          <select {...register('docType')} className="w-1/3 bg-dark-900 border border-dark-500 rounded-xl px-2 py-3 text-white focus:border-brand-500 outline-none appearance-none">
            <option value="DNI">DNI</option>
            <option value="CE">CE</option>
          </select>
          <div className="w-2/3 space-y-1">
            <input {...register('docNumber')} placeholder="N° Documento" className="w-full bg-dark-900 border border-dark-500 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-all" />
            {errors.docNumber && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.docNumber.message}</p>}
          </div>
        </div>
      </div>

      <button type="submit" disabled={isProcessing} className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 disabled:bg-dark-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-brand-600/20 uppercase tracking-widest text-sm active:scale-95">
        <ShieldCheck size={20} />
        {isProcessing ? 'PROCESANDO PAGO...' : 'PAGAR AHORA'}
      </button>
    </form>
  );
};