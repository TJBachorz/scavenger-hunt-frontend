import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faChevronCircleDown
  } from '@fortawesome/free-solid-svg-icons'

function CreatedHunt({
    isThemeArray,
    isItemClicked,
    clickItem,
    unClickItem,
    navigation,
    isHuntTitle
    }) {

    const handleClick = ( item ) => {
        if (isItemClicked !== item.name) {
            clickItem(item.name)
        } else {
            unClickItem(item.name)
        }
    }
    
    const generateHuntList = () => {
        return isThemeArray.map(item => {
            return (
                <View style={styles.listItem} key={item.ID}>
                    <Text 
                        style={styles.text}
                        onPress={() => handleClick(item)}
                        >
                        {item.name} <FontAwesomeIcon icon={ faChevronCircleDown } />
                    </Text>
                    <View>
                        { isItemClicked === item.name ?
                            <Image
                            style={styles.itemImage}
                            source={{uri: item.image}}
                            />
                            : null
                        } 
                    </View> 
                </View>
            )
        })
    }

    const handleSaveList = () => {
        //fetch to local host User Lists and Selected Items
        console.log('one day ill save')
        navigation.navigate('My Hunts')
    }

    return (
        <ImageBackground
            style={styles.image}
            source={require("./blue-sky.jpg")}
        >
        <View style={styles.screenContainer}>
            <ScrollView 
                style={styles.list}
                alignItems= 'center'
                justifyContent= 'flex-start'
            >
                <Text style={styles.h2}>{isHuntTitle}</Text>
                <View style={styles.borderLine}></View>
                {generateHuntList()}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSaveList}
                    >
                        <Text style={styles.buttonText}>Save List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('On The Hunt')}
                    >
                        <Text style={styles.buttonText}>Get New List</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
      isThemeArray: state.setThemeArray,
      isChecked: state.setChecked,
      isItemClicked: state.setItemClicked,
      isHuntTitle: state.setHuntTitle
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        clickItem: (item) => dispatch({
            type: "CLICKED",
            payload: item  
        }),
        unClickItem: () => dispatch({
            type: "UNCLICKED",
            payload: ""
        }),     
    }
  
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreatedHunt);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        backgroundColor: 'rgba(230, 243, 255, .75)',
        borderRadius: 10,
        width: "85%",
        margin: 15,
    },
    listItem: {
        padding: 5,
    },
    itemImage: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'orange',
        width: 200,
        height: 200,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 20
    },
    h2: {
        padding: 20,
        fontSize: 28,
        color: "rgba( 61, 85, 35, 1)", 
        alignSelf: "center"
    },
    borderLine: { 
        borderBottomWidth: 2, 
        borderBottomColor: "rgba(0, 0, 0, .3)",
        marginTop: -20,
        marginBottom: 15, 
        borderStyle: "solid"
    },
    text: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 20,
        padding: 2
    },
    button: {
        borderWidth: 1,
        borderColor: 'rgba(230, 243, 255, .75)',
        borderStyle: "solid",
        borderRadius: 10,
        height: 40,
        justifyContent: "center",
        alignItems: "center",  
        backgroundColor: 'rgba(200, 230, 240, 1)',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5
      },
      buttonText: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 16,
      },
    

})