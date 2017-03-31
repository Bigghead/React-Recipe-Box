import React from 'react';
import '../App.css'

const Ingredients = (props) => {
    //console.log(props.recipe.ingredients);
    let ingredients; 
    if (props.recipe.ingredients) {
        ingredients = props.recipe.ingredients.map((ing, index) =>{
            return <li key={ing + index} className='list-group-item'>{ing} 
                    </li>
        }); 
        return (
            <div>
            <ul className="list-group">
                {ingredients}
            </ul>
            <button className='btn btn-info' onClick={() => props.edit()}>Edit</button>
            <button className="btn btn-danger">Delete</button>
            </div>
        );
   
    } else {
        return  null;
    }
};

export default Ingredients;