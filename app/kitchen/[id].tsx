import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, Clock, ChevronLeft, Share2 } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import MealCard from '../../src/components/MealCard';
import { MOCK_KITCHENS } from '../../src/services/mockData';
import { useCart } from '../../src/context/CartContext';

export default function KitchenDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart, totalItems, totalAmount } = useCart();

    const [activeTab, setActiveTab] = useState<'regular' | 'subscription'>('regular');

    const kitchen = MOCK_KITCHENS.find(k => k.id === id);

    if (!kitchen) {
        return <Text>Kitchen not found</Text>;
    }

    // For mock purposes: ensure we have some subscription meals if none are tagged
    const mockMenuWithSub = kitchen.menu.map((m, i) => ({
        ...m,
        isSubscription: m.isSubscription || i >= kitchen.menu.length - 2
    }));

    const displayedItems = activeTab === 'regular'
        ? mockMenuWithSub.filter(m => !m.isSubscription)
        : mockMenuWithSub.filter(m => m.isSubscription);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header Image */}
                <View>
                    <Image source={{ uri: kitchen.imageUrl }} style={styles.coverImage} />
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ChevronLeft color={Colors.textPrimary} size={24} />
                    </TouchableOpacity>
                </View>

                {/* Info Section */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{kitchen.name}</Text>
                    <Text style={styles.cuisine}>{kitchen.cuisine.join(', ')}</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <View style={[styles.badge, { backgroundColor: Colors.success }]}>
                                <Text style={[styles.badgeText, { color: Colors.white }]}>{kitchen.rating} ★</Text>
                            </View>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{kitchen.deliveryTime}</Text>
                            <Text style={styles.statLabel}>Delivery</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Menu Section */}
                <View style={styles.menuContainer}>
                    {/* Custom Tab Bar */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'regular' && styles.activeTab]}
                            onPress={() => setActiveTab('regular')}
                        >
                            <Text style={[styles.tabText, activeTab === 'regular' && styles.activeTabText]}>
                                A-la-carte ({mockMenuWithSub.filter(m => !m.isSubscription).length})
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'subscription' && styles.activeTab]}
                            onPress={() => setActiveTab('subscription')}
                        >
                            <Text style={[styles.tabText, activeTab === 'subscription' && styles.activeTabText]}>
                                Subscriptions ({mockMenuWithSub.filter(m => m.isSubscription).length})
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {displayedItems.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>No items here yet</Text>
                        </View>
                    )}

                    {displayedItems.map((meal) => (
                        <MealCard
                            key={meal.id}
                            meal={meal}
                            onAdd={() => addToCart(meal, kitchen.id)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* View Cart Floating Bar */}
            {totalItems > 0 && (
                <View style={styles.floatingCartContainer}>
                    <TouchableOpacity
                        style={styles.viewCartButton}
                        onPress={() => router.push('/cart')}
                    >
                        <View>
                            <Text style={styles.cartItemsText}>{totalItems} ITEMS</Text>
                            <Text style={styles.cartTotalText}>₹{totalAmount} plus taxes</Text>
                        </View>
                        <Text style={styles.viewCartText}>View Cart</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    coverImage: {
        width: '100%',
        height: 200,
        backgroundColor: Colors.border,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: Colors.white,
        padding: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    infoContainer: {
        padding: Layout.spacing.md,
        backgroundColor: Colors.background,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    cuisine: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.md,
    },
    statsRow: {
        flexDirection: 'row',
        gap: Layout.spacing.xl,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    statValue: {
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.textPrimary,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Layout.spacing.xs,
    },
    menuContainer: {
        padding: Layout.spacing.md,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.md,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: Layout.spacing.md,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: Colors.success,
    },
    tabText: {
        fontSize: 16,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    activeTabText: {
        color: Colors.success,
        fontWeight: 'bold',
    },
    emptyState: {
        padding: Layout.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    floatingCartContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
    viewCartButton: {
        backgroundColor: Colors.success,
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cartItemsText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
    cartTotalText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    viewCartText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    }
});
