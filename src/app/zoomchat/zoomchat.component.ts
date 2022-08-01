import { Component, OnInit } from '@angular/core';
import { SessionResponse } from '../models/chat.model';
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

  ngOnInit(): void {
    this.chatService.getUserSession().subscribe((response: SessionResponse) => {
      this.popupText = response?.popupMessage?.message;
      this.channelId = response.channelId;
      this.userId = response.user.id;
      this.feedService.subscribeToSocket(response.user.id);
    });
  }

  openChat() {
    this.feedService.getFeedItems().subscribe(console.log);
    this.chatService
      .authorizeSession(this.userId, this.channelId)
      .subscribe(console.log);
    this.feedService.publishEvent(this.channelId, this.userId);
  }
}
