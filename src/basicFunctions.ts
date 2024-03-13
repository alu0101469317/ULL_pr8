
export interface Event<T> {
  id: string
  data: T
}

interface Observable<T> {
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notify(event: Event<T>): void;
}

/**
 * Interface for observer classes
 */
interface Observer<T> {
  update(observable: Observable<T>, event: Event<T>): void;
}

export enum NotificacionClickEventType {'NO_EVENT', 'SI_EVENT'};

/**
 * Class Notificacion that implements the Observable interface, i.e.,
 * Notificacion objects can be observed
 */
export class Notificacion<T> implements Observable<T> {
  private observers: Observer<T>[] = [];

  private eventType: NotificacionClickEventType = NotificacionClickEventType.NO_EVENT;

  constructor(public id: number, public data: T) {
  }
  getEventType() {
    return this.eventType;
  }

  subscribe(observer: Observer<T>) {
    if (this.observers.includes(observer)) {
      throw new Error('The observer had already been subscribed');
    } else {
      this.observers.push(observer);
    }
  }

  unsubscribe(observer: Observer<T>) {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      throw new Error('The observer has not been subscribed');
    } else {
      this.observers.splice(index, 1);
    }
  }
  onEvent(event: Event<T>) {
    this.eventType = NotificacionClickEventType.SI_EVENT
    this.notify(event);
  }
  notify(event: Event<T>) {
    this.observers.forEach((observer) => observer.update(this,event));
  }
}

/**
 * Class NotificacionObserver that implements the interface Observer, i.e.,
 * it is able to observe other objects
 */
export class NotificacionObserver<T> implements Observer<T> {
  constructor(private id: number, private name: string) {
  }
  update(observable: Observable<T>, evento : Event<T>) {
    console.log("UPDATED");
    if (observable instanceof Notificacion) {
      console.log("IS NOTIFICATION")
      switch(observable.getEventType()) {
        case NotificacionClickEventType.SI_EVENT:
          console.log("ID: " + evento.id);
          console.log("DATA: " + evento.data);
          break;
      }
    }

  }
}
