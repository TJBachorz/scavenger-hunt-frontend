import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'

function MyHunts({
        setHuntListId,
        navigation,
        isUser,
        isUserId,
        setCheckedGroup,
        setUserListId,

    }) {

    const handlePress = (id) => {
        fetch(`http://localhost:7000/user-lists/${isUserId}/${id}`)
            .then(response => response.json())
            .then(data => {
                    setUserListId(data[0].ID)
                    setCheckedGroup([...data[0].CheckedItem])
            })
        setHuntListId(id)
        navigation.navigate("User Hunt")
    }

    const renderHuntListTitles = () => {
        console.log("when generated", isUser)
        if (isUser.ID != 0 && isUser.HuntLists != null) {
        return (
            isUser.HuntLists.map((list, index) => { 
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
                <ScrollView 
                    style={styles.form}
                    justifyContent= "flex-start"
                    alignItems= "center"

                >
                    <Text style={styles.h2}>Your Hunts</Text>
                    <Text style={styles.text}>
                        Select or create a list to get started!
                    </Text>
                    <View style={styles.borderLine}></View>
                    {renderHuntListTitles()}
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
        isUser: state.setUser,
        isUserId: state.setUserId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setHuntListId: (id) => dispatch({
            type: "SETID",
            payload: id
        }),
        setUserListId: (id) => dispatch({
            type: "SETUSERLISTID",
            payload: id
        }),
        setCheckedGroup: (array) => dispatch({
            type: "CHECKGROUP",
            payload: array
        }),
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
        backgroundColor: 'rgba(230, 243, 255, .75)',
        borderRadius: 10,
        height: "100%",
        width: "75%",
        margin: 15 
      },
      text: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 18,
      }
})