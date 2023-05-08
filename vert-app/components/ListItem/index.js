import { StyleSheet, TouchableOpacity } from "react-native";
import { Height, Width } from "../../constants/dimensions";

export default function ListItem({children}) {
    return(
        <TouchableOpacity style={styles.container}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: Height*0.2,
    width: Width*0.9,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
})