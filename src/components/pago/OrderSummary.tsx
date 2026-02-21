import { useCartStore } from '@/store';

export const OrderSummary = () => {
  const { items, total } = useCartStore();

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-3xl p-6 h-fit sticky top-24">
      <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">Resumen de Compra</h3>
      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center text-sm">
            <div className="text-gray-400">
              <span className="font-bold text-brand-400">{item.quantity}x</span> {item.product.name}
            </div>
            <div className="text-white font-medium">S/ {(item.product.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-dark-600 pt-4">
        <div className="flex justify-between items-end">
          <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Total a pagar</span>
          <span className="text-3xl font-black text-brand-500 tracking-tighter">S/ {total().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};