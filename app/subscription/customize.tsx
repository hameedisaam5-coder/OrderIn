import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';
import { useSubscription } from '../../src/context/SubscriptionContext';

// Mocking options since this is normally derived from the Kitchen/Meal being subscribed to.
// In a full DB model, these would come from the `Meal` record selected previously.
const MOCK_CUSTOMIZATION_OPTIONS = {
    bases: ['White Rice', 'Brown Rice', 'Roti', 'Chapati'],
    portions: ['Regular', 'Large', 'Slim'],
    addons: [
        { id: 'a1', name: 'Extra Paneer', price: 40 },
        { id: 'a2', name: 'Curd', price: 20 },
        { id: 'a3', name: 'Salad', price: 15 },
        { id: 'a4', name: 'Papad', price: 10 }
    ]
};

export default function CustomizeScreen() {
    const router = useRouter();
    const { state, setCustomization } = useSubscription();

    // Local state to manage selections before saving to context
    const [selectedBase, setSelectedBase] = useState<string>(state.customization.base || MOCK_CUSTOMIZATION_OPTIONS.bases[0]);
    const [selectedPortion, setSelectedPortion] = useState<string>(state.customization.portion || MOCK_CUSTOMIZATION_OPTIONS.portions[0]);
    const [selectedAddons, setSelectedAddons] = useState<string[]>(state.customization.addons || []);
    const [instructions, setInstructions] = useState<string>(state.customization.instructions || '');

    const toggleAddon = (id: string) => {
        if (selectedAddons.includes(id)) {
            setSelectedAddons(selectedAddons.filter((a) => a !== id));
        } else {
            setSelectedAddons([...selectedAddons, id]);
        }
    };

    const handleContinue = () => {
        // Save to context
        setCustomization({
            base: selectedBase,
            portion: selectedPortion,
            addons: selectedAddons,
            instructions: instructions
        });
        // Next step in wizard
        router.push('/subscription/schedule');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Customize Meal</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Step Indicator (Modified from meals component) */}
            <View style={styles.stepIndicator}>
                <View style={[styles.stepDot, styles.completedDot]} />
                <View style={[styles.stepLine, styles.completedLine]} />
                <View style={[styles.stepDot, styles.completedDot]} />
                <View style={[styles.stepLine, styles.completedLine]} />
                <View style={[styles.stepDot, styles.activeDot]} /> {/* We are here now */}
                <View style={styles.stepLine} />
                <View style={styles.stepDot} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.stepTitle}>Step 3: Customize Daily Meals</Text>
                <Text style={styles.stepSubtitle}>Tailor your subscription to your precise needs.</Text>

                {/* Base Choice */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Base Preference</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillContainer}>
                        {MOCK_CUSTOMIZATION_OPTIONS.bases.map(base => (
                            <TouchableOpacity
                                key={base}
                                style={[styles.pill, selectedBase === base && styles.pillSelected]}
                                onPress={() => setSelectedBase(base)}
                            >
                                <Text style={[styles.pillText, selectedBase === base && styles.pillTextSelected]}>{base}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Portion Size */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Portion Size</Text>
                    <View style={styles.pillContainerWrapper}>
                        {MOCK_CUSTOMIZATION_OPTIONS.portions.map(portion => (
                            <TouchableOpacity
                                key={portion}
                                style={[styles.pillCard, selectedPortion === portion && styles.pillCardSelected]}
                                onPress={() => setSelectedPortion(portion)}
                            >
                                <Text style={[styles.pillText, selectedPortion === portion && styles.pillTextSelected]}>{portion}</Text>
                                {selectedPortion === portion && <Check size={16} color={Colors.primary} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Daily Add-ons */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Daily Add-ons</Text>
                    <Text style={styles.sectionSubtitle}>These will be added to every delivery (Extra cost applies)</Text>

                    {MOCK_CUSTOMIZATION_OPTIONS.addons.map(addon => {
                        const isSelected = selectedAddons.includes(addon.id);
                        return (
                            <TouchableOpacity
                                key={addon.id}
                                style={[styles.addonRow, isSelected && styles.addonRowSelected]}
                                onPress={() => toggleAddon(addon.id)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                    {isSelected && <Check size={14} color="white" />}
                                </View>
                                <Text style={styles.addonName}>{addon.name}</Text>
                                <Text style={styles.addonPrice}>+₹{addon.price}/day</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Special Instructions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cooking Instructions</Text>
                    <TextInput
                        style={styles.instructionInput}
                        placeholder="E.g., Less spicy, no onions..."
                        multiline
                        numberOfLines={3}
                        value={instructions}
                        onChangeText={setInstructions}
                        textAlignVertical="top"
                    />
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
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
    content: {
        padding: Layout.spacing.lg,
        paddingBottom: 40,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    stepSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.lg,
    },
    section: {
        marginBottom: Layout.spacing.xl,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: 12,
    },
    pillContainer: {
        gap: 12,
        paddingRight: Layout.spacing.lg, // scroll padding ending
    },
    pillContainerWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    pill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    pillSelected: {
        backgroundColor: Colors.primaryLight + '20',
        borderColor: Colors.primary,
    },
    pillText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
    },
    pillTextSelected: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    pillCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: Layout.borderRadius.md,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        width: '45%',
    },
    pillCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryLight + '10',
    },
    addonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.md,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    addonRowSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryLight + '05',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Colors.border,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
    },
    addonName: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    addonPrice: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    instructionInput: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Layout.borderRadius.md,
        padding: 16,
        fontSize: 15,
        color: Colors.textPrimary,
        minHeight: 100,
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
});
