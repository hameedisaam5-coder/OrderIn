import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '../src/constants/Colors';
import Layout from '../src/constants/Layout';
import { useCart } from '../src/context/CartContext';
import { useOrders } from '../src/context/OrderContext';

export default function PaymentScreen() {
    const router = useRouter();
    const { clearCart, items, totalAmount, kitchenId } = useCart();
    const { placeOrder } = useOrders();
    const [status, setStatus] = useState<'processing' | 'success'>('processing');

    useEffect(() => {
        const timer = setTimeout(() => {
            let newOrder = null;
            if (items.length > 0) {
                newOrder = placeOrder({
                    kitchenId: kitchenId || 'unknown',
                    items: items.map(i => ({ mealId: i.meal.id, quantity: i.quantity })),
                    totalAmount: totalAmount,
                    deliveryAddressId: 'a1' // Mock address
                });
            }
            setStatus('success');
            clearCart();
            setTimeout(() => {
                if (newOrder) {
                    router.replace(`/tracking/${newOrder.id}`);
                } else {
                    router.replace('/(tabs)/account');
                }
            }, 1500);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.content}>
                {status === 'processing' ? (
                    <>
                        <ActivityIndicator size="large" color={Colors.primary} />
                        <Text style={styles.text}>Processing Payment...</Text>
                    </>
                ) : (
                    <>
                        <View style={styles.successIcon}>
                            <Text style={styles.checkMark}>✓</Text>
                        </View>
                        <Text style={styles.successText}>Payment Successful!</Text>
                        <Text style={styles.subText}>Redirecting to order tracking...</Text>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    text: {
        marginTop: Layout.spacing.md,
        fontSize: 18,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.success,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Layout.spacing.lg,
    },
    checkMark: {
        fontSize: 40,
        color: Colors.white,
        fontWeight: 'bold',
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.success,
        marginBottom: Layout.spacing.sm,
    },
    subText: {
        color: Colors.textSecondary,
    }
});
