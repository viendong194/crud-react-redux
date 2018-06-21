import React from 'react';

export default function GamesList({games}){
  const emptyMessage = (
      <p>No games in your collection</p>
  )
  const gameList = (
      <p>game list</p>
  )
  return(
      <div>
        {games.length === 0 ? emptyMessage:gameList}
      </div>
  )
}