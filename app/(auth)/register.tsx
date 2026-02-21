import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../../src/components/Button';
import Input from '../../src/components/Input';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import { CircleUser, Phone, Mail, MapPin } from 'lucide-react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });

    const handleRegister = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push('/(auth)/otp');
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <StatusBar style="dark" />

                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join OrderIn for daily fresh meals.</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        autoCapitalize="words"
                    />
                    <Input
                        label="Phone Number"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        keyboardType="phone-pad"
                    />
                    <Input
                        label="Email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Delivery Address"
                        placeholder="Flat No, Building, Area"
                        value={formData.address}
                        onChangeText={(text) => setFormData({ ...formData, address: text })}
                        multiline
                        numberOfLines={2}
                        style={{ height: 80, paddingTop: 12 }}
                    />
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Continue"
                        onPress={handleRegister}
                        loading={loading}
                        variant="primary"
                        size="lg"
                        disabled={!formData.name || !formData.phone}
                    />
                    <Text style={styles.termsText}>
                        By continuing, you agree to our Terms & Privacy Policy.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        padding: Layout.spacing.lg,
        paddingTop: Layout.spacing.xxl,
    },
    header: {
        marginBottom: Layout.spacing.xl,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: Layout.spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    form: {
        flex: 1,
    },
    footer: {
        marginTop: Layout.spacing.xl,
    },
    termsText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: Layout.spacing.md,
    },
});
