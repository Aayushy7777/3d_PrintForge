import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
            <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Start shopping to add items to your cart.</p>
            <Link to="/products"><Button size="lg">Browse Products</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping Cart</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    {item.material && <p className="text-sm text-muted-foreground">{item.material} · {item.color}</p>}
                    <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="w-3 h-3" /></Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="w-3 h-3" /></Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl bg-card border border-border sticky top-28">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{totalPrice > 50 ? 'Free' : '$5.99'}</span></div>
                  <div className="border-t border-border my-3" />
                  <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">${(totalPrice + (totalPrice > 50 ? 0 : 5.99)).toFixed(2)}</span></div>
                </div>
                <Button size="lg" className="w-full mt-6">Checkout <ArrowRight className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" className="w-full mt-2" onClick={clearCart}>Clear Cart</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
