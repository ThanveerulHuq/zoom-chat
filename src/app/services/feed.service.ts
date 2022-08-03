// pusher-angular-realtime-feed/client/src/app/feed.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private subject: Subject<string> = new Subject<string>();

  private pusherClient!: Pusher;

  constructor() {}

  subscribeToSocket(userId: string): void {
    const authEndpoint =
      environment.apiUrl + '/pusher/presence/auth/visitor?userid=' + userId;
    this.pusherClient = new Pusher('67bb469433cb732caa7a', {
      cluster: 'mt1',
      authEndpoint: authEndpoint,
      auth: {
        headers: {
          Authorization: 'Bearer 2LejamM1576236866754',
        },
      },
    });
    const channel = this.pusherClient.subscribe(
      'presence-insentstaging-widget-user-' + userId
    );

    channel.bind('server-message', (data: string) => {
      this.subject.next(data);
    });
  }

  getFeedItems(): Observable<string> {
    return this.subject.asObservable();
  }

  publishEvent(channelName: string, senderId: string) {
    this.pusherClient.send_event(
      'client-widget-message',
      {
        channelName,
        senderId,
        message: { lastMessageTimeStamp: new Date().getTime() },
      },
      'presence-insentstaging-widget-user-' + senderId
    );
  }
}
