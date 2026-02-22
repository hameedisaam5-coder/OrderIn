import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Plus, Check, MapPin, PauseCircle, PlayCircle } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';
import { useSubscription } from '../../src/context/SubscriptionContext';
import { SUBSCRIPTION_PLANS, MOCK_KITCHENS } from '../../src/services/mockData';

// Available add-ons across the platform to add to generic subscriptions
const AVAILABLE_ADDONS = [
    { id: 'a1', name: 'Extra Paneer', price: 40 },
    { id: 'a2', name: 'Curd / Yogurt', price: 20 },
    { id: 'a3', name: 'Side Salad', price: 15 },
    { id: 'a11', name: 'Boiled Eggs (2)', price: 30 },
];

export default function ManageSubscriptionScreen() {
    const router = useRouter();
    const { state, toggleActiveSubscriptionStatus, updateActiveSubscriptionAddons } = useSubscription();
    const activeSubscription = state.activeSubscription;

    // Use local state before saving if we wanted a "save changes" form,
    // but we can also just apply them directly. We'll use local state to track add-on selection
    const [selectedAddons, setSelectedAddons] = useState<string[]>(
        activeSubscription?.customization?.addons || []
    );

    if (!activeSubscription) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.header, { paddingHorizontal: 16 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <ChevronLeft color={Colors.textPrimary} size={28} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Manage Plan</Text>
                    <View style={{ width: 28 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: Colors.textSecondary }}>No active plan to manage.</Text>
                </View>
            </SafeAreaView>
        );
    }

    const isActive = activeSubscription.status === 'active';
    const activePlan = SUBSCRIPTION_PLANS.find(p => p.id === activeSubscription.planId);

    const handleToggleAddon = (id: string) => {
        setSelectedAddons(prev => {
            if (prev.includes(id)) {
                return prev.filter(a => a !== id);
            }
            return [...prev, id];
        });
    };

    const handleSaveChanges = () => {
        updateActiveSubscriptionAddons(selectedAddons);
        Alert.alert("Success", "Your add-ons have been updated.");
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft color={Colors.textPrimary} size={28} />
                </TouchableOpacity>
                <Text style={styles.title}>Manage Settings</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Status Card */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Current Status</Text>
                    <View style={styles.statusCard}>
                        <View style={styles.statusInfo}>
                            <Text style={styles.planName}>{activePlan?.name || 'Subscription'}</Text>
                            <View style={[styles.statusBadge, { backgroundColor: isActive ? Colors.success : Colors.warning }]}>
                                <Text style={styles.statusText}>{activeSubscription.status.toUpperCase()}</Text>
                            </View>
                        </View>
                        <Text style={styles.dateText}>
                            Started: {new Date(activeSubscription.startDate).toLocaleDateString()}
                        </Text>

                        <View style={styles.divider} />

                        <TouchableOpacity
                            style={[styles.pauseResumeBtn, { backgroundColor: isActive ? Colors.warning + '20' : Colors.success + '20' }]}
                            onPress={toggleActiveSubscriptionStatus}
                        >
                            {isActive ? (
                                <PauseCircle size={20} color={Colors.warning} />
                            ) : (
                                <PlayCircle size={20} color={Colors.success} />
                            )}
                            <Text style={[styles.pauseResumeText, { color: isActive ? Colors.warning : Colors.success }]}>
                                {isActive ? 'Pause Delivery' : 'Resume Delivery'}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.helperText}>
                            {isActive ? 'Pausing will temporarily stop daily deliveries without cancelling your plan.' : 'Resuming will instantly restart daily deliveries to your saved address.'}
                        </Text>
                    </View>
                </View>

                {/* Manage Addons Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Daily Add-ons</Text>
                    <Text style={styles.sectionDesc}>Select items you want added to every meal delivery.</Text>

                    <View style={styles.card}>
                        {AVAILABLE_ADDONS.map((addon) => {
                            const isSelected = selectedAddons.includes(addon.id);
                            return (
                                <TouchableOpacity
                                    key={addon.id}
                                    style={styles.addonRow}
                                    onPress={() => handleToggleAddon(addon.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.addonInfo}>
                                        <Text style={styles.addonName}>{addon.name}</Text>
                                        <Text style={styles.addonPrice}>+₹{addon.price}/day</Text>
                                    </View>
                                    <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                                        {isSelected && <Check size={14} color={Colors.white} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Save Changes"
                    onPress={handleSaveChanges}
                />
            </View>
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
        paddingHorizontal: Layout.spacing.lg,
        paddingVertical: Layout.spacing.md,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backBtn: {
        padding: 4,
        marginLeft: -4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    content: {
        padding: Layout.spacing.lg,
        paddingBottom: 40,
    },
    section: {
        marginBottom: Layout.spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    sectionDesc: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 12,
    },
    statusCard: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.xl,
        padding: Layout.spacing.lg,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statusInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    planName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: Layout.borderRadius.sm,
    },
    statusText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 16,
    },
    pauseResumeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: Layout.borderRadius.lg,
        marginBottom: 12,
    },
    pauseResumeText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    helperText: {
        fontSize: 13,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.xl,
        padding: Layout.spacing.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    addonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Layout.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    addonInfo: {
        flex: 1,
    },
    addonName: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    addonPrice: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    }
});
