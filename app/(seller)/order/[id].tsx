import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Clock, MapPin, Phone, User as UserIcon } from 'lucide-react-native';
import Colors from '../../../src/constants/Colors';
import Layout from '../../../src/constants/Layout';
import { useOrders } from '../../../src/context/OrderContext';
import { MOCK_USER, MOCK_KITCHENS } from '../../../src/services/mockData';

export default function SellerOrderDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { orders, updateOrderStatus } = useOrders();

    const order = orders.find(o => o.id === id);

    if (!order) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order Not Found</Text>
                </View>
            </SafeAreaView>
        );
    }

    const handleNextStatus = () => {
        let nextStatus: any = 'Delivered';
        if (order.status === 'Confirmed') nextStatus = 'Preparing';
        else if (order.status === 'Preparing') nextStatus = 'Out for Delivery';
        else if (order.status === 'Out for Delivery') nextStatus = 'Delivered';

        updateOrderStatus(order.id, nextStatus);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return Colors.warning;
            case 'Preparing': return Colors.secondary;
            case 'Out for Delivery': return Colors.primary;
            case 'Delivered': return Colors.success;
            default: return Colors.textSecondary;
        }
    };

    const getMealName = (mealId: string) => {
        for (const kitchen of MOCK_KITCHENS) {
            const meal = kitchen.menu.find((m: any) => m.id === mealId);
            if (meal) return meal.name;
        }
        return 'Unknown Item';
    };

    const getMealPrice = (mealId: string) => {
        for (const kitchen of MOCK_KITCHENS) {
            const meal = kitchen.menu.find((m: any) => m.id === mealId);
            if (meal) return meal.price;
        }
        return 0;
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order #{order.id.slice(-6).toUpperCase()}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <Text style={styles.statusLabel}>Current Status</Text>
                        <Text style={styles.statusTime}>
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                        <Text style={styles.statusTextLarge}>{order.status}</Text>
                    </View>

                    {['Confirmed', 'Preparing', 'Out for Delivery'].includes(order.status) && (
                        <TouchableOpacity style={styles.primaryActionButton} onPress={handleNextStatus}>
                            <Text style={styles.primaryActionText}>
                                {order.status === 'Confirmed' ? 'Start Preparing' :
                                    order.status === 'Preparing' ? 'Mark Ready & Dispatch' :
                                        'Confirm Delivery'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Customer Details */}
                <Text style={styles.sectionTitle}>Customer Details</Text>
                <View style={styles.card}>
                    <View style={styles.detailRow}>
                        <UserIcon size={20} color={Colors.textSecondary} />
                        <Text style={styles.detailText}>{MOCK_USER.name}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Phone size={20} color={Colors.textSecondary} />
                        <Text style={styles.detailText}>{MOCK_USER.phone}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <MapPin size={20} color={Colors.textSecondary} />
                        <Text style={styles.detailText}>Delivery to: {order.deliveryAddressId === 'a1' ? 'Home' : 'Office'}</Text>
                    </View>
                </View>

                {/* Items Ordered */}
                <Text style={styles.sectionTitle}>Order Items</Text>
                <View style={styles.card}>
                    {order.items.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <View style={styles.itemQuantityBadge}>
                                <Text style={styles.itemQuantityText}>{item.quantity}x</Text>
                            </View>
                            <Text style={styles.itemName}>{getMealName(item.mealId)}</Text>
                            <Text style={styles.itemPrice}>₹{getMealPrice(item.mealId) * item.quantity}</Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalAmount}>₹{order.totalAmount}</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentText}>Paid via UPI</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.footerActions}>
                    <TouchableOpacity style={styles.outlineButton}>
                        <Text style={styles.outlineButtonText}>Call Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlineButton}>
                        <Text style={styles.outlineButtonText}>View Address on Map</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Layout.spacing.md,
        paddingTop: Layout.spacing.md,
        paddingBottom: Layout.spacing.md,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        padding: Layout.spacing.sm,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: Layout.spacing.lg,
        marginBottom: Layout.spacing.md,
    },
    statusCard: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.xl,
        padding: Layout.spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: Layout.spacing.md,
    },
    statusLabel: {
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    statusTime: {
        color: Colors.textSecondary,
    },
    statusBadge: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: Layout.borderRadius.lg,
        marginBottom: Layout.spacing.lg,
        width: '100%',
        alignItems: 'center',
    },
    statusTextLarge: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
    },
    primaryActionButton: {
        backgroundColor: Colors.success,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: Layout.borderRadius.md,
        width: '100%',
        alignItems: 'center',
    },
    primaryActionText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Layout.spacing.sm,
    },
    detailText: {
        marginLeft: Layout.spacing.md,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Layout.spacing.sm,
    },
    itemQuantityBadge: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginRight: Layout.spacing.sm,
    },
    itemQuantityText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    itemName: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Layout.spacing.md,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.success,
    },
    paymentRow: {
        alignItems: 'flex-end',
    },
    paymentText: {
        fontSize: 12,
        color: Colors.textSecondary,
        backgroundColor: Colors.background,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    },
    footerActions: {
        marginTop: Layout.spacing.xl,
        gap: Layout.spacing.md,
        paddingBottom: Layout.spacing.xl,
    },
    outlineButton: {
        paddingVertical: 14,
        borderRadius: Layout.borderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        backgroundColor: Colors.surface,
    },
    outlineButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.textPrimary,
    }
});
