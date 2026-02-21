import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Trash2, Plus, Minus, X } from 'lucide-react-native';
import Colors from '../src/constants/Colors';
import Layout from '../src/constants/Layout';
import Button from '../src/components/Button';
import { useCart } from '../src/context/CartContext';
import { MOCK_KITCHENS } from '../src/services/mockData';

export default function CartScreen() {
    const router = useRouter();
    const { items, kitchenId, addToCart, removeFromCart, totalAmount, clearCart } = useCart();

    const kitchen = MOCK_KITCHENS.find(k => k.id === kitchenId);

    const handleCheckout = () => {
        // Navigate to Payment
        router.push('/payment');
    };

    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <StatusBar style="dark" />
                <View style={styles.header}>
                    <Text style={styles.title}>Cart</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <X color={Colors.textPrimary} size={24} />
                    </TouchableOpacity>
                </View>
                <View style={styles.emptyContent}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <Button title="Browse Restaurants" onPress={() => router.back()} style={{ marginTop: 20 }} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Your Cart</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <X color={Colors.textPrimary} size={24} />
                </TouchableOpacity>
            </View>

            <Text style={styles.kitchenName}>Ordering from {kitchen?.name}</Text>

            <FlatList
                data={items}
                keyExtractor={(item) => item.meal.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.itemHeader}>
                                <View style={[styles.vegDot, { backgroundColor: item.meal.isVegetarian ? Colors.success : Colors.error }]} />
                                <Text style={styles.itemName}>{item.meal.name}</Text>
                            </View>
                            <Text style={styles.itemPrice}>₹{item.meal.price * item.quantity}</Text>
                        </View>

                        <View style={styles.quantityControl}>
                            <TouchableOpacity onPress={() => removeFromCart(item.meal.id)} style={styles.qBtn}>
                                <Minus size={16} color={Colors.primary} />
                            </TouchableOpacity>
                            <Text style={styles.qText}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => addToCart(item.meal, kitchen!.id)} style={styles.qBtn}>
                                <Plus size={16} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Bill Details */}
            <View style={styles.billSection}>
                <Text style={styles.billTitle}>Bill Details</Text>
                <View style={styles.billRow}>
                    <Text style={styles.billLabel}>Item Total</Text>
                    <Text style={styles.billValue}>₹{totalAmount}</Text>
                </View>
                <View style={styles.billRow}>
                    <Text style={styles.billLabel}>Delivery Fee</Text>
                    <Text style={styles.billValue}>₹30</Text>
                </View>
                <View style={[styles.billRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>To Pay</Text>
                    <Text style={styles.totalValue}>₹{totalAmount + 30}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.addressSection}>
                    <Text style={styles.deliveringTo}>Delivering to Home</Text>
                    <Text style={styles.addressText} numberOfLines={1}>123, Green Park, New Delhi</Text>
                </View>
                <Button
                    title={`Pay ₹${totalAmount + 30}`}
                    onPress={handleCheckout}
                    size="lg"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Layout.spacing.lg,
    },
    emptyContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: Colors.textSecondary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Layout.spacing.lg,
        paddingTop: Layout.spacing.xl,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    kitchenName: {
        padding: Layout.spacing.md,
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    listContent: {
        padding: Layout.spacing.md,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.md,
        marginBottom: Layout.spacing.sm,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    vegDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    itemName: {
        fontSize: 16,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    itemPrice: {
        fontSize: 14,
        color: Colors.textPrimary,
        fontWeight: 'bold',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Layout.borderRadius.sm,
        backgroundColor: Colors.background,
    },
    qBtn: {
        padding: 8,
    },
    qText: {
        paddingHorizontal: 8,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    billSection: {
        backgroundColor: Colors.surface,
        padding: Layout.spacing.lg,
        margin: Layout.spacing.md,
        borderRadius: Layout.borderRadius.lg,
    },
    billTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: Layout.spacing.md,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    billLabel: {
        color: Colors.textSecondary,
    },
    billValue: {
        fontWeight: '500',
        color: Colors.textPrimary,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 8,
        marginTop: 8,
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.textPrimary,
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    addressSection: {
        marginBottom: Layout.spacing.md,
    },
    deliveringTo: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    addressText: {
        fontWeight: '600',
        color: Colors.textPrimary,
    }
});
