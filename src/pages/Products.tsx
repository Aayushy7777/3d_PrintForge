import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { products, categories, materials } from '@/data/products';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesMaterial = selectedMaterial === 'All' || product.materials.includes(selectedMaterial);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesMaterial && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 bg-card border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Our Products
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore our collection of premium 3D printed products, from decorative pieces 
                to functional parts and gaming miniatures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border bg-background sticky top-20 z-30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 bg-secondary border-border">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger className="w-40 bg-secondary border-border">
                    <SelectValue placeholder="Material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Materials</SelectItem>
                    {materials.map((material) => (
                      <SelectItem key={material.name} value={material.name}>
                        {material.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-secondary border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1 ml-auto">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/products/${product.id}`} className="group block">
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium rounded-full glass">
                            {product.category}
                          </span>
                        </div>

                        {!product.inStock && (
                          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                            <span className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-muted-foreground text-sm">
                            ({product.reviews})
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {product.printTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="group flex gap-6 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
                              {product.category}
                            </span>
                            <h3 className="font-display font-semibold text-lg mt-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </div>
                          <span className="text-xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-muted-foreground text-sm">
                              ({product.reviews} reviews)
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {product.printTime}
                          </span>
                          <div className="flex items-center gap-2">
                            {product.materials.slice(0, 3).map((mat) => (
                              <span key={mat} className="text-xs px-2 py-0.5 rounded-full bg-secondary">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedMaterial('All');
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
