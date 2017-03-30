import React, { Component } from 'react';
import '../App.css';


class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.props.recipe.ingredients
        }
    }



    handleSubmit(e) {
        e.preventDefault();
        const formData = [];
        for (const field in this.refs) {
            formData.push(this.refs[field].value);
        }
        this.setState({
            ingredients: formData
        }, () => {
            this.props.save(this.state.ingredients);
        });
    }

    render() {


        if (this.props.recipe.ingredients) {
            console.log('In Edit ' + this.props.recipe.ingredients);
            const ingredients = this.props.recipe.ingredients.map((ing, index) => {

                return (
                    <div key={ing + index} className='input-group'>
                        <input type="text" name={ing + index} className="form-control " defaultValue={ing} required ref={ing + ' hi' + index} />
                        <span className="input-group-btn ">
                            <button className="btn-sm btn-danger" type="button" onClick={() => this.props.deleteOne(ing)} >Delete!</button>
                        </span>

                    </div>
                );

            });
            return (
                <div className='text-center edit-box'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            {ingredients}
                        </div>


                        <div className="row">
                            <div className='col-xs-6 pull-left'>
                                <button className="btn-lg btn-info" onClick={() => this.props.add()}>Add A New Ingredient</button>
                                <button className="btn-lg btn-danger" onClick={() => this.props.cancel()}>Cancel</button>
                            </div>

                            <div className='col-xs-6'>
                                <button type='submit' className="btn-lg btn-danger " >Save Recipe</button>

                            </div>

                        </div>
                    </form>





                </div>
            );
        } else {
            return null;
        }
    }

};

export default EditRecipe;