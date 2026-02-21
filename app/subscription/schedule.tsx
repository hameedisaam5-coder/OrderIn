import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Check, ChevronRight, ChevronLeft, MapPin } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';
import { useSubscription } from '../../src/context/SubscriptionContext';
import { MOCK_USER } from '../../src/services/mockData';

export default function ScheduleScreen() {
    const router = useRouter();
    const { state, setSchedule } = useSubscription();

    const handleContinue = () => {
        router.push('/subscription/preferences');
    };

    const activeMealTypes = state.mealTypes;
    // If "Combo" is selected, show all three slots, else show selected slots
    const slotsToShow = activeMealTypes.includes('Combo')
        ? ['Breakfast', 'Lunch', 'Dinner']
        : ['Breakfast', 'Lunch', 'Dinner'].filter(type => activeMealTypes.includes(type));

    const getSlotKey = (label: string): 'morning' | 'afternoon' | 'night' => {
        if (label === 'Breakfast') return 'morning';
        if (label === 'Lunch') return 'afternoon';
        return 'night';
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Scheduler</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.stepIndicator}>
                <View style={[styles.stepDot, styles.completedDot]} />
                <View style={[styles.stepLine, styles.completedLine]} />
                <View style={[styles.stepDot, styles.completedDot]} />
                <View style={[styles.stepLine, styles.completedLine]} />
                <View style={[styles.stepDot, styles.activeDot]} />
                <View style={styles.stepLine} />
                <View style={styles.stepDot} />
            </View>

            <Text style={styles.stepTitle}>Step 3: Delivery Schedule</Text>
            <Text style={styles.stepSubtitle}>Where should we deliver each meal?</Text>

            <ScrollView contentContainerStyle={styles.content}>
                {slotsToShow.map((slotLabel) => {
                    const slotKey = getSlotKey(slotLabel);
                    const selectedAddressId = state.schedule[slotKey];

                    return (
                        <View key={slotLabel} style={styles.slotContainer}>
                            <Text style={styles.slotTitle}>{slotLabel}</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.addressList}>
                                {MOCK_USER.addresses.map((address) => (
                                    <TouchableOpacity
                                        key={address.id}
                                        style={[styles.addressCard, selectedAddressId === address.id && styles.selectedCard]}
                                        onPress={() => setSchedule(slotKey, address.id)}
                                    >
                                        <View style={styles.addressHeader}>
                                            <MapPin size={14} color={selectedAddressId === address.id ? Colors.white : Colors.textSecondary} />
                                            <Text style={[styles.addressLabel, selectedAddressId === address.id && styles.selectedText]}>{address.label}</Text>
                                        </View>
                                        <Text
                                            style={[styles.addressText, selectedAddressId === address.id && styles.selectedText]}
                                            numberOfLines={2}
                                        >
                                            {address.fullAddress}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={[styles.addressCard, styles.addAddressCard]}>
                                    <Text style={styles.addText}>+ New</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    // Check if all displayed slots have an address selected
                    disabled={!slotsToShow.every(label => state.schedule[getSlotKey(label)])}
                    size="lg"
                    icon={<ChevronRight color={Colors.white} size={20} />}
                    style={{ flexDirection: 'row-reverse' }}
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
    header: {
        padding: Layout.spacing.lg,
        paddingTop: Layout.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    stepIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Layout.spacing.xl,
        marginBottom: Layout.spacing.lg,
    },
    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.border,
    },
    activeDot: {
        backgroundColor: Colors.primary,
        transform: [{ scale: 1.2 }],
        borderWidth: 2,
        borderColor: Colors.background,
    },
    completedDot: {
        backgroundColor: Colors.success,
    },
    stepLine: {
        flex: 1,
        height: 2,
        backgroundColor: Colors.border,
        marginHorizontal: 4,
    },
    completedLine: {
        backgroundColor: Colors.success,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginLeft: Layout.spacing.lg,
    },
    stepSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginLeft: Layout.spacing.lg,
        marginBottom: Layout.spacing.md,
    },
    content: {
        padding: Layout.spacing.lg,
        gap: Layout.spacing.xl,
    },
    slotContainer: {

    },
    slotTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: Layout.spacing.sm,
        color: Colors.primary,
    },
    addressList: {
        gap: Layout.spacing.sm,
    },
    addressCard: {
        width: 150,
        height: 100,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Layout.borderRadius.md,
        padding: Layout.spacing.sm,
        backgroundColor: Colors.surface,
    },
    selectedCard: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 4,
    },
    addressLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    addressText: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    selectedText: {
        color: Colors.white,
    },
    addAddressCard: {
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
});
