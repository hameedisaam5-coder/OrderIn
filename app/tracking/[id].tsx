import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Check, ArrowLeft, MapPin } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import { useOrders } from '../../src/context/OrderContext';
import { MOCK_KITCHENS } from '../../src/services/mockData';

export default function OrderTrackingScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { orders } = useOrders();

    const order = orders.find(o => o.id === id);

    if (!order) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Order Not Found</Text>
                    <View style={{ width: 24 }} />
                </View>
            </View>
        );
    }

    const statuses = ['Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(order.status);

    const steps = statuses.map((status, index) => {
        let state = 'pending';
        if (index < currentStatusIndex || order.status === 'Delivered') state = 'completed';
        if (index === currentStatusIndex && order.status !== 'Delivered') state = 'active';

        return {
            label: status,
            status: state,
            time: state === 'completed' || state === 'active' ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'
        };
    });

    const getIconColor = (status: string) => {
        if (status === 'completed') return Colors.success;
        if (status === 'active') return Colors.accent;
        return Colors.border;
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
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/account')}>
                    <ArrowLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Order #{order.id.slice(-6).toUpperCase()}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Map Placeholder */}
                <View style={styles.mapPlaceholder}>
                    <MapPin size={40} color={Colors.primary} />
                    <Text style={styles.mapText}>Live Tracking Map Visualization</Text>
                </View>

                {/* Timeline */}
                <View style={styles.timelineContainer}>
                    {steps.map((step, index) => (
                        <View key={index} style={styles.timelineRow}>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>{step.time}</Text>
                            </View>
                            <View style={styles.timelineGraphics}>
                                <View style={[
                                    styles.dot,
                                    { backgroundColor: getIconColor(step.status) }
                                ]}>
                                    {step.status === 'completed' && <Check size={12} color={Colors.white} />}
                                </View>
                                {index < steps.length - 1 && (
                                    <View style={[
                                        styles.line,
                                        { backgroundColor: step.status === 'completed' ? Colors.success : Colors.border }
                                    ]} />
                                )}
                            </View>
                            <View style={styles.statusContainer}>
                                <Text style={[
                                    styles.statusText,
                                    step.status === 'active' && styles.activeStatusText
                                ]}>{step.label}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Order Summary Stub */}
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Item Details</Text>
                    {order.items.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                            <Text style={styles.itemQuantityBadge}>{item.quantity}x</Text>
                            <Text style={styles.itemName}>{getMealName(item.mealId)}</Text>
                            <Text style={styles.itemPrice}>₹{getMealPrice(item.mealId) * item.quantity}</Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalText}>Total</Text>
                        <Text style={styles.totalPrice}>₹{order.totalAmount}</Text>
                    </View>
                </View>

            </ScrollView>

            {order.status !== 'Delivered' && (
                <View style={styles.footer}>
                    <Text style={styles.etaText}>Estimated Arrival: 30 mins</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    mapPlaceholder: {
        height: 200,
        backgroundColor: '#E5E7EB',
        borderRadius: Layout.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Layout.spacing.xl,
    },
    mapText: {
        marginTop: 8,
        color: Colors.textSecondary,
    },
    timelineContainer: {
        marginBottom: Layout.spacing.xl,
    },
    timelineRow: {
        flexDirection: 'row',
        height: 60,
    },
    timeContainer: {
        width: 70,
        alignItems: 'flex-end',
        paddingRight: 12,
    },
    timeText: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    timelineGraphics: {
        alignItems: 'center',
        width: 24,
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: Colors.border,
        marginVertical: 4,
    },
    statusContainer: {
        flex: 1,
        paddingLeft: 12,
    },
    statusText: {
        fontSize: 16,
        color: Colors.textPrimary,
    },
    activeStatusText: {
        fontWeight: 'bold',
        color: Colors.primary,
    },
    summaryContainer: {
        backgroundColor: Colors.surface,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.md,
    },
    summaryTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    itemQuantityBadge: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginRight: 8,
        fontSize: 12,
        fontWeight: 'bold',
    },
    itemName: {
        flex: 1,
        fontSize: 14,
        color: Colors.textPrimary,
    },
    itemPrice: {
        fontSize: 14,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 8,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalText: {
        fontWeight: 'bold',
    },
    totalPrice: {
        fontWeight: 'bold',
        color: Colors.primary,
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.primary,
        alignItems: 'center',
    },
    etaText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    }
});
