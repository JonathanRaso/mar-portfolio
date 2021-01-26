import '../../App.css'
import './styles.css'

const Infos = () => {
  return (
    <main className="main__height">
      <div className="infos__container">
        <h2 className="infos__title">Bonjour!</h2>
        <img className="infos__avatar" src="/MAR-portfolio-portrait.jpg" alt="portrait de l'artiste"/>
        <div className="infos__description">
          <h3 className="infos__description--title">Description</h3>
          <p className="infos__description--text">
            ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aliquid provident unde illum, magnam reiciendis eligendi aliquam commodi sint quidem. Omnis repellat ducimus exercitationem esse!
          </p>
        </div>
        <div className="infos__medium">
          <h3 className="infos__medium--title">TECHNIQUES</h3>
          <p className="infos__medium--text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aliquid provident unde illum, magnam reiciendis eligendi aliquam commodi sint quidem. Omnis repellat ducimus exercitationem esse!
          </p> 
        </div>
        <div className="infos__social">
          <h3 className="infos__social--title">Socials</h3>
            <span>Email</span>
            <span>Facebook</span>
            <span>Pinterest</span>
        </div>
      </div>
    </main>
  )
};

export default Infos;