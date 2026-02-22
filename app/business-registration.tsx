import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, CheckCircle } from 'lucide-react-native';
import Colors from '../src/constants/Colors';
import Layout from '../src/constants/Layout';

export default function BusinessRegistrationScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [businessType, setBusinessType] = useState('both'); // 'normal', 'subscription', 'both'

    const handleSubmit = () => {
        // Mock submission
        setStep(2);
    };

    if (step === 2) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.successContainer}>
                    <CheckCircle size={64} color={Colors.success} style={{ marginBottom: 24 }} />
                    <Text style={styles.successTitle}>Application Submitted!</Text>
                    <Text style={styles.successSubtitle}>
                        Our team will review your details and contact you within 48 hours for verification.
                    </Text>
                    <TouchableOpacity
                        style={[styles.btnPrimary, { width: '100%' }]}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.btnPrimaryText}>Return to Account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Partner Registration</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Basic Details</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Restaurant/Kitchen Name</Text>
                    <TextInput style={styles.input} placeholder="e.g. Sharma Ji Home Kitchen" placeholderTextColor={Colors.textSecondary} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Owner Full Name</Text>
                    <TextInput style={styles.input} placeholder="e.g. Rahul Sharma" placeholderTextColor={Colors.textSecondary} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Contact Number</Text>
                    <TextInput style={styles.input} placeholder="+91 00000 00000" keyboardType="phone-pad" placeholderTextColor={Colors.textSecondary} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Business Email</Text>
                    <TextInput style={styles.input} placeholder="contact@restaurant.com" keyboardType="email-address" autoCapitalize="none" placeholderTextColor={Colors.textSecondary} />
                </View>

                <Text style={[styles.sectionTitle, { marginTop: Layout.spacing.lg }]}>Business Identity</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Operating Model</Text>
                    <Text style={styles.helperText}>Select how you want to sell on Meal Mate</Text>

                    <TouchableOpacity
                        style={[styles.radioCard, businessType === 'normal' && styles.radioCardActive]}
                        onPress={() => setBusinessType('normal')}
                    >
                        <View style={[styles.radioOuter, businessType === 'normal' && styles.radioOuterActive]}>
                            {businessType === 'normal' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.radioTextContainer}>
                            <Text style={styles.radioTitle}>À la carte Only</Text>
                            <Text style={styles.radioDesc}>Standard delivery of individual meals on-demand.</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.radioCard, businessType === 'subscription' && styles.radioCardActive]}
                        onPress={() => setBusinessType('subscription')}
                    >
                        <View style={[styles.radioOuter, businessType === 'subscription' && styles.radioOuterActive]}>
                            {businessType === 'subscription' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.radioTextContainer}>
                            <Text style={styles.radioTitle}>Subscriptions Only</Text>
                            <Text style={styles.radioDesc}>Weekly or monthly meal plans delivered daily.</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.radioCard, businessType === 'both' && styles.radioCardActive]}
                        onPress={() => setBusinessType('both')}
                    >
                        <View style={[styles.radioOuter, businessType === 'both' && styles.radioOuterActive]}>
                            {businessType === 'both' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.radioTextContainer}>
                            <Text style={styles.radioTitle}>Both Models</Text>
                            <Text style={styles.radioDesc}>Sell regular meals and offer subscription plans.</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>FSSAI License Number</Text>
                    <TextInput style={styles.input} placeholder="14-digit FSSAI number" keyboardType="number-pad" placeholderTextColor={Colors.textSecondary} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Complete Address</Text>
                    <TextInput
                        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                        placeholder="Shop no, Building, Street, Area, City, Pincode"
                        multiline
                        placeholderTextColor={Colors.textSecondary}
                    />
                </View>

                <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit}>
                    <Text style={styles.btnPrimaryText}>Submit Application</Text>
                </TouchableOpacity>
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
        paddingHorizontal: Layout.spacing.lg,
        paddingVertical: Layout.spacing.md,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    content: {
        padding: Layout.spacing.lg,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.lg,
    },
    formGroup: {
        marginBottom: Layout.spacing.lg,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    helperText: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginBottom: 12,
        marginTop: -4,
    },
    input: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Layout.borderRadius.md,
        padding: Layout.spacing.md,
        fontSize: 16,
        color: Colors.textPrimary,
    },
    radioCard: {
        flexDirection: 'row',
        padding: Layout.spacing.md,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Layout.borderRadius.md,
        marginBottom: Layout.spacing.sm,
        alignItems: 'center',
    },
    radioCardActive: {
        borderColor: Colors.success,
        backgroundColor: '#F0FDF4',
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.spacing.md,
    },
    radioOuterActive: {
        borderColor: Colors.success,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.success,
    },
    radioTextContainer: {
        flex: 1,
    },
    radioTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    radioDesc: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    btnPrimary: {
        backgroundColor: Colors.success,
        paddingVertical: 16,
        borderRadius: Layout.borderRadius.lg,
        alignItems: 'center',
        marginTop: Layout.spacing.lg,
    },
    btnPrimaryText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Layout.spacing.xl,
        backgroundColor: Colors.background,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Layout.spacing.sm,
        textAlign: 'center',
    },
    successSubtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    }
});
