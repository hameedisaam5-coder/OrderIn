import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, Clock, CheckCircle } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Kitchen } from '../models/types';

interface KitchenListItemProps {
    kitchen: Kitchen;
    onPress: () => void;
}

export default function KitchenListItem({ kitchen, onPress }: KitchenListItemProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: kitchen.imageUrl }} style={styles.image} />
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>{kitchen.rating}</Text>
                    <Star size={10} color={Colors.white} fill={Colors.white} />
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>{kitchen.name}</Text>
                    {kitchen.verified && (
                        <CheckCircle size={14} color="white" fill={Colors.verified} style={{ marginLeft: 4 }} />
                    )}
                </View>

                <Text style={styles.cuisine} numberOfLines={1}>{kitchen.cuisine.join(', ')}</Text>

                <View style={styles.footer}>
                    <View style={styles.infoRow}>
                        <Clock size={12} color={Colors.textSecondary} />
                        <Text style={styles.infoText}>{kitchen.deliveryTime}</Text>
                    </View>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.priceText}>₹150 for one</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.promoContainer}>
                    <Text style={styles.promoText}>50% OFF up to ₹100</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.xl,
        marginBottom: Layout.spacing.md,
        padding: Layout.spacing.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    imageContainer: {
        position: 'relative',
        marginRight: Layout.spacing.md,
    },
    image: {
        width: 100,
        height: 110,
        borderRadius: Layout.borderRadius.lg,
        backgroundColor: Colors.border,
    },
    ratingBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.success,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        gap: 2,
    },
    ratingText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        flexShrink: 1, // Allow text to shrink so tick stays next to it
    },
    cuisine: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    dot: {
        marginHorizontal: 6,
        color: Colors.textSecondary,
        fontSize: 10,
    },
    priceText: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border, // Very light
        marginVertical: 8,
        opacity: 0.5,
    },
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    promoText: {
        fontSize: 11,
        color: Colors.secondary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
