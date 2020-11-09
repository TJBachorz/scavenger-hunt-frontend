import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'

function MyHunts({
        isHuntListTitles,
        setHuntListId,
        navigation,
        isUser
    }) {

    const handlePress = (id) => {
        setHuntListId(id)
        navigation.navigate("User Hunt")
    }

    const renderHuntListTitles = () => {
        console.log(isUser)
        if (isUser.ID != 0) {
        return (
            isUser.HuntLists.map((list, index) => { 
                console.log(list)
                return (
                    <TouchableOpacity 
                        style={styles.button}
                        key={index}
                        onPress={ () => handlePress(list.ID)}
                    >
                        <Text style={styles.buttonText}>{list.title}</Text>
                    </TouchableOpacity>
                )
            })
        )
        }
    }

    return (
        <ImageBackground
            style={styles.image}
            source={require("./blue-sky.jpg")}
        >
            <View style={styles.screenContainer}>
                <View style={styles.form}>
                    <Text style={styles.h2}>Your Hunts</Text>
                    <Text style={styles.text}>
                        Select a list to get started!
                    </Text>
                    <View style={styles.borderLine}></View>
                    {renderHuntListTitles()}
                </View>
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
        isUserId: state.setUserId,
        isHuntListTitles: state.setHuntListTitles,
        isUser: state.setUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setHuntListId: (id) => dispatch({
            type: "SETID",
            payload: id
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHunts);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    h2: {
        padding: 20,
        fontSize: 28,
        color: "rgba( 61, 85, 35, 1)", 
        alignSelf: "center"
    },
    borderLine: { 
        width: "75%",
        borderBottomWidth: 2, 
        borderBottomColor: "rgba(0, 0, 0, .3)",
        marginTop: -30,
        marginBottom: 35, 
        borderStyle: "solid"
    },
    button: {
        borderWidth: 1,
        borderColor: 'rgba(230, 243, 255, .75)',
        borderStyle: "solid",
        borderRadius: 10,
        width: "75%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",  
        backgroundColor: 'rgba(230, 243, 255, .85)',
        marginTop: 15,
        padding: 10,
      },
      buttonText: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 16,
      },
      form: {
        justifyContent: "flex-start",
        backgroundColor: 'rgba(230, 243, 255, .75)',
        borderRadius: 10,
        height: "100%",
        width: 300,
        alignItems: "center" 
      },
      text: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 18,
      }
})