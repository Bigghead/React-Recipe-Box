import React from 'react';
import '../App.css'

const Ingredients = (props) => {
    if (props.recipe.ingredients) {
        const ingredients = props.recipe.ingredients.map((ing, index) =>{
            return <li key={index} className='list-group-item'>{ing} 
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
        return <ul></ul>;
    }

};

export default Ingredients;