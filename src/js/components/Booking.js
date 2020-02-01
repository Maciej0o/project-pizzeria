import {templates, select} from '../settings.js';
import {utils} from '../utils.js';

class Booking{
  constructor(bookingElement){
    const thisBooking = this;


    thisBooking.render(bookingElement);
    thisBooking.initWidgets();
  }

  render(element){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};

    thisBooking.dom.wrapper = element;

    thisBooking.dom.wrapper = utils.createDOMFromHTML(generatedHTML);
    console.log('wrapppper',thisBooking.dom.wrapper);
    element.appendChild(thisBooking.dom.wrapper);

    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);

    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
  }

  initWidgets(){
    const thisBooking = this;

  }
}

export default Booking;
