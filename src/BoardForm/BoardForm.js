import React from 'react';

class BoardForm extends React.Component {
  
  state = {

  	title: '',
    key: '',
  }


 onSubmit = e => {
    e.preventDefault();
   if (this.state.title === '') { }
   else {
      this.props.createBoard(this.state.title);
      this.setState ({ title: '', key: ''})
    }
  }


  render() {

  return (
  <div>

{/* Form */}
        <form>   
        <h2>Add Board</h2>
          <input 
            type="text"
            placeholder="Title (required*)"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value})} />

           <button 
          onClick={e => this.onSubmit(e)}>Add Board</button>
          
        </form>
    </div>

    );
  }
  }

export default BoardForm;