import React from 'react';
import '../App.css';


const EditRecipe = (props) => {
     if (props.recipe) {
         const ingredients = props.recipe.ingredients.map(ing => {
             return  <input key={ing} type="text" className="form-control" defaultValue={ing}/>
         });
        return (
            <div className='text-center'>
                <form >
                    <div className="form-group">
                       {ingredients}
                    </div>
                </form>
                <button className="btn" onClick={() => props.add()}>Edit</button>
                <button className="btn" onClick={() => props.cancel()}>Cancel</button>

            </div>
        );
    } else {
        return <div>Fail</div>
    }

};

export default EditRecipe;