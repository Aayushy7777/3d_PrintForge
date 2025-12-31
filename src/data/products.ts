import productVase from '@/assets/product-vase.jpg';
import productGears from '@/assets/product-gears.jpg';
import productMiniature from '@/assets/product-miniature.jpg';
import productStand from '@/assets/product-stand.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  materials: string[];
  colors: string[];
  printTime: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Geometric Vase',
    description: 'Modern geometric vase with intricate faceted design. Perfect for home décor and as a statement piece.',
    price: 49.99,
    category: 'Decorative',
    image: productVase,
    materials: ['PLA', 'PETG'],
    colors: ['White', 'Black', 'Gray', 'Gold'],
    printTime: '8-12 hours',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Precision Gear Set',
    description: 'High-precision mechanical gear set for robotics and engineering projects. Tight tolerances guaranteed.',
    price: 34.99,
    category: 'Mechanical',
    image: productGears,
    materials: ['PETG', 'Nylon', 'ABS'],
    colors: ['Silver', 'Black'],
    printTime: '6-8 hours',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Fantasy Warrior Miniature',
    description: 'Highly detailed fantasy warrior miniature for tabletop gaming. Exceptional detail at 28mm scale.',
    price: 24.99,
    category: 'Miniatures',
    image: productMiniature,
    materials: ['Resin'],
    colors: ['Gray', 'White'],
    printTime: '4-6 hours',
    rating: 4.7,
    reviews: 256,
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Ergonomic Phone Stand',
    description: 'Sleek and functional phone stand with cable management. Compatible with all phone sizes.',
    price: 19.99,
    category: 'Accessories',
    image: productStand,
    materials: ['PLA', 'PETG'],
    colors: ['Black', 'White', 'Navy'],
    printTime: '3-4 hours',
    rating: 4.6,
    reviews: 312,
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Architectural Model Kit',
    description: 'Modular architectural building blocks for creating custom structures and cityscapes.',
    price: 79.99,
    category: 'Prototypes',
    image: productVase,
    materials: ['PLA', 'Resin'],
    colors: ['White', 'Gray'],
    printTime: '12-16 hours',
    rating: 4.5,
    reviews: 67,
    inStock: true,
  },
  {
    id: '6',
    name: 'Custom Keychain Set',
    description: 'Set of 5 customizable keychains. Perfect for gifts or promotional items.',
    price: 14.99,
    category: 'Accessories',
    image: productStand,
    materials: ['PLA'],
    colors: ['Multi-color available'],
    printTime: '2-3 hours',
    rating: 4.4,
    reviews: 445,
    inStock: true,
  },
];

export const categories = [
  'All',
  'Decorative',
  'Mechanical',
  'Miniatures',
  'Accessories',
  'Prototypes',
  'Custom',
];

export const materials = [
  { name: 'PLA', description: 'Biodegradable, great surface finish', priceMultiplier: 1 },
  { name: 'ABS', description: 'Durable, heat resistant', priceMultiplier: 1.2 },
  { name: 'PETG', description: 'Strong, chemical resistant', priceMultiplier: 1.3 },
  { name: 'Resin', description: 'Ultra-detailed, smooth finish', priceMultiplier: 1.8 },
  { name: 'Nylon', description: 'Flexible, wear resistant', priceMultiplier: 1.5 },
];

export const colors = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Gray', hex: '#6b7280' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Gold', hex: '#eab308' },
  { name: 'Silver', hex: '#a1a1aa' },
];
