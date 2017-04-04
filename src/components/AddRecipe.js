import React, { Component } from 'react';

class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {


            name: '',
            ingredients: []

        }
    }

    addLine = () => {
        const newArr = JSON.parse(JSON.stringify(this.state.ingredients));

        newArr.push('');
        this.setState({
            ingredients: newArr
        });
    }

    deleteOne = (ing) => {
        const newArr = JSON.parse(JSON.stringify(this.state.ingredients));
        newArr.splice(newArr.indexOf(ing), 1);
        this.setState({
            ingredients : newArr
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newIng = {
            name: '',
            ingredients: []
        };
        console.log(this.refs);
        for (var key in this.refs) {
            console.log(key);
            if(key === 'title'){
                newIng.name = this.refs[key].value;
            } else {
                newIng.ingredients.push(this.refs[key].value);
                console.log(newIng.ingredients);
            }
        }

        this.props.saveRecipe(newIng);
        this.props.cancelAdd();
        
        console.log(newIng);
    }

    Ingredients = () => {
        if (this.state.ingredients.length === 0) {
            return (
                <div className='input-group'>
                    <input type="text" className="form-control " ref='ing'required />
                    <span className="input-group-btn ">
                        <button className="btn-sm btn-danger" type="button"  >New!</button>
                    </span>
                </div>
            );
        } else {
            return this.state.ingredients.map((ing, index) => {
                return (
                    <div className='input-group' key={index}>
                        <input type="text" className="form-control " required ref={ing + index} />
                        <span className="input-group-btn ">
                            <button className="btn-sm btn-danger" type="button" onClick={() => this.deleteOne(ing)} >Delete!</button>
                        </span>
                    </div>
                );
            })
        }
    }
    render() {


        return (
            <div className='text-center edit-box'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text" placeholder='Title' ref='title' required />
                        {this.Ingredients()}
                    </div>


                    <div className="row">
                        <div className='col-sm-6 '>
                            <button className="btn-lg btn-info" onClick={() => this.addLine()}>Add A New Ingredient</button>
                            <button className="btn-lg btn-danger" onClick={ () => this.props.cancelAdd() }>Cancel</button>
                        </div>

                        <div className='col-sm-6'>
                            <button type='submit' className="btn-lg btn-danger " >Save Recipe</button>

                        </div>

                    </div>
                </form>





            </div>
        );
    }
}

export default AddRecipe;