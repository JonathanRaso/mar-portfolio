import '../../App.css'
import './styles.css'

const Infos = () => {

  return (
    <main className="main__height">
      <div className="infos__container">
        <h2 className="infos__title">Michel Raso</h2>
        <img className="infos__avatar" src="/MAR-portfolio-portrait.jpg" alt="portrait de l'artiste"/>
        <div className="infos__description">
          <h3 className="infos__description--title">Présentation</h3>
          <div className="infos__description--text">
          <p>
            Bonjour et bienvenue sur mon portfolio ! 
          </p>
          <p>
            J'ai débuté la peinture à l'huile il y a une trentaine d'années. N'arrivant pas à progresser comme je le souhaitais, j'ai décidé de suivre des cours afin de m'améliorer plus rapidement. J'ai également suivi un stage d'une semaine en Ardèche avec Alain Cheval, un peintre professionnel. Et pour compléter cette formation, j'ai suivi des cours à l'académie Gérard Dubois à Lyon une fois par semaine.
          </p>
          <p>
            Je faisais du figuratif (natures mortes, paysages), mais je commençais à en faire le tour. C'est à ce moment que j'ai commencé à faire de l'abstraction. Je pensais être plus créatif en m'inspirant de la géométrie.
          </p>
          </div>
        </div>
        <div className="infos__medium">
          <h3 className="infos__medium--title">Techniques</h3>
          <div className="infos__medium--text">
          <p>
            Je travaillais à l'huile sur chassis. Mais j'ai changé de format il y a 5 ou 6 ans, pour passer sur médium et papier dessin de 300g (format A4 et A3). Désormais j'utilise différents outils comme les feutres, les stylos de couleur ou l'acrylique.
          </p>
          <p>
            Pourquoi ces nouveaux formats me demanderez-vous ? Tous simplement pour une question de place (les chassis sont trop encombrants!). 
          </p>
          </div> 
        </div>
        <div className="infos__social">
          <h3 className="infos__social--title">Me contacter</h3>
          <p className="infos__social--text">
            Pour me contacter, vous pouvez m'envoyer un mail à cette adresse : <strong>pascmic@live.fr</strong>
          </p>
          <p className="infos__social--icons">
            Vous pouvez également me retrouver sur les réseaux sociaux pour voir mon travail ou échanger.
          </p>
            <a 
              href="https://fr-fr.facebook.com/people/Michel-Raso/100015040781508" 
              target="_blank" 
              rel="noreferrer"
            >
              <img src="/MAR-portfolio-facebook.png" alt="facebook logo"/>
            </a>
            <a 
              href="https://www.pinterest.fr/raso_m/" 
              target="_blank" rel="noreferrer"
            >
              <img src="/MAR-portfolio-pinterest.png" alt="pinterest logo"/>
            </a>
        </div>
      </div>
    </main>
  )
};

export default Infos;