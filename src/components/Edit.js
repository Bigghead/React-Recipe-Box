import React from 'react';
import '../App.css';


const EditRecipe = (props) => {
     if (props.recipe.ingredients) {
         const ingredients = props.recipe.ingredients.map((ing, index) => {
             return  <input key={index} type="text" className="form-control" defaultValue={ing} required/>
         });
        return (
            <div className='text-center'>
                <form >
                    <div className="form-group">
                       {ingredients}
                    </div>
                </form>
                <button className="btn" onClick={() => props.add()}>Add</button>
                <button className="btn" onClick={() => props.cancel()}>Cancel</button>

            </div>
        );
    } else {
        return (
            <div className='text-center'>
                Fail

            </div>
        );
    }

};

export default EditRecipe;