// Write your code here.
import './index.css'

const EmojiCard = props => {
  const {details, increaseScoreOnClick} = props
  const {id, emojiName, emojiUrl} = details

  const onClickEmoji = () => {
    increaseScoreOnClick(emojiName)
  }
  return (
    <li className="emoji-emoji">
      <button type="button" onClick={onClickEmoji}>
        <img src={emojiUrl} alt={emojiName} className="small-emoji" />
      </button>
    </li>
  )
}
export default EmojiCard
