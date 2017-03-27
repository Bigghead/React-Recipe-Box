import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ingredients from './components/Ingredients'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipes: [
        {
          name: 'Pumpkin Pie',
          ingredients: [
            'Pumpkin Puree',
            'Sugar',
            'Powdered Donuts'
          ]
        },
        {
          name: 'Spaghetti',
          ingredients: [
            'Spaghetti',
            'Marinara Sauce',
            'Sugar',
            'Powdered Donuts'
          ]
        }
      ],
      showIngredients: false,
      choseRecipe: {},
      edit: false
    }
  }

findRecipe = (e) => {
  console.log('hi');
  this.state.recipes.forEach(recipe => {
    if(recipe.name === e){
      console.log(recipe);
      this.setState({
        chosenRecipe: recipe
      });
    }
  });
}
  
  renderRecipeNames = () => {
    if (this.state.recipes) {
      return this.state.recipes.map(recipe => {
        return (
          <div className="well" key={recipe.name} onClick={ () => {this.findRecipe(recipe.name)}}>
            {recipe.name}
          </div>

        );
      });
    }
  }



  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 text-center">
              <div className="jumbotron">
                {this.renderRecipeNames()}
              </div>

              {!this.state.edit ? <Ingredients recipe={this.state.chosenRecipe}></Ingredients> : <div></div>}  

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
