// a base class for components that allow subscriptions to a collection.
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import {PartialGuild} from '../../../schemas/Discord';
import {WorkshopBindings, WorkshopCollection} from '../../../schemas/Workshop';
import {DiscordService} from '../../../shared/discord.service';
import {ApiResponse} from '../../APIHelper';
import {WorkshopService} from '../workshop.service';

export abstract class CollectionSubscriber {
  collection: WorkshopCollection;

  protected constructor(
    private _snackBar: MatSnackBar,
    private _workshopService: WorkshopService,
    private _discordService: DiscordService) {
    this._workshopService.loadPersonalSubscribedIds();
  }

  onSubscribe(): void {
    this.doSubscribe();
  }

  onUnsubscribe(): void {
    this.doUnsubscribe();
  }

  onGuildSubscribe(guild: PartialGuild): void {
    this.doGuildSubscribe(guild);
  }

  doSubscribe(): Observable<ApiResponse<WorkshopBindings>> {
    const req = this._workshopService.personalSubscribe(this.collection._id)
      .pipe(share());
    req.subscribe(resp => {
      resp.success ? this._snackBar.open(`Subscribed to ${this.collection.name}!`) : this._snackBar.open(resp.error);
    });
    return req;
  }

  doUnsubscribe(): Observable<ApiResponse<string>> {
    const req = this._workshopService.personalUnsubscribe(this.collection._id)
      .pipe(share());
    req.subscribe(resp => {
      resp.success ? this._snackBar.open(`Unsubscribed from ${this.collection.name}!`) : this._snackBar.open(resp.error);
    });
    return req;
  }

  doGuildSubscribe(guild: PartialGuild): Observable<ApiResponse<WorkshopBindings>> {
    const req = this._workshopService.guildSubscribe(this.collection._id, guild.id)
      .pipe(share());
    req.subscribe(resp => {
      if (!resp.success) {
        this._snackBar.open(resp.error, null, {duration: 5000});
      } else if (resp.data.new_subscription) {
        this._snackBar.open(`Subscribed to ${this.collection.name} on ${guild.name}!`);
      } else {
        this._snackBar.open(`${guild.name} is already subscribed to ${this.collection.name}. You can manage
          server subscriptions in My Subscriptions!`, null, {duration: 5000});
      }
    });
    return req;
  }

  getGuilds() {
    return this._discordService.getUserGuilds();
  }

  isSubscribed() {
    return this._workshopService.personalSubscribedIds?.includes(this.collection._id);
  }
}
