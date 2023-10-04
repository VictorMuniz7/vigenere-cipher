import { Component } from '@angular/core';
import BiMap from 'bidirectional-map'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  messageToEncryptOrDecrypt: string = '';
  secretKey: string = 'Hope';
  encryptedOrDecryptedMessage: string = '';

  encryptPlaceholder: string = 'This will be your secret message, to be able to decode the text you will need a secret key that can be inserted below.';
  decryptPlaceholder: string = 'Insert the encrypted message and the secret key to decode it.';

  error: boolean = false;

  selectedOption: string = 'encrypt';

  alphabetMap = new BiMap({
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'P': 15,
    'Q': 16,
    'R': 17,
    'S': 18,
    'T': 19,
    'U': 20,
    'V': 21,
    'W': 22,
    'X': 23,
    'Y': 24,
    'Z': 25,
  });


  encryptOrDecrypt() {
    if (this.selectedOption === 'encrypt') {
      this.encrypt();
    } else {
      this.decrypt();
    }
  }

  encrypt() {
    let message: string = this.messageToEncryptOrDecrypt.replaceAll(' ', '');
    let key: string = this.secretKey.replaceAll(' ', '');

    let encryptValue: number = 0;
    let encryptString: string = '';
    let keyIndex: number = 0;


    if (this.secretKey != '') {
      this.error = false;
      for (let i = 0; i < message.length; i++) {
        if (keyIndex >= key.length) {
          keyIndex = 0;
        }
        let messageValue = this.alphabetMap.get(message[i].toUpperCase());
        let keyValue = this.alphabetMap.get(key[keyIndex].toUpperCase());
        if (messageValue !== undefined && keyValue !== undefined)
          encryptValue = messageValue + keyValue;
        if (encryptValue > 25) {
          encryptValue -= 26;
        }
        encryptString += this.alphabetMap.getKey(encryptValue);
        keyIndex++;
      }
    } else {
      this.error = true;
    }

    this.encryptedOrDecryptedMessage = encryptString;
  }

  decrypt() {
    let encryptedMessage: string = this.messageToEncryptOrDecrypt;
    let key: string = this.secretKey;

    let decryptValue: number = 0;
    let decryptString: string = '';
    let keyIndex: number = 0;

    if (this.secretKey != '') {
      this.error = false;
      for (let i = 0; i < encryptedMessage.length; i++) {
        if (keyIndex >= key.length) {
          keyIndex = 0;
        }
        let messageValue = this.alphabetMap.get(encryptedMessage[i].toUpperCase());
        let keyValue = this.alphabetMap.get(key[keyIndex].toUpperCase());
        if (messageValue !== undefined && keyValue !== undefined)
          decryptValue = messageValue - keyValue;
        if (decryptValue < 0) {
          decryptValue *= -1;
        }
        decryptString += this.alphabetMap.getKey(decryptValue);
        keyIndex++;
      }
    } else {
      this.error = true;
    }

    this.encryptedOrDecryptedMessage = decryptString;
  }

  copyMessage(result: HTMLTextAreaElement, icon: HTMLElement) {
    setTimeout(() => {
      icon.classList.remove('fa-check');
      icon.classList.add('fa-copy');
    }, 1000)
    if(result.innerHTML !== ''){
      navigator.clipboard.writeText(result.innerHTML);
      icon.classList.remove('fa-copy');
      icon.classList.add('fa-check');
    }

  }
}
