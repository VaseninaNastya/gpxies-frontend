import '../css/main.css';
import create from './create';
import ShowTrackPageHeader from './ShowTrackPageHeader';
import Footer from './Footer';
import СompleteStatictics from './СompleteStatictics';
import Header from './Header';
import WorldMap from './WorldMap';
import GpxiesAPI from './GpxiesAPI';

class ShowTrackPage {
  generateLayout() {
    const hashString = window.location.pathname.toString().slice(7);
    console.log('HASH ', hashString);

    const completeStatictics = new СompleteStatictics();
    const showTrackPageHeader = new ShowTrackPageHeader();
    const header = new Header();
    const footer = new Footer();
    const map = create('div', 'map', null, null, ['id', 'mapid']);
    document.body.prepend(
      create('div', 'showTrackPage_wrapper', [
        header.generateLayout(),
        showTrackPageHeader.generateLayout(),
        map,
        completeStatictics.generateLayout(),
        footer.generateLayout(),
      ])
    );
    this.worldMap = new WorldMap();
    this.worldMap.generateLayout();
    this.gpxiesAPI = new GpxiesAPI();
    setTimeout(() => {
      this.showTrack(hashString);
    }, 1000);
  }
  async showTrack(hashString) {
    console.log(hashString);
    let result = await this.gpxiesAPI.getTrackById(hashString);
    let userinfo = await this.gpxiesAPI.getUserInfo(result.user);
    console.log(result);
    console.log(userinfo);
    document.title=`${result.title} - Gpxies.ru`;
    document.querySelector('.trackDescription_trackName').innerHTML = result.title;
    document.querySelector('.trackDescription_trackLength').innerHTML = `, (${result.distance} км) `;
    document.querySelector('.icon_header').src = `/img/icon_${result.type.toLowerCase()}.png`;
    document.querySelector('.trackDescription_authorName').innerHTML = `автор <a href='/user/${userinfo.username}'>${userinfo.username}</a>`;
    document.querySelector('.trackDescription_data').innerHTML = `, загружено ${result.created}`;
    if (result.isPrivate){
      document.querySelector('.icon_private0').style.visibility="visible"
    }

    // Show track on map
    
    this.worldMap.showGpx(hashString);

  }
}

const showTrackPage = new ShowTrackPage();
showTrackPage.generateLayout();

export default ShowTrackPage;
