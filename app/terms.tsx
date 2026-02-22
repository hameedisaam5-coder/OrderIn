import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import Colors from '../src/constants/Colors';
import Layout from '../src/constants/Layout';

export default function TermsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={28} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Privacy</Text>
                <View style={styles.backButton} /> {/* Placeholder for balance */}
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.lastUpdated}>Last Updated: October 2023</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Introduction & Acceptance of Terms</Text>
                    <Text style={styles.paragraph}>
                        Welcome to Meal Mate! By accessing or using our mobile application, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. User Accounts</Text>
                    <Text style={styles.paragraph}>
                        To use certain features of Meal Mate, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate. You are responsible for safeguarding your password and for all activities that occur under your account.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Ordering and Subscriptions</Text>
                    <Text style={styles.paragraph}>
                        Meal Mate connects you with local kitchens for food delivery and meal subscriptions.
                        {"\n\n"}
                        • <Text style={styles.bold}>A-la-carte Orders:</Text> Subject to restaurant availability and delivery zones.
                        {"\n"}
                        • <Text style={styles.bold}>Subscriptions:</Text> Subscription plans (e.g., Weekly, Monthly) are billed upfront. You may pause or cancel your subscription subject to our cancellation policy.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. Pricing and Payments</Text>
                    <Text style={styles.paragraph}>
                        All prices listed in the app are determined by the respective kitchens and may change without prior notice. The total cost of an order, including taxes, delivery fees, and platform fees, will be displayed prior to checkout. Payments are processed securely via third-party gateways.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. Food Safety and Allergies</Text>
                    <Text style={styles.paragraph}>
                        While we strive to provide accurate meal descriptions, Meal Mate acts as an intermediary. We cannot guarantee that any meal is completely free of allergens. Please review the ingredients carefully and contact the kitchen directly if you have severe food allergies or specific dietary requirements.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>6. Privacy Policy</Text>
                    <Text style={styles.paragraph}>
                        We value your privacy. This section outlines how we collect, use, and protect your data.
                        {"\n\n"}
                        • <Text style={styles.bold}>Information We Collect:</Text> We collect information you provide directly (such as name, phone number, email, and delivery address) and data generated automatically when you use the app (such as location, app usage, and device type).
                        {"\n"}
                        • <Text style={styles.bold}>How We Use Your Information:</Text> Your data is used to provide our services, process payments, facilitate deliveries, personalize your experience, and communicate with you about your orders or promotional offers.
                        {"\n"}
                        • <Text style={styles.bold}>Data Sharing:</Text> We do not sell your personal data. We share necessary information with our kitchen partners and delivery personnel purely to fulfill your orders.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
                    <Text style={styles.paragraph}>
                        Meal Mate provides its services on an "as is" and "as available" basis. We do not warrant that the app will be error-free or uninterrupted. To the maximum extent permitted by law, Meal Mate shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>8. Contact Information</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions or concerns about these Terms & Privacy Policy, please reach out to our dedicated support team.
                        {"\n\n"}
                        Email: <Text style={styles.highlight}>support@mealmate.in</Text>
                        {"\n"}
                        Phone: <Text style={styles.highlight}>+91 9952886136</Text>
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>© {new Date().getFullYear()} Meal Mate. All rights reserved.</Text>
                </View>
            </ScrollView>
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
        paddingVertical: Layout.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    lastUpdated: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.lg,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: Layout.spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: Layout.spacing.sm,
    },
    paragraph: {
        fontSize: 15,
        color: Colors.textPrimary,
        lineHeight: 24,
    },
    bold: {
        fontWeight: 'bold',
    },
    highlight: {
        color: Colors.accent,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: Layout.spacing.xl,
        paddingVertical: Layout.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: Colors.textSecondary,
    }
});
