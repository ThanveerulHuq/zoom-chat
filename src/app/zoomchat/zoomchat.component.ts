import { Component, OnInit } from '@angular/core';
import { switchMap, tap, timer } from 'rxjs';
import { ChannelInfo, Message, SessionResponse } from '../models/chat.model';
import { ChatService } from '../services/chat.service';
import { FeedService } from '../services/feed.service';

@Component({
  selector: 'app-zoomchat',
  templateUrl: './zoomchat.component.html',
  styleUrls: ['./zoomchat.component.scss'],
})
export class ZoomchatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private feedService: FeedService
  ) {}
  buttonLabel: string = 'chat';
  popupText: string = '';
  channelId!: string;
  userId!: string;
  lastMessageTimeStamp!: number;
  messages: Message[] = [];

  ngOnInit(): void {
    this.chatService.getUserSession().subscribe((response: SessionResponse) => {
      this.popupText = response?.popupMessage?.message;
      this.channelId = response.channelId;
      this.userId = response.user.id;
      this.feedService.subscribeToSocket(response.user.id);
    });
    this.feedService
      .getFeedItems()
      .pipe(tap((res) => (this.lastMessageTimeStamp = res.messageTimestamp)))
      .subscribe((channelInfo: ChannelInfo) => {
        channelInfo.messages.forEach((message) => {
          if (message.buttons) {
            this.messages.push(
              ...message.buttons.states.map((state) => ({
                text: state.text,
                key: message.buttons?.key,
                type: 'button',
              }))
            );
          } else if (message.input) {
            this.messages.push(
              ...message.input.map((input) => ({
                type: input.type,
                key: input.key,
                text: input.name,
              }))
            );
          }
          if (message.type === 'text') {
            this.sendLastMessageTimeStamp(message.pause);
            this.messages.push(message);
          }
        });
      });
  }

  openChat() {
    if (this.lastMessageTimeStamp) return;
    this.chatService
      .getChannelInfo(this.channelId, this.userId)
      .pipe(tap((res) => (this.lastMessageTimeStamp = res.messageTimestamp)))
      .subscribe((res) => {
        this.sendLastMessageTimeStamp(res.messages[0].pause);
        this.messages.push(res.messages[0]);
      });
  }

  responseClicked(key: string | undefined, value: string) {
    const response: Record<string, string[]> = {};
    response[key as string] = [value];
    const payload = {
      ...response,
      lastMessageTimeStamp: this.lastMessageTimeStamp,
    };
    const display = {
      img: 'https://staging-uploads.insent.ai/insentstaging/logo-insentstaging-1657874092041?1657874092120',
      name: null,
      lastMessageTimeStamp: this.lastMessageTimeStamp,
      lead: true,
      time: new Date().getTime(),
      type: 'text',
      userId: 'bot',
      key: key,
      channelId: this.channelId,
      text: value,
    };
    this.feedService.publishEvent(
      this.channelId,
      this.userId,
      payload,
      display
    );
  }

  sendLastMessageTimeStamp(time: number = 0): void {
    timer(time)
      .pipe(
        tap((_) =>
          this.feedService.publishEvent(this.channelId, this.userId, {
            lastMessageTimeStamp: this.lastMessageTimeStamp,
          })
        )
      )
      .subscribe();
  }

  onInput(event: any, message: Message) {
    const reqMessage = {
      email: event.target.value,
      lastMessageTimeStamp: this.lastMessageTimeStamp,
    };
    const display = {
      img: 'https://staging-uploads.insent.ai/insentstaging/logo-insentstaging-1657874092041?1657874092120',
      name: 'Discuter123',
      lastMessageTimeStamp: this.lastMessageTimeStamp,
      lead: false,
      time: new Date().getTime(),
      type: 'input',
      userId: 'bot',
      input: {
        key: message.key,
        type: message.type,
        text: message.text,
        validateDomains: true,
        value: event.target.value,
        disabled: true,
      },
      channelId: this.channelId,
    };
    this.feedService.publishEvent(
      this.channelId,
      this.userId,
      reqMessage,
      display
    );
  }
}
