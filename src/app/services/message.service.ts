import { Message } from '../models/message.model';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ErrorService} from './error.service';


@Injectable()
export class MessageService {

  constructor(private http: HttpClient, private errorService: ErrorService) {}
  messageIsEdit = new EventEmitter<Message>();
  private messages: Message[] = [];

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
      .map((response: Response) => {
        const msg = response['obj'];
        this.messages.push(new Message(
          msg.content,
          msg.user.firstName,
          msg._id,
          msg.user._id)
        );
        return msg;
      })
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error)
      });
  }

  getMessages() {
    return this.http.get('http://localhost:3000/message')
      .map((response: Response) => {
        const transformedMessages: Message[] = [];
        const messages = response['obj'];

        for (const message of messages) {
            transformedMessages.push(new Message(
                message.content,
                message.user.firstName,
                message._id,
                message.user._id)
            );
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error);
      });
  }

  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error);
      });
  }

  deleteMessage(message: Message) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error);
      });
  }
}
