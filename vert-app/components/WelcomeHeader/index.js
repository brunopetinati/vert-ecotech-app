import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Height, Width } from "../../constants/dimensions";
import { Badge } from "@rneui/themed";

export default function WelcomeHeader({ userName, notifications }) {
    return (
        <View style={styles.header}>
            <View style={styles.greetings}>
                <Text style={styles.bigText}>{`Hello, ${userName}`}</Text>
                <Text style={styles.smallText}>Welcome back</Text>
            </View>
            <View>
                {notifications && <Badge
                    status="primary"
                    value={notifications}
                    containerStyle={{ position: 'absolute', top: -10, left: 20 }}
                />}
                <Ionicons style={styles.notificationIcon} size={32} name="notifications-outline" color='#93bf85'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomColor: '#93bf85',
        borderBottomWidth: 1,
        padding: 32,
        flexDirection: 'row',
        alignItems: 'center',
        width: Width,
        height: Height*0.2,
    },
    greetings: {
        width: '90%',
    },
    bigText: {
        fontSize: Width*0.1
    },
    smallText: {
        fontSize: Width*0.05,
    },
    notificationIcon: {

    }
})