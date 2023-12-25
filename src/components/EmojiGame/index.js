import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import './index.css'

/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.

class EmojiGame extends Component {
  state = {score: 0, topScore: 0, gameOver: false, clickedEmojis: []}

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  increaseScoreOnClick = nameOfEmoji => {
    const {clickedEmojis} = this.state
    const checkedEmojisList = clickedEmojis.filter(each => each === nameOfEmoji)
    if (checkedEmojisList.length === 0) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        topScore: prevState.topScore + 1,
        gameOver: false,
        clickedEmojis: [...prevState.clickedEmojis, nameOfEmoji],
      }))
    } else {
      this.setState({gameOver: true})
    }
  }

  onClickPlayAgain = () => {
    const {score, topScore} = this.state
    if (score > topScore) {
      this.setState({topScore, score: 0})
    }
    this.setState({
      score: 0,
      topScore: score,
      gameOver: false,
      clickedEmojis: [],
    })
  }

  render() {
    const {score, topScore, gameOver, clickedEmojis} = this.state

    console.log(gameOver)
    // console.log(clickedEmojis)
    const shuffledEmojisList = this.shuffledEmojisList()
    return (
      <div className="bg-container">
        <NavBar score={score} topScore={topScore} />
        {score === 12 && (
          <div className="win-container">
            <div className="card-content">
              <h1>You Won</h1>
              <p>Best Score</p>

              <p>12/12</p>
              <button type="button" onClick={this.onClickPlayAgain}>
                Play Again
              </button>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/won-game-img.png"
                alt="win or lose"
                className="lose-image"
              />
            </div>
          </div>
        )}

        {gameOver === true ? (
          <div className="game-over-container">
            <div className="card-content">
              <h1>You Lose</h1>
              <p>Best Score</p>
              <p>{score}/12</p>
              <button type="button" onClick={this.onClickPlayAgain}>
                Play Again
              </button>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/lose-game-img.png"
                alt="win or lose"
                className="lose-image"
              />
            </div>
          </div>
        ) : (
          <ul className="emojis-container">
            {shuffledEmojisList.map(each => (
              <EmojiCard
                details={each}
                key={each.id}
                increaseScoreOnClick={this.increaseScoreOnClick}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default EmojiGame
