import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//========COMPONENTS=======
import Ingredients from './components/Ingredients';
import EditRecipe from './components/Edit';
import AddNew from './components/AddNew';
import AddRecipe from './components/AddRecipe';

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

  componentWillMount() {
    if (!localStorage.getItem('recipe')) {
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
      if (recipe.name === e) {
        this.setState({
          adding: false,
          //make a copy, that don't point to the same recipe object
          //chosenRecipe: JSON.parse(JSON.stringify(recipe)),
          chosenRecipe: Object.assign({}, recipe),
          copyRecipe: JSON.parse(JSON.stringify(recipe))
        });
      }
    });
  }

  renderRecipeNames = () => {
    if (this.state.recipes) {
      return this.state.recipes.map((recipe, index) => {
        return (
          <div className="card blue-grey darken-1 center-align" key={recipe.name + index}>
            <div className="card-content white-text"  >
              <a className='card-title' onClick={() => { this.findRecipe(recipe.name) }}>{recipe.name}</a>
            </div>

          </div>

        );
      });
    }
  }

  currentlyAdding = () => {
    this.setState({
      adding: true
    });
  }

  cancelCurrentlyAdding = () => {
    this.setState({
      adding: false
    });
  }


  addRecipe = () => {
    if (this.state.adding && !this.state.editing) {
      return <AddRecipe
        add={this.add}
        saveRecipe={this.saveRecipe}
        cancelAdd={this.cancelCurrentlyAdding}
      ></AddRecipe>;
    } else {
      return null;
    }
  }

  saveRecipe = (recipeObj) => {
    let sameRecipe = false;
    this.state.recipes.forEach(recipe => {
      if (recipe.name === recipeObj.name) {
        sameRecipe = true;
      }
    });
    if (sameRecipe) {
      return;
    }
    const newRecipe = JSON.parse(JSON.stringify(this.state.recipes));
    newRecipe.push(recipeObj);
    this.setState({
      recipes: JSON.parse(JSON.stringify(newRecipe))
    }, () => {
      localStorage.setItem('recipe', JSON.stringify(this.state.recipes));
    });
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
      if (ing.name === this.state.chosenRecipe.name) {

        //change that element with the current updated chosenRecipe
        newObj[newObj.indexOf(ing)].ingredients = formData;
        this.setState({
          chosenRecipe: JSON.parse(JSON.stringify(newObj[newObj.indexOf(ing)])),
          recipes: newObj,
          editing: false
        }, () => {
          localStorage.setItem('recipe', JSON.stringify(this.state.recipes));

        });
      }
    });
  }




  render() {
    return (
      <div className="App">
        <div className="container center-align">
          <div className="row">
            <div className="col s12 text-center">
              <div className="">
                {this.renderRecipeNames()}
              </div>
              <button className=" waves-effect waves-light btn" onClick={() => { this.currentlyAdding() }}>Add A New Recipe</button>

              {this.addRecipe()}

              {!this.state.editing ?

                this.state.adding ? null :
                  <Ingredients recipe={this.state.chosenRecipe} edit={this.edit} /> :
                <EditRecipe recipe={this.state.chosenRecipe}
                  add={this.add}
                  cancel={this.cancel}
                  deleteOne={this.deleteOneIng}
                  save={this.save} />}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
