import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../providers/providers';
import { AlertController } from 'ionic-angular';
import { User } from '../../providers/providers';
declare var Stripe:any;
declare var $:any;


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  item: any;
  rental: any;
  stripe: any;
  elements: any;
  card: any;
  selectedCard: any;
  newcard: any;

  constructor( public user:User, public navCtrl: NavController, navParams: NavParams, public items: Items, private alertCtrl: AlertController) {
    this.item = navParams.get('item');
    this.rental = {};
    this.rental.duation = 1;
    this.rental.saveForLater = false;
    this.stripe = Stripe('pk_test_tlAh9kELCJ5jQsRX1BXkkOrm');
    this.elements = this.stripe.elements();
    this.card = null;
    this.selectedCard = null;
    this.newcard = {};
  }
  radioChecked(item) {
    console.log(item);
    console.log(this.selectedCard);
  }
  ionViewDidLoad() {

    console.log( this.user.userData.cards );
    if ( this.user.userData.cards && this.user.userData.cards.length > 0 ){
      this.selectedCard = this.user.userData.cards[0];
    }
    else {
      this.selectedCard = this.newcard;
    }

    /*
    var cardNumber = $('#cardNumber');
    var cardNumberField = $('#card-number-field');
    var CVV = $("#cvv");
    var mastercard = $("#mastercard");
    var confirmButton = $('#confirm-purchase');
    var visa = $("#visa");
    var amex = $("#amex");

    // Use the payform library to format and validate
    // the payment fields.

    cardNumber.payform('formatCardNumber');
    CVV.payform('formatCardCVC');


    cardNumber.keyup(function() {

      amex.removeClass('transparent');
      visa.removeClass('transparent');
      mastercard.removeClass('transparent');

      if ($.payform.validateCardNumber(cardNumber.val()) == false) {
        cardNumberField.addClass('has-error');
      } else {
        cardNumberField.removeClass('has-error');
        cardNumberField.addClass('has-success');
      }

      if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
        mastercard.addClass('transparent');
        amex.addClass('transparent');
      } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
        mastercard.addClass('transparent');
        visa.addClass('transparent');
      } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
        amex.addClass('transparent');
        visa.addClass('transparent');
      }
    });*/

    // Custom styling can be passed to options when creating an Element.
    var style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: "#32325d",
      }
    };

// Create an instance of the card Element.
    this.card = this.elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
    this.card.mount('#card-element');
    this.card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });


  }

  confirmButton() {


    if ( this.selectedCard === this.newcard ){
      this.stripe.createToken( this.card ).then((result)=> {
        console.log('Credit Card:',result)
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          this.proceed(result.token, true);
        }
      });
    }
    else if ( this.selectedCard !== null ){
      this.proceed( this.selectedCard, false );
    }

  }
  deleteCard( card, index ){
    if ( this.selectedCard === card ){
      this.selectedCard = null;
    }
    this.user.deleteCard( card, index );
  }
  proceed(token , newcard){
    let cart:any = {};
    cart.itemkey = this.item.key;
    cart.payment = {};
    cart.timestamp = new Date();
    cart.uid = this.user.user.uid;
    cart.payment.token = token;
    cart.rental = this.rental;
    cart.status = 'pending';

    if ( newcard && this.rental.saveForLater ){
      this.user.addCard(token.card);
    }

    this.user.updateCart(null).then(()=>{
        this.user.updateCart(cart).then(()=>{
          this.navCtrl.push('ConfirmPage', {
            item: this.item
          });
        });
    });


  }



}
