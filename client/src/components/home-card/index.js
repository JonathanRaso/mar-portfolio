import './styles.css';

const HomeCard = ({id, title, description, imageUrl}) => {
  return (
    <div key={`${id}`} className="card__test">
      <h3>{`${id}`}</h3>
      <h3>{`${title}`}</h3>
      <h3>{`${description}`}</h3>
      <h3>{`${imageUrl}`}</h3>
    </div>
  )
}

export default HomeCard;