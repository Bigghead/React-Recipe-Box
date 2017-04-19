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
                    <div key={ing + index} className='input-group '>
                        <div className="row">
                            <div className="col s9 ">
                                <input  type="text" name={ing + index} className="form-control center-align " defaultValue={ing} required ref={ing + ' hi' + index} />
                            </div>

                            <div className="col s3">
                                <button className="btn waves-effect waves-light red" type="button" onClick={() => this.props.deleteOne(ing)} >Delete!</button>

                            </div>
                        </div>



                    </div>
                );

            });
            return (
                <div className='center-align edit-box'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            {ingredients}
                        </div>


                        <div className="row">
                            <div className='col-xs-6'>
                                <button className="waves-effect waves-light btn lightblue" onClick={() => this.props.add()}>Add A New Ingredient</button>
                                <button className="waves-effect waves-light btn red" onClick={() => this.props.cancel()}>Cancel</button>
                            </div>

                            <div className='col-xs-6'>
                                <button type='submit' className="waves-effect waves-light btn red " >Save Recipe</button>

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