import {settings, select, classNames,} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';

const app = {
  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;

    thisApp.navLinks = document.querySelectorAll(select.nav.links);


    //const idFromHash = window.location.hash.replace('#/', '');

    //let pageMatchingHash = thisApp.pages[0].id;



    /*for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }

    }*/

    thisApp.activatePage(thisApp.pages[0].id);



    for(let link of thisApp.navLinks ){
      link.addEventListener('click', function(){
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');
        /* run thisApp.activatepage with that id */
        thisApp.activatePage(id);

        thisApp.cartUp = document.querySelector(select.containerOf.cart);
        thisApp.nav = document.querySelector(select.containerOf.nav);

        if(id == select.containerOf.homePage){
          thisApp.cartUp.classList.add(classNames.cart.disabled);
          thisApp.nav.classList.add(classNames.nav.disabled);
        }
        if(id != select.containerOf.homePage){
          thisApp.cartUp.classList.remove(classNames.cart.disabled);
          thisApp.nav.classList.remove(classNames.nav.disabled);
        }



        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }

  },

  activatePage: function(pageId){
    const thisApp = this;

    /*add class "active" to matching pages, rwmove from non-matching */
    for(let page of thisApp.pages){

      //if(page.id == pageId){
      //  page.classList.add(classNames.pages.active);
      //}else{
      //page.classList.remove(classNames.pages.active);
      //}
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class "active" to matching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },



  initMenu: function(){
    const thisApp = this;
    //console.log('thisApp.data:', thisApp.data);

    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id,
        thisApp.data.products[productData]);
    }
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        //console.log('parsedResponse', parsedResponse);

        /* save parsedResponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;
        /* execute initMenu metod */
        thisApp.initMenu();

      });
    //console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);
    //console.log(app.cart);

    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },

  initBooking: function(){
    const thisApp = this;

    const bookingElem = document.querySelector(select.containerOf.booking);

    thisApp.booking = new Booking(bookingElem);
  },

  initCarousel:function(){
    // eslint-disable-next-line
    $(document).ready(function(){
      // eslint-disable-next-line
      $(select.containerOf.carousel).slick({
        slidesToShow: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,

      });
    });
  },

  init: function(){
    const thisApp = this;
    //console.log('*** App starting ***');
    //console.log('thisApp:', thisApp);
    //console.log('classNames:', classNames);
    //console.log('settings:', settings);
    //console.log('templates:', templates);

    thisApp.initPages();

    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
    thisApp.initCarousel();
  },
};

app.init();
