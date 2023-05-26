import { StyleSheet } from 'react-native';
import { Text, ListItem, } from '@rneui/themed';

export default function NotificationCard({ title, description }) {
    return(
        <ListItem containerStyle={styles.container} bottomDivider>
            <ListItem.Content>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{description}</Text>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      message: {
        fontSize: 14,
        color: '#777',
      },
})