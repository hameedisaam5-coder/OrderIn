import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../../src/components/Button';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
                    <Text style={styles.title}>Meal Mate</Text>
                    <Text style={styles.subtitle}>Daily Meals. On Schedule.</Text>
                </View>

                <View style={styles.illustration}>
                    {/* Find a better illustration or use text if image not available */}
                    <Text style={styles.illustrationText}>Fresh. Verified. Trusted.</Text>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Get Started"
                        onPress={() => router.push('/(auth)/register')}
                        variant="primary"
                        size="lg"
                        style={styles.button}
                    />
                    <Button
                        title="Login"
                        onPress={() => router.push('/(auth)/register')} // For now both go to register as simplified flow
                        variant="ghost"
                        size="lg"
                        style={styles.button}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: Layout.spacing.xl,
        paddingTop: Layout.spacing.xxl * 2,
    },
    header: {
        alignItems: 'center',
    },
    logoImage: {
        width: 120,
        height: 120,
        marginBottom: Layout.spacing.md,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: Layout.spacing.sm,
    },
    subtitle: {
        fontSize: 18,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    illustration: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustrationText: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.textPrimary,
        opacity: 0.5,
    },
    footer: {
        gap: Layout.spacing.md,
        paddingBottom: Layout.spacing.xl,
    },
    button: {
        width: '100%',
    },
});
