import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import { useOrders } from '../../src/context/OrderContext';
import { MOCK_KITCHENS } from '../../src/services/mockData';
import { Clock, CheckCircle2, ChevronRight, PackageCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SellerOrdersScreen() {
    const { orders, updateOrderStatus } = useOrders();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

    // Filter orders based on status
    const activeOrders = orders.filter(o => ['Confirmed', 'Preparing', 'Out for Delivery'].includes(o.status));
    const pastOrders = orders.filter(o => ['Delivered', 'Cancelled'].includes(o.status));

    const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders;

    const getKitchenName = (kitchenId: string) => {
        return MOCK_KITCHENS.find(k => k.id === kitchenId)?.name || 'Order';
    };

    const handleNextStatus = (orderId: string, currentStatus: string) => {
        let nextStatus: any = 'Delivered';
        if (currentStatus === 'Confirmed') nextStatus = 'Preparing';
        else if (currentStatus === 'Preparing') nextStatus = 'Out for Delivery';
        else if (currentStatus === 'Out for Delivery') nextStatus = 'Delivered';

        updateOrderStatus(orderId, nextStatus);
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

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Order Queue</Text>

                {/* Custom Tab Bar */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'active' && styles.activeTab]}
                        onPress={() => setActiveTab('active')}
                    >
                        <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active ({activeOrders.length})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'past' && styles.activeTab]}
                        onPress={() => setActiveTab('past')}
                    >
                        <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past ({pastOrders.length})</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content} bounces={false}>
                {displayedOrders.length === 0 ? (
                    <View style={styles.emptyState}>
                        <PackageCheck size={48} color={Colors.border} />
                        <Text style={styles.emptyTitle}>No {activeTab} orders left!</Text>
                        <Text style={styles.emptyDesc}>You're all caught up.</Text>
                    </View>
                ) : (
                    displayedOrders.map(order => (
                        <TouchableOpacity
                            key={order.id}
                            style={styles.orderCard}
                            onPress={() => router.push(`/(seller)/order/${order.id}`)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.orderHeader}>
                                <View>
                                    <Text style={styles.orderId}>#{order.id.slice(-6).toUpperCase()}</Text>
                                    <Text style={styles.orderTime}>
                                        <Clock size={12} color={Colors.textSecondary} style={{ marginRight: 4 }} />
                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </View>
                                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.orderDetails}>
                                <Text style={styles.customerName}>Amount: ₹{order.totalAmount}</Text>
                                <Text style={styles.itemsCount}>{order.items.length} Item(s) from {getKitchenName(order.kitchenId)}</Text>
                            </View>

                            {activeTab === 'active' && (
                                <View style={styles.actionContainer}>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={(e) => {
                                            e.stopPropagation(); // prevent navigation when clicking the action button
                                            handleNextStatus(order.id, order.status);
                                        }}
                                    >
                                        <Text style={styles.actionButtonText}>
                                            {order.status === 'Confirmed' ? 'Start Preparing' :
                                                order.status === 'Preparing' ? 'Mark Ready & Dispatch' :
                                                    'Mark as Delivered'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))
                )}
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
        paddingHorizontal: Layout.spacing.lg,
        paddingTop: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.md,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: -1, // Overlap border
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: Colors.success,
    },
    tabText: {
        fontSize: 16,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    activeTabText: {
        color: Colors.success,
        fontWeight: 'bold',
    },
    content: {
        padding: Layout.spacing.lg,
    },
    emptyState: {
        padding: Layout.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: Layout.spacing.md,
    },
    emptyDesc: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    orderCard: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Layout.spacing.md,
        marginBottom: Layout.spacing.md,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    orderTime: {
        fontSize: 12,
        color: Colors.textSecondary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: Layout.borderRadius.sm,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Layout.spacing.md,
    },
    orderDetails: {
        marginBottom: Layout.spacing.md,
    },
    customerName: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    itemsCount: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    actionContainer: {
        marginTop: Layout.spacing.sm,
    },
    actionButton: {
        backgroundColor: Colors.success,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.md,
        alignItems: 'center',
    },
    actionButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
