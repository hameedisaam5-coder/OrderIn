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
import { MOCK_USER, SUBSCRIPTION_PLANS, MOCK_KITCHENS, MOCK_SUBSCRIPTIONS } from '../../src/services/mockData';
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
        setShowBusinessOptions(value);
        if (!value && isSellerMode) {
            setIsSellerMode(false);
        }
    };

    const [showBusinessOptions, setShowBusinessOptions] = useState(false);
    const [showSubscriptions, setShowSubscriptions] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [activeSubscriptions, setActiveSubscriptions] = useState(MOCK_SUBSCRIPTIONS);

    const handleTogglePause = (subId: string) => {
        setActiveSubscriptions(prev => prev.map(sub => {
            if (sub.id === subId) {
                return { ...sub, status: sub.status === 'active' ? 'paused' : 'active' };
            }
            return sub;
        }));
    };

    const isExpiringSoon = (endDateStr: string) => {
        const endDate = new Date(endDateStr);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 && diffDays <= 3;
    };

    const getSubscriptionPlanName = (planId: string) => {
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
        return plan ? plan.name : 'Subscription';
    };

    const getKitchenNameForSub = (subId: string) => {
        return 'Healthy Meals'; // We could implement a direct lookup based on the user's kitchen choice if the model allowed, but for the mock display this is sufficient
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
                            value={showBusinessOptions}
                            onValueChange={handleSellerToggle}
                            trackColor={{ false: Colors.border, true: Colors.success }}
                            thumbColor={Colors.white}
                        />
                    </View>
                    <Text style={styles.careDesc}>
                        Manage your kitchen or register a new business.
                    </Text>

                    {showBusinessOptions && (
                        <View style={styles.businessOptionsContainer}>
                            <TouchableOpacity style={styles.businessActionButton} onPress={() => { setIsSellerMode(true); router.replace('/(seller)'); }}>
                                <Text style={styles.businessActionButtonText}>Business Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.businessActionButton, styles.businessActionButtonOutline]} onPress={() => router.push('/business-registration')}>
                                <Text style={[styles.businessActionButtonText, { color: Colors.success }]}>New Business Registration</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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

                    <TouchableOpacity style={styles.menuItem} onPress={() => setShowSubscriptions(!showSubscriptions)}>
                        <View style={styles.menuIcon}>
                            <CreditCard size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.menuLabel}>My Subscriptions</Text>
                        {showSubscriptions ?
                            <ChevronUp size={20} color={Colors.textSecondary} /> :
                            <ChevronDown size={20} color={Colors.textSecondary} />
                        }
                    </TouchableOpacity>

                    {showSubscriptions && (
                        <View style={styles.historyContainer}>
                            {activeSubscriptions.length === 0 ? (
                                <Text style={styles.emptyHistory}>No active subscriptions</Text>
                            ) : (
                                activeSubscriptions.map(sub => {
                                    const expiring = isExpiringSoon(sub.endDate);
                                    const isActive = sub.status === 'active';
                                    return (
                                        <View key={sub.id} style={styles.historyItem}>
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', opacity: isActive ? 1 : 0.6 }}
                                            >
                                                <View style={{ flex: 1 }}>
                                                    <Text style={styles.historyKitchen}>{getSubscriptionPlanName(sub.planId)}</Text>
                                                    <Text style={styles.historyDate}>
                                                        {new Date(sub.startDate).toLocaleDateString()} - {new Date(sub.endDate).toLocaleDateString()}
                                                    </Text>
                                                    {sub.customization?.base ? (
                                                        <Text style={[styles.historyDate, { marginTop: 4 }]}>
                                                            Base: {sub.customization.base} • Add-ons: {sub.customization.addons.length}
                                                        </Text>
                                                    ) : null}
                                                </View>
                                                <View style={{ alignItems: 'flex-end' }}>
                                                    <Text style={[styles.historyStatus, { color: isActive ? Colors.success : Colors.warning, marginBottom: 8 }]}>
                                                        {sub.status.toUpperCase()}
                                                    </Text>
                                                    <TouchableOpacity
                                                        onPress={() => handleTogglePause(sub.id)}
                                                        style={{
                                                            backgroundColor: isActive ? Colors.warning : Colors.success,
                                                            paddingHorizontal: 12,
                                                            paddingVertical: 6,
                                                            borderRadius: 16,
                                                        }}
                                                    >
                                                        <Text style={{ color: Colors.white, fontSize: 12, fontWeight: 'bold' }}>
                                                            {isActive ? 'Pause' : 'Resume'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>

                                            {isActive && expiring && (
                                                <View style={{
                                                    marginTop: 12,
                                                    padding: 10,
                                                    backgroundColor: '#FFF3CD',
                                                    borderRadius: 8,
                                                    borderWidth: 1,
                                                    borderColor: '#FFEEBA',
                                                }}>
                                                    <Text style={{ color: '#856404', fontSize: 13, fontWeight: '500' }}>
                                                        ⚠️ Your subscription ends in {Math.ceil((new Date(sub.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days. Renew now to keep your meals coming!
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    );
                                })
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <MapPin size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.menuLabel}>Saved Addresses</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => setShowHelp(!showHelp)}>
                        <View style={styles.menuIcon}>
                            <Heart size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.menuLabel}>Help & Support</Text>
                        {showHelp ?
                            <ChevronUp size={20} color={Colors.textSecondary} /> :
                            <ChevronDown size={20} color={Colors.textSecondary} />
                        }
                    </TouchableOpacity>

                    {showHelp && (
                        <View style={styles.contactContainer}>
                            <Text style={styles.contactTitle}>Reach out to us anytime!</Text>
                            <Text style={styles.contactText}>📧 support@mealmate.in</Text>
                            <Text style={styles.contactText}>📞 +91 9952886136</Text>
                        </View>
                    )}

                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/terms')}>
                        <View style={styles.menuIcon}>
                            <Settings size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.menuLabel}>Terms & Privacy</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut size={20} color={Colors.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Version 1.0.0</Text>
            </ScrollView >
        </View >
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
    },
    contactContainer: {
        backgroundColor: Colors.background,
        padding: Layout.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        alignItems: 'center',
    },
    contactTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.sm,
    },
    contactText: {
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 4,
        fontWeight: '500',
    },
    businessOptionsContainer: {
        marginTop: Layout.spacing.md,
        borderTopWidth: 1,
        borderTopColor: 'rgba(32, 191, 107, 0.2)',
        paddingTop: Layout.spacing.md,
        gap: Layout.spacing.sm,
    },
    businessActionButton: {
        backgroundColor: Colors.success,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.md,
        alignItems: 'center',
    },
    businessActionButtonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.success,
    },
    businessActionButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
