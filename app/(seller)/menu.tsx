import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import { MOCK_KITCHENS } from '../../src/services/mockData';
import { Plus, MoreVertical } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SellerMenuScreen() {
    const router = useRouter();
    // Use s1 as the mock seller identity for this prototype
    const mockSellerId = 's1';
    const kitchen = MOCK_KITCHENS.find(k => k.id === mockSellerId);

    const [activeTab, setActiveTab] = useState<'regular' | 'subscription'>('regular');

    // For mock purposes: pretend the last 2 items in the array are also subscription meals
    const mockMenuWithSub = kitchen?.menu.map((m, i) => ({
        ...m,
        isSubscription: m.isSubscription || i >= (kitchen?.menu.length || 0) - 2
    })) || [];

    // Track stock status for the UI locally. In a real app this touches the backend.
    const [inStockItems, setInStockItems] = useState<Record<string, boolean>>(
        mockMenuWithSub.reduce((acc, item) => ({ ...acc, [item.id]: true }), {}) || {}
    );

    const toggleStock = (itemId: string, value: boolean) => {
        setInStockItems(prev => ({ ...prev, [itemId]: value }));
    };

    if (!kitchen) return null;

    const displayedItems = activeTab === 'regular'
        ? mockMenuWithSub.filter(m => !m.isSubscription)
        : mockMenuWithSub.filter(m => m.isSubscription);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Menu Management</Text>

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
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {displayedItems.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No items here yet</Text>
                    </View>
                )}
                {displayedItems.map(item => (
                    <View key={item.id} style={styles.menuItemCard}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <View style={styles.itemHeaderRow}>
                                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                <View style={[styles.vegBadge, { borderColor: item.isVegetarian ? Colors.success : Colors.error }]}>
                                    <View style={[styles.vegDot, { backgroundColor: item.isVegetarian ? Colors.success : Colors.error }]} />
                                </View>
                            </View>
                            <Text style={styles.itemPrice}>₹{item.price}</Text>
                            <Text style={styles.itemType}>{item.type}</Text>

                            <View style={styles.stockToggleContainer}>
                                <Text style={[styles.stockText, { color: inStockItems[item.id] ? Colors.success : Colors.error }]}>
                                    {inStockItems[item.id] ? 'In Stock' : 'Out of Stock'}
                                </Text>
                                <Switch
                                    value={inStockItems[item.id]}
                                    onValueChange={(val) => toggleStock(item.id, val)}
                                    trackColor={{ false: Colors.border, true: Colors.success }}
                                    thumbColor={Colors.white}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.moreButton}>
                            <MoreVertical size={20} color={Colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Pad the bottom so the FAB doesn't cover the last item */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/(seller)/add-item')}
                activeOpacity={0.8}
            >
                <Plus size={24} color={Colors.white} />
                <Text style={styles.fabText}>Add Item</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: Layout.spacing.lg,
        paddingTop: Layout.spacing.lg,
        paddingBottom: Layout.spacing.md,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    headerSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: -1, // Overlap border
        marginTop: Layout.spacing.sm,
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
    content: {
        padding: Layout.spacing.lg,
    },
    emptyState: {
        padding: Layout.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: Layout.spacing.md,
    },
    menuItemCard: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Layout.spacing.md,
        marginBottom: Layout.spacing.md,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: Layout.borderRadius.md,
        marginRight: Layout.spacing.md,
    },
    itemInfo: {
        flex: 1,
    },
    itemHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        flex: 1,
        marginRight: 8,
    },
    vegBadge: {
        width: 12,
        height: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
    },
    vegDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    itemType: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    stockToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: Layout.borderRadius.sm,
    },
    stockText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    moreButton: {
        padding: 4,
        position: 'absolute',
        top: 12,
        right: 12,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: Colors.success,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 24,
        shadowColor: Colors.success,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    fabText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
});
