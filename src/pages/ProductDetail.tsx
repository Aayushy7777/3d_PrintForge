import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ChevronLeft, Check, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { products, colors } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  
  const [selectedMaterial, setSelectedMaterial] = useState(product?.materials[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedMaterial}-${selectedColor}`,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      material: selectedMaterial,
      color: selectedColor,
    });
    toast.success(`${product.name} added to cart!`, {
      description: `${quantity}x ${selectedMaterial} in ${selectedColor}`,
    });
  };

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <section className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Wishlist & Share */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="glass" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="glass" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail gallery placeholder */}
              <div className="flex gap-4 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-20 h-20 rounded-lg overflow-hidden bg-card border-2 cursor-pointer ${
                      i === 0 ? 'border-primary' : 'border-border hover:border-primary/50'
                    } transition-colors`}
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category & Rating */}
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
                  {product.category}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-accent text-accent'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.inStock ? (
                    <span className="flex items-center gap-1 text-green-500 text-sm">
                      <Check className="w-4 h-4" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-destructive text-sm">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Print Time</p>
                    <p className="font-medium text-foreground">{product.printTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Shipping</p>
                    <p className="font-medium text-foreground">2-5 days</p>
                  </div>
                </div>
              </div>

              {/* Material Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Material
                </label>
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger className="w-full bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.materials.map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Color: {selectedColor}
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((colorName) => {
                    const colorData = colors.find((c) => c.name === colorName);
                    return (
                      <button
                        key={colorName}
                        onClick={() => setSelectedColor(colorName)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === colorName
                            ? 'border-primary scale-110'
                            : 'border-border hover:border-primary/50'
                        }`}
                        style={{ backgroundColor: colorData?.hex || '#gray' }}
                        title={colorName}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    Total: <span className="text-foreground font-bold">${(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="xl">
                  Buy Now
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 lg:px-8 py-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-card mb-3">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-primary font-bold">${relatedProduct.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
