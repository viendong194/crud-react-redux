import React from 'react';
import {connect} from 'react-redux';
import GameList from './GamesList';
import {fetchGames} from './actions'
class GamesPage extends React.Component{
    componentDidMount(){
        this.props.fetchGames();
    }
    render(){
        return(
            <div>
               <h1>Game List</h1>
               <GameList games={this.props.games}/>
            </div>
        );
    }
}
function mapStateToPros(state){
    return{
        games: state.games
    }
}
export default connect(mapStateToPros,{ fetchGames })(GamesPage);