import '../../App.css'
import './styles.css'

const Infos = () => {

  return (
    <main className="main__height">
      <div className="infos__container">
        <h2 className="infos__title">Bienvenue</h2>
        <img className="infos__avatar" src="/MAR-portfolio-portrait.jpg" alt="portrait de l'artiste"/>
        <div className="infos__description">
          <h3 className="infos__description--title">description</h3>
          <p className="infos__description--text">
            ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aliquid provident unde illum, magnam reiciendis eligendi aliquam commodi sint quidem. Omnis repellat ducimus exercitationem esse!
          </p>
        </div>
        <div className="infos__medium">
          <h3 className="infos__medium--title">techniques</h3>
          <p className="infos__medium--text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aliquid provident unde illum, magnam reiciendis eligendi aliquam commodi sint quidem. Omnis repellat ducimus exercitationem esse!
          </p> 
        </div>
        <div className="infos__social">
          <h3 className="infos__social--title">contact</h3>
          <p className="infos__social--text">
            Pour me contacter, vous pouvez m'envoyer un mail à cette adresse : <strong>pascmic@live.fr</strong>
          </p>
          <p className="infos__social--icons">
            Vous pouvez également me retrouver sur les réseaux sociaux pour voir mon travail ou échanger.
          </p>
            <a href="https://fr-fr.facebook.com/"><img src="/MAR-portfolio-facebook.png" alt="facebook logo"/></a>
            <a href="https://www.pinterest.fr/"><img src="/MAR-portfolio-pinterest.png" alt="pinterest logo"/></a>
        </div>
      </div>
    </main>
  )
};

export default Infos;