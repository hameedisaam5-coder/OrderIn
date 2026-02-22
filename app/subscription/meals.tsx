import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Check, ChevronRight, ChevronLeft, Coffee, Sun, Moon, Utensils } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';
import { useSubscription } from '../../src/context/SubscriptionContext';

const MEAL_TYPES = [
    { id: 'Breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'Lunch', label: 'Lunch', icon: Sun },
    { id: 'Dinner', label: 'Dinner', icon: Moon },
    { id: 'Combo', label: 'All Meals', icon: Utensils },
];

export default function MealsScreen() {
    const router = useRouter();
    const { state, toggleMealType } = useSubscription();

    const handleContinue = () => {
        router.push('/subscription/customize');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Meal Types</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.stepIndicator}>
                <View style={[styles.stepDot, styles.completedDot]} />
                <View style={[styles.stepLine, styles.completedLine]} />
                <View style={[styles.stepDot, styles.activeDot]} />
                <View style={styles.stepLine} />
                <View style={styles.stepDot} />
                <View style={styles.stepLine} />
                <View style={styles.stepDot} />
            </View>

            <Text style={styles.stepTitle}>Step 2: Select Meals</Text>
            <Text style={styles.stepSubtitle}>Choose what you need daily</Text>

            <ScrollView contentContainerStyle={styles.content}>
                {MEAL_TYPES.map((type) => {
                    const isSelected = state.mealTypes.includes(type.id);
                    const Icon = type.icon;
                    return (
                        <TouchableOpacity
                            key={type.id}
                            style={[styles.card, isSelected && styles.selectedCard]}
                            onPress={() => toggleMealType(type.id)}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                                <Icon size={24} color={isSelected ? Colors.white : Colors.primary} />
                            </View>
                            <Text style={[styles.label, isSelected && styles.selectedText]}>{type.label}</Text>
                            {isSelected && (
                                <View style={styles.checkCircle}>
                                    <Check size={16} color={Colors.white} />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    disabled={state.mealTypes.length === 0}
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
        gap: Layout.spacing.md,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        height: 80,
    },
    selectedCard: {
        borderColor: Colors.primary,
        backgroundColor: '#F0F9F8', // Very light teal
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E6EAE9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    selectedIconContainer: {
        backgroundColor: Colors.primary,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.textPrimary,
        flex: 1,
    },
    selectedText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
});
