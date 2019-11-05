import React, { Component } from 'react';
import './App.css';
import BoardForm from './BoardForm/BoardForm'; 
import Board from './Board/Board';


class App extends Component {
  state = {
    boards: [],
    boardToEdit: undefined,
    postToMove: undefined,
    moveToBoard: undefined
  }
createBoard = (title) => {
    let boards = [...this.state.boards]
    let newBoard = {}
    newBoard.title = title;
    newBoard.key = title + Math.random() 
    boards.push(newBoard)
  this.setState({ boards: boards })
}
  removeBoardByKey = (key) => {
    let boards = [...this.state.boards]
    let newBoardArray = []
    boards.forEach((board) => {
      if (board.key !== key) {  newBoardArray.push(board) }})
    return newBoardArray
  }
  onDragStart = (key) => {
    let boardToEdit = this.setEditStatusByKey(key)
    this.setState({ boardToEdit: boardToEdit })
  }
  setEditStatusByKey = (key) => {
    let boards = [...this.state.boards]
    let boardToEdit 
    boards.forEach((board) => {
      if (board.key === key) { boardToEdit = board }})
    return boardToEdit
  }
  onDrop = () => {
    let key = this.state.boardToEdit.key
    let newBoardArray = this.removeBoardByKey(key)
    this.setState({ boards: newBoardArray })
    this.setState({ boardToEdit: undefined })
  }
  onDragOver = (e) => {
    e.preventDefault()
  }
  getPostit = (Postit) => {
    this.setState({ postToMove: Postit })
  }
  getBoard = (key) => {
    this.setState({ moveToBoard: key })
  }

  render() {

//THE RETURN BLOCK
    return (
      <div className = 'App'>
        <header className='App-header'>
          <h1>ToDo App</h1>
          <div className='Heading'
          onDrop={() => this.onDrop()}
          onDragOver={(e) => this.onDragOver(e)}
        >
          <h4> DRAG TO THIS BOX TO DELETE A BOARD </h4>
        </div>
        </header>
        
        <BoardForm createBoard={this.createBoard}/>
        <div className='BoardList'>
          {
            this.state.boards.map((board) => {
              return (
                <Board
                  title={board.title}
                  key={board.key}
                  onDragStart={(key) => this.onDragStart(board.key)}
                  getBoard={this.getBoard}
                  getPostit={this.getPostit}
                  postToMove={this.state.PostToMove}
                  toBoard={this.state.toBoard}
                />
              );
            })
            .reverse()
          }
        </div>
      </div>
    );
  }
}

export default App;