import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AuthorizeResponse,
  ChannelInfo,
  SessionResponse,
} from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}
  private userSessionURL: string =
    environment.apiUrl + '/getuser?url=' + window.location.href;
  private authorizeURL: string =
    environment.apiUrl + '/pusher/presence/auth/visitor?userid=';
  private channelInfoURL: string = environment.apiUrl + '/user/channels/';

  getUserSession(): Observable<SessionResponse> {
    const headers: HttpHeaders = new HttpHeaders({
      authorization: 'Bearer 2LejamM1576236866754',
    });
    return this.httpClient.get<SessionResponse>(this.userSessionURL, {
      headers,
    });
  }

  authorizeSession(
    userId: string,
    channelName: string
  ): Observable<AuthorizeResponse> {
    const headers: HttpHeaders = new HttpHeaders({
      authorization: 'Bearer 2LejamM1576236866754',
      'content-type': 'application/x-www-form-urlencoded',
    });
    return this.httpClient.post<AuthorizeResponse>(
      this.authorizeURL + userId,
      'socket_id=401347.8253087&channel_name=' + channelName,
      { headers }
    );
  }

  getChannelInfo(channel: string, userid: string): Observable<ChannelInfo> {
    const headers: HttpHeaders = new HttpHeaders({
      authorization: 'Bearer 2LejamM1576236866754',
      userid,
    });
    return this.httpClient.get<ChannelInfo>(this.channelInfoURL + channel, {
      headers,
    });
  }
}
