import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Meal, Kitchen } from '../models/types';

interface CartItem {
    meal: Meal;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    kitchenId: string | null;
    addToCart: (meal: Meal, kitchenId: string) => void;
    removeFromCart: (mealId: string) => void;
    clearCart: () => void;
    totalAmount: number;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [kitchenId, setKitchenId] = useState<string | null>(null);

    const addToCart = (meal: Meal, kId: string) => {
        if (kitchenId && kitchenId !== kId) {
            // Alert user about different kitchen? For now, just clear and start new
            // In a real app we'd ask confirmation
            setItems([{ meal, quantity: 1 }]);
            setKitchenId(kId);
            return;
        }

        if (!kitchenId) setKitchenId(kId);

        setItems((prev) => {
            const existing = prev.find((i) => i.meal.id === meal.id);
            if (existing) {
                return prev.map((i) =>
                    i.meal.id === meal.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { meal, quantity: 1 }];
        });
    };

    const removeFromCart = (mealId: string) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.meal.id === mealId);
            if (existing && existing.quantity > 1) {
                return prev.map((i) =>
                    i.meal.id === mealId ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return prev.filter((i) => i.meal.id !== mealId);
        });
    };

    const clearCart = () => {
        setItems([]);
        setKitchenId(null);
    };

    const totalAmount = items.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, kitchenId, addToCart, removeFromCart, clearCart, totalAmount, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
