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
            <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
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
    logoImage: {
        width: 150,
        height: 150,
        marginBottom: Layout.spacing.lg,
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
