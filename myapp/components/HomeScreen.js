import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const HomeScreen = () => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const number = 5;

  const fetchRecipes = async () => {
    const ingredientsString = ingredientsList.join(",");
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
        params: {
          ingredients: ingredientsString,
          number: number,
          apiKey: 'f649ff29c7db47f0997943636ce3ab7d'
        }
      });
      setRecipes(response.data);
    } catch (error) {
      console.log("Error searching for ingredients:", error);
    }
  };

  useEffect(() => {
    let timeoutID;
    if (showAddedMessage) {
      timeoutID = setTimeout(() => {
        setShowAddedMessage(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [showAddedMessage]);

  useEffect(() => {
    if (ingredientsList.length > 0) {
      fetchRecipes();
    }
  }, [ingredientsList]);

  const renderItem = (item) => {
    // Implement your rendering logic here
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  };

  function searchRecipes() {
    setIngredientsList([...ingredientsList, inputText]);
    setInputText('');
    setShowAddedMessage(true);
  }

  return (
    <View style={styles.homeScreenContainer}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search ingredients"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={searchRecipes}
          />
          <Icon
            style={styles.searchIcon}
            name="search"
            size={20}
            color='gray'
          />
        </View>
      </View>
      <FlatList
        data={recipes}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.recipeContainer}>
        {ingredientsList && showAddedMessage ? (
          <View style={styles.conformationContainer}>
            <Text style={styles.conformationText}>
              {inputText} added
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  searchBarContainer: {
    backgroundColor: 'white',
    paddingTop: 35,
    paddingLeft: 11,
  },
  searchBar: {
    position: 'relative',
    width: 350,
    marginBottom: 7,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 1,
    padding: 10,
    paddingLeft: 30,
  },
  searchIcon: {
    position: 'absolute',
    left: 5,
    top: 10,
  },
  recipeContainer: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  conformationContainer: {
    position: 'absolute',
    bottom: 20,
    height: 40,
    width: 170,
    borderRadius: 10,
    borderColor: '#4CAF50',
    backgroundColor: '#2E6F40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conformationText: {
    fontSize: 18,
    color: "#FCFBF4",
  },
});

export default HomeScreen;
