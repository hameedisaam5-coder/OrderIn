import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Meal } from '../models/types';
import Button from './Button';

interface MealCardProps {
    meal: Meal;
    onAdd: () => void;
}

export default function MealCard({ meal, onAdd }: MealCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.header}>
                    <View style={[styles.vegIcon, { borderColor: meal.isVegetarian ? Colors.success : Colors.error }]}>
                        <View style={[styles.vegDot, { backgroundColor: meal.isVegetarian ? Colors.success : Colors.error }]} />
                    </View>
                    <Text style={styles.name}>{meal.name}</Text>
                </View>
                <Text style={styles.price}>₹{meal.price}</Text>
                <Text style={styles.description} numberOfLines={2}>{meal.description}</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: meal.image }} style={styles.image} />
                <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                    <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: Layout.spacing.md,
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
        marginBottom: 4,
    },
    vegIcon: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    vegDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 16,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: Layout.borderRadius.md,
        backgroundColor: Colors.border,
    },
    addButton: {
        position: 'absolute',
        bottom: -10,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: Layout.borderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    addText: {
        color: Colors.success,
        fontWeight: 'bold',
        fontSize: 14,
    }
});
