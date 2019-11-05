import React from 'react';
import './Form.css';
class Form extends React.Component {
  
  state = {

  	colour: 'yellow', //default post-it colour
  	title: '',
  	content: '',
    key: '',
  }


 onSubmit = e => {
    e.preventDefault();
    if (this.state.title === '') {
       this.setState ({ errorMessage: 'Title is required'})
    } else {
       this.props.createPostit(this.state.colour, this.state.title, this.state.content);
       this.setState ({ colour: 'yellow', title: '', content: '', key: '' })
    }
  }


  render() {

  return (
  <div>

{/* Form */}
        <form className='form'>  
        <h3>Add Post-it Note</h3> 

          <input 
            type="text"
            placeholder="Title (required*)"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value})} />

          <input 
            type="text"
            placeholder="Extra Notes"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value})} />

{/* Select Animal Dropdown */}
          <select
          onChange={e => this.setState({ colour: e.target.value})}>
              <option value="" disabled selected>Post-it Colour</option>
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
          </select>

           <button 
          onClick={e => this.onSubmit(e)}>Add Post-it</button>
          
        </form>
    </div>

    );
  }
  }

export default Form;