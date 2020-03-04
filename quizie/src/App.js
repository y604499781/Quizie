import React from 'react';
import './App.css';
import questions from './questions.json'

const TITLE_STATE = 0
const QUESTION_STATE = 1
const TIME_LIMIT = 5


class QuizQuestion extends React.Component {
  render() {
    return <>
      <h1>{this.props.question}</h1>
      {this.props.answers.map((v, i) => 
      <input className="answerButton" onClick={() => this.props.nextQuestion(v.correct)} type="button" key={i} value={v.text}/>)}
      </>
  }
}

class TitlePage extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      titleText: "Welcome to our Quiz!",
      counter: 0,
      currentState: TITLE_STATE,
      currentQuestion: 0,
      score: 0
    }
    this.timeLimit = TIME_LIMIT
  }
  nextQuestion(correct){
    console.log("BUTTON PRESSED")
    if(correct){
      this.setState({score: this.state.score+1})
    }
    if(this.state.currentQuestion === questions.length -1){
      console.log("DONE")
    }
    else{
      clearInterval(this.timer)
      console.log(this.state.currentQuestion)
      
      this.setState({
        titleText:"You answers X",
        currentState: QUESTION_STATE,
        currentQuestion:this.state.currentQuestion +1
      })
    }
  }
  countdown(){
    console.log("Handling interval")
    console.log(this.state.counter)
    if(this.state.counter < this.timeLimit){
      this.setState({
        titleText: 'Starting the Quiz',
        counter: this.state.counter +1
      })
    }else{
      this.setState({
        titleText: "Beginning Quiz!",
        currentState: QUESTION_STATE,
        counter: 0
      })
      if(this.state.currentState === TITLE_STATE){
        this.timer = setInterval(() => this.countdown(), 1000)
        clearInterval(this.timer)
      } else {
        this.setState({titleText:"You answered!"})
      }
    }
  }
  start(){
    console.log("Starting!")
    this.setState({titleText: "Starting the Quiz!", counter:0})
    this.timer = setInterval(() => this.countdown(), 1000)
  }
  
  render() {
    return(
      <>
        <p>{this.timeLimit - this.state.counter}</p>
        {((this.state.currentState === TITLE_STATE) ?
        <>
        <h2>{this.state.titleText}</h2>
        <input className="start" type="button" value="start" onClick={()=>this.start()} />
        </>
        :
        <QuizQuestion answers={questions[this.state.currentQuestion].possibleAnswers} question=
        {questions[this.state.currentQuestion].question} nextQuestion={(correct) => this.nextQuestion(correct)}
        ></QuizQuestion>)}
        <p>Score: {this.state.score}</p>
      </>)
  }
}

function App() {
  return (
    <div className="App">
      <TitlePage></TitlePage>
    </div>
  );
}

export default App;
