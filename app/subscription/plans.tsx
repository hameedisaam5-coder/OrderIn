import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CheckCircle2, ChevronRight, X } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';
import { SUBSCRIPTION_PLANS } from '../../src/services/mockData';
import { useSubscription } from '../../src/context/SubscriptionContext';

export default function PlansScreen() {
    const router = useRouter();
    const { state, setPlan } = useSubscription();

    const handleContinue = () => {
        router.push('/subscription/meals');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Text style={styles.title}>Choose Plan</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <X size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <View style={styles.stepIndicator}>
                <View style={[styles.stepDot, styles.activeDot]} />
                <View style={styles.stepLine} />
                <View style={styles.stepDot} />
                <View style={styles.stepLine} />
                <View style={styles.stepDot} />
                <View style={styles.stepLine} />
                <View style={styles.stepDot} />
            </View>

            <Text style={styles.stepTitle}>Step 1: Select Duration</Text>

            <ScrollView contentContainerStyle={styles.content}>
                {SUBSCRIPTION_PLANS.map((plan) => {
                    const isSelected = state.planId === plan.id;
                    return (
                        <TouchableOpacity
                            key={plan.id}
                            style={[styles.planCard, isSelected && styles.selectedCard]}
                            onPress={() => setPlan(plan.id)}
                            activeOpacity={0.9}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={[styles.planName, isSelected && styles.selectedText]}>{plan.name}</Text>
                                {isSelected && <CheckCircle2 size={24} color={Colors.white} />}
                            </View>
                            <Text style={[styles.planPrice, isSelected && styles.selectedText]}>₹{plan.price}</Text>
                            <Text style={[styles.planDesc, isSelected && styles.selectedText]}>{plan.description}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!state.planId}
                    size="lg"
                    icon={<ChevronRight color={Colors.white} size={20} />}
                    style={{ flexDirection: 'row-reverse' }} // Icon on right
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
        fontSize: 24,
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
    },
    stepLine: {
        flex: 1,
        height: 2,
        backgroundColor: Colors.border,
        marginHorizontal: 4,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginLeft: Layout.spacing.lg,
        marginBottom: Layout.spacing.md,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    planCard: {
        backgroundColor: Colors.surface,
        padding: Layout.spacing.lg,
        borderRadius: Layout.borderRadius.lg,
        marginBottom: Layout.spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedCard: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    planName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    planPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent,
        marginBottom: 8,
    },
    planDesc: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    selectedText: {
        color: Colors.white,
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
});
