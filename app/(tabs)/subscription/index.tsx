import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Utensils, Calendar, Clock, Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../../src/constants/Colors';
import Layout from '../../../src/constants/Layout';
import Button from '../../../src/components/Button';
import { MOCK_KITCHENS } from '../../../src/services/mockData';
import KitchenListItem from '../../../src/components/KitchenListItem';
import { FlatList } from 'react-native';
import { useSubscription } from '../../../src/context/SubscriptionContext';

export default function SubscriptionScreen() {
    const router = useRouter();
    const { state } = useSubscription();
    const { activeSubscription } = state;

    if (!activeSubscription) {
        // Filter kitchens that are specifically for subscriptions
        const subscriptionKitchens = MOCK_KITCHENS.filter(k => k.isSubscription);

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={subscriptionKitchens}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ padding: 0, paddingBottom: Layout.spacing.xl }}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <>
                                <LinearGradient
                                    colors={[Colors.primary, Colors.primaryLight]}
                                    style={styles.heroHeader}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }]} pointerEvents="none">
                                        <Text style={[styles.doodle, { top: 10, left: 10, fontSize: 80, transform: [{ rotate: '-15deg' }] }]}>🥗</Text>
                                        <Text style={[styles.doodle, { top: 60, right: -10, fontSize: 90, transform: [{ rotate: '25deg' }] }]}>🥑</Text>
                                        <Text style={[styles.doodle, { bottom: 10, left: '40%', fontSize: 75, transform: [{ rotate: '-10deg' }] }]}>✨</Text>
                                    </View>
                                    <SafeAreaView edges={['top']}>
                                        <View style={styles.headerContent}>
                                            <Text style={styles.headerTitle}>Home Kitchens</Text>
                                            <Text style={styles.headerSubtitle}>Discover local home-makers & subscribe to fresh daily meals.</Text>
                                        </View>
                                    </SafeAreaView>
                                </LinearGradient>

                                <View style={styles.infoSection}>
                                    <View style={styles.infoItem}>
                                        <Utensils size={20} color={Colors.primary} />
                                        <Text style={styles.infoText}>Freshly cooked</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Calendar size={20} color={Colors.primary} />
                                        <Text style={styles.infoText}>Daily flexibility</Text>
                                    </View>
                                </View>
                            </>
                        }
                        renderItem={({ item }) => (
                            <View style={{ paddingHorizontal: Layout.spacing.lg }}>
                                <KitchenListItem
                                    kitchen={item}
                                    onPress={() => router.push(`/subscription/${item.id}`)}
                                />
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.primary, Colors.primaryLight]}
                style={styles.heroHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }]} pointerEvents="none">
                    <Text style={[styles.doodle, { top: 20, left: 20, fontSize: 80, transform: [{ rotate: '-15deg' }] }]}>📦</Text>
                    <Text style={[styles.doodle, { top: 40, right: -20, fontSize: 90, transform: [{ rotate: '25deg' }] }]}>✨</Text>
                </View>
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>My Subscription</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Current Plan</Text>
                        <Text style={styles.value}>
                            {activeSubscription.planId === 'monthly' ? 'Monthly Pro' : 'Weekly Starter'}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Status</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>ACTIVE</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Start Date</Text>
                        <Text style={styles.value}>
                            {new Date(activeSubscription.startDate).toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Diet</Text>
                        <Text style={styles.value}>{activeSubscription.preferences.dietType}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Spice Level</Text>
                        <Text style={styles.value}>{activeSubscription.preferences.spiceLevel}</Text>
                    </View>
                </View>

                <Button
                    title="Manage Subscription"
                    variant="outline"
                    onPress={() => { }} // Placeholder for now
                    style={{ marginTop: 20 }}
                />
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
    headerSubtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Layout.spacing.xl,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: Layout.spacing.md,
        marginBottom: Layout.spacing.sm,
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Layout.spacing.xl,
        lineHeight: 22,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.lg,
        marginBottom: Layout.spacing.lg,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    planCard: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.lg,
        marginBottom: Layout.spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Layout.spacing.sm,
    },
    label: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Layout.spacing.sm,
    },
    statusBadge: {
        backgroundColor: Colors.success + '20',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statusText: {
        color: Colors.success,
        fontSize: 12,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.md,
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Layout.spacing.lg,
        marginBottom: Layout.spacing.xl,
        backgroundColor: Colors.surface,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.lg,
    },
    infoItem: {
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
});
