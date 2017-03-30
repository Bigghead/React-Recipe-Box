import React, { Component } from 'react';

class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {


            title: '',
            ingredients: []

        }
    }

    addLine = () => {
        const newArr = JSON.parse(JSON.stringify(this.state.ingredients));
        //console.log(newArr);

        newArr.push('');
        this.setState({
            newRecipe: newArr
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newIng = [];
        for (var key in this.refs) {
            if (key !== 'title') {
                newIng.push(this.refs[key].value);
            }
        }
        this.setState({
                title: this.refs.title
        }, () => {
            console.log(this.state.newRecipe);
        })
        console.log(newIng);
    }

    Ingredients = () => {
        if (this.state.ingredients.length === 0) {
            return (
                <div className='input-group'>
                    <input type="text" className="form-control " required />
                    <span className="input-group-btn ">
                        <button className="btn-sm btn-danger" type="button" onClick={() => this.props.deleteOne()} >Delete!</button>
                    </span>
                </div>
            );
        } else {
            return this.state.ingredients.map((ing, index) => {
                return (
                    <div className='input-group' key={index}>
                        <input type="text" className="form-control " required ref={ing + index} />
                        <span className="input-group-btn ">
                            <button className="btn-sm btn-danger" type="button" onClick={() => this.props.deleteOne()} >Delete!</button>
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
                        <div className='col-xs-6 pull-left'>
                            <button className="btn-lg btn-info" onClick={() => this.addLine()}>Add A New Ingredient</button>
                            <button className="btn-lg btn-danger" >Cancel</button>
                        </div>

                        <div className='col-xs-6'>
                            <button type='submit' className="btn-lg btn-danger " >Save Recipe</button>

                        </div>

                    </div>
                </form>





            </div>
        );
    }
}

export default AddRecipe;