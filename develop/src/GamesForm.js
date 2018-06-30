import React from 'react';
import {saveGames,fetchGame,updateGame} from './actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class GamesForm extends React.Component{
  state = {
      id: this.props.game?this.props.game._id:'',
      title: this.props.game?this.props.game.title:'',
      cover: this.props.game?this.props.game.cover:'',
      error:{},
      loading: false,
      done: false
  }
  handleChange = (e)=>{
    if(this.state.error[e.target.name]){
        let error = Object.assign({},this.state.error);
        delete error[e.target.name];
        this.setState({[e.target.name]:e.target.value,error})
    }else{
        this.setState({[e.target.name]:e.target.value})
    }
   
  }
  handleSubmit = (e) => {
      e.preventDefault();

      let error = {};
      if(this.state.title==="") error.title = "title can not be empty";
      if(this.state.cover==="") error.cover = "cover can not be empty";
      this.setState({error});

      let validate = Object.keys(error).length === 0;
      if(validate){
          const {id,title,cover} = this.state;
          this.setState({loading:true});
          if(id){
            this.props.updateGame({id,title,cover}).then(
                ()=>{this.setState({done:true})},
                (err)=>err.response.json().then(({error})=>{
                    console.log(error)
                    this.setState({error,loading:false})})
              );
          }else{
            this.props.saveGames({title,cover}).then(
                ()=>{this.setState({done:true})},
                (err)=>err.response.json().then(({error})=>{
                    console.log(error)
                    this.setState({error,loading:false})})
              );
          }
      }

  }
  componentDidMount(){
      if(this.props.match.params.id){
        this.props.fetchGame(this.props.match.params.id).then(()=>this.setState({
            id:this.props.game._id,
            title:this.props.game.title,
            cover:this.props.game.cover}))
      }
  }
  render(){
    const form = (<form className={`ui form ${this.state.loading && "loading"}`} onSubmit={this.handleSubmit}>
            <h1>Add New Game</h1>
            {this.state.error.global && <div className="ui negative message"><p>{this.state.error.global}</p></div>}
            <div className={`field ${this.state.error.title && "error"}`}>
            <label htmlFor="title">Title</label>
            <input 
                name="title"
                id="title"
                value={this.state.title}
                onChange={this.handleChange}
                />
            <span>{this.state.error.title}</span>
            </div>

            <div className={`field ${this.state.error.cover && "error"}`}>
            <label htmlFor="cover">Cover URL</label>
            <input 
            name="cover"
            id="cover"
            value={this.state.cover}
            onChange={this.handleChange}
            />
            <span>{this.state.error.cover}</span>
            </div>

            <div className="field">
            {this.state.cover !=="" && <img src={this.state.cover} alt="cover" className="ui bordered image small"/>}
            </div>
            <div className="field">
            <button className="ui primary button">Save</button>
            </div>
        </form>)
    return(
          <div>
              {this.state.done?<Redirect to="/games"></Redirect>:form}
          </div>
        )
    }
}
function mapStateToProps(state,props){
    if(props.match.params.id){
        return{
            game: state.games.find(item => item._id === props.match.params.id)
        }
    }else{
        return {game:null}
    }

}
export default connect(mapStateToProps,{saveGames,fetchGame,updateGame})(GamesForm)