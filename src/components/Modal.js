import React, { useEffect, useRef } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    Animated,
    Easing,
    StyleSheet,
    PanResponder,
    Platform,
    KeyboardAvoidingView,
    useColorScheme,
} from "react-native";

export default function CustomModal({
    visible,
    onClose,
    title,
    subtitle,
    children,
    primaryAction,
    secondaryAction,
    closeOnBackdrop = true,
    testID = "modern-modal",
}) {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(24)).current;

    // Swipe-to-dismiss
    const dragY = useRef(new Animated.Value(0)).current;
    const pan = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 6,
            onPanResponderMove: (_, g) => {
                if (g.dy > 0) dragY.setValue(g.dy);
            },
            onPanResponderRelease: (_, g) => {
                if (g.dy > 120 || g.vy > 1.2) {
                    // dismiss
                    Animated.parallel([
                        Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: true }),
                        Animated.timing(translateY, { toValue: 24, duration: 200, easing: Easing.out(Easing.quad), useNativeDriver: true }),
                    ]).start(onClose);
                } else {
                    Animated.spring(dragY, { toValue: 0, useNativeDriver: true, bounciness: 6 }).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (visible) {
            // reset
            opacity.setValue(0);
            translateY.setValue(24);
            dragY.setValue(0);

            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 220, easing: Easing.out(Easing.quad), useNativeDriver: true }),
            ]).start();
        }
    }, [visible]);

    const backdrop = (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close modal"
            onPress={() => (closeOnBackdrop ? onClose?.() : null)}
            style={StyleSheet.absoluteFill}
            testID={`${testID}-backdrop`}
        >
            <Animated.View
                pointerEvents="none"
                style={[styles.backdrop, { opacity: opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }) }]}
            />
        </Pressable>
    );

    const cardStyles = [
        styles.card,
        isDark ? styles.cardDark : styles.cardLight,
        {
            transform: [
                { translateY },
                {
                    translateY: dragY.interpolate({
                        inputRange: [0, 300],
                        outputRange: [0, 300],
                        extrapolate: "clamp",
                    }),
                },
            ],
        },
    ];

    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            transparent
            animationType="none"
            statusBarTranslucent
            hardwareAccelerated
            presentationStyle="overFullScreen"
            testID={testID}
        >
            <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })} style={styles.flex}>
                {backdrop}

                <View style={styles.centerWrap} pointerEvents="box-none">
                    <Animated.View style={cardStyles} {...pan.panHandlers}>
                        {/* Grabber */}
                        <View style={styles.grabberWrap}>
                            <View style={[styles.grabber, isDark ? styles.grabberDark : styles.grabberLight]} />
                        </View>

                        {/* Header */}
                        {(title || subtitle) && (
                            <View style={styles.header}>
                                {!!title && <Text style={[styles.title, isDark ? styles.textDark : styles.textLight]}>{title}</Text>}
                                {!!subtitle && <Text style={[styles.subtitle, isDark ? styles.mutedDark : styles.mutedLight]}>{subtitle}</Text>}
                            </View>
                        )}

                        {/* Body */}
                        <View style={styles.body}>{children}</View>

                        {/* Actions */}
                        {(primaryAction || secondaryAction) && (
                            <View style={styles.footer}>
                                {secondaryAction && (
                                    <Pressable
                                        accessibilityRole="button"
                                        onPress={secondaryAction.onPress}
                                        style={({ pressed }) => [styles.btn, styles.btnGhost, pressed && styles.pressed]}
                                        testID={`${testID}-secondary`}
                                    >
                                        <Text style={[styles.btnGhostText, isDark ? styles.textDark : styles.textLight]}>{secondaryAction.label}</Text>
                                    </Pressable>
                                )}

                                {primaryAction && (
                                    <Pressable
                                        accessibilityRole="button"
                                        onPress={primaryAction.onPress}
                                        disabled={primaryAction.disabled}
                                        style={({ pressed }) => [
                                            styles.btn,
                                            styles.btnPrimary,
                                            primaryAction.disabled && styles.btnDisabled,
                                            pressed && !primaryAction.disabled && styles.pressed,
                                        ]}
                                        testID={`${testID}-primary`}
                                    >
                                        <Text style={styles.btnPrimaryText}>{primaryAction.label}</Text>
                                    </Pressable>
                                )}
                            </View>
                        )}
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    centerWrap: {
        flex: 1,
        justifyContent: "flex-end", // bottom-sheet vibe; change to "center" for classic modal
        padding: 16,
    },
    backdrop: {
        flex: 1,
        backgroundColor: "#000",
    },
    card: {
        borderRadius: 20,
        paddingBottom: 12,
        overflow: "hidden",
        // iOS shadow
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        // Android shadow
        elevation: 10,
    },
    cardLight: { backgroundColor: "#fff" },
    cardDark: { backgroundColor: "#121212" },

    grabberWrap: { alignItems: "center", paddingTop: 8 },
    grabber: { width: 40, height: 5, borderRadius: 999 },
    grabberLight: { backgroundColor: "#E6E6E6" },
    grabberDark: { backgroundColor: "#2A2A2A" },

    header: { paddingHorizontal: 16, paddingTop: 8, gap: 4 },
    title: { fontSize: 18, fontWeight: "700", letterSpacing: 0.2 },
    subtitle: { fontSize: 14 },
    textLight: { color: "#0B0B0B" },
    textDark: { color: "#F4F4F5" },
    mutedLight: { color: "#6B7280" },
    mutedDark: { color: "#A1A1AA" },

    body: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },

    footer: {
        paddingHorizontal: 12,
        paddingTop: 4,
        paddingBottom: 12,
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-end",
    },
    btn: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    btnGhost: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "transparent",
    },
    btnGhostText: {
        fontSize: 16,
        fontWeight: "600",
    },
    btnPrimary: {
        backgroundColor: "#3B82F6",
    },
    btnPrimaryText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    btnDisabled: {
        opacity: 0.5,
    },
    pressed: {
        transform: [{ scale: 0.98 }],
    },
});
