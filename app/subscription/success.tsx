import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Check } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import Button from '../../src/components/Button';
import { useSubscription } from '../../src/context/SubscriptionContext';

export default function SubscriptionSuccessScreen() {
    const router = useRouter();
    const { completeSubscription } = useSubscription();

    useEffect(() => {
        // Clear wizard state on unmount if we wanted, but we'll clear it on button press
    }, []);

    const handleHome = () => {
        completeSubscription();
        router.replace('/(tabs)/home'); // Use replace to clear stack
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Check size={48} color={Colors.white} />
                </View>

                <Text style={styles.title}>Subscription Active!</Text>
                <Text style={styles.subtitle}>
                    Your daily meals are now scheduled. You can track deliveries from the home screen.
                </Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Starts Tomorrow</Text>
                    <Text style={styles.cardText}>First meal: Lunch</Text>
                    <Text style={styles.cardText}>Delivering to: Office</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    title="Go to Home"
                    onPress={handleHome}
                    size="lg"
                    style={{ width: '100%' }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'space-between',
        paddingVertical: 50,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Layout.spacing.xl,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.success,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Layout.spacing.xl,
        shadowColor: Colors.success,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.md,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Layout.spacing.xl,
        lineHeight: 24,
    },
    card: {
        backgroundColor: Colors.surface,
        padding: Layout.spacing.lg,
        borderRadius: Layout.borderRadius.lg,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 8,
    },
    cardText: {
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    footer: {
        paddingHorizontal: Layout.spacing.lg,
        width: '100%',
    }
});
