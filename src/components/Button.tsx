import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon,
}: ButtonProps) {
    const getBackgroundColor = () => {
        if (disabled) return Colors.border;
        if (variant === 'primary') return Colors.primary;
        if (variant === 'accent') return Colors.accent;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return Colors.textSecondary;
        if (variant === 'primary' || variant === 'accent') return Colors.white;
        if (variant === 'outline') return Colors.primary;
        return Colors.textPrimary;
    };

    const getBorder = () => {
        if (variant === 'outline') return { borderWidth: 1, borderColor: Colors.primary };
        return {};
    };

    const getHeight = () => {
        switch (size) {
            case 'sm': return 36;
            case 'lg': return 56;
            default: return 48; // md
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    height: getHeight(),
                    ...getBorder(),
                },
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon}
                    <Text style={[styles.text, { color: getTextColor(), marginLeft: icon ? 8 : 0 }, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Layout.borderRadius.md,
        paddingHorizontal: Layout.spacing.md,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
