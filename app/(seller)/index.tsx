import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Package, Clock, Bell, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
// Import orders if we want to show real data, for now we will use derived mock stats
import { useOrders } from '../../src/context/OrderContext';

export default function SellerDashboardScreen() {
    const [isOnline, setIsOnline] = useState(true);
    const router = useRouter();
    const { orders } = useOrders();

    // Mock stats
    const todayRevenue = 4250;
    const activeOrders = orders.filter(o => o.status === 'Preparing').length;
    const newOrders = 2; // Mock incoming

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.success, '#166534']} // Darker green gradient
                style={styles.heroHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={styles.greeting}>Hello, Partner</Text>
                            <Text style={styles.kitchenName}>Sharma Ji Home Kitchen</Text>
                        </View>
                        <View style={styles.statusToggle}>
                            <Text style={styles.statusText}>{isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
                            <Switch
                                value={isOnline}
                                onValueChange={setIsOnline}
                                trackColor={{ false: 'rgba(255,255,255,0.3)', true: 'rgba(255,255,255,0.8)' }}
                                thumbColor={isOnline ? Colors.success : Colors.white}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content} bounces={false}>

                {/* Pending Actions Alert */}
                {newOrders > 0 && isOnline && (
                    <TouchableOpacity
                        style={styles.alertCard}
                        onPress={() => router.push('/(seller)/orders')}
                    >
                        <View style={styles.alertIconBg}>
                            <Bell size={20} color={Colors.white} />
                        </View>
                        <View style={styles.alertTextContainer}>
                            <Text style={styles.alertTitle}>New Orders Waiting</Text>
                            <Text style={styles.alertDesc}>You have {newOrders} orders to accept.</Text>
                        </View>
                        <ChevronRight size={20} color={Colors.accent} />
                    </TouchableOpacity>
                )}

                <Text style={styles.sectionTitle}>Today's Overview</Text>

                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <View style={[styles.statIconBg, { backgroundColor: '#ECFDF5' }]}>
                            <TrendingUp size={24} color={Colors.success} />
                        </View>
                        <Text style={styles.statValue}>₹{todayRevenue}</Text>
                        <Text style={styles.statLabel}>Revenue</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.statIconBg, { backgroundColor: '#EFF6FF' }]}>
                            <Package size={24} color={Colors.primary} />
                        </View>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Delivered</Text>
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <View style={[styles.statIconBg, { backgroundColor: '#FFF7ED' }]}>
                            <Clock size={24} color={Colors.warning} />
                        </View>
                        <Text style={styles.statValue}>{activeOrders}</Text>
                        <Text style={styles.statLabel}>Preparing</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.statIconBg, { backgroundColor: '#F5F3FF' }]}>
                            <Package size={24} color={Colors.secondary} />
                        </View>
                        <Text style={styles.statValue}>4</Text>
                        <Text style={styles.statLabel}>Active Subs</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(seller)/menu')}>
                        <Text style={styles.actionButtonText}>Manage Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.actionButtonOutline]} onPress={() => router.push('/(seller)/profile')}>
                        <Text style={[styles.actionButtonText, { color: Colors.success }]}>View Payouts</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    heroHeader: {
        paddingHorizontal: Layout.spacing.lg,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Layout.spacing.md,
    },
    greeting: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
    },
    kitchenName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
    },
    statusToggle: {
        alignItems: 'center',
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 4,
        letterSpacing: 1,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    alertCard: {
        backgroundColor: '#FFF1F2',
        borderWidth: 1,
        borderColor: '#FECDD3',
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Layout.spacing.xl,
    },
    alertIconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.spacing.md,
    },
    alertTextContainer: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    alertDesc: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.md,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: Layout.spacing.md,
        marginBottom: Layout.spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'flex-start',
    },
    statIconBg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Layout.spacing.md,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    actionsContainer: {
        gap: Layout.spacing.md,
    },
    actionButton: {
        backgroundColor: Colors.success,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.md,
        alignItems: 'center',
    },
    actionButtonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.success,
    },
    actionButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
