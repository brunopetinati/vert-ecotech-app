import { Card, Button, Icon } from '@rneui/themed';
import { Text } from 'react-native'

export default function BaseItemCard({title, subtitle, complementarInfo}) {
    return (
        <Card>
            <Text>{complementarInfo}</Text>
            <Text>{title}</Text>
            <Text>{subtitle}</Text>
        </Card>
    )
}