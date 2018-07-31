import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../providers/providers';
import { AlertController } from 'ionic-angular';
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

  constructor( public navCtrl: NavController, navParams: NavParams, public items: Items, private alertCtrl: AlertController) {
    this.item = navParams.get('item');
    this.rental = {};
    this.rental.duation = 1;
    this.stripe = Stripe('pk_test_tlAh9kELCJ5jQsRX1BXkkOrm');
    this.elements = this.stripe.elements();
  }

  ionViewDidEnter() {

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
    var card = this.elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');
    card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });


  }

  confirmButton() {
    var owner = $('#owner');
    var cardNumber = $('#cardNumber');
    var CVV = $("#cvv");

    var isCardValid = $.payform.validateCardNumber(cardNumber.val());
    var isCvvValid = $.payform.validateCardCVC(CVV.val());


    if (owner.val().length < 5) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Invalid Name',
        buttons: ['Dismiss']
      });
      alert.present();


    } else if (!isCardValid) {

      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Invalid Card Number',
        buttons: ['Dismiss']
      });
      alert.present();

    } else if (!isCvvValid) {

      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Invalid CVV',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      // Everything is correct. Add your form submission code here.
      this.proceed();
    }
  }

  proceed(){
    this.navCtrl.push('ConfirmPage', {
      item: this.item
    });
  }



}
