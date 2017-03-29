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
        
      ],
      showIngredients: false,
      chosenRecipe: {},
      copyRecipe: {},
      editing: false,
      adding: false
    }
  }
  
componentWillMount(){
  if(!localStorage.getItem('recipe')){
  localStorage.setItem('recipe', JSON.stringify(
    [
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
      ]
  ));

  }
  const recipes = JSON.parse(localStorage.getItem('recipe'));
  this.setState({
    recipes
  });
}

findRecipe = (e) => {
  const recipes = JSON.parse(localStorage.getItem('recipe'));
  recipes.forEach(recipe => {
    if(recipe.name === e){
      this.setState({
        //make a copy, that don't point to the same recipe object
        chosenRecipe: JSON.parse(JSON.stringify(recipe)),
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
      chosenRecipe: JSON.parse(JSON.stringify(this.state.copyRecipe))
    });
  }

  deleteOneIng = (ing) => {
    const arr = JSON.parse(JSON.stringify(this.state.chosenRecipe));
    arr.ingredients.splice(arr.ingredients.indexOf(ing), 1);
    this.setState({
      chosenRecipe: arr
    });
  }

  save = (formData) => {
    const newObj = JSON.parse(JSON.stringify(this.state.recipes));
    newObj.forEach(ing => {
      
      //find which recipe element we're updating
      if(ing.name === this.state.chosenRecipe.name){
        
        //change that element with the current updated chosenRecipe
        newObj[newObj.indexOf(ing)].ingredients = formData;
        this.setState({
          chosenRecipe : JSON.parse(JSON.stringify(newObj[newObj.indexOf(ing)])),
          recipes: newObj,
          editing : false
        }, () => {
          console.log(this.state.chosenRecipe);
          localStorage.setItem('recipe', JSON.stringify(this.state.recipes));

        });
      }
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
              <button className=" btn-danger" onClick={() => { this.save()}}>Add A New Recipe</button>
              

              {!this.state.editing ? 
              <Ingredients recipe={this.state.chosenRecipe} edit={this.edit}/> : 
              <EditRecipe recipe={this.state.chosenRecipe} 
                add={this.add} 
                cancel={this.cancel}
                deleteOne={this.deleteOneIng}
                save={this.save}/>}  

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
