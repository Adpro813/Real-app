// components/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const HomeScreen = () => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipes, setRecipes] = useState([]); // Retained for future use
  const [inputText, setInputText] = useState('');
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const number = 5;

  const fetchRecipes = async () => {
    const ingredientsString = ingredientsList.join(",");
    console.log("ingredientsString: " + ingredientsString);
    console.log("ingredientsList: " + ingredientsList);

    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
        params: {
          ingredients: ingredientsString,
          number: number,
          apiKey: 'f649ff29c7db47f0997943636ce3ab7d' // Consider moving this to environment variables
        }
      });
      const data = response.data;
      setRecipes(data); 
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

  const searchRecipes = () => {
    if (inputText.trim() === '') {
      return; // Prevent adding empty ingredients
    }
    setIngredientsList([...ingredientsList, inputText.trim()]);
    setInputText('');
    setShowAddedMessage(true);
  };

  return (
    <View style={styles.homeScreenContainer}>
      <View style={[styles.searchBarContainer, { backgroundColor: 'white' }]}>
        <View style={styles.searchBar}>
          <TextInput
            style={[styles.input, { paddingLeft: 30 }]}
            placeholder="Search ingredients"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={searchRecipes}
          />
            <Icon
              style={[styles.iconContainer, { right: 312 }]}
              name="search"
              size={20}
              color='gray'
            />
        </View>
      </View>

      

      <View style={styles.recipeContainer}>
        {showAddedMessage && ingredientsList.length > 0 && (
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
              {ingredientsList[ingredientsList.length - 1]} added
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  searchBarContainer: {
    flex: 2,
    backgroundColor: '#FAF0E6',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
    paddingRight: 40,
  },
  iconContainer: {
    padding: 10,
    position: 'absolute',
    right: 5,
  },
  recipeContainer: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  confirmationContainer: {
    position: 'absolute',
    bottom: 20,
    height: 40,
    width: 170,
    borderRadius: 10,
    borderColor: '#4CAF50',
    backgroundColor: '#2E6F40',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 18,
    color: "#FCFBF4",
  },
  // Removed recipeItem style since it's no longer used
});

export default HomeScreen;
