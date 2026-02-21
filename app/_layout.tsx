import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Colors from '../src/constants/Colors';
import { CartProvider } from '../src/context/CartContext';
import { SubscriptionProvider } from '../src/context/SubscriptionContext';
import { OrderProvider } from '../src/context/OrderContext';
import { AppModeProvider } from '../src/context/AppModeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        // We can add custom fonts here later if needed
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <AppModeProvider>
                <CartProvider>
                    <OrderProvider>
                        <SubscriptionProvider>
                            <StatusBar style="dark" backgroundColor={Colors.background} />
                            <Stack
                                screenOptions={{
                                    headerShown: false,
                                    contentStyle: { backgroundColor: Colors.background },
                                    animation: 'fade',
                                }}
                            >
                                <Stack.Screen name="index" options={{ headerShown: false }} />
                                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                <Stack.Screen name="(seller)" options={{ headerShown: false }} />
                                <Stack.Screen name="kitchen/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
                                <Stack.Screen name="cart" options={{ presentation: 'modal', headerShown: false }} />
                            </Stack>
                        </SubscriptionProvider>
                    </OrderProvider>
                </CartProvider>
            </AppModeProvider>
        </SafeAreaProvider>
    );
}
