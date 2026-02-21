import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Star, Clock } from 'lucide-react-native';
import Colors from '../../../src/constants/Colors';
import Layout from '../../../src/constants/Layout';
import Button from '../../../src/components/Button';
import { MOCK_KITCHENS, SUBSCRIPTION_PLANS } from '../../../src/services/mockData';
import { useSubscription } from '../../../src/context/SubscriptionContext';

export default function KitchenSubscriptionScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { setPlan } = useSubscription();

    const kitchen = MOCK_KITCHENS.find(k => k.id === id);

    if (!kitchen) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ChevronLeft color={Colors.textPrimary} size={28} />
                    </TouchableOpacity>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Kitchen not found.</Text>
                </View>
            </SafeAreaView>
        );
    }

    const handleTrialMeal = () => {
        // Route them to the standard order-in flow for this kitchen
        router.push(`/kitchen/${kitchen.id}`);
    };

    const handleSubscribe = (planId: string) => {
        setPlan(planId);
        // Note: Real app would also attach the kitchenId to the subscription context here
        router.push('/subscription/meals');
    };

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {/* Hero Header */}
                <View style={styles.heroContainer}>
                    <Image source={{ uri: kitchen.imageUrl }} style={styles.heroImage} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.heroGradient}
                    >
                        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.backButtonLight}>
                                <ChevronLeft color="white" size={28} />
                            </TouchableOpacity>
                        </SafeAreaView>
                        <View style={styles.heroContent}>
                            <Text style={styles.kitchenName}>{kitchen.name}</Text>
                            <View style={styles.metaRow}>
                                <View style={styles.metaBadge}>
                                    <Star size={16} color={Colors.warning} fill={Colors.warning} />
                                    <Text style={styles.metaText}>{kitchen.rating}</Text>
                                </View>
                                <View style={styles.metaBadge}>
                                    <Clock size={16} color="white" />
                                    <Text style={styles.metaText}>{kitchen.deliveryTime}</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Trial CTA */}
                    <View style={styles.trialCard}>
                        <View style={styles.trialTextContainer}>
                            <Text style={styles.trialTitle}>Not sure yet?</Text>
                            <Text style={styles.trialDesc}>Order a single meal to taste the quality before committing to a weekly plan.</Text>
                        </View>
                        <Button
                            title="Order Trial Meal"
                            onPress={handleTrialMeal}
                            style={styles.trialButton}
                        />
                    </View>

                    <Text style={styles.sectionTitle}>Available Subscription Plans</Text>

                    {/* Subscription Plans */}
                    {SUBSCRIPTION_PLANS.map((plan) => (
                        <TouchableOpacity
                            key={plan.id}
                            style={styles.planCard}
                            onPress={() => handleSubscribe(plan.id)}
                            activeOpacity={0.9}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.planName}>{plan.name}</Text>
                                <Text style={styles.planPrice}>₹{plan.price}</Text>
                            </View>
                            <Text style={styles.planDesc}>{plan.description}</Text>
                            <Button
                                title="Select Plan"
                                onPress={() => handleSubscribe(plan.id)}
                                style={{ marginTop: 12 }}
                            />
                        </TouchableOpacity>
                    ))}
                    <View style={{ height: Layout.spacing.xl }} />
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
    heroContainer: {
        height: 280,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    heroGradient: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
    },
    safeAreaHeader: {
        flexDirection: 'row',
        paddingHorizontal: Layout.spacing.md,
        paddingTop: Layout.spacing.sm,
    },
    backButtonLight: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroContent: {
        padding: Layout.spacing.lg,
    },
    kitchenName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: Layout.spacing.sm,
    },
    metaRow: {
        flexDirection: 'row',
        gap: Layout.spacing.md,
    },
    metaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: Layout.borderRadius.sm,
    },
    metaText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    trialCard: {
        backgroundColor: Colors.primaryLight + '15',
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.lg,
        borderColor: Colors.primaryLight,
        borderWidth: 1,
        marginBottom: Layout.spacing.xl,
        gap: Layout.spacing.md,
    },
    trialTextContainer: {
        gap: 4,
    },
    trialTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    trialDesc: {
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    trialButton: {
        backgroundColor: Colors.primary,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.md,
    },
    planCard: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.lg,
        marginBottom: Layout.spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    planDesc: {
        color: Colors.textSecondary,
        marginBottom: 12,
        lineHeight: 20,
    },
    header: {
        padding: Layout.spacing.lg,
    },
    backButton: {
        padding: Layout.spacing.xs,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: Colors.textSecondary,
    },
});
