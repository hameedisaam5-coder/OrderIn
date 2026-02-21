import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../src/constants/Colors';
import Layout from '../src/constants/Layout';

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        // Simulate checking auth state or loading assets
        const timer = setTimeout(() => {
            router.replace('/(auth)/welcome');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* Placeholder Logo */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>OrderIn</Text>
            </View>
            <Text style={styles.tagline}>Daily Meals. On Schedule.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Layout.spacing.lg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    logoText: {
        color: Colors.primary,
        fontSize: 24,
        fontWeight: 'bold',
    },
    tagline: {
        color: Colors.surface,
        fontSize: 18,
        opacity: 0.9,
        marginTop: Layout.spacing.md,
    },
});
