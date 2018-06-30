import React from 'react';
import GameCard from './GameCard';
export default function GameList({games}){
  console.log(games)
  const emptyMessage = (
      <p>No games in your collection</p>
  )
  const gameList = (
      <div className="ui four cards">
        {games.map(game=><GameCard game={game} key={game._id}/>)}
      </div>
  )
  return(
      <div>
        {games.length === 0 ? emptyMessage:gameList}
      </div>
  )
}