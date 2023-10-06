import heroBg from './modules/heroBg';
import slider from './modules/slider';
import preloader from './modules/preloader';
import scroll from './modules/scroll';
import burger from './modules/burger';

window.addEventListener('load', function () {
    preloader();
    heroBg();
    slider();
    scroll();
    burger();
});
