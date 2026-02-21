import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, Clock, CheckCircle } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Kitchen } from '../models/types';

interface KitchenCardProps {
    kitchen: Kitchen;
    onPress: () => void;
}

export default function KitchenCard({ kitchen, onPress }: KitchenCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
            <Image source={{ uri: kitchen.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{kitchen.name}</Text>
                    {kitchen.verified && <CheckCircle size={16} color="white" fill={Colors.verified} style={{ marginLeft: 4 }} />}
                </View>

                <Text style={styles.cuisine}>{kitchen.cuisine.join(', ')}</Text>

                <View style={styles.footer}>
                    <View style={styles.badge}>
                        <Star size={14} color={Colors.white} fill={Colors.white} />
                        <Text style={styles.badgeText}>{kitchen.rating}</Text>
                    </View>
                    <View style={styles.info}>
                        <Clock size={14} color={Colors.textSecondary} />
                        <Text style={styles.infoText}>{kitchen.deliveryTime}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.xl, // Softer curves (xl usually 16 or 24)
        marginBottom: Layout.spacing.lg, // More breathing room
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
        // Enhanced Shadow
        shadowColor: Colors.primary, // Tinted shadow
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    image: {
        width: '100%',
        height: 180, // Taller image
        backgroundColor: Colors.border,
    },
    content: {
        padding: Layout.spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    cuisine: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.success,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 4,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        marginLeft: 4,
        color: Colors.textSecondary,
        fontSize: 12,
    },
});
