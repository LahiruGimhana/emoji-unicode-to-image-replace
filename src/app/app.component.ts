import { Component, ElementRef, ViewChild } from '@angular/core';
import emojiRegex from 'emoji-regex';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  template: `
    <div id="chat_window">
      <div id="message_container"></div>
      <div id="input_container">
        <div id="text_wrapper">
          <div id="text" contentEditable="true" hidefocus="true" #textElementRef style="height: 200%; width: 80%; border: solid 1px"></div>
        </div>
        <button id="add_emoji_button" (click)="addEmoji()">Add Emoji</button>
        <button id="send_button" (click)="sendMessage()">Send</button>
        <button id="receive_button" (click)="receiveMessage('sss')">receive</button>
      </div>
    </div>
<div [innerHTML]="messageWithEmojis"></div>

  `,
  styles: [
    `
      #chat_window {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      #message_container {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
      }
      #input_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        border-top: 1px solid black;
      }
      #text_wrapper {
        flex: 1;
        margin-right: 10px;
      }
      #text {
        height: 150%;
        width: 200%;
      }
    `
  ]
})

export class AppComponent {
  @ViewChild('textElementRef', { static: false }) textElementRef?: ElementRef;
  @ViewChild('emojiContainer') emojiContainer!: ElementRef;
  messageWithEmojis: string | undefined;

  addEmoji() {
    const img = document.createElement('img');
    img.setAttribute('src', 'https://th.bing.com/th/id/OIP.zol4YacP6116Ii7enIDuIgHaHa?pid=ImgDet&rs=1');
    img.setAttribute('width', '20');
    img.setAttribute('height', '20');
    img.style.display = 'inline-block';
    img.style.verticalAlign = 'middle';
    this.textElementRef?.nativeElement.appendChild(img);
  }

  sendMessage() {
    const inputText = this.textElementRef?.nativeElement.innerHTML.trim();
    const messageContainer = document.getElementById('message_container');
    if (inputText) {
      const newMessage = document.createElement('div');
      newMessage.innerHTML = inputText;
      newMessage.style.backgroundColor = 'lightblue';
      newMessage.style.marginBottom = '10px';
      newMessage.style.padding = '5px';

      this.replaceImageToUnicode(newMessage);
      messageContainer?.appendChild(newMessage);
      if (this.textElementRef?.nativeElement) {
        this.textElementRef.nativeElement.innerHTML = '';
      }
    }
  }

  imageMap: { [key: string]: string } = {
    'https://th.bing.com/th/id/OIP.zol4YacP6116Ii7enIDuIgHaHa?pid=ImgDet&rs=1': 'unicode1',
    'https://th.bing.com/th/id/OIP.JAnvveSLgZjjwOZ_DkjzLgHaHa?pid=ImgDet&rs=1': 'unicode2',
    'https://th.bing.com/th/id/OIP.8sMvfr1RjjyR9VrmUszuFgHaHa?pid=ImgDet&rs=1': 'unicode3'
  };

  replaceImageToUnicode(messageElement: HTMLElement) {
    let value = messageElement.innerHTML;

    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');

    const imgElements = doc.getElementsByTagName('img');

    for (let i = 0; i < imgElements.length; i++) {
      const src = imgElements[i].src;
      if (this.imageMap[src]) {
        imgElements[i].outerHTML = this.imageMap[src];
      } else {
        imgElements[i].outerHTML = '';
      }
    }

    const output = doc.body.innerHTML.replace(/(<([^>]+)>)/gi, '');
    console.log(output);
  }



  receiveMessage(message: string) {
    let big_string: string = "Hello world 🇧🇫 hhhhhh 🇧🇴sssssss🇧🇫🇧🇴";

    const emojiList: { [key: string]: string } = {
      "😓": "uncode1",
      "🚀": "uncode2",
      "👍": "uncode3",
      "😃": "uncode4",
      "🤓": "uncode5",
      "🇧🇫": "https://flagcdn.com/w20/za.png",
      "🇧🇬": "https://flagcdn.com/w20/am.png",
      "🇧🇷": "https://flagcdn.com/w20/gh.png",
      "🇧🇴": "https://flagcdn.com/w20/lr.png",

    };

    // for (const emoji in emojiList) {
    //   const img = `<img src="${emojiList[emoji]}" width="20" height="20" style="display: inline-block; vertical-align: middle;">`;
    //   big_string = big_string.replace(new RegExp(emoji, 'g'), img);
    // }

    // console.log(big_string);

    // const messageContainer = document.getElementById('message_container');
    // if (big_string) {
    //   const newMessage = document.createElement('div');
    //   newMessage.innerHTML = big_string;
    //   newMessage.style.backgroundColor = 'blue';
    //   newMessage.style.marginBottom = '10px';
    //   newMessage.style.padding = '5px';

    //   this.replaceImageToUnicode(newMessage);
    //   messageContainer?.appendChild(newMessage);
    //   if (this.textElementRef?.nativeElement) {
    //     this.textElementRef.nativeElement.innerHTML = '';
    //   }
    // }







    const regex = emojiRegex();
    let updatedString: string = big_string;

    for (const match of big_string.matchAll(regex)) {
      let emoji = match[0];
      let img = `<img src="${emojiList[emoji]}" width="20" height="20" style="display: inline-block; vertical-align: middle;">`;
      updatedString = updatedString.replace(emoji, img);
    }


    console.log(updatedString);


    const messageContainer = document.getElementById('message_container');
    if (updatedString) {
      const newMessage = document.createElement('div');
      newMessage.innerHTML = updatedString;
      newMessage.style.backgroundColor = 'blue';
      newMessage.style.marginBottom = '10px';
      newMessage.style.padding = '5px';

      this.replaceImageToUnicode(newMessage);
      messageContainer?.appendChild(newMessage);
      if (this.textElementRef?.nativeElement) {
        this.textElementRef.nativeElement.innerHTML = '';
      }
    }

  }








}