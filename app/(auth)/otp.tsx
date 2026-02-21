import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../../src/components/Button';
import Input from '../../src/components/Input';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';

export default function OtpScreen() {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleVerify = () => {
        setLoading(true);
        // Simulate verification
        setTimeout(() => {
            setLoading(false);
            // Navigate to Home (Tab Navigator)
            router.replace('/(tabs)/home');
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Verify Phone</Text>
                    <Text style={styles.subtitle}>Enter the 4-digit code sent to your number.</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        placeholder="0 0 0 0"
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="number-pad"
                        maxLength={4}
                        style={styles.otpInput}
                        textAlign="center"
                    />

                    <View style={styles.resendContainer}>
                        <Text style={styles.resendText}>Didn't receive code? </Text>
                        <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(30)}>
                            <Text style={[styles.resendLink, timer > 0 && styles.disabledLink]}>
                                {timer > 0 ? `Resend in ${timer}s` : 'Resend Now'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title="Verify & Proceed"
                    onPress={handleVerify}
                    loading={loading}
                    variant="primary"
                    size="lg"
                    disabled={otp.length !== 4}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Layout.spacing.lg,
        paddingTop: Layout.spacing.xxl * 1.5,
    },
    content: {
        flex: 1,
        maxWidth: 400,
        alignSelf: 'center',
        width: '100%',
    },
    header: {
        marginBottom: Layout.spacing.xl,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: Layout.spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    form: {
        marginBottom: Layout.spacing.xl,
    },
    otpInput: {
        fontSize: 32,
        letterSpacing: 8,
        fontWeight: 'bold',
        height: 64,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Layout.spacing.md,
    },
    resendText: {
        color: Colors.textSecondary,
    },
    resendLink: {
        color: Colors.accent,
        fontWeight: 'bold',
    },
    disabledLink: {
        color: Colors.textSecondary,
    },
});
