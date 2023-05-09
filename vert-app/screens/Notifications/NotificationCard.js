import { Text } from "@rneui/themed"
import { View, StyleSheet } from "react-native"

export default function NotificationCard(title, description) {
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderWidth: 3,
        borderColor: '#00AE00',
        marginVertical: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    description: {

    },
})