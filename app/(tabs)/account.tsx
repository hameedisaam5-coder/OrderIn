import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { User, MapPin, CreditCard, Heart, LogOut, ChevronRight, Settings, ShoppingBag, ChevronUp, ChevronDown } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';
import { MOCK_USER, SUBSCRIPTION_PLANS, MOCK_KITCHENS } from '../../src/services/mockData';
import { useOrders } from '../../src/context/OrderContext';

import { useAppMode } from '../../src/context/AppModeContext';

export default function AccountScreen() {
    const router = useRouter();
    const [careMode, setCareMode] = useState(false);
    const { orders } = useOrders();
    const [showOrders, setShowOrders] = useState(false);
    const { isSellerMode, setIsSellerMode } = useAppMode();

    const getKitchenName = (id: string) => {
        const k = MOCK_KITCHENS.find(k => k.id === id);
        return k ? k.name : 'Unknown Kitchen';
    };

    const handleLogout = () => {
        router.replace('/(auth)/welcome');
    };

    const handleSellerToggle = (value: boolean) => {
        setIsSellerMode(value);
        if (value) {
            router.replace('/(seller)');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <LinearGradient
                colors={[Colors.primary, Colors.primaryLight]}
                style={styles.heroHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }]} pointerEvents="none">
                    <Text style={[styles.doodle, { top: 20, left: 10, fontSize: 80, transform: [{ rotate: '-15deg' }] }]}>👤</Text>
                    <Text style={[styles.doodle, { top: 30, right: 30, fontSize: 60, transform: [{ rotate: '25deg' }] }]}>✨</Text>
                </View>
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Account</Text>
                        <TouchableOpacity>
                            <Settings size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content} bounces={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{MOCK_USER.name[0]}</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{MOCK_USER.name}</Text>
                        <Text style={styles.userPhone}>{MOCK_USER.phone}</Text>
                        <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
                    </View>
                </View>

                {/* Care Mode Section */}
                <View style={[styles.section, styles.careModeSection]}>
                    <View style={styles.careHeader}>
                        <View style={styles.careTitleRow}>
                            <Heart size={20} color={Colors.accent} fill={Colors.accent} />
                            <Text style={styles.careTitle}>Care Mode</Text>
                        </View>
                        <Switch
                            value={careMode}
                            onValueChange={setCareMode}
                            trackColor={{ false: Colors.border, true: Colors.accent }}
                            thumbColor={Colors.white}
                        />
                    </View>
                    <Text style={styles.careDesc}>
                        Optimized interface for ordering meals for your parents.
                    </Text>
                    {careMode && (
                        <View style={styles.careActiveBadge}>
                            <Text style={styles.careActiveText}>ACTIVE: Delivering to Parents</Text>
                        </View>
                    )}
                </View>

                {/* Business Settings Section */}
                <View style={[styles.section, { backgroundColor: '#F0FDF4', borderColor: Colors.success }]}>
                    <View style={styles.careHeader}>
                        <View style={styles.careTitleRow}>
                            <ShoppingBag size={20} color={Colors.success} />
                            <Text style={[styles.careTitle, { color: Colors.success }]}>Business Settings</Text>
                        </View>
                        <Switch
                            value={isSellerMode}
                            onValueChange={handleSellerToggle}
                            trackColor={{ false: Colors.border, true: Colors.success }}
                            thumbColor={Colors.white}
                        />
                    </View>
                    <Text style={styles.careDesc}>
                        Switch to Seller Mode to manage your kitchen, menu, and orders.
                    </Text>
                </View>

                {/* Menu Options */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => setShowOrders(!showOrders)}>
                        <View style={styles.menuIcon}>
                            <ShoppingBag size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.menuLabel}>Order History</Text>
                        {showOrders ?
                            <ChevronUp size={20} color={Colors.textSecondary} /> :
                            <ChevronDown size={20} color={Colors.textSecondary} />
                        }
                    </TouchableOpacity>

                    {showOrders && (
                        <View style={styles.historyContainer}>
                            {orders.length === 0 ? (
                                <Text style={styles.emptyHistory}>No orders yet</Text>
                            ) : (
                                orders.map(order => (
                                    <TouchableOpacity
                                        key={order.id}
                                        style={styles.historyItem}
                                        onPress={() => router.push(`/tracking/${order.id}`)}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.historyKitchen}>{getKitchenName(order.kitchenId)}</Text>
                                            <Text style={styles.historyDate}>
                                                {new Date(order.createdAt).toLocaleDateString()} • ₹{order.totalAmount}
                                            </Text>
                                        </View>
                                        <Text style={[styles.historyStatus, { color: order.status === 'Delivered' ? Colors.success : Colors.accent }]}>
                                            {order.status}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <CreditCard size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.menuLabel}>My Subscriptions</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <MapPin size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.menuLabel}>Saved Addresses</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuLabel}>Help & Support</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuLabel}>Terms & Privacy</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut size={20} color={Colors.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Version 1.0.0</Text>
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
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        marginBottom: Layout.spacing.md,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    doodle: {
        position: 'absolute',
        opacity: 0.35,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        padding: Layout.spacing.lg,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Layout.spacing.lg,
        borderRadius: Layout.borderRadius.lg,
        marginBottom: Layout.spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Layout.spacing.md,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    userPhone: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    section: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.md,
        marginBottom: Layout.spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    careModeSection: {
        backgroundColor: '#FFF7ED', // Light orange tint
        borderColor: Colors.accent,
    },
    careHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    careTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    careTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.accent,
    },
    careDesc: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    careActiveBadge: {
        backgroundColor: Colors.accent,
        padding: 8,
        borderRadius: Layout.borderRadius.sm,
        alignItems: 'center',
    },
    careActiveText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.background,
    },
    menuIcon: {
        width: 32,
        alignItems: 'flex-start',
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        color: Colors.textPrimary,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.lg,
        backgroundColor: '#FEE2E2', // Light red
        marginBottom: Layout.spacing.lg,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.error,
    },
    versionText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        fontSize: 12,
    },
    historyContainer: {
        backgroundColor: Colors.background,
        padding: Layout.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    historyKitchen: {
        fontWeight: 'bold',
        color: Colors.textPrimary,
        fontSize: 14,
    },
    historyDate: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    historyStatus: {
        fontSize: 12,
        fontWeight: '600',
    },
    emptyHistory: {
        padding: 16,
        textAlign: 'center',
        color: Colors.textSecondary,
    }
});
