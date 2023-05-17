import { Text } from "@rneui/themed";
import { StyleSheet, View, Image } from "react-native"
import MaskInput from 'react-native-mask-input';

export default function VertMaskInput({setChanges, value, setValue, leftIcon, mask, keyboardType, label, maxLength}) {
    return(
        <View style={styles.inputContainer}>
            {label && <Text style={styles.label}>{label}</Text>}
            
            <View style={styles.horizontalBox}>
                {leftIcon && leftIcon}
                <MaskInput
                    keyboardAppearance="default"
                    maxLength={maxLength}
                    style={styles.input}
                    keyboardType={keyboardType}
                    mask={mask} 
                    value={value}
                    onChangeText={(masked) => {
                        setChanges(true)
                        setValue(masked)
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        padding: 8,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    horizontalBox: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        marginLeft: 8,
        width: '90%',
        fontSize: 16,
        borderBottomWidth: 1,
    }
})