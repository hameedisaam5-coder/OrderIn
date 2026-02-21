import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';
import { useSubscription } from '../../src/context/SubscriptionContext';

export default function PreferencesScreen() {
    const router = useRouter();
    const { state, setPreference } = useSubscription();

    const renderOption = (key: 'spiceLevel' | 'oilLevel' | 'dietType', label: string, options: string[]) => (
        <View style={styles.section} key={key}>
            <Text style={styles.sectionLabel}>{label}</Text>
            <View style={styles.optionsRow}>
                {options.map((opt) => (
                    <TouchableOpacity
                        key={opt}
                        style={[
                            styles.optionChip,
                            state.preferences[key] === opt && styles.selectedOption
                        ]}
                        onPress={() => setPreference(key, opt)}
                    >
                        <Text style={[
                            styles.optionText,
                            state.preferences[key] === opt && styles.selectedOptionText
                        ]}>{opt}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const handleContinue = () => {
        router.push('/subscription/success');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Preferences</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.stepIndicator}>
                <View style={[styles.stepDot, styles.completedDot]} />
                <View style={[styles.stepLine, styles.completedLine]} />
                <View style={[styles.stepDot, styles.completedDot]} />
                <View style={[styles.stepLine, styles.completedLine]} />
                <View style={[styles.stepDot, styles.completedDot]} />
                <View style={[styles.stepLine, styles.completedLine]} />
                <View style={[styles.stepDot, styles.activeDot]} />
            </View>

            <Text style={styles.stepTitle}>Step 4: Customization</Text>
            <Text style={styles.stepSubtitle}>How do you like your food?</Text>

            <ScrollView contentContainerStyle={styles.content}>
                {renderOption('spiceLevel', 'Spice Level', ['Low', 'Medium', 'High'])}
                {renderOption('oilLevel', 'Oil Usage', ['Low', 'Standard'])}
                {renderOption('dietType', 'Dietary Preference', ['Veg', 'Non-Veg', 'Egg', 'Vegan'])}

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        * These preferences will be applied to all your meals. You can change them anytime in settings.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Activate Subscription"
                    onPress={handleContinue}
                    size="lg"
                    variant="accent"
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
    section: {
        marginBottom: Layout.spacing.md,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: Layout.spacing.sm,
        color: Colors.textPrimary,
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Layout.spacing.sm,
    },
    optionChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    selectedOption: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
    },
    optionText: {
        color: Colors.textPrimary,
    },
    selectedOptionText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    infoBox: {
        padding: Layout.spacing.md,
        backgroundColor: '#F3F4F6',
        borderRadius: Layout.borderRadius.md,
        marginTop: Layout.spacing.lg,
    },
    infoText: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontStyle: 'italic',
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
});
