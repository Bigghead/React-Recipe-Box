import React from 'react';
import '../App.css';


const EditRecipe = (props) => {
    if (props.recipe.ingredients) {
        console.log('In Edit ' + props.recipe.ingredients);
        const ingredients = props.recipe.ingredients.map((ing, index) => {

            return (
                <div key={ing + index} className='input-group'>
                    <input   type="text" className="form-control " defaultValue={ing} required  />
                     <span className="input-group-btn ">
                        <button className="btn-sm btn-danger" type="button" onClick={ () => props.deleteOne(ing)} >Delete!</button>
                    </span>

                </div>
            );
            
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