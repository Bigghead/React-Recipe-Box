import React from 'react';

const AddNew = (props) => {
    return (
         <div className='text-center'>
                <form >
                    <div className="form-group">
                       <input type="text" className="form-control"/>
                    </div>
                </form>
                <button className="btn-info" onClick={props.add()}>Add</button>

            </div>
    );
};

export default AddNew;