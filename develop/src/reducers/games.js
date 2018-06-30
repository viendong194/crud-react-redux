import { SET_GAMES,ADD_GAME,GAME_FETCHED,GAME_UPDATED,GAME_DELETED } from "../actions";

export default function game(state=[],action = {}) {
    switch(action.type){
        case ADD_GAME:
          return [...state,action.data];
        case SET_GAMES:
          return action.data;
        case GAME_FETCHED:
          const index = state.findIndex(item=>item._id===action.data._id);
          if(index>-1){
              return state.map(item=>{
                  if(item._id===action.data._id) return action.data;
                  return item;
              })
          }else{
              return [...state,action.data];
          }
          return action.data;
        case GAME_UPDATED:
            return state.map(item=>{
                if(item._id===action.data._id) return action.data;
                return item;
            })
        case GAME_DELETED:
            return state.filter(index=>index._id!==action.data)
        default: return state;
    }
}