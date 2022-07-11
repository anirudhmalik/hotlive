import React from "react";
import { View, StyleSheet,} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from "../../config/colors";

function ProductCard({ size, rating }) {
    let stars = [];
    for (var i = 1; i <= 5; i++) {        
        let name = "star";
        if (i > rating) {
            name = "star-outline";
        }
        stars.push((<Icon key={i} name={name} color={colors.lightGreenLow} size={size} />));
    }
  return (
      <View style={styles.container}> 
          { stars }
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
     flexDirection:"row"
    }
});

export default ProductCard;
