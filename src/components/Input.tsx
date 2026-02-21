import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    error ? styles.inputError : null,
                    style
                ]}
                placeholderTextColor={Colors.textSecondary}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Layout.spacing.md,
    },
    label: {
        fontSize: 14,
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.xs,
        fontWeight: '500',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Layout.borderRadius.md,
        paddingHorizontal: Layout.spacing.md,
        backgroundColor: Colors.surface,
        fontSize: 16,
        color: Colors.textPrimary,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
        marginTop: Layout.spacing.xs,
    },
});
