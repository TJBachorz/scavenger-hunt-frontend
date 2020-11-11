import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Alert, TouchableOpacity, StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faChevronCircleDown
  } from '@fortawesome/free-solid-svg-icons'
import { CheckBox } from 'react-native-elements'


function UserHunt({
        navigation,
        isItemClicked,
        clickItem,
        unClickItem,
        isHuntTitle,
        setHuntTitle,
        isHuntListId,
        isUserId,
        isChecked,
        setChecked,
        setUnChecked,
        isUser,
        isUserListId,
    }) {

    const handleClick = ( item ) => {
        if (isItemClicked !== item.name) {
            clickItem(item.name)
        } else {
            unClickItem(item.name)
        }
    }

    const handleCheck = ( event, item ) => {
        event.preventDefault()
        if (isChecked.includes(item.name)) {
          setUnChecked(item.name)
        } else {
          setChecked(item.name)
        }
    }

    const generateHuntList = () => {
        console.log("user", isUser)
        console.log("user list id", isUserListId)
        console.log("hunt list id", isHuntListId)
        return isUser.HuntLists.map(list => {
            if (list.ID === isHuntListId) {
                setHuntTitle(list.title)
                console.log("current list", list)
                return list.HuntItems.map(item => {
                    return (                    
                        <View style={styles.listItem} key={item.ID}>
                            <CheckBox
                                checked={isChecked.includes(item.name) ? true : false}
                                onPress={(event) => handleCheck(event, item)}
                                containerStyle={styles.checkbox}
                                uncheckedColor= 'rgba(51, 156, 255, 1)'
                            />
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
        })
            
    }

    const handleUpdateList = () => {
        fetch(`http://localhost:7000/update-user-list/${isUserListId}`, {
            method: "PUT",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                CheckedItem: isChecked
            })
        }).then(navigation.navigate("My Hunts"))
    }

    const triggerDelete = () => {
        Alert.alert(
            "Are you sure you want to delete?",
            "",
            [
                {
                    text: "Yes",
                    onPress:(handleDeleteList)
                },
                {
                    text: "No",
                    onPress: () => console.log("not doing anything")
                }
            ],
            { cancelable: false }
        )
    }

    const handleDeleteList = () => {
        fetch(`http://localhost:7000/delete-user-list/${isUserListId}`, {
            method: "DELETE"
        }).then(response => response.json())
            .then(navigation.navigate("My Hunts"))
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
                            onPress={handleUpdateList}
                        >
                            <Text style={styles.buttonText}>Update List</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={triggerDelete}
                        >
                            <Text style={styles.buttonText}>Delete Hunt</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('My Hunts')}
                        >
                            <Text style={styles.buttonText}>Upgrade me back button</Text>
                        </TouchableOpacity>
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
      isHuntTitle: state.setHuntTitle,
      isHuntListId: state.setHuntListId,
      isUserId: state.setUserId,
      isItemIds: state.setItemId,
      isHuntListTitles: state.setHuntListTitles,
      isUser: state.setUser,
      isUserListId: state.setUserListId,
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
        setItemId: (id) => dispatch({
            type: "SETITEMID",
            payload: id
        }),
        setChecked: (name) => dispatch({
            type: "CHECK",
            payload: name
        }),
        setUnChecked: (name) => dispatch({
            type: "UNCHECK",
            payload: name
        }),
        
        setHuntTitle: (title) => dispatch({
            type: "SETTITLE",
            payload: title
        }),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHunt);

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
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "85%"
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
        padding: 20,
        justifyContent: "center",
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
        borderStyle: "solid",
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
    checkbox: {
        width: 5
      },
})