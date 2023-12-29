import { View, Text } from "react-native";
import { map } from "lodash";

//components
import { OrderDetail } from "./OrderDetail";
//Styles
import { StyleSheet } from "react-native";


export function OrderList(props) {
  const { orders } = props;

  return (
    <View style={styles.container}>
      {map(orders, (order) => (
       <OrderDetail key={order.id} order={order} />
      ))}
    </View>
  );
}



export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
  },
});