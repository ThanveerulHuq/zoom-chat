import { Component, OnInit } from '@angular/core';
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
    this.feedService.getFeedItems().subscribe((res: ChannelInfo) => {
      res.messages.forEach((message) => {
        if (message.buttons) {
          this.messages.push(
            ...message.buttons.states.map((state) => ({
              text: state.text,
              key: message.buttons?.key,
              type: 'button',
            }))
          );
        } else {
          this.messages.push(message);
        }
      });
      // this.messages.push(...res.messages);
      this.lastMessageTimeStamp = res.messageTimestamp;
    });
  }

  openChat() {
    // this.chatService
    //   .authorizeSession(this.userId, this.channelId)
    //   .subscribe(console.log);
    this.chatService
      .getChannelInfo(this.channelId, this.userId)
      .subscribe((res: ChannelInfo) => {
        this.lastMessageTimeStamp = res.messageTimestamp;
        this.messages.push(...res.messages);
        this.feedService.publishEvent(this.channelId, this.userId, {
          lastMessageTimeStamp: this.lastMessageTimeStamp,
        });
      });
  }

  responseClicked(key: string | undefined, value: string) {
    const response: Record<string, string[]> = {};
    response[key as string] = [value];
    const payload = {
      message: response,
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
}
