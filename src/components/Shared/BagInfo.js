import { View, Text, Image, TextInput } from "react-native";
//Styles
import { StyleSheet } from "react-native";

//utils
import { fn } from "../../utils";

//hooks
import { useBag } from "../../hooks";
import { Button, IconButton } from "react-native-paper";

export function BagInfo(props) {
  const { product } = props;
  const {deleteProduct,increase,decrease}=useBag()
  const mainImagen = product.main_image.data.attributes.url;

  const onDelete = () => deleteProduct(product.id);
  const onIncrease=()=> increase(product.id)
  const onDecrease=()=> decrease(product.id)
  return (
    <View style={styles.container}>
           <View style={styles.imageContainer}>
        <Image source={{ uri: mainImagen }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <View>
                <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.title}
                </Text>
          <View style={styles.prices}>
                <Text style={styles.currentPrice}>
              {fn.calcPrice(product.price, product.discount)}€ / each
                </Text>
          </View>

        </View>

        <View style={styles.actions}>
           <View style={styles.selectQuantity}>
              <IconButton   icon="plus" iconColor="#fff"
               size={19} style={styles.btnQuantity}
               onPress={onIncrease}
               />

                <TextInput value={product.qty.toString()} style={styles.inputQuantity} />

                <IconButton   icon="minus" iconColor="#fff"
               size={19} style={styles.btnQuantity}
               onPress={onDecrease}
               />
            </View> 
            <Button
            mode="contained"
            style={styles.btnDelete}
            onPress={onDelete}
          >
            Delete
          </Button>
        </View>
    </View>
    </View>
  );
}


const styles= StyleSheet.create({
 

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#dadde1",
      },
      imageContainer: {
        width: "40%",
        height: 170,
        backgroundColor: "#ebebeb",
        padding: 5,
      },
      image: {
        height: "100%",
        resizeMode: "cover",
      },
      infoContainer: {
        padding: 10,
        width: "60%",
        justifyContent: "space-between",
      },
      name: {
        fontSize: 16,
        fontWeight: "bold",
      },
      prices: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "flex-end",
      },
      currentPrice: {
        fontSize: 18,
        color: "#b12704",
      },
      actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        width: "100%",
      },
      selectQuantity: {
        flexDirection: "row",
        alignItems: "center",
      },
      btnQuantity: {
        backgroundColor: "#0D2601",
        borderRadius: 5,
        margin: 0,
      },
      inputQuantity: {
        paddingHorizontal: 10,
        fontSize: 16,
      },
      btnDelete: {
        backgroundColor: "#D96941",
        borderRadius: 5,
      },
})