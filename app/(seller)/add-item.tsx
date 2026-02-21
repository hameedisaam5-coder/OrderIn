import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Upload } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';

export default function AddItemScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [isVeg, setIsVeg] = useState(true);

    const handleSave = () => {
        // In a real application, handle saving to a backend
        // For this mock, we just pop back
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Item</Text>
                <View style={{ width: 24 }} /> {/* Balance */}
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Photo Upload Placeholder */}
                <TouchableOpacity style={styles.imageUpload}>
                    <Upload size={32} color={Colors.success} />
                    <Text style={styles.uploadText}>Upload food photo</Text>
                </TouchableOpacity>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Item Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Paneer Butter Masala"
                        placeholderTextColor={Colors.textSecondary}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Price (₹)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 250"
                        keyboardType="numeric"
                        placeholderTextColor={Colors.textSecondary}
                        value={price}
                        onChangeText={setPrice}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Describe the dish ingredients..."
                        placeholderTextColor={Colors.textSecondary}
                        multiline
                        numberOfLines={3}
                        value={desc}
                        onChangeText={setDesc}
                    />
                </View>

                <View style={styles.switchGroup}>
                    <View>
                        <Text style={styles.label}>Dietary Preference</Text>
                        <Text style={styles.subLabel}>{isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</Text>
                    </View>
                    <Switch
                        value={isVeg}
                        onValueChange={setIsVeg}
                        trackColor={{ false: Colors.error, true: Colors.success }}
                        thumbColor={Colors.white}
                    />
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Save Item"
                    onPress={handleSave}
                    style={{ backgroundColor: Colors.success }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Layout.spacing.md,
        paddingTop: Layout.spacing.md,
        paddingBottom: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    imageUpload: {
        backgroundColor: '#F0FDF4',
        borderWidth: 1,
        borderColor: Colors.success,
        borderStyle: 'dashed',
        borderRadius: Layout.borderRadius.lg,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Layout.spacing.xl,
    },
    uploadText: {
        color: Colors.success,
        marginTop: 8,
        fontWeight: '500',
    },
    formGroup: {
        marginBottom: Layout.spacing.lg,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Layout.borderRadius.md,
        padding: Layout.spacing.md,
        fontSize: 16,
        color: Colors.textPrimary,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    switchGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        padding: Layout.spacing.md,
        borderRadius: Layout.borderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: Layout.spacing.xl,
    },
    subLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    footer: {
        padding: Layout.spacing.lg,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    }
});
