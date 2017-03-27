import React from 'react';

const Ingredients = (props) => {
    if (props.recipe) {
        const ingredients = props.recipe.ingredients.map(ing =>{
            return <li key={ing} className='list-group-item'>{ing}</li>
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