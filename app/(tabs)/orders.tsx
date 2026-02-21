import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import KitchenListItem from '../../src/components/KitchenListItem';
import KitchenCard from '../../src/components/KitchenCard';
import { MOCK_KITCHENS } from '../../src/services/mockData';

export default function RestaurantsScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;
    const numColumns = isDesktop ? 3 : 1;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.primary, Colors.primaryLight]}
                style={styles.heroHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Floating Background Doodles */}
                <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }]} pointerEvents="none">
                    <Text style={[styles.doodle, { top: -10, left: -10, fontSize: 70, transform: [{ rotate: '-15deg' }] }]}>✨</Text>
                    <Text style={[styles.doodle, { top: 40, right: -20, fontSize: 90, transform: [{ rotate: '25deg' }] }]}>🍔</Text>
                    <Text style={[styles.doodle, { bottom: 10, left: '45%', fontSize: 75, transform: [{ rotate: '-15deg' }] }]}>🍟</Text>
                </View>

                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <Text style={styles.title}>All Restaurants</Text>
                        <Text style={styles.subtitle}>Discover the best home kitchens</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>
            <FlatList
                key={numColumns}
                data={MOCK_KITCHENS}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 / numColumns, padding: isDesktop ? 8 : 0 }}>
                        {isDesktop ? (
                            <KitchenCard
                                kitchen={item}
                                onPress={() => router.push(`/kitchen/${item.id}`)}
                            />
                        ) : (
                            <KitchenListItem
                                kitchen={item}
                                onPress={() => router.push(`/kitchen/${item.id}`)}
                            />
                        )}
                    </View>
                )}
                contentContainerStyle={[styles.content, isDesktop && { maxWidth: 1200, alignSelf: 'center', width: '100%' }]}
                showsVerticalScrollIndicator={false}
            />
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.8)',
    },
    content: {
        padding: Layout.spacing.md,
        paddingBottom: Layout.spacing.xl,
    },
});
