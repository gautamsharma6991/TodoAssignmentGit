import React, { Component } from 'react';
import './Board.css';
import Postit from '../Postit/Postit';
import UpdateForm from '../UpdateForm/UpdateForm';
import Form from '../Form/Form'; 

class Board extends Component {
  state = {
    postits: [],
    toggleEditScreen: false,
    postToEdit: undefined,
  }
  removePostByKey = (key) => {
    let postits = [...this.state.postits]
    let newPostitsArray = []
    postits.forEach((post) => {
      if (post.key !== key) {  newPostitsArray.push(post) }})
    return newPostitsArray
  }


  setEditStatusByKey = (key) => {
    let postits = [...this.state.postits]
    let postToEdit 
    postits.forEach((post) => {
      if (post.key === key) { postToEdit = post }})
    return postToEdit
  }

  // FINDS DRAGGED POST AND SAVES IT READY FOR DELETE
  onDragStart = (key) => {
    let postToEdit = this.setEditStatusByKey(key)
    this.setState({ postToEdit: postToEdit })
    this.props.getPostit(postToEdit)
  }


  //FINDS POST AND SAVES IT READY FOR EDIT, AND TOGGLES EDIT SCREEN
  findPostToEdit = (key) => {
    let postToEdit = this.setEditStatusByKey(key)
    this.setState ({ postToEdit: postToEdit, toggleEditScreen: true })
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  //CREATE
  createPostit = (colour, title, content) => {
    let postits = [...this.state.postits]
    let newPost = {}
    newPost.title = title; newPost.content = content; newPost.colour = colour
    newPost.key = title + Math.random() 
    postits.push(newPost)
    this.setState ({ postits: postits})
  }

  //UPDATE
  updatePostIt = (colour, title, content) => {
    let postToEdit = this.state.postToEdit
    let postits = this.removePostByKey(postToEdit.key)
    postToEdit.colour = colour; postToEdit.title = title; postToEdit.content = content
    postits.push(postToEdit)
  this.setState ({ postits: postits, toggleEditScreen: false})
  }

  //DELETE POST
  onDrop = () => {
    if (this.state.postToEdit) {
      let key = this.state.postToEdit.key
    let newPostitsArray = this.removePostByKey(key)
    this.setState({ postits: newPostitsArray })
    this.setState({ postToEdit: undefined })
    }
  }
  sendBoard = () => {this.props.getBoard(this.props.key)}
  
  render() {
    let editScreen
    if (this.state.toggleEditScreen) {
      editScreen = 
        <UpdateForm 
          colour={this.state.postToEdit.colour}
          title={this.state.postToEdit.title}
          content={this.state.postToEdit.content}
          key={this.state.postToEdit.key} 
          updatePostIt={this.updatePostIt}
        />
    }
    if (this.props.toBoard) {
      if (this.props.toBoard === this.props.key) {
        let newPostits = this.state.postits
        newPostits.push(this.props.postToMove)
        this.setState({postits:newPostits})
      }
    }
    
    return (
      <div
        draggable
        onDragStart={() => this.props.onDragStart(this.props.key)}
        className='Board'>
        <div className='BoardHeading'
          onDrop={() => this.onDrop()}
          onDragOver={(e) => this.onDragOver(e)}
        >
          <h3>{this.props.title}</h3>
            <h4> DRAG TO THIS BOX TO DELETE A POST </h4>
        </div>
        <div className='BoardHeading'
          onDrop={() => this.sendBoard()}
          onDragOver={(e) => this.onDragOver(e)}
        >
          <h3>{this.props.title}</h3>
            <h4> DRAG TO THIS BOX TO DELETE A POST </h4>
        </div>
        
        <Form createPostit={this.createPostit}/>
        <div>
          { 
            this.state.postits.map((postit) => {
              return (
                <Postit
                colour={postit.colour}
                title={postit.title}
                content={postit.content}
                key={postit.key}
                onClick={(key) => this.findPostToEdit(postit.key)}
                onDragStart={(key) => this.onDragStart(postit.key)}/>
              );
            })
            .reverse()
            
          }
        </div>
        {editScreen}
      </div>
    );
  };
}

export default Board;
