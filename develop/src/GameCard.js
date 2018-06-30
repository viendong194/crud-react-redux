import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteGame} from './actions'

class GameCard extends React.Component{
  render(){
    return(
        <div className="ui card">
          <div className="image">
            <img src={this.props.game.cover} alt={this.props.game.title}/>
          </div>
          <div className="content">
            <div className="header">{this.props.game.title}</div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <Link to={`/games/${this.props.game._id}`} className="ui basic button green">Edit</Link>
              <div className ="ui basic button red" onClick={()=>this.props.deleteGame(this.props.game._id)}>Delete</div>
            </div>
          </div>
        </div>
    )
  }
  
}
export default connect(null,{deleteGame})(GameCard);