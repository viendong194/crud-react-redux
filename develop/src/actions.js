export const SET_GAMES = "SET_GAMES";
export const ADD_GAME = "ADD_GAME";
export const GAME_FETCHED = "GAME_FETCHED";
export const GAME_UPDATED = "GAME_UPDATED";
export const GAME_DELETED = "GAME_DELETED";
export function handleResponse(response){
    if(response.ok){
       return response.json()
    }else{
        let error = new Error();
        error.response = response;
        throw error;
    }
}
export function saveGames(data){
    return dispatch => {
        return fetch('/api/games',{
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
          .then(data=>dispatch(addGame(data.game)))
    }
}
export function updateGame(data){
    return dispatch => {
        return fetch(`/api/games/${data.id}`,{
            method: 'put',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
          .then(data=>dispatch(gameUpdated(data.game)))
    }
}
export function gameFetched(game){
    return {
        type: GAME_FETCHED,
        data: game
    }
}
export function addGame(game){
    return {
        type: ADD_GAME,
        data: game
    }
}
export function setGames(games){
    return {
        type: SET_GAMES,
        data: games
    }
}
export function gameUpdated(game){
    return {
        type: GAME_UPDATED,
        data: game
    }
}
export function gameDeleted(game){
    return {
        type: GAME_DELETED,
        data: game
    }
}
export function fetchGames(){
    return dispatch => {
        return fetch('/api/games')
             .then(res => res.json())
             .then(data=>dispatch(setGames(data.games)));
    }
}

export function fetchGame(id){
    return dispatch => {
        return fetch(`/api/games/${id}`)
             .then(res => res.json())
             .then(data=>dispatch(gameFetched(data.game)));
    }
}
export function deleteGame(id){
    return dispatch => {
        return fetch(`/api/games/${id}`,{
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
          .then(data=>dispatch(gameDeleted(id)))
    }
}