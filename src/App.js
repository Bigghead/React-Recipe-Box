import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ingredients from './components/Ingredients';
import EditRecipe from './components/Edit';
import AddNew from './components/AddNew'

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
      chosenRecipe: {},
      copyRecipe: {},
      editing: false,
      adding: false
    }
  }

findRecipe = (e) => {
  this.state.recipes.forEach(recipe => {
    if(recipe.name === e){
      this.setState({
        chosenRecipe: recipe,
        copyRecipe: JSON.parse(JSON.stringify(recipe))
      });
    }
  });
}
  
  renderRecipeNames = () => {
    if (this.state.recipes) {
      return this.state.recipes.map(recipe => {
        return (
          <div className="well" key={recipe.name} >
            <a onClick={ () => {this.findRecipe(recipe.name)}}>{recipe.name}</a>
          </div>

        );
      });
    }
  }

  edit = () => {
    this.setState({
      editing: true
    });
  }

  add = () => {
    const arr = this.state.chosenRecipe;
    arr.ingredients.push('');
    this.setState({
      chosenRecipe: arr
    });
  }

  cancel = () => {
    this.setState({
      editing: false,
      chosenRecipe: this.state.copyRecipe
    });
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
              <button className=" btn-danger" onClick={() => {this.setState({ adding: true})}}>Add A New Recipe</button>
              

              {!this.state.editing ? 
              <Ingredients recipe={this.state.chosenRecipe} edit={this.edit}/> : 
              <EditRecipe recipe={this.state.chosenRecipe} add={this.add} cancel={this.cancel}/>}  

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
