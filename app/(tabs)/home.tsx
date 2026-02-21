import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MapPin, Search, ChevronDown, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import { MOCK_USER } from '../../src/services/mockData';

export default function HomeScreen() {
    const router = useRouter();
    const currentAddress = MOCK_USER.addresses[0];
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;

    const renderHeader = () => (
        <View>
            <LinearGradient
                colors={['#6100FF', '#9E00FF']} // Swiggy-like vibrant purple gradient
                style={styles.heroHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Floating Background Doodles (Direct child of header so they span full height/width) */}
                <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }]} pointerEvents="none">
                    <Text style={[styles.doodle, { top: -10, left: -10, fontSize: 70, transform: [{ rotate: '-15deg' }] }]}>✨</Text>
                    <Text style={[styles.doodle, { top: 40, right: -20, fontSize: 90, transform: [{ rotate: '25deg' }] }]}>🍕</Text>
                    <Text style={[styles.doodle, { top: 150, left: 20, fontSize: 60, transform: [{ rotate: '10deg' }] }]}>🥤</Text>
                    <Text style={[styles.doodle, { bottom: 10, left: '45%', fontSize: 75, transform: [{ rotate: '-15deg' }] }]}>🍟</Text>
                    <Text style={[styles.doodle, { bottom: 50, right: 40, fontSize: 50, transform: [{ rotate: '-20deg' }] }]}>✨</Text>
                </View>

                <SafeAreaView edges={['top']}>

                    {/* Top Bar */}
                    <View style={styles.topBar}>
                        <TouchableOpacity style={[styles.addressPill, { maxWidth: '35%' }]}>
                            <MapPin size={18} color="white" />
                            <View style={styles.addressTextContainer}>
                                <Text style={[styles.addressLabel, { fontSize: 13 }]} numberOfLines={1}>
                                    {currentAddress.label} <ChevronDown size={14} color="white" />
                                </Text>
                                <Text style={[styles.addressSubtext, { fontSize: 11 }]} numberOfLines={1}>
                                    {currentAddress.fullAddress}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.centerSectionAbsolute} pointerEvents="none">
                            <Text style={styles.headerAppName}>Meal Mate</Text>
                        </View>

                        <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/(tabs)/account')}>
                            <User size={24} color={Colors.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <TouchableOpacity style={styles.searchBarContainer} activeOpacity={0.9}>
                        <Search size={20} color={Colors.textSecondary} style={{ marginRight: 12 }} />
                        <Text style={styles.searchPlaceholder}>Search for 'Biryani' or 'Pizza'</Text>
                        <View style={styles.micIcon}>
                            <Text style={{ fontSize: 16 }}>🎤</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Hero Promotional Banner inside Header */}
                    <View style={styles.heroPromo}>
                        <View style={styles.promoTextContainer}>
                            <Text style={styles.promoTitle}>DAILY</Text>
                            <Text style={styles.promoSubtitle}>Home Comfort</Text>
                            <View style={styles.promoBadge}>
                                <Text style={styles.promoBadgeText}>Subscribe & Save</Text>
                            </View>
                        </View>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&fit=crop&q=80' }} // abstract food/burger
                            style={styles.heroImage}
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View >
    );

    const renderPortalCards = () => (
        <View style={styles.portalContainer}>
            {/* Background Doodles for the white area */}
            <View style={[StyleSheet.absoluteFill, { zIndex: -1, overflow: 'visible' }]} pointerEvents="none">
                {/* Upper region behind cards */}
                <Text style={[styles.doodleDark, { top: -10, left: -20, fontSize: 80, transform: [{ rotate: '15deg' }] }]}>🍔</Text>
                <Text style={[styles.doodleDark, { top: 90, left: -10, fontSize: 100, transform: [{ rotate: '-25deg' }] }]}>🍩</Text>
                <Text style={[styles.doodleDark, { bottom: -10, right: 10, fontSize: 90, transform: [{ rotate: '-10deg' }] }]}>🌮</Text>
                <Text style={[styles.doodleDark, { top: 70, left: '45%', fontSize: 75, transform: [{ rotate: '5deg' }] }]}>🍦</Text>

                {/* Lower region (below the verified banner) */}
                <Text style={[styles.doodleDark, { top: 250, left: '20%', fontSize: 85, transform: [{ rotate: '-35deg' }] }]}>🍗</Text>
                <Text style={[styles.doodleDark, { bottom: -60, left: 10, fontSize: 110, transform: [{ rotate: '20deg' }] }]}>🥗</Text>
                <Text style={[styles.doodleDark, { top: 220, right: '15%', fontSize: 90, transform: [{ rotate: '15deg' }] }]}>🍜</Text>
                <Text style={[styles.doodleDark, { bottom: -80, right: '35%', fontSize: 80, transform: [{ rotate: '-10deg' }] }]}>🥟</Text>
            </View>
            {/* Top row: 2 Side-by-Side Cards (Food vs Subscriptions) */}
            <View style={styles.row}>
                {/* Food Delivery Card */}
                <TouchableOpacity
                    style={[styles.portalCard, styles.halfCard, { padding: 0 }]}
                    activeOpacity={0.9}
                    onPress={() => router.push('/(tabs)/orders')}
                >
                    <LinearGradient
                        colors={['#FF6B81', '#FF4757']}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&fit=crop&q=80' }} // Thai bowl (Verified working)
                        style={styles.cardImageHalf}
                    />
                    <View style={{ flex: 1, padding: 16 }}>
                        <View style={styles.cardHeader}>
                            <Text style={[styles.cardTitle, { color: 'white' }]}>FOOD DELIVERY</Text>
                            <Text style={[styles.cardSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>FROM RESTAURANTS</Text>
                            <Text style={[styles.discountText, { color: '#FFF000', marginTop: 4 }]}>UP TO 60% OFF</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Subscriptions Card */}
                <TouchableOpacity
                    style={[styles.portalCard, styles.halfCard, { padding: 0 }]}
                    activeOpacity={0.9}
                    onPress={() => router.push('/(tabs)/subscription')}
                >
                    <LinearGradient
                        colors={['#2ED573', '#7BED9F']}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&fit=crop&q=80' }} // Salad bowl (Verified working)
                        style={styles.cardImageHalf}
                    />
                    <View style={{ flex: 1, padding: 16 }}>
                        <View style={styles.cardHeader}>
                            <Text style={[styles.cardTitle, { color: 'white' }]}>SUBSCRIPTIONS</Text>
                            <Text style={[styles.cardSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>MONTHLY MEAL PLANS</Text>
                            <Text style={[styles.discountText, { color: '#FFF000', marginTop: 4 }]}>FLAT ₹500 OFF</Text>
                            <View style={[styles.timeBadge, { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                <Text style={[styles.timeBadgeText, { color: 'white' }]}>⏰ PLANNED</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Bottom Row: Full Width Banner (Verified Restaurants) */}
            <TouchableOpacity
                style={[styles.portalCard, styles.fullCard, { minHeight: 120, alignItems: 'center', backgroundColor: '#F0FFF4' }]}
                activeOpacity={0.9}
                onPress={() => router.push('/(tabs)/orders')}
            >
                <View style={[styles.cardHeader, { width: '60%', justifyContent: 'center' }]}>
                    <Text style={[styles.cardTitle, { color: Colors.success, fontSize: 18 }]}>100% HYGIENE</Text>
                    <Text style={[styles.cardTitle, { color: '#2d3436', marginTop: 4 }]}>VERIFIED KITCHENS</Text>
                    <Text style={[styles.cardSubtitle, { marginTop: 6, fontSize: 11 }]}>HANDPICKED FOR QUALITY & SAFETY</Text>
                </View>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?w=400&fit=crop&q=80' }} // Clean Kitchen/Chef
                    style={[styles.cardImageFull, { width: 140, height: 140, borderRadius: 70, right: -10, top: -10 }]}
                />
                {/* Floating Trust Shield */}
                <View style={[styles.floatingGraphic, { backgroundColor: Colors.success, right: 100, top: 10 }]}>
                    <Text style={styles.floatingText}>🛡️</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container} bounces={false}>

            {renderHeader()}

            <View style={[
                styles.contentArea,
                isDesktop && { maxWidth: 1200, alignSelf: 'center', width: '100%' }
            ]}>
                {renderPortalCards()}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5', // Light grey background that makes cards pop
    },
    heroHeader: {
        paddingHorizontal: Layout.spacing.md,
        paddingBottom: 24,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        position: 'relative',
    },
    centerSectionAbsolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerAppName: {
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    addressPill: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    addressTextContainer: {
        marginLeft: 8,
        flex: 1,
    },
    addressLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        alignItems: 'center',
    },
    addressSubtext: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        maxWidth: '90%',
    },
    profileBtn: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 52,
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    searchPlaceholder: {
        flex: 1,
        color: '#7f8c8d',
        fontSize: 15,
        fontWeight: '500',
    },
    micIcon: {
        borderLeftWidth: 1,
        borderLeftColor: '#eee',
        paddingLeft: 12,
    },
    heroPromo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    promoTextContainer: {
        flex: 1,
    },
    promoTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
    },
    promoSubtitle: {
        color: '#FFF000', // Yellow pop
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 8,
    },
    promoBadge: {
        backgroundColor: 'black',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    promoBadgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    heroImage: {
        width: 120,
        height: 120,
        borderRadius: 60, // Make it circular and floating
        transform: [{ rotate: '15deg' }], // Playful tilt
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.2)'
    },
    contentArea: {
        padding: Layout.spacing.lg,
        marginTop: -10, // Slight overlap with header curve
    },
    portalContainer: {
        gap: Layout.spacing.lg,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Layout.spacing.lg,
    },
    portalCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    halfCard: {
        flex: 1,
        minHeight: 180,
    },
    cardGradient: {
        flex: 1,
        padding: 16,
    },
    fullCard: {
        width: '100%',
        minHeight: 150,
        flexDirection: 'row',
    },
    cardHeader: {
        zIndex: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#2d3436',
    },
    cardSubtitle: {
        fontSize: 10,
        color: '#636e72',
        fontWeight: '600',
        marginTop: 2,
        marginBottom: 6,
    },
    discountText: {
        color: '#E15F41', // Orange/Red branding
        fontWeight: '800',
        fontSize: 12,
    },
    timeBadge: {
        backgroundColor: 'white',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#e056fd',
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    timeBadgeText: {
        color: '#e056fd',
        fontSize: 9,
        fontWeight: 'bold',
    },
    cardImageHalf: {
        width: 110,
        height: 110,
        position: 'absolute',
        bottom: -15,
        right: -15,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.8)', // Softer border
        backgroundColor: '#f5f6fa', // Fallback background color
        zIndex: 1, // Ensure it renders above the gradient
    },
    cardImageFull: {
        width: 160,
        height: 160,
        position: 'absolute',
        right: -20,
        top: -10,
        borderRadius: 20, // Rounded image hugging the corner
    },
    floatingGraphic: {
        position: 'absolute',
        right: 110,
        top: 20,
        backgroundColor: '#6c5ce7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        transform: [{ rotate: '-10deg' }],
    },
    floatingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    creditCardPromo: {
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 8,
    },
    creditCardBg: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fbd28b',
        borderRadius: 8,
    },
    ccTitle: {
        color: '#d35400',
        fontWeight: '900',
        fontSize: 13,
    },
    ccSubtitle: {
        color: '#e67e22',
        fontSize: 10,
        fontWeight: '600',
        marginTop: 2,
    },
    ccImage: {
        width: 50,
        height: 32,
        borderRadius: 4,
        marginLeft: 16,
    },
    doodle: {
        position: 'absolute',
        opacity: 0.35, // Significantly higher opacity for visibility
    },
    doodleDark: {
        position: 'absolute',
        opacity: 0.18, // Increased opacity for better visibility
    }
});
