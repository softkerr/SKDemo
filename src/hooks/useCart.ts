'use client';

import { useState, useEffect } from 'react';
import { Product, CartItem, Cart } from '@/types/pricing';

const CART_STORAGE_KEY = 'pricing-cart';
const TAX_RATE = 0.1; // 10% tax

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    tax: 0,
    taxRate: TAX_RATE,
    total: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(calculateTotals(parsed.items || []));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cart]);

  // Calculate totals
  const calculateTotals = (items: CartItem[]): Cart => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {
      items,
      subtotal,
      tax,
      taxRate: TAX_RATE,
      total,
    };
  };

  // Add item to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex((item) => item.product.id === product.id);

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item
        newItems = [
          ...prevCart.items,
          {
            product,
            quantity,
            addedAt: Date.now(),
          },
        ];
      }

      return calculateTotals(newItems);
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.product.id !== productId);
      return calculateTotals(newItems);
    });
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return calculateTotals(newItems);
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      tax: 0,
      taxRate: TAX_RATE,
      total: 0,
    });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Check if product is in cart
  const isInCart = (productId: string): boolean => {
    return cart.items.some((item) => item.product.id === productId);
  };

  // Get item count
  const getItemCount = (): number => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemCount,
  };
}
