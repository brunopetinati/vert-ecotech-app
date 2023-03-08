import { StyleSheet, SafeAreaView, View } from "react-native";
import { Button, Input, Text } from '@rneui/themed';
import { Height, Width } from "../../constants/dimensions";
import { Ionicons } from '@expo/vector-icons';

export default function Login({navigation}) {

    function handleLogin(email, password) {
      navigation.navigate('CarbonCreditProjects')
    }

    return(
        <SafeAreaView style={styles.loginBox}>
          <View style={styles.loginArea}>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="person-outline" />} placeholder="email" />
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="key-outline" />} rightIcon={<Ionicons color='#93bf85' size={20} name="eye-outline" />} secureTextEntry={true}  placeholder="senha" />
            <Text>Esqueceu sua senha ?</Text>
            <Button containerStyle={{marginVertical: 16}} onPress={handleLogin}>Login</Button>
            <Button type='outline' onPress={() => navigation.navigate('Register')}>Cadastrar</Button>
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
      marginVertical: 16,
      fontSize: 16,
    },
    loginBox: {
      flex: 1, 
      justifyContent: "center",
      alignItems: "center",
    },
    loginArea: {
      padding: 16,
      width: Width*0.8 
    }
})