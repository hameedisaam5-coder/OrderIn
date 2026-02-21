import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../models/types';
import { MOCK_ORDERS } from '../services/mockData';

interface OrderContextType {
    orders: Order[];
    placeOrder: (orderData: Pick<Order, 'kitchenId' | 'items' | 'totalAmount' | 'deliveryAddressId'>) => Order;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

    const placeOrder = (orderData: Pick<Order, 'kitchenId' | 'items' | 'totalAmount' | 'deliveryAddressId'>) => {
        const newOrder: Order = {
            id: `ord_${Date.now()}`,
            userId: 'u1', // Mock user ID
            items: orderData.items,
            totalAmount: orderData.totalAmount,
            status: 'Confirmed',
            createdAt: new Date().toISOString(),
            deliveryAddressId: orderData.deliveryAddressId,
            kitchenId: orderData.kitchenId
        };
        // Add new order to the beginning of the list
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status } : order
        ));
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}
