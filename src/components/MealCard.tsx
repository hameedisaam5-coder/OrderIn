import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Meal } from '../models/types';

interface MealCardProps {
    meal: Meal;
    onAdd: () => void;
    onRemove?: () => void;
    quantity?: number;
}

export default function MealCard({ meal, onAdd, onRemove, quantity = 0 }: MealCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.header}>
                    <View style={[styles.vegIcon, { borderColor: meal.isVegetarian ? Colors.success : Colors.error }]}>
                        <View style={[styles.vegDot, { backgroundColor: meal.isVegetarian ? Colors.success : Colors.error }]} />
                    </View>
                    <Text style={styles.typeBadge}>{meal.type}</Text>
                </View>
                <Text style={styles.name}>{meal.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{meal.description}</Text>
                <Text style={styles.price}>₹{meal.price}</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: meal.image }} style={styles.image} />
                {quantity === 0 ? (
                    <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                        <Text style={styles.addText}>ADD</Text>
                        <Plus size={14} color={Colors.success} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.stepperContainer}>
                        <TouchableOpacity style={styles.stepBtn} onPress={onRemove}>
                            <Minus size={16} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.stepCount}>{quantity}</Text>
                        <TouchableOpacity style={styles.stepBtn} onPress={onAdd}>
                            <Plus size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: Layout.spacing.md,
        paddingBottom: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        marginBottom: Layout.spacing.sm,
        borderRadius: Layout.borderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    info: {
        flex: 1,
        paddingRight: Layout.spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8,
    },
    vegIcon: {
        width: 16,
        height: 16,
        borderWidth: 1.5,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vegDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    typeBadge: {
        fontSize: 10,
        color: Colors.textSecondary,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 17,
        marginBottom: 8,
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: Layout.borderRadius.md,
        backgroundColor: Colors.border,
    },
    addButton: {
        position: 'absolute',
        bottom: -14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: Layout.borderRadius.md,
        borderWidth: 1,
        borderColor: Colors.success,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 3,
    },
    addText: {
        color: Colors.success,
        fontWeight: 'bold',
        fontSize: 13,
    },
    stepperContainer: {
        position: 'absolute',
        bottom: -14,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.success,
        borderRadius: Layout.borderRadius.md,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    stepBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    stepCount: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        paddingHorizontal: 4,
        minWidth: 20,
        textAlign: 'center',
    },
});
