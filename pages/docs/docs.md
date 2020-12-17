---
layout: default
title: Documentation
rightmenu: false
permalink: /documentation
---

{% include notificationBanner.html %}

<div id="spy-nav" class="left-menu" markdown="1"  style="overflow-x: hidden; overflow-y: auto;">
* [Introduction](#introduction)
* [Concepts](#concepts)
* * [Event Sourcing](#event-sourcing)
* * [CloudEvents](#cloudevents)
* * [EventStore](#eventstore)
* * * [EventStream](#eventstream)
* * * [WriteCondition](#write-condition)
* * * [Queries](#eventstore-queries)
* * * [Operations](#eventstore-operations)
* * [Subscriptions](#subscriptions)
* * [Views](#views)
* * [Commands](#commands)
* * * [Philosophy](#command-philosophy)
* * * [In Occurrent](#commands-in-occurrent)
* * * [Composition](#command-composition)
* * * [Conversion](#command-conversion)
* * [Application Service](#application-service)
* * * [Event Conversion](#application-service-event-conversion)
* * * [Usage](#using-the-application-service)
* * * [Side-Effects](#application-service-side-effects)
* * * [Transactional Side-Effects](#application-service-transactional-side-effects)
* * * [Kotlin](#application-service-kotlin-extensions)
* * [Sagas](#sagas)
* * [Policy](#policy)
* * * [Asynchronous](#asynchronous-policy)
* * * [Synchronous](#synchronous-policy)
* * [Snapshots](#snapshots)
* * * [Synchronous](#synchronous-snapshots)
* * * [Asynchronous](#asynchronous-snapshots)
* * * [Closing the Books](#closing-the-books)
* * [Scheduling](#scheduling)
* [Getting Started](#getting-started)
* [Choosing An EventStore](#choosing-an-eventstore)
* * [MongoDB](#mongodb)
* * * [Schema](#mongodb-schema)
* * * [Time Representation](#mongodb-time-representation)
* * * [Indexes](#mongodb-indexes)
* * * [Implementations](#mongodb-eventstore-implementations)
* * * * [Native Driver](#eventstore-with-mongodb-native-driver)
* * * * [Spring (Blocking)](#eventstore-with-spring-mongotemplate-blocking) 
* * * * [Spring (Reactive)](#eventstore-with-spring-reactivemongotemplate-reactive) 
* * [In-Memory](#in-memory-eventstore)
* [Using Subscriptions](#using-subscriptions)
* * [Blocking](#blocking-subscriptions)
* * * [Filters](#blocking-subscription-filters)
* * * [Start Position](#blocking-subscription-start-position)
* * * [Position Storage](#blocking-subscription-position-storage)
* * * [Implementations](#blocking-subscription-implementations)
* * * * [MongoDB Native Driver](#blocking-subscription-using-the-native-java-mongodb-driver)
* * * * [MongoDB with Spring](#blocking-subscription-using-spring-mongotemplate)
* * * * [Automatic Position Persistence Utility](#automatic-subscription-position-persistence-blocking)
* * * * [Catch-up Subscription](#catch-up-subscription-blocking)
* * [Reactive](#reactive-subscriptions)
* * * [Filters](#reactive-subscription-filters)
* * * [Start Position](#reactive-subscription-start-position)
* * * [Position Storage](#reactive-subscription-position-storage)
* * * [Implementations](#reactive-subscription-implementations)
* * * * [MongoDB with Spring](#reactive-subscription-using-spring-reactivemongotemplate)
* * * * [Automatic Position Persistence Utility](#automatic-subscription-position-persistence-reactive)
* [Blogs](#blogs)
* [Contact & Support](#contact--support)
* [Credits](#credits)
</div>

<h1 class="no-margin-top">Documentation</h1>

The documentation on this page is always for the latest version of Occurrent, currently `{{site.occurrentversion}}`.

<div class="notification star-us">
    <div>
        <span id="starUsLong">If you like Occurrent, please consider starring us on GitHub:</span>
        <span id="starUsShort">Like Occurrent? Star us on GitHub:</span>
    </div>
    <iframe id="starFrame" class="githubStar"
            src="https://ghbtns.com/github-btn.html?user=johanhaleby&amp;repo=occurrent&amp;type=star&amp;count=true&size=large"
            frameborder="0" scrolling="0" width="150px" height="30px">
    </iframe>
</div>

# Introduction
<div class="comment">Occurrent is in an early stage so API's, and even the data model, are subject to change in the future.</div>

Occurrent is an [event sourcing](#event-sourcing) library, or if you wish, a set of event sourcing utilities for the JVM, created by [Johan Haleby](https://code.haleby.se/).
There are many options for doing event sourcing in Java already so why build another one? There are a few reasons for this besides the
intrinsic joy of doing something yourself: 
 
* You should be able to design your domain model without _any_ dependencies to Occurrent or any other library. Your domain model can be expressed with pure functions that returns events. Use Occurrent to store these events.
  This is a very important design decision! Many people talk about doing this, but I find it rare in practise, and some existing event sourcing frameworks makes this difficult or non-idiomatic.
* Simple: Pick only the libraries you need, no need for an all or nothing solution. If you don't need subscriptions, then don't use them! Use the infrastructure 
  that you already have and hook these into Occurrent.
* Occurrent is not a database by itself. The goal is to be a thin wrapper around existing commodity databases that you may already be familiar with.  
* Events are stored in a standard format ([cloud events](https://cloudevents.io/)). You are responsible for serializing/deserializing the cloud events "body" (data) yourself.
  While this may seem like a limitation at first, why not just serialize your POJO directly to arbitrary JSON like you're used to?, it really enables a lot of use cases and piece of mind. For example:
  * It should be possible to hook in various standard components into Occurrent that understands cloud events. For example a component could visualize a distributed tracing graph from the cloud events
    if using the [distributed tracing cloud event extension](https://github.com/cloudevents/spec/blob/master/extensions/distributed-tracing.md).
  * Since the current idea is to be as close as possible to the specification even in the database,  
    you can use the database to your advantage. For example, you can create custom indexes used for fast and fully consistent domain queries directly on an event stream (or even multiple streams).
* Composable: Function composition and pipes are encouraged. For example pipe the event stream to a rehydration function (any function that converts a stream of events to current state) before calling your domain model.
* Pragmatic: Need consistent projections? You can decide to write projections and events transactionally using tools you already know (such as Spring `@Transactional`)! 
* Interoperable/Portable: Cloud events is a [CNCF](https://www.cncf.io/) specification for describing event data in a common way. CloudEvents seeks to dramatically simplify event declaration and delivery across services, platforms, and beyond!
* Use the Occurrent components as lego bricks to compose your own pipelines. Components are designed to be small so that you should be able to re-write them tailored to your own needs if required. 
  Missing a component? You should be able to write one yourself and hook into the rest of the eco-system. Write your own problem/domain specific layer on-top of Occurrent.

# Concepts

## Event Sourcing

Every system needs to store and update data somehow. Many times this is done by storing the _current_ state of an entity in the database.
For example, you might have an entity called `Order` stored in a `order` table in a relational database. Everytime something happens
to the order, the table is updated with the new information and replacing the previous values. Event Sourcing is a technique that instead stores
the _changes_, represented by _events_, that occurred for the entity. Events are facts, things that have happened, and they should never be updated. 
This means that not only can you derive the current state from the set of historic events, but you also know _which_ steps that were involved to reach 
the current state.

## CloudEvents

Cloud events is a [CNCF](https://www.cncf.io/) specification for describing event data in a common way. CloudEvents seeks to dramatically simplify event declaration and delivery across services, platforms, and beyond. 
In Occurrent you don't persist your domain events directly to an event store, instead you convert them in a [cloud event](https://cloudevents.io/). You may regard a CloudEvent as a standardized envelope around your domain event. 
  
In practice, this means that instead of storing events in a proprietary or arbitrary format, Occurrent, stores events in accordance with the cloud event specification, even at the data-store level. 
I.e. you know the structure of your events, even in the database that the event store uses. It's up to you as a user of the library to [convert](#application-service-event-conversion) your domain events into cloud events when 
writing to the [event store](#eventstore). This is extremely powerful, not only does it allow you to design your domains event in any way you find fit (for example without compromises enforced by a JSON serialization library) but it also allows for easier migration, 
data consistency and features such as (fully-consistent) [queries](#eventstore-queries) to the event store for certain use cases. A cloud event is made-up by a set of pre-defined attributes described in the [cloud event specification](https://github.com/cloudevents/spec/blob/v1.0/spec.md).
In the context of event sourcing, we can leverage these attributes in the way suggested below:
<br><br>


| Cloud&nbsp;Event<br>Attribute&nbsp;Name | Event&nbsp;Sourcing Nomenclature&nbsp; | Description |
|:---------------------------:|:-----:|:----|
| [id](https://github.com/cloudevents/spec/blob/v1.0/spec.md#id) | event&nbsp;id | The cloud event `id` attribute is used to store the id of a unique event in a particular context ("source"). Note that this id doesn't necessarily need to be _globally_ unique (but the combination of `id` and `source` _must_). Typically this would be a UUID.<br><br> |     
| [source](https://github.com/cloudevents/spec/blob/v1.0/spec.md#source-1) | category | You can regard the "source" attribute as the "stream type" or a "category" for certain streams. For example, if you're creating a game, you may have two kinds of aggregates in your bounded context, a "game" and a "player". You can regard these as two different sources (categories). These are represented as URN's, for example the "game" may have the source "urn:mycompany:mygame:game" and "player" may have "urn:mycompany:mygame:player". This allows, for example, [subscriptions](#subscriptions) to subscribe to all events related to any player (by using a [subscription filter](#blocking-subscription-filters) for the `source` attribute).<br><br>|     
| [subject](https://github.com/cloudevents/spec/blob/v1.0/spec.md#subject) | "subject" (~identifier) | A subject describes the event in the context of the source, typically an entity (aggregate) id that all events in the stream are related to. This property is optional (because Occurrent automatically adds the `streamid` attribute) and it's possible that you may not need to add it. But it can be quite useful. For example, a stream may not _necessarily_, just hold contents of a single aggregate, and if so the `subject` can be used to distinguish between different aggregates/entities in a stream. Another example would be if you have multiple streams that represents different aspects of the same entity. For example, if you have a game where players are awarded points based on their performance in the game _after_ the game has ended, you may decide to represent "point awarding" and "game play" as different streams, but they refer to the same "game id". You can then use the "game id" as subject.<br><br>|
| [type](https://github.com/cloudevents/spec/blob/v1.0/spec.md#type) | event&nbsp;type | The type of the event. It may be enough to just use name of the domain event, such as "GameStarted" but you may also consider using a URN (e.g. "urn:mycompany:game:started") or qualify it ("com.mycompany.game.started"). Note that you should try to avoid using the fully-qualified class name of the domain event since you'll run into trouble if you're moving the domain event to a different package.<br><br>|
| [time](https://github.com/cloudevents/spec/blob/v1.0/spec.md#time) | event&nbsp;time | The time when the event occurred (typically would be the application time and not the processing time) described by [RFC 3339](https://tools.ietf.org/html/rfc3339) (represented as `java.time.OffsetDateTime` by the [CloudEvent SDK](https://github.com/cloudevents/sdk-java)).<br><br>|
| [datacontenttype](https://github.com/cloudevents/spec/blob/v1.0/spec.md#datacontenttype) | content-type | The content-type of the data attribute, typically you want to use "application/json", which is also the default if you don't specify any content-type at all.<br><br>|
| [dataschema](https://github.com/cloudevents/spec/blob/v1.0/spec.md#dataschema) | schema | The URI to a schema describing the data in the cloud event (optional).<br><br>|
| [data](https://github.com/cloudevents/spec/blob/v1.0/spec.md#event-data) | event&nbsp;data | The actual data needed to represent your domain event, for example the contents of a `GameStarted` event. You can leave out this attribute entirely if your event is fully described by other attributes.<br><br>|
     

Note that the table above is to be regarded as a rule of thumb, it's ok to map things differently if it's better suited for your application, but it's a good idea to keep things consistent throughout your organization.
To see an example of how this may look in code, refer to the [application service](#application-service-event-conversion) documentation.


### Occurrent CloudEvent Extensions

Occurrent automatically adds two [extension attributes](https://github.com/cloudevents/spec/blob/v1.0/spec.md#extension-context-attributes) to each cloud event written to the [event store](#eventstore):<br><br>

{% include macros/occurrent-cloudevent-extension.md %}

These are required for Occurrent to operate. A long-term goal of Occurrent is to come up with a standardized set of cloud event extensions that are agreed upon and used by several different vendors.

In the mean time, it's quite possible that Occurrent will provide a wider set of optional extensions in the future (such as correlation id and/or sequence number). But for now, it's up to you as a user to add these if you need them (see [CloudEvent Metadata](#specify-cloudevent-metadata)), 
you would typically do this by creating or extending/wrapping an already existing [application service](#application-service).    

### CloudEvent Metadata

You can specify metadata to the cloud event by making use of [extension attributes](https://github.com/cloudevents/spec/blob/v1.0/spec.md#extension-context-attributes). This is the place to add things such as sequence number, correlation id, causation id etc. 
Actually there's already a standard way of applying [distributed tracing](https://github.com/cloudevents/spec/blob/master/extensions/distributed-tracing.md) and [sequence number generation](https://github.com/cloudevents/spec/blob/master/extensions/sequence.md) 
extensions to cloud events that might be of interest.  

## EventStore

The event store is a place where you store events. Events are immutable pieces of data describing state changes for a particular _stream_. 
A stream is a collection of events that are related, typically but not limited to, a particular entity. For example a stream may include all events for a particular instance of a game or an order.

Occurrent provides an interface, `EventStore`, that allows to read and write events from the database. The `EventStore` interface is actually
composed of various smaller interfaces since not all databases supports all aspects provided by the `EventStore` interface. Here's an example 
that writes a cloud event to the event store and read it back: 

{% include macros/eventstore/mongodb/native/read-and-write-events.md %}

Note that when reading the events, the `EventStore` won't simply return a `Stream` of `CloudEvent`'s, instead it returns a wrapper called `EventStream`.

### EventStream            

The `EventStream` contains the `CloudEvent`'s for a stream and the version of the stream. The version can be used to guarantee that only one 
thread/process is allowed to write to the stream at the same time, i.e. optimistic locking. This can be achieved by including the version in a [write condition](#write-condition).

Note that reading a stream that doesn't exist (e.g. `eventStore.read("non-existing-id")` will return an instance of `EventStream` with an empty stream of events and `0` as version number. 
The reason for this is that you can use the same "application service" (a fancy word for a piece of code that loads events from the event store, applies them to the domain model and writes the new events returned to the event store) 
for both entity creation and subsequent use cases. For example consider this simple domain model:

{% include macros/domain/wordGuessingGameCloudEvents.md java=java kotlin=kotlin %}
 
Then we could write a generic application service that takes a higher-order function `(Stream<CloudEvent>) -> Stream<CloudEvent>`:

{% capture java %}
public class ApplicationService {

    private final EventStore eventStore;

    public ApplicationService(EventStore eventStore) {
        this.eventStore = eventStore;
    }

    public void execute(String streamId, Function<Stream<CloudEvent>, Stream<CloudEvent>> functionThatCallsDomainModel) {
        // Read all events from the event store for a particular stream
        EventStream<CloudEvent> eventStream = eventStore.read(streamId);

        // Invoke the domain model  
        Stream<CloudEvent> newEvents = functionThatCallsDomainModel.apply(eventStream.events());

        // Persist the new events  
        eventStore.write(streamId, eventStream.version(), newEvents);
    }
}
{% endcapture %}
{% capture kotlin %}
class ApplicationService constructor (val eventStore : EventStore) {

    fun execute(streamId : String, functionThatCallsDomainModel : (Stream<CloudEvent>) -> Stream<CloudEvent>) {
        // Read all events from the event store for a particular stream
        val  eventStream : EventStream<CloudEvent> = eventStore.read(streamId)
        
         // Invoke the domain model 
        val newEvents = functionThatCallsDomainModel(eventStream.events())

        // Persist the new events
        eventStore.write(streamId, eventStream.version(), newEvents)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
<div class="comment">Note that typically the domain model, WordGuessingGame in this example, would not return CloudEvents but rather a stream or list of a custom data structure, domain events, that would then be <i>converted</i> to CloudEvent's. 
This is not shown in this example above for brevity.</div>

You could then call the application service like this regardless of you're starting a new game or not:

{% capture java %}
// Here we image that we have received the data required to start a new game, e.g. from a REST endpoint. 
String gameId = ...
String wordToGuess = ...;

// Then we invoke the application service to start a game:
applicationService.execute(gameId, __ -> WordGuessingGame.startNewGame(gameId, wordToGuess));  

// Later a player guess a word:
String gameId = ...
String guess = ...;

// We thus invoke the application service again to guess the word:
applicationService.execute(gameId, events -> WordGuessingGame.guessWord(events, gameId, guess));
{% endcapture %}
{% capture kotlin %}
// Here we image that we have received the data required to start a new game, e.g. from a REST endpoint. 
val gameId : String = ...
val wordToGuess : String = ...;

// Then we invoke the application service to start a game:
applicationService.execute(gameId) { 
    WordGuessingGame.startNewGame(gameId, wordToGuess)
}  

// Later a player guess a word:
val gameId : String = ...
val guess : String = ...;

// We thus invoke the application service again to guess the word:
applicationService.execute(gameId, events -> WordGuessingGame.guessWord(events, gameId, guess));
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Writing application services like this is both powerful and simple (once you get used to it). There's less need for explicit commands and command handlers (the application service is a kind of command handler). 
You can also use other functional techniques such as partial application to make the code look, arguably, even nicer. It's also easy to compose several calls to the domain model into one by using standard functional composition techniques. 
For example in this case you might consider both starting a game and let the player make her first guess from a single request to the REST API. No need to change the domain model to do this, just use function composition.


### Write Condition

A "write condition" can be used to specify conditional writes to the event store. Typically, the purpose of this would be to achieve [optimistic concurrency control](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) (optimistic locking) of an event stream.

For example, image you have an `Account` to which you can deposit and withdraw money. A business rule says that it's not allowed to have a negative balance on an account.
Now imagine an account that is shared between two persons and contains 20 EUR. Person "A" wants to withdraw 15 EUR and person "B" wants to withdraw 10 EUR. 
If they try to do this, an error message should be presented to one of them since the account balance would be negative. But what happens if both persons try to withdraw
the money at the same time? Let's have a look:

{% capture java %}
// Person A at _time 1_
EventStream<CloudEvent> eventStream = eventStore.read("account1"); // A

// "withdraw" is a pure function in the Account domain model which takes a Stream
//  of all current events and the amount to withdraw, and returns new events. 
// In this case, a "MoneyWasWithdrawn" event is returned,  since 15 EUR is OK to withdraw.     
Stream<CloudEvent> events = Account.withdraw(eventStream.events(), Money.of(15, EUR));

// We write the new events to the event store  
eventStore.write("account1", events);

// Now in a different thread let's imagine Person B at _time 1_
EventStream<CloudEvent> eventStream = eventStore.read("account1"); // B

// Again we want to withdraw money, and the system will think this is OK, 
// since event streams for A and B has not yet recorded that the balance is negative.   
Stream<CloudEvent> events = Account.withdraw(eventStream.events(), Money.of(10, EUR));

// We write the new events to the event store without any problems! 😱 
// But this shouldn't work since it would violate the business rule!   
eventStore.write("account1", events);
{% endcapture %}
{% capture kotlin %}
// Person A at _time 1_
val eventStream = eventStore.read("account1") // A

// "withdraw" is a pure function in the Account domain model which takes a Stream
//  of all current events and the amount to withdraw. It returns a stream of 
// new events, in this case only a "MoneyWasWithdrawn" event,  since 15 EUR is OK to withdraw.     
val events = Account.withdraw(eventStream.events(), Money.of(15, EUR))

// We write the new events to the event store  
eventStore.write("account1", events)

// Now in a different thread let's imagine Person B at _time 1_
val eventStream = eventStore.read("account1") // B

// Again we want to withdraw money, and the system will think this is OK, 
// since the Account thinks that 10 EUR will have a balance of 10 EUR after 
// the withdrawal.   
val events = Account.withdraw(eventStream.events(), Money.of(10, EUR))

// We write the new events to the event store without any problems! 😱 
// But this shouldn't work since it would violate the business rule!   
eventStore.write("account1", events)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

<div class="comment">Note that typically the domain model, Account in this example, would not return CloudEvents but rather a stream or list of a custom data structure, domain events, that would then be <i>converted</i> to CloudEvent's. 
This is not shown in the example above for brevity, look at the <a href="#commands">command</a> section for a more real-life example.</div>

To avoid the problem above we want to make use of conditional writes. Let's see how:

{% capture java %}
// Person A at _time 1_
EventStream<CloudEvent> eventStream = eventStore.read("account1"); // A
long currentVersion = eventStream.version(); 

// Withdraw money
Stream<CloudEvent> events = Account.withdraw(eventStream.events(), Money.of(15, EUR));

// We write the new events to the event store with a write condition that implies
// that the version of the event stream must be A.   
eventStore.write("account1", currentVersion, events);

// Now in a different thread let's imagine Person B at _time 1_
EventStream<CloudEvent> eventStream = eventStore.read("account1"); // A 
long currentVersion = eventStream.version();

// Again we want to withdraw money, and the system will think this is OK, 
// since event streams for A and B has not yet recorded that the balance is negative.   
Stream<CloudEvent> events = Account.withdraw(eventStream.events(), Money.of(10, EUR));

// We write the new events to the event store with a write condition that implies
// that the version of the event stream must be B. But now Occurrent will throw
// a "org.occurrent.eventstore.api.WriteConditionNotFulfilledException" since, in this
// case A was slightly faster, and the version of the event stream no longer match!
// The entire operation should be retried for person B and when "Account.withdraw(..)"
// is called again it could throw a "CannotWithdrawSinceBalanceWouldBeNegative" exception. 
eventStore.write("account1", currentVersion, events); 
{% endcapture %}
{% capture kotlin %}
// Person A at _time 1_
val eventStream = eventStore.read("account1") // A
val currentVersion = eventStream.version() 

// Withdraw money
val events = Account.withdraw(eventStream.events(), Money.of(15, EUR));

// We write the new events to the event store with a write condition that implies
// that the version of the event stream must be A.   
eventStore.write("account1", currentVersion, events)

// Now in a different thread let's imagine Person B at _time 1_
val eventStream = eventStore.read("account1"); // A 
val currentVersion = eventStream.version()

// Again we want to withdraw money, and the system will think this is OK, 
// since event streams for A and B has not yet recorded that the balance is negative.   
val events = Account.withdraw(eventStream.events(), Money.of(10, EUR))

// We write the new events to the event store with a write condition that implies
// that the version of the event stream must be B. But now Occurrent will throw
// a "org.occurrent.eventstore.api.WriteConditionNotFulfilledException" since, in this
// case A was slightly faster, and the version of the event stream no longer match!
// The entire operation should be retried for person B and when "Account.withdraw(..)"
// is called again it could throw a "CannotWithdrawSinceBalanceWouldBeNegative" exception. 
eventStore.write("account1", currentVersion, events) 

{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
       
What you've seen above is a simple, but widely used, form of write condition. Actually, doing `eventStore.write("streamId", version, events)` 
is just a shortcut for: 

{% capture java %}
eventStore.write("streamId", WriteCondition.streamVersionEq(version), events);
{% endcapture %}
{% capture kotlin %}
eventStore.write("streamId", WriteCondition.streamVersionEq(version), events)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
 
<div class="comment">WriteCondition can be imported from "org.occurrent.eventstore.api.WriteCondition".</div>

But you can compose a more advanced write condition using a `Condition`:

{% capture java %}
eventStore.write("streamId", WriteCondition.streamVersion(and(lt(10), ne(5)), events);
{% endcapture %}
{% capture kotlin %}
eventStore.write("streamId", WriteCondition.streamVersion(and(lt(10), ne(5)), events)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
 
where `lt`, `ne` and `and` is statically imported from `org.occurrent.condition.Condition`.           


### EventStore Queries

Since Occurrent builds on-top of existing databases it's ok, given that you know what you're doing<span>&#42;</span>, to use the strengths of these databases.
One such strength is that databases typically have good querying support. Occurrent exposes this with the `EventStoreQueries` interface
that an EventStore implementation may implement to expose querying capabilities. For example:

{% capture java %}
OffsetDateTime lastTwoHours = OffsetDateTime.now().minusHours(2); 
// Query the database for all events the last two hours that have "subject" equal to "123" and sort these in descending order
Stream<CloudEvent> events = eventStore.query(time(gte(lastTwoHours)).and(subject("123")), SortBy.TIME_DESC);
{% endcapture %}
{% capture kotlin %}
val lastTwoHours = OffsetDateTime.now().minusHours(2);
// Query the database for all events the last two hours that have "subject" equal to "123" and sort these in descending order
val events : Stream<CloudEvent> = eventStore.query(time(gte(lastTwoHours)).and(subject("123")), SortBy.TIME_DESC)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

<div class="comment"><span>&#42;</span>There's a trade-off when it's appropriate to query the database vs creating materialized views/projections and you should most likely create indexes to allow for fast queries.</div>

The `time` and `subject`  methods are statically imported from `org.occurrent.filter.Filter` and `lte` is statically imported from `org.occurrent.condition.Condition`.  

`EventStoreQueries` is not bound to a particular stream, rather you can query _any_ stream (or multiple streams at the same time). 
It also provides the ability to get an "all" stream:
  
{% capture java %}
// Return all events in an event store sorted by descending order
Stream<CloudEvent> events = eventStore.all(SortBy.TIME_DESC);
{% endcapture %}
{% capture kotlin %}
// Return all events in an event store sorted by descending order
val events : Stream<CloudEvent> = eventStore.all(SortBy.TIME_DESC)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}    

The `EventStoreQueries` interface also supports skip and limit capabilities which allows for pagination:

{% capture java %}
// Skip 42, limit 1024
Stream<CloudEvent> events = eventStore.all(42, 1024);
{% endcapture %}
{% capture kotlin %}
// Skip 42, limit 1024
val events : Stream<CloudEvent> = eventStore.all(42, 1024)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}    

To get started with an event store refer to [Choosing An EventStore](#choosing-an-eventstore).

## Subscriptions

A subscription is a way to get notified when new events are written to an event store. Typically, a subscription will forward the event to another piece of infrastructure such as
a message bus, or create views from the events (such as projections, sagas, snapshots etc). There are two different kinds of API's, the first one is a [blocking API](#blocking-subscriptions) 
represented by the `BlockingSubscription` interface (in the `org.occurrent:subscription-api-blocking` module), and second one is a [reactive API](#reactive-subscriptions) 
represented by the `ReactorSubscription` interface (in the `org.occurrent:subscription-api-reactor` module). 


The blocking API is callback based, which is fine if you're working with individual events (you can of course write a simple function that aggregates events into batches).
If you want to work with streams of data, the `ReactorSubscription` is probably a better option since it's using the [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html)
publisher from [project reactor](https://projectreactor.io/).

Note that it's fine to use `ReactorSubscription`, even though the event store is implemented using the blocking api, and vice versa.
If the datastore allows it, you can also run subscriptions in a different process than the processes reading and writing to the event store.   

To get started with subscriptions refer to [Using Subscriptions](#using-subscriptions).

### EventStore Operations

Occurrent event store implementations may optionally also implement the `EventStoreOperations` interface. It provides means to delete a specific event, or an entire 
event stream. For example:

{% capture java %}
// Delete an entire event stream
eventStoreOperations.deleteEventStream("streamId");
// Delete a specific event
eventStoreOperations.deleteEvent("cloudEventId", cloudEventSource);
// This will delete all events in stream "myStream" that has a version less than or equal to 19.
eventStoreOperations.delete(streamId("myStream").and(streamVersion(lte(19L)));
{% endcapture %}
{% capture kotlin %}
// Delete an entire event stream
eventStoreOperations.deleteEventStream("streamId")
// Delete a specific event
eventStoreOperations.deleteEvent("cloudEventId", cloudEventSource)
// This will delete all events in stream "myStream" that has a version less than or equal to 19.
eventStoreOperations.delete(streamId("myStream").and(streamVersion(lte(19L)))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

These are probably operations that you want to use sparingly. Typically, you never want to remove any events, but there are some cases, such as GDPR or other regulations, 
that requires the deletion of an event or an entire event stream. You should be aware that there are other ways to solve this though. One way would be to encrypt personal data
and throw away the key when the user no longer uses the service. Another would be to store personal data outside the event store. 

Another reason for deleting events is if you're implementing something like "closing the books" or certain types of snapshots, and don’t need the old events anymore. 

Another feature provided by `EventStoreOperations` is the ability to update an event. Again, this is not something you normally want to do, but it can be useful for 
certain strategies of GDPR compliance. For example maybe you want to remove or update personal data in an event when a users unregisters from your service. Here's an example:

{% capture java %}
eventStoreOperations.updateEvent("cloudEventId", cloudEventSource, cloudEvent -> {
    return CloudEventBuilder.v1(cloudEvent).withData(removePersonalDetailsFrom(cloudEvent)).build();
});
{% endcapture %}
{% capture kotlin %}
eventStoreOperations.updateEvent("cloudEventId", cloudEventSource) { cloudEvent -> 
    CloudEventBuilder.v1(cloudEvent).withData(removePersonalDetailsFrom(cloudEvent)).build()
})
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
     
## Views

Occurrent doesn't have any special components for creating views/projections. Instead, you simply create a [subscription](#subscriptions) in which you can create and store 
the view as you find fit. But this doesn't have to be difficult! Here's a trivial example of a view that maintains the number of
ended games. It does so by inceasing the "numberOfEndedGames" field in an (imaginary) database for each "GameEnded" event that is written to the event store:

{% capture java %}
// An imaginary database API
Database someDatabase = ...
// Subscribe to all "GameEnded" events by starting a subscription named "my-view" 
// and increase "numberOfEndedGames" for each ended game.   
subscription.subscribe("my-view", filter(type("GameEnded")), cloudEvent -> someDatabase.inc("numberOfEndedGames"));        
{% endcapture %}
{% capture kotlin %}
// An imaginary database API
val someDatabase : Database = ...
// Subscribe to all "GameEnded" events by starting a subscription named "my-view" 
// and increase "numberOfEndedGames" for each ended game. 
subscription.subscribe("my-view", filter(type("GameEnded"))) {  
    someDatabase.inc("numberOfEndedGames")
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Where `filter` is imported `from org.occurrent.subscription.OccurrentSubscriptionFilter` and `type` is imported from `org.occurrent.condition.Condition`.

While this is a trivial example it shouldn't be difficult to create a view that is backed by a JPA entity in a relational database based on a subscription.

## Commands

A command is used to represent an _action_ in an event sourced system, i.e. something that you _want_ to do. They're different, in a very important way, from events in that commands 
can fail or be rejected, where-as events cannot. A typical example of a command would be a data structure whose name is defined as an imperative verb, for example `PlaceOrder`. 
The resulting event, if the command is processed successfully, could then be `OrderWasPlaced`. However, in Occurrent, as explained in more detail in the [Command Philosophy](#command-philosophy)
section below, you are encouraged to start off by not using explicit data structures for commands unless you want to. Occurrent instead promotes pure functions 
to represent commands. Combine this with function composition and you have a powerful way to invoke the domain model (refer to the [application service](#application-service) for examples).           

### Command Philosophy

Occurrent doesn't contain a built-in command bus. The reason for this is that I'm not convinced that it's needed in a majority of cases.
To send "commands" to another service (remotely) one could call a REST API or make an RPC invocation instead of using a proprietary command bus. 
One exception to this is if you need [location transparency](https://en.wikipedia.org/wiki/Location_transparency).    

But what about internally? For example if a service exposes a REST API and upon receiving a request it publishes a command that's somehow picked up and 
routed to a function in your domain model. This is where an [application service](#application-service) becomes useful. However, let's first explore the 
rationale behind the philosophy of Occurrent. In other frameworks, it's not uncommon that you define your domain model like this:

{% capture java %}
public class WordGuessingGame extends AggregateRoot {

    @AggregateId
    private String gameId;
    private String wordToGuess;

    @HandleCommand
    public void handle(StartNewGameCommand startNewGameCommand) {
        // Insert some validation and logic
        ... 
        // Publish an event using the "publish" method from AggregateRoot
        publish(new WordGuessingGameWasStartedEvent(...));
    }
    
    @HandleCommand
    public void handle(GuessWordCommand guessWordCommand) {
        // Some validation and implementation ...
        ...	
        
        // Publish an event using the "publish" method from AggregateRoot
        publish(new WordGuessedEvent(...));
    }

    @HandleEvent
    public void handle(WordGuessingGameWasStartedEvent e) {
        this.gameId = e.getGameId();
        this.wordToGuess = e.getWordToGuess();    
    }        

    ... 
}
{% endcapture %}
{% capture kotlin %}
 class WordGuessingGame : AggregateRoot() {
 
     @AggregateId
     var gameId : String
     var wordToGuess : String
 
     @HandleCommand
     fun handle(startNewGameCommand : StartNewGameCommand) {
         // Insert some validation and logic
         ... 
         // Publish an event using the "publish" method from AggregateRoot
         publish(WordGuessingGameWasStartedEvent(...))
     }
     
     @HandleCommand
     fun handle(guessWordCommand : GuessWordCommand) {
         // Some validation and implementation ...
         ...	
         
         // Publish an event using the "publish" method from AggregateRoot
         publish(WordGuessedEvent(...))
     }
 
     @HandleEvent
     fun handle(e : WordGuessingGameWasStartedEvent) {
         gameId = e.getGameId()
         wordToGuess = e.getWordToGuess()    
     }        
 
     ... 
 }
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
<div class="comment">This is a made-up example of an imaginary event sourcing framework, it's not how you're encouraged to implement a domain model 
using Occurrent.</div>

Let's look at a "command" and see what it typically looks like in these frameworks:

{% capture java %}
public class StartNewGameCommand {
    
    @AggregateId
    private String gameId;
    private String wordToGuess;
    
    public void setGameId(String gameId) {
        this.gameId = gameId;
    }
    
    public String getGameId() {
        return gameId;
    }

    public void setWordToGuess(String wordToGuess) {
        this.gameId = gameId;
    }
    
    public String getWordToGuess() {
        return wordToGuess;
    }
    
    // Equals/hashcode/tostring methods are excluded for breivty
}
{% endcapture %}
{% capture kotlin %}
data class StartNewGameCommand(@AggregateId var gameId: String, val wordToGuess : String)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Now that we have our `WordGuessingGame` implementation and a command we can dispatch it to a command bus:
{% capture java %}
commandbus.dispatch(new StartNewGameCommand("someGameId", "Secret word"));
{% endcapture %}
{% capture kotlin %}
commandbus.dispatch(StartNewGameCommand("someGameId", "Secret word"))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

From a typical Java perspective one could argue that this is not too bad. But it does have a few things one could improve upon from a broader perspective:

1. The `WordGuessingGame` is [complecting](https://www.infoq.com/presentations/Simple-Made-Easy/) several things that may be modelled separately. 
   Data, state, behavior, command- and event routing and event publishing are all defined in the same model (the `WordGuessingGame` class).
   It also uses framework specific annotations, classes and inheritance inside your domain model which is something you want to avoid. 
   For small examples like this it arguably doesn't matter, but if you have complex logic and a large system, it probably will in my experience. 
   Keeping state and behavior separate allows for easier testing, referential transparency and function composition. 
   It allows treating the state as a [value](https://www.infoq.com/presentations/Value-Values/) which has many benefits.
1. Commands are defined as explicit data structures (this is not _necessarily_ a bad thing but it will add to your code base) when arguably they don't have to. 

### Commands in Occurrent 

So how would one dispatch commands in Occurrent? There's actually nothing stopping you from implementation a simple command bus, create explicit commands, 
and dispatch them the way we did in the example above. Actually it would be relatively easy to implement the imaginary framework above using Occurrent components. But if
you've recognized the problems described above you're probably looking for a different approach. Here's another way you can do it. First of all let's refactor 
our domain model to pure functions, without any state or dependencies to Occurrent or any other library/framework. 

{% include macros/domain/wordGuessingGameDomainEvents.md java=java kotlin=kotlin %}

If you define your behavior like this it'll be really easy to test (and also to compose using normal function composition techniques). There are no side-effects 
(such as publishing events) which also allows for easier testing and [local reasoning](https://www.inner-product.com/posts/fp-what-and-why/).

But where are our commands!? In this example we've decided to represent them as functions. I.e. the "command" is modeled as simple function, e.g. `startNewGame`!
But wait, how can I dispatch commands to this function? Just create or copy a generic `ApplicationService` class like the one below 
(or use the generic [application service](#application-service) provided by Occurrent) if you're using an object-oriented approach:         

{% include macros/applicationservice/generic-oo-application-service.md %}

and then use the `ApplicationService` like this:

{% capture java %}
// A function that converts a CloudEvent to a "domain event"
Function<CloudEvent, DomainEvent> convertCloudEventToDomainEvent = ..
// A function that a "domain event" to a CloudEvent
Function<DomainEvent, CloudEvent> convertDomainEventToCloudEvent = ..
EventStore eventStore = ..
ApplicationService applicationService = new ApplicationService(eventStore, convertCloudEventToDomainEvent, convertDomainEventToCloudEvent);

// Now in your REST API use the application service:
String gameId = ... // From a form parameter
String wordToGuess = .. // From a form parameter
applicationService.execute(gameId, events -> WordGuessingGame.startNewGame(gameId, wordToGuess));
{% endcapture %}
{% capture kotlin %}
// A function that converts a CloudEvent to a "domain event"
val convertCloudEventToDomainEvent : (CloudEvent) -> DomainEvent = ..
// A function that a "domain event" to a CloudEvent
val convertDomainEventToCloudEvent = (DomainEvent) -> CloudEvent  = ..
val eventStore : EventStore = ..
val applicationService = ApplicationService(eventStore, convertCloudEventToDomainEvent, convertDomainEventToCloudEvent);

// Now in your REST API use the application service:
val gameId = ... // From a form parameter
val wordToGuess = .. // From a form parameter
applicationService.execute(gameId) { events -> 
    WordGuessingGame.startNewGame(gameId, wordToGuess)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Command Composition

Many times it's useful to compose multiple commands into a single unit-of-work. What this means that you'll "merge" several commands into one, and they will be executed in an atomic fashion. 
I.e. either _all_ commands succeed, or all commands fail.

While you're free to use any means and/or library to achieve this, Occurrent ships with a "command composition" library that you can leverage:

{% include macros/command/composition-maven.md %}

As an example consider this simple domain model:

{% include macros/command/composition-domain.md %}

Imagine that for a specific API you want to allow starting a new game and making a guess in the same request. Instead of changing your domain model, 
you can use function composition! If you import `org.occurrent.application.composition.command.StreamCommandComposition.composeCommands` you can do like this:

{% include macros/command/composition-example.md %}
<div class="comment">If you're using commands that takes and returns a "java.util.List" instead of a Stream, you can instead statically import "composeCommands"
from "org.occurrent.application.composition.command.ListCommandComposition". If you're using Kotlin you should import the "composeCommands" extension function from 
"org.occurrent.application.composition.command.composeCommands".</div>

If you're using Kotlin you can also make use of the `andThen` (infix) function for command composition (import `org.occurrent.application.composition.command.andThen`):

```kotlin
applicationService.execute(gameId,
    { events -> WordGuessingGame.startNewGame(events, gameId, wordToGuess) }
        andThen { events -> WordGuessingGame.makeGuess(events, guess) })
```


Events returned from `WordGuessingGame.startNewGame(..)` will be appended to the event stream when calling `WordGuessingGame.makeGuess(..)` and the new domain events
returned by the two functions will be merged and written in an atomic fashion to the event store.

The command composition library also contains some utilities for [partial function application](https://en.wikipedia.org/wiki/Partial_application) 
that you can use to further enhance the example above (if you like). If you statically import `partial` method from `org.occurrent.application.composition.command.partial.PartialStreamCommandApplication` 
you can refactor the code above into this:

{% include macros/command/composition-example-partial.md %}
<div class="comment">If you're using commands that takes and returns a "java.util.List" instead of a Stream, you can instead statically import "partial"
from "org.occurrent.application.composition.command.partial.PartialListCommandApplication". If you're using Kotlin, imporant the "partial" extension function
from "org.occurrent.application.composition.command.partial".</div>

With Kotlin, you can also use `andThen` (described above) to do:

```kotlin
applicationService.execute(gameId, 
    WordGuessingGame::startNewGame.partial(gameId, wordToGuess)
            andThen WordGuessingGame::makeGuess.partial(guess))
```

### Command Conversion  

If you have an [application service](#application-service) that takes a higher-order function in the form of `Function<Stream<DomainEvent>, Stream<DomainEvent>>` but your 
domain model is defined with list's (`Function<List<DomainEvent, List<DomainEvent>`) then Occurrent provides means to easily convert between them. First you need 
to depend on the [Command Composition](#command-composition) library:

{% include macros/command/composition-maven.md %}

Let's say you have a domain model defined like this:

{% include macros/command/conversion-domain.md %}

But you [application service](#application-service) takes a `Function<Stream<DomainEvent>, Stream<DomainEvent>>`:

```java
public class ApplicationService {
    public void execute(String streamId, Function<Stream<DomainEvent>, Stream<DomainEvent>> functionThatCallsDomainModel) {
        // Implementation
    }
}
```

Then you can make use of the `toStreamCommand` in `org.occurrent.application.composition.command.CommandConversion` to call the domain function:

{% include macros/command/conversion-example.md %}
<div class="comment">You can also use the "toListCommand" method to convert a "Function&lt;Stream&lt;DomainEvent&gt;, Stream&lt;DomainEvent&gt;&gt;" into a "Function&lt;List&lt;DomainEvent&gt;, List&lt;DomainEvent&gt;&gt;"</div>


## Application Service

Occurrent provides a generic application service that is a good starting point for most use cases. First add the module as a dependency to your project:

{% include macros/applicationservice/blocking-maven.md %}

This module provides an interface, `org.occurrent.application.service.blocking.ApplicationService`, and a default implementation, 
`org.occurrent.application.service.blocking.implementation.GenericApplicationService`. The `GenericApplicationService` takes an `EventStore` and 
a `org.occurrent.application.converter.CloudEventConverter` implementation as parameters. The latter is used to convert domain events to and from 
cloud events when loaded/written to the event store. There's a default implementation that you *may* decide to use called, 
`org.occurrent.application.converter.implementation.GenericCloudEventConverter`. You can see an example in the [next](#application-service-event-conversion) section.

### Application Service Event Conversion

Let's have a look at an example of how we can convert our to domain events to cloud events (and vice versa) when using the [generic application service](#application-service) (the application service implementation provided by Occurrent). 

{% capture java %}
DomainEventConverter domainEventConverter = new DomainEventConverter(new ObjectMapper());
CloudEventConverter<DomainEvent> cloudEventConverter = new GenericCloudEventConverter<>(domainEventConverter::convertToDomainEvent, domainEventConverter::convertToCloudEvent);
{% endcapture %}
{% capture kotlin %}
val domainEventConverter = DomainEventConverter(ObjectMapper())
val cloudEventConverter = GenericCloudEventConverter(domainEventConverter::convertToDomainEvent, domainEventConverter::convertToCloudEvent)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
<div class="comment">ObjectMapper a class from the is Jackson library</div>

Here's an example of a `DomainEventConverter` (this is something you implement yourself):

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import io.cloudevents.CloudEvent;
import io.cloudevents.core.builder.CloudEventBuilder;

import java.io.IOException;
import java.net.URI;

import static java.time.ZoneOffset.UTC;
import static org.occurrent.functional.CheckedFunction.unchecked;
import static org.occurrent.time.TimeConversion.toLocalDateTime;

public class DomainEventConverter {

    private final ObjectMapper objectMapper;

    public DomainEventConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public CloudEvent convertToCloudEvent(DomainEvent e) {
        try {
            return CloudEventBuilder.v1()
                    .withId(e.getEventId())
                    .withSource(URI.create("urn:myapplication:streamtype"))
                    .withType(e.getClass().getName())
                    .withTime(LocalDateTime.ofInstant(e.getDate().toInstant(), UTC).atOffset(UTC)
                                           .truncatedTo(ChronoUnit.MILLIS))
                    .withSubject(e.getName())
                    .withDataContentType("application/json")
                    .withData(objectMapper.writeValueAsBytes(e))
                    .build();
        } catch (JsonProcessingException jsonProcessingException) {
            throw new RuntimeException(jsonProcessingException);
        }
    }

    public DomainEvent convertToDomainEvent(CloudEvent cloudEvent) {
        try {
            return (DomainEvent) objectMapper.readValue(cloudEvent.getData().toBytes(), Class.forName(cloudEvent.getType()));
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}        
```
<div class="comment">While this implementation works for simple cases, make sure that you think before simply copying and pasting this class into your own code base. 
The reason is that you may not need to serialize all data in the domain event to the data field (some parts of the domain event, such as id and type, is already present in the cloud event), 
and the "type" field contains the fully-qualified name of the class which makes it more difficult to move without loosing backward compatibility. Also your domain events
might not be serializable to JSON without conversion. For these reasons, it's recommended to create a more custom mapping between a cloud event and domain event.</div>

To see what the attributes means in the context of event sourcing refer to the [CloudEvents](#cloudevents) documentation. 
You can also have a look at [GenericApplicationServiceTest.java](https://github.com/johanhaleby/occurrent/blob/occurrent-{{site.occurrentversion}}/application/service/blocking/src/test/java/org/occurrent/application/service/blocking/implementation/GenericApplicationServiceTest.java) 
for an actual code example.

If your domain model is using a `CloudEvent` (and not a custom domain event) then just pass a `Function.identity()` to the `GenericCloudEventConverter`:

```java
CloudEventConverter<CloudEvent> cloudEventConverter = new GenericCloudEventConverter<>(Function.identity(), Function.identity());
```         

Note that if the data content type in the CloudEvent is specified as "application/json" (or a json compatible content-type) then Occurrent will automatically store it as [Bson](http://bsonspec.org/) in a MongoDB event store.
The reason for this so that you're able to query the data, either by the [EventStoreQueries](#eventstore-queries) API, or manually using MongoDB queries. 
In order to do this, the `byte[]` passed to `withData`, will be converted into a `org.bson.Document` that is later written to the database. This is not optimal from a performance perspective.
A more performant option would be to make use of the `io.cloudevents.core.data.PojoCloudEventData` class. This class implements the `io.cloudevents.CloudEventData` interface and
allows passing a pre-baked `Map` or `org.bson.Document` instance to it. Then no additional conversion will need to take place! Here's an example:

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import io.cloudevents.CloudEvent;
import io.cloudevents.core.builder.CloudEventBuilder;
import io.cloudevents.core.data.PojoCloudEventData;
import org.bson.Document;

import java.io.IOException;
import java.net.URI;

import static java.time.ZoneOffset.UTC;
import static org.occurrent.functional.CheckedFunction.unchecked;
import static org.occurrent.time.TimeConversion.toLocalDateTime;
import static java.time.temporal.ChronoUnit.MILLIS;

public class DomainEventConverter {
    
    private final ObjectMapper objectMapper;
    
    public DomainEventConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    } 

    public CloudEvent convertToCloudEvent(DomainEvent e) {  
            // Convert the data in the domain event into a Document 
            Map<String, Object> eventData = convertDataInDomainEventToMap(e);
            return CloudEventBuilder.v1()
                    .withId(e.getEventId())
                    .withSource(URI.create("http://name"))
                    .withType(e.getClass().getName())
                    .withTime(LocalDateTime.ofInstant(e.getDate().toInstant(), UTC).atOffset(UTC)
                                           .truncatedTo(MILLIS))
                    .withSubject(e.getName())
                    .withDataContentType("application/json")  
                    // Use the "eventData" map to create an instance of PojoCloudEventData.
                    // If an event store implementation doesn't know how to handle "Map" data,
                    // it'll call the higher-order function that converts the map into byte[] 
                    // (objectMapper::writeValueAsBytes), that it _has_ to understand.
                    // But since all Occurrent event stores currently knows how to handle maps, 
                    // the objectMapper::writeValueAsBytes method will never be called.
                    .withData(PojoCloudEventData.wrap(eventData, objectMapper::writeValueAsBytes))
                    .build();
    }

    public DomainEvent convertToDomainEvent(CloudEvent cloudEvent) {
        CloudEventData cloudEventData = cloudEvent.getData();
        if (cloudEventData instanceof PojoCloudEventData && cloudEventData.getValue() instanceof Map) {
            Map<String, Object> eventData = ((PojoCloudEventData<Map<String, Object>>) cloudEventData).getValue();
            return convertToDomainEvent(cloudEvent, eventData);
        } else {
            return objectMapper.readValue(cloudEventData.toBytes(), DomainEvent.class); // try-catch omitted
        }
    }       
    
    private static Map<String, Object> convertDataInDomainEventToDocument(DomainEvent e) {
        // Convert the domain event into a Map                
        Map<String, Object> data = new HashMap<String, Object>();
        if (e instanceof GameStarted) {
           data.put("type", "GameStarted"); 
           // Put the rest of the values
        } else if (...) {
            // More events
        }
        return map;
    }

    private static DomainEvent convertToDomainEvent(CloudEvent cloudEvent, Map<String, Object> data) {
        // Re-construct the domain event instance from the cloud event and data
        switch ((String) data.get("type")) {
            case "GameStarted" -> // Convert map to GameStartedEvent 
                break;
            ...
        }
    }
}        
```
<div class="comment">Tip: Instead of working directly with maps, you can use Jackson to convert a DTO into a Map, by calling "jackson.convertValue(myDTO, new TypeReference&lt;Map&lt;String, Object&gt;&gt;() {});".</div>

### Using the Application Service

Now you can instantiate the (blocking) `GenericApplicationService`:

{% capture java %}
EventStore eventStore = ..
CloudEventConverter<DomainEvent> cloudEventConverter = ..
ApplicationService<DomainEvent> applicationService = new GenericApplicationService<>(eventStore, cloudEventConverter);
{% endcapture %}
{% capture kotlin %}
val eventStore : EventStore = ..
val cloudEventConverter : CloudEventConverter<DomainEvent> = ..
val applicationService : ApplicationService<DomainEvent> = GenericApplicationService(eventStore, cloudEventConverter)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

You're now ready to use the generic application service in your application. As an example let's say you have a domain model with a method defined like this:

```java
public class WordGuessingGame {
    public static Stream<DomainEvent> guessWord(Stream<DomainEvent> events, String guess) {
        // Implementation
    }    
}
``` 

You can call it using the application service:

{% capture java %}
applicationService.execute(gameId, events -> WordGuessingGame.guessWord(events, guess));
{% endcapture %}
{% capture kotlin %}
applicationService.execute(gameId) { events -> 
    WordGuessingGame.guessWord(events, guess)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Application Service Side-Effects

The `GenericApplicationService` supports executing side-effects after the events returned from the domain model have been written to the event store.
This is useful if you need to, for example, update a view _synchronously_ after events have been written to the event store. Note that to perform side-effects (or policies)
asynchronously you should use a [subscription](#subscriptions). As an example, consider that you want to synchronously register a game as ongoing when it is started. 
It may be defined like this:

{% capture java %}
public class RegisterOngoingGame {
    private final DatabaseApi someDatabaseApi;
    
    pubic RegisterOngoingGame(DatabaseApi someDatabaseApi) {
        this.someDatabaseApi = someDatabaseApi;
    }

    public void registerGameAsOngoingWhenGameWasStarted(GameWasStarted event) {
        // Add the id of the game started event to a set to handle duplicates and idempotency.
        someDatabaseApi.addToSet("ongoingGames", Map.of("gameId", e.gameId(), "date", e.getDate()));                
    }
}
{% endcapture %}
{% capture kotlin %}
class RegisterOngoingGame(private val someDatabaseApi : DatabaseApi) {
    fun registerGameAsOngoingWhenGameWasStarted(event : GameWasStarted) {
        // Add the id of the game started event to a set to handle duplicates and idempotency.
        someDatabaseApi.addToSet("ongoingGames", Map.of("gameId", e.gameId(), "date", e.getDate()));                
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The reason for doing this synchronously is, for example, if you have a REST API and the player expects the ongoing games view to be updated once the "start game" 
command has executed. This can be achieved by other means (RSocket, Websockets, server-sent events, polling) but synchronous updates is simple and works quite well in many cases.

Now that we have the code that registers ongoing games, we can call it from our from the application service:

{% capture java %}
RegisterOngoingGame registerOngoingGame = ..
applicationService.execute(gameId, events -> WordGuessingGame.guessWord(events, guess), events -> {
    events.filter(event -> event instanceof GameWasStarted)
         .findFirst()
         .map(GameWasStarted.class::cast)
         .ifPresent(registerOngoingGame::registerGameAsOngoingWhenGameWasStarted)
});
{% endcapture %}
{% capture kotlin %}
val registerOngoingGame : RegisterOngoingGame = ..
applicationService.execute(gameId, { events -> WordGuessingGame.guessWord(events, guess) }) { events -> 
    val gameWasStarted = events.find { event is GameWasStarted }
    if(gameWasStarted != null) {
        registerOngoingGame.registerGameAsOngoingWhenGameWasStarted(gameWasStarted) 
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Voila! Now `registerGameAsOngoingWhenGameWasStarted` will be called after the events returned from `WordGuessingGame.guessWord(..)` is written to the event store.
You can however improve on the code above and make use of the `executePolicy` method shipped with the application service in the `org.occurrent.application.service.blocking.PolicySideEffect`.
The code can then be refactored to this:

```java
applicationService.execute(gameId, events -> WordGuessingGame.guessWord(events, guess), executePolicy(GameWasStarted.class, registerOngoingGame::registerGameAsOngoingWhenGameWasStarted)); 
```                            

If using the [Kotlin extension functions](#application-service-kotlin-extensions) (`org.occurrent.application.service.blocking.executePolicy`) you can write the code like this:

```kotlin
applicationService.execute(gameId, { events -> WordGuessingGame.guessWord(events, guess) }, executePolicy<GameWasStarted>(registerOngoingGame::registerGameAsOngoingWhenGameWasStarted))
```

Policies can also be composed:

{% capture java %}
RegisterOngoingGame registerOngoingGame  = ..
RemoveFromOngoingGamesWhenGameEnded removeFromOngoingGamesWhenGameEnded = ..

applicationService.execute(gameId, events -> WordGuessingGame.guessWord(events, guess), 
                           executePolicy(GameWasStarted.class, registerOngoingGame::registerGameAsOngoingWhenGameWasStarted)
                            .andThenExecuteAnotherPolicy(removeFromOngoingGamesWhenGameEnded::removeFromOngoingGamesWhenGameEnded));
{% endcapture %}
{% capture kotlin %}
val registerOngoingGame : RegisterOngoingGame = ..
val removeFromOngoingGamesWhenGameEnded : RemoveFromOngoingGamesWhenGameEnded = ..

applicationService.execute(gameId, { events -> WordGuessingGame.guessWord(events, guess) }, 
                            executePolicies(registerOngoingGame::registerGameAsOngoingWhenGameWasStarted, 
                                            removeFromOngoingGamesWhenGameEnded::removeFromOngoingGamesWhenGameEnded))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Application Service Transactional Side-Effects

In the example above, writing the events to the event store and executing policies is not an atomic operation. If your app crashes before after the call to `registerOngoingGame::registerGameAsOngoingWhenGameWasStarted`
but before `removeFromOngoingGamesWhenGameEnded::removeFromOngoingGamesWhenGameEnded`, you will need to handle idempotency. But if your policies/side-effects are writing data to the same database as the event store
you can make use of transactions to write everything atomically! This is very easy if you're using a [Spring EventStore](#eventstore-with-spring-mongotemplate-blocking). What you need to do is to wrap the `ApplicationService` provided
by Occurrent in your own application service, something like this:

{% capture java %}
@Service
public class CustomApplicationServiceImpl implements ApplicationService<DomainEvent> {
	private final GenericApplicationService<DomainEvent> occurrentApplicationService;

	public CustomApplicationService(GenericApplicationService<DomainEvent> occurrentApplicationService) {
		this.occurrentApplicationService = occurrentApplicationService;
	}

	@Transactional
	@Override
    public void execute(String streamId, Function<Stream<DomainEvent>, Stream<DomainEvent>> functionThatCallsDomainModel, Consumer<Stream<DomainEvent>> sideEffect) {
		occurrentApplicationService.execute(gameId, functionThatCallsDomainModel, sideEffect);
    }
}
{% endcapture %}
{% capture kotlin %}
@Service
class CustomApplicationServiceImpl(val occurrentApplicationService:  GenericApplicationService<DomainEvent>) : ApplicationService<DomainEvent> {

	@Transactional
    override fun execute(streamId : String, functionThatCallsDomainModel: Function<Stream<DomainEvent>, Stream<DomainEvent>> , sideEffect : Consumer<Stream<DomainEvent>>) {
		occurrentApplicationService.execute(gameId, functionThatCallsDomainModel, sideEffect)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Given that you've defined a `MongoTransactionManager` in your Spring Boot configuration (and using this when creating your [event store instance](#eventstore-with-spring-mongotemplate-blocking)) the side-effects and events
are written atomically in the same transaction! 

### Application Service Kotlin Extensions

If you're using [Kotlin](https://kotlinlang.org/) chances are that your domain model is using a [Sequence](https://kotlinlang.org/docs/reference/sequences.html)
instead of a java `Stream`:

```kotlin
object WordGuessingGame {
    fun guessWord(events : Sequence<DomainEvent>, guess : String) : Sequence<DomainEvent> {
        // Implementation
    }    
}
```           

Occurrent provides a set of extension functions for Kotlin in the application service module:

{% include macros/applicationservice/blocking-maven.md %}

You can then use one of the `org.occurrent.application.service.blocking.execute` extension functions to do:

```kotlin
applicationService.execute(gameId) { events : Sequence<DomainEvent> -> 
    WordGuessingGame.guessWord(events, guess)
}
```

## Sagas

A "saga" can be used to represent and coordinate a long-lived business transaction/process (where "long-lived" is kind of arbitrary). This is an advanced subject
and you should try to avoid sagas if there are other means available to solve the problem (for example use [policies](#policy) if they are sufficient). Occurrent doesn't provide or enforce any specific
Saga implementation. But since Occurrent is a library you can hook in already existing solutions, for example:   

* [zio-saga](https://github.com/VladKopanev/zio-saga) - If you're using [Scala](https://scala-lang.org/) and [zio](https://zio.dev/)  (there's also a [cats implementation](https://github.com/VladKopanev/cats-saga))
* [Apache Camel Saga](https://camel.apache.org/components/latest/eips/saga-eip.html) - If you're using Java and don't mind bringing in [Apache Camel](https://camel.apache.org/) as a dependency
* [nflow](https://github.com/NitorCreations/nflow) - Battle-proven solution for orchestrating business processes in Java
* [saga-coordinator-java](https://github.com/fernandoBRS/saga-coordinator-java) - Saga Coordinator as a Finite State Machine (FSM) in Java
* [Baker](https://github.com/ing-bank/baker) - Baker is a library that reduces the effort to orchestrate (micro)service-based process flows.
* Use the [routing-slip pattern](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RoutingTable.html) from the [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/) book.
* Represent sagas as todo lists. This is described in the [event modeling](https://eventmodeling.org/) documentation in the [automation section](https://eventmodeling.org/posts/what-is-event-modeling/#automation).  

The way to integrate Occurrent with any of these libraries/frameworks/patterns is to create a [subscription](#subscriptions) that forwards the events written to the event store to the 
preferred library/framework/[view](#views). 

## Policy

A policy (or "reaction") can be used to deal with workflows such as "whenever _this_ happens, do _that_". For example, whenever a game is won, send an email to the winner. For simple workflows
like this there's typically no need for a full-fledged [saga](#sagas). 

### Asynchronous Policy

In Occurrent, you can create asynchronous policies by creating a [subscription](#subscriptions). Let's consider the example above:

{% include macros/policy/email-policy.md %}     

You could also create a generic policy that simply forwards all events to another piece of infrastructure. For example, you may wish to forward all events to [rabbitmq](https://www.rabbitmq.com/) (by publishing them)
or [Spring's event infrastructure](https://www.baeldung.com/spring-events), and _then_ create policies that subscribes to events from these systems instead. There's an example in the
[github repository](https://github.com/johanhaleby/occurrent/tree/master/example/forwarder/mongodb-subscription-to-spring-event) that shows an example of how one can achieve this.

You may also want to look into the "todo-list" pattern described in the [automation section](https://eventmodeling.org/posts/what-is-event-modeling/#automation) on the in the [event modeling](https://eventmodeling.org/) website.

### Synchronous Policy

In some cases, for example if you have a simple website and you want views to be updated when a command is dispatched by a REST API, it can be useful to update a policy in a synchronous fashion. The application service
provided by Occurrent allows for this, please see the [application service documentation](#application-service-side-effects) for an example.    

## Snapshots
<div class="comment">Using snapshots is an advanced technique and it shouldn't be used unless it's really necessary.</div>

Snapshotting is an optimization technique that can be applied if it takes too long to derive the current state from an event stream for each [command](#commands).
There are several ways to do this and Occurrent doesn't enforce any particular strategy. One strategy is to use so called "snapshot events" (special events that contains 
a pre-calculated view of the state of an event stream at a particular time) and another technique is to write snapshots to another datastore than the event store.

The [application service](#commands) need to be modified to first load the up the snapshot and then load events that have not yet been materialized in the snapshot (if any). 

### Synchronous Snapshots

With Occurrent you can trade-off write speed for understandability. For example, let's say that you want to update the snapshot on every write and it should be consistent 
with the writes to the event store. One way to do this is to use Spring's transactional support:
 
{% include macros/snapshot/spring/sync-example.md %}
<div class="comment">This is a somewhat simplified example but the idea is hopefully made clear.</div>

{% include macros/snapshot/every-n.md %}
```java
if (eventStream.version() - snapshot.version() >= 3) {
    Snapshot updatedSnapshot = snapshot.updateFrom(newEvents.stream(), eventStream.version());
    snapshotRepsitory.save(updatedSnapshot);
}
```

### Asynchronous Snapshots

As an alternative to [synchronous](#synchronous-snapshots) and fully-consistent snapshots, you can update snapshots asynchronously. You do this by creating a [subscription](#subscriptions) 
that updates the snapshot. For example:

{% include macros/snapshot/spring/async-example.md %}

{% include macros/snapshot/every-n.md version="streamVersion" %}
```java
if (streamVersion - snapshot.version() >= 3) {
    Snapshot updatedSnapshot = snapshot.updateFrom(newEvents.stream(), eventStream.version());
    snapshotRepsitory.save(updatedSnapshot);
}
```  

### Closing the Books 

This is a pattern that can be applied instead of updating [snapshots](#snapshots) for every `n` event. The idea is to try to keep event streams short and
instead create snapshots periodically. For example, once every month we run a job that creates snapshots for certain event streams. This is especially well suited for problem domains where "closing the books"
is a concept in the domain (such as accounting).     

## Scheduling

Scheduling (aka deadlines, alarm clock) is a very handy technique to schedule to commands to be executed in the future or periodically. 
Imagine, for example, a multiplayer game (like word guessing game shown in previous examples), where we want to game to end automatically after 
10 hours of inactivity. This means that as soon as a player has made a guess, we'd like to schedule a "timeout game command" to be executed after 10 hours.

Occurrent doesn't currently have any built-in support for this (but a small wrapper around an existing library is planned), but there are several libraries you can use from the Java ecosystem, such as:

* [JobRunr](https://www.jobrunr.io/) - An easy way to perform background processing in Java. Distributed and backed by persistent storage.
* [Quartz](http://www.quartz-scheduler.org/) - Can be used to create simple or complex schedules for executing tens, hundreds, or even tens-of-thousands of jobs.
* [db-scheduler](https://github.com/kagkarlsson/db-scheduler) - Task-scheduler for Java that was inspired by the need for a clustered `java.util.concurrent.ScheduledExecutorService` simpler than Quartz.
* [Spring Scheduling](https://spring.io/guides/gs/scheduling-tasks/) - Worth looking into if you're already using Spring.
  

# Getting started

Getting started with Occurrent involves these steps:
<div class="comment">It's recommended to read up on <a href="https://cloudevents.io/">CloudEvent's</a> and its <a href="https://github.com/cloudevents/spec/blob/v1.0/spec.md">specification</a> so that you're familiar with the structure and schema of a CloudEvent.</div>

1. Choose an underlying datastore for an [event store](#choosing-an-eventstore). Luckily there are only two choices at the moment, MongoDB and an in-memory implementation. Hopefully this will be a more difficult decision in the future :)
1. Once a datastore has been decided it's time to [choose an EventStore implementation](#choosing-an-eventstore) for this datastore since there may be more than one.
1. If you need [subscriptions](#using-subscriptions) (i.e. the ability to subscribe to changes from an EventStore) then you need to pick a library that implements this for the datastore that you've chosen. 
   Again, there may be several implementations to choose from.
1. If a subscriber needs to be able to continue from where it left off on application restart, it's worth looking into a so called "position storage" library. 
   These libraries provide means to automatically (or selectively) store the position for a subscriber to a datastore. Note that the datastore that stores this position
   can be a different datastore than the one used as EventStore. For example, you can use MongoDB as EventStore but store subscription positions in Redis. 

# Choosing An EventStore

There are currently two different datastores to choose from, [MongoDB](#mongodb) and [In-Memory](#in-memory). 

## MongoDB

Uses MongoDB, version 4.2 or above, as  the underlying datastore for the CloudEvents. All implementations use transactions to guarantee consistent writes (see [WriteCondition](#write-condition)).
Each EventStore will automatically create a few [indexes](#mongodb-indexes) on startup to allow for fast consistent writes, optimistic concurrency control and to avoid duplicated events.
These indexes can also be used in queries against the EventStore (see [EventStoreQueries](#eventstore-queries)).  
 
{% include macros/eventstore/mongodb/mongodb-eventstore-implementations.md %}

### MongoDB Schema

All MongoDB EventStore implementations tries to stay as close as possible to the <a href="https://cloudevents.io/">CloudEvent's</a> specification even in the persitence layer.
Occurrent, by default, automatically adds a custom "Occurrent extension" to each cloud event that is written to an `EventStore`.
The Occurrent CloudEvent Extension consists of these attributes:

<br>

{% include macros/occurrent-cloudevent-extension.md %}

A json schema describing a complete Occurrent CloudEvent, as it will be persisted to a MongoDB collection, can be found [here](https://github.com/johanhaleby/occurrent/blob/master/cloudevents-schema-occurrent.json) 
(a "raw" cloud event json schema can be found [here](https://github.com/tsurdilo/cloudevents-schema-vscode/blob/master/schemas/cloudevents-schema.json) for comparison).

Note that MongoDB will automatically add an [\_id](https://docs.mongodb.com/manual/reference/method/ObjectId/) field (which is not used by Occurrent). 
The reason why the CloudEvent `id` attribute is not stored as `_id` in MongoDB is that the `id` of a CloudEvent is not globally unique! 
The combination of `id` and `source` is a globally unique CloudEvent. Note also that `_id` will _not_ be included when the `CloudEvent` is read from an `EventStore`.    

Here's an example of what you can expect to see the "events" collection when storing events in an `EventStore` backed by MongoDB
(given that `TimeRepresentation` is set to `DATE`):

```javascript
{
	"_id : ObjectId("5f4112a348b8da5305e41f57"),
	"specversion" : "1.0",
	"id" : "bdb8481f-9e8e-443b-80a4-5ef787f0f227",
	"source" : "urn:occurrent:domain:numberguessinggame",
	"type" : "NumberGuessingGameWasStarted",
	"subject" : "a1fc6ba1-7cd4-45cf-8dcc-b357fe23956d",
	"time" : ISODate("2020-08-22T14:42:11.712Z"),
	"data" : {
		"secretNumberToGuess" : 8,
		"startedBy" : "003ab97b-df79-4bf1-8c0c-08a5dd3701cf",
		"maxNumberOfGuesses" : 5
	},
	"streamid" : "a1fc6ba1-7cd4-45cf-8dcc-b357fe23956d",
	"streamversion : NumberLong(1)
}
{
	"_id" : ObjectId("5f4112a548b8da5305e41f58"),
	"specversion" : "1.0",
	"id" : "c1bfc3a5-1716-43ae-88a6-297189b1b5c7",
	"source" : "urn:occurrent:domain:numberguessinggame",
	"type" : "PlayerGuessedANumberThatWasTooSmall",
	"subject" : "a1fc6ba1-7cd4-45cf-8dcc-b357fe23956d",
	"time" : ISODate("2020-08-22T14:42:13.336Z"),
	"data" : {
		"guessedNumber" : 1,
		"playerId" : "003ab97b-df79-4bf1-8c0c-08a5dd3701cf"
	},
	"streamid" : "a1fc6ba1-7cd4-45cf-8dcc-b357fe23956d",
	"streamversion : NumberLong(2)
}
``` 

### MongoDB Time Representation

The CloudEvents specification says that the [time attribute](https://github.com/cloudevents/spec/blob/v1.0/spec.md#time), if present, must adhere to the [RFC 3339 specification](https://tools.ietf.org/html/rfc3339).
To accommodate this in MongoDB, the `time` attribute must be persisted as a `String`. This by itself is not a problem, a problem only arise 
if you want to make time-based queries on the events persisted to a MongoDB-backed `EventStore` (using the [EventStoreQueries](#eventstore-queries) interface).
This is, quite obviously, because time-based queries on `String`'s are suboptimal (to say the least) and may lead to surprising results.
What we _would_ like to do is to persist the `time` attribute as a `Date` in MongoDB, but MongoDB internally represents a Date with only millisecond resolution 
(see [here](https://docs.mongodb.com/manual/reference/method/Date/#behavior)) and then the CloudEvent cannot be compliant with the RFC 3339 specification in _all_ circumstances.

Because of the reasons described above, users of a MongoDB-backed EventStore implementation, must decide how the `time` attribute is to be represented in MongoDB
when instantiating an EventStore implementation. This is done by passing a value from the `org.occurrent.mongodb.timerepresentation.TimeRepresentation` enum to an
`EventStoreConfig` object that is then passed to the EventStore implementation. `TimeRepresentation` has these values: 

| Value |  Description |
|:----|:-----|
| `RFC_3339_STRING`&nbsp;&nbsp;&nbsp;&nbsp;| Persist the time attribute as an RFC 3339 string. This string is able to represent both nanoseconds and a timezone so this is recommended for apps that need to store this information or if you are uncertain of whether this is required in the future. |
| <br>`DATE` | <br>Persist the time attribute as a MongoDB [Date](https://docs.mongodb.com/manual/reference/method/Date/#behavior). The benefit of using this approach is that you can do range queries etc on the "time" field on the cloud event. This can be really useful for certain types on analytics or projections (such as show the 10 latest number of started games) without writing any custom code. |

Note that if you choose to go with `RFC_3339_STRING` you always have the option of adding a custom attribute, named for example "date", in which you represent the "time" attribute as a `Date` when writing the events to an `EventStore`.
This way you have the ability to use the "time" attribute to re-construct the CloudEvent time attribute exactly as well as the ability to do _custom_ time-queries on the "date" attribute. However, you cannot use the methods involving time-based queries when using the [EventStoreQueries](#eventstore-queries) interface.

**Important**: There's yet another option! If you don't need nanotime precision (i.e you're fine with millisecond precision) _and_ you're OK with always representing the "time" attribute in UTC, then you can use
`TimeRepresentation.DATE` without loss of precision! This is why, if `DATE` is configured for the `EventStore`, Occurrent will refuse to store a `CloudEvent` that specifies nanotime 
and is not defined in UTC (so that there won't be any surprises). I.e. using `DATE` and then doing this will throw an `IllegalArgumentException`:

```java          
var cloudEvent = new CloudEventBuilder().time(OffsetDateTime.now()). .. .build();

// Will throw exception since OffsetDateTime.now() will include nanoseconds by default in Java 9+
eventStore.write(Stream.of(cloudEvent));
```

Instead, you need to remove nano seconds do like this explicitly:

```java
// Remove millis and make sure to use UTC as timezone                                          
var now = OffsetDateTime.now().truncatedTo(ChronoUnit.MILLIS).withOffsetSameInstant(ZoneOffset.UTC);
var cloudEvent = new CloudEventBuilder().time(now). .. .build();

// Now you can write the cloud event
```

For more thoughts on this, refer to the [architecture decision record](https://github.com/johanhaleby/occurrent/blob/master/doc/architecture/decisions/0004-mongodb-datetime-representation.md) on time representation in MongoDB. 

### MongoDB Indexes

Each MongoDB `EventStore` [implementation](#mongodb-eventstore-implementations) creates a few indexes for the "events collection" the first time they're instantiated. These are:

|  Name | Properties | Description |
|:----|:------|:-----|
| `streamid`| ascending | An index for the `streamid` property. Allows for fast reads of all events in a particular stream. |     
| `id` + `source` | ascending `id`,<br>descending&nbsp;`source`,&nbsp;&nbsp;<br>unique<br><br> | Compound index of `id` and `source` to comply with the [specification](https://github.com/cloudevents/spec/blob/v1.0/spec.md) that the `id`+`source` combination must be unique. |     
| `streamid` + `streamversion`&nbsp;&nbsp;| ascending `streamid`,<br>descending `streamversion`,<br>unique | Compound index of `streamid` and `streamversion` (Occurrent CloudEvent extension) used for fast retrieval of the latest cloud event in a stream. |     

To allow for fast queries, for example when using [EventStoreQueries](#eventstore-queries), it's recommended to create additional indexes tailored to the querying behavior of 
your application. See [MongoDB indexes](https://docs.mongodb.com/manual/indexes/) for more information on how to do this. If you have many adhoc queries it's also worth 
checking out [wildcard indexes](https://docs.mongodb.com/manual/core/index-wildcard/) which is a new feature in MongoDB 4.2. These allow you to create indexes 
that allow for arbitrary queries on e.g. the data attribute of a cloud event (if data is stored in json/bson format).    
 
### MongoDB EventStore Implementations

{% include macros/eventstore/mongodb/mongodb-eventstore-implementations.md %}

### EventStore with MongoDB Native Driver

#### What is it?
An EventStore implementation that uses the "native" Java MongoDB synchronous driver (see [website](https://docs.mongodb.com/drivers/java)) to read and write
[CloudEvent's](https://cloudevents.io/) to MongoDB.

#### When to use?
Use when you don't need Spring support and want to use MongoDB as the underlying datastore.

#### Dependencies

{% include macros/eventstore/mongodb/native/maven.md %}

#### Getting Started

Once you've imported the dependencies you create a new instance of `org.occurrent.eventstore.mongodb.nativedriver.MongoEventStore`.
It takes four arguments, a [MongoClient](https://mongodb.github.io/mongo-java-driver/3.12/javadoc/com/mongodb/client/MongoClient.html), 
the "database" and "event collection "that the EventStore will use to store events as well as an `org.occurrent.eventstore.mongodb.nativedriver.EventStoreConfig`.

For example:  

{% include macros/eventstore/mongodb/native/example-configuration.md %}


Now you can start reading and writing events to the EventStore:

{% include macros/eventstore/mongodb/native/read-and-write-events.md %}

#### Examples

| Name  | Description  | 
|:----|:-----|  
| [Number&nbsp;Guessing&nbsp;Game](https://gitthub.com/johanhaleby/occurrent/tree/master/example/domain/number-guessing-game/mongodb/native) | A simple game implemented using a pure domain model and stores events in MongoDB using `MongoEventStore`. It also generates integration events and publishes these to RabbitMQ. |


### EventStore with Spring MongoTemplate (Blocking)  

#### What is it?
An implementation that uses Spring's [MongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/MongoTemplate.html)
to read and write events to/from MongoDB.     

#### When to use?
If you're already using Spring and you don't need reactive support then this is a good choice. You can make use of the `@Transactional` annotation to write events and views in the same transaction (but make sure you understand what you're going before attempting this).

#### Dependencies

{% include macros/eventstore/mongodb/spring/blocking/maven.md %}

#### Getting Started

Once you've imported the dependencies you create a new instance of `org.occurrent.eventstore.mongodb.spring.blocking.SpringBlockingMongoEventStore`.
It takes two arguments, a [MongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/MongoTemplate.html) and 
an `org.occurrent.eventstore.mongodb.spring.blocking.EventStoreConfig`.

For example:  

{% include macros/eventstore/mongodb/spring/blocking/example-configuration.md %}

Now you can start reading and writing events to the EventStore:

{% include macros/eventstore/mongodb/spring/blocking/read-and-write-events.md %}

#### Examples

| Name  | Description  | 
|:----|:-----|  
| [Number&nbsp;Guessing&nbsp;Game](https://github.com/johanhaleby/occurrent/tree/master/example/domain/number-guessing-game/mongodb/spring/blocking) | A simple game implemented using a pure domain model and stores events in MongoDB using `SpringBlockingMongoEventStore` and Spring Boot. It also generates integration events and publishes these to RabbitMQ. |
| [Subscription&nbsp;View](https://github.com/johanhaleby/occurrent/tree/master/example/projection/spring-subscription-based-mongodb-projections/src/main/java/org/occurrent/example/eventstore/mongodb/spring/subscriptionprojections) | An example showing how to create a subscription that listens to certain events stored in the EventStore and updates a view/projection from these events. |
| [Transactional&nbsp;View](https://github.com/johanhaleby/occurrent/tree/master/example/projection/spring-transactional-projection-mongodb/src/main/java/org/occurrent/example/eventstore/mongodb/spring/transactional) | An example showing how to combine writing events to the `SpringBlockingMongoEventStore` and update a view transactionally using the `@Transactional` annotation. | 
| [Custom&nbsp;Aggregation&nbsp;View](https://github.com/johanhaleby/occurrent/tree/master/example/projection/spring-adhoc-evenstore-mongodb-queries/src/main/java/org/occurrent/example/eventstore/mongodb/spring/projections/adhoc) | Example demonstrating that you can query the `SpringBlockingMongoEventStore` using custom MongoDB aggregations. |

### EventStore with Spring ReactiveMongoTemplate (Reactive)
  
#### What is it?
An implementation that uses Spring's [ReactiveMongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/ReactiveMongoTemplate.html)
to read and write events to/from MongoDB.     

#### When to use?
If you're already using Spring and want to use the reactive driver ([project reactor](https://projectreactor.io/)) then this is a good choice. It uses the `ReactiveMongoTemplate` to write events to MongoDB. You can make use of the `@Transactional` annotation to write events and views in the same tx (but make sure that you understand what you're going before attempting this).

#### Dependencies

{% include macros/eventstore/mongodb/spring/reactor/maven.md %}

#### Getting Started

Once you've imported the dependencies you create a new instance of `org.occurrent.eventstore.mongodb.spring.blocking.SpringBlockingMongoEventStore`.
It takes two arguments, a [MongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/MongoTemplate.html) and 
an `org.occurrent.eventstore.mongodb.spring.blocking.EventStoreConfig`.

For example:  

{% include macros/eventstore/mongodb/spring/reactor/example-configuration.md %}

Now you can start reading and writing events to the EventStore:

{% include macros/eventstore/mongodb/spring/reactor/read-and-write-events.md %}

#### Examples

| Name  | Description  | 
|:----|:-----|  
| [Custom&nbsp;Aggregation&nbsp;View](https://github.com/johanhaleby/occurrent/tree/master/example/projection/spring-adhoc-evenstore-mongodb-queries/src/main/java/org/occurrent/example/eventstore/mongodb/spring/projections/adhoc) | Example demonstrating that you can query the `SpringBlockingMongoEventStore` using custom MongoDB aggregations. |

# In-Memory EventStore 

#### What is it?
A simple in-memory implementation of the `EventStore` interface. 

#### When to use?
Mainly for testing purposes or for integration tests that doesn't require a durable event store.  

#### Dependencies

{% include macros/eventstore/in-memory/maven.md %}

#### Getting Started

Once you've imported the dependencies you create a new instance of `org.occurrent.eventstore.inmemory.InMemoryEventStore`. For example:  

{% include macros/eventstore/in-memory/example-configuration.md %}

Now you can start reading and writing events to the EventStore:

{% include macros/eventstore/in-memory/read-and-write-events.md %}

Note that `InMemoryEventStore` doesn't support [EventStoreQueries](#eventstore-queries).

# Using Subscriptions
<div class="comment">Before you start using subscriptions you should read up on what they are <a href="#subscriptions">here</a>.</div>

There a two different kinds of subscriptions, [blocking subscriptions](#blocking-subscriptions) and [reactive subscriptions](#reactive-subscriptions).
For blocking subscription implementations see [here](#blocking-subscription-implementations) and for reactive subscription implementations see [here](#reactive-subscription-implementations). 


## Blocking Subscriptions

A "blocking subscription" is a subscription that uses the normal Java threading mechanism for IO operations, i.e. reading changes from an [EventStore](#choosing-an-eventstore) 
will block the thread. This is arguably the easiest and most familiar way to use subscriptions for the typical Java developer, 
and it's probably good-enough for most scenarios. If high throughput, low CPU and memory-consumption is critical then consider using
[reactive subscription](#reactive-subscriptions) instead. Reactive subscriptions are also better suited if you want to work with streaming data.   
 
All blocking subscriptions implements the `org.occurrent.subscription.api.blocking.BlockingSubscription` 
interface. This interface provide means to subscribe to new events from an `EventStore` as they are written. For example:

{% capture java %}
subscription.subscribe("mySubscriptionId", System.out::println);
{% endcapture %}
{% capture kotlin %}
subscription.subscribe("mySubscriptionId", ::println)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

This will simply print each cloud event written to the event store to the console.

Note that the signature of `subscribe` is defined like this:

```java
public interface BlockingSubscription {
    /**
     * Start listening to cloud events persisted to the event store using the supplied start position and <code>filter</code>.
     *
     * @param subscriptionId  The id of the subscription, must be unique!
     * @param filter          The filter used to limit which events that are of interest from the EventStore.
     * @param startAtSupplier A supplier that returns the start position to start the subscription from.
     *                        This is a useful alternative to just passing a fixed "StartAt" value if the stream is broken and re-subscribed to.
     *                        In these cases, streams should be restarted from the latest persisted position and not the start position as it
     *                        were when the application was first started.
     * @param action          This action will be invoked for each cloud event that is stored in the EventStore.
     */
    Subscription subscribe(String subscriptionId, SubscriptionFilter filter, Supplier<StartAt> startAtSupplier, Consumer<CloudEvent> action);

    // Default methods 

}
``` 

It's common that subscriptions produce "wrappers" around the vanilla `io.cloudevents.CloudEvent` type that includes 
the subscription position (if the datastore doesn't maintain the subscription position on behalf of the clients). Someone, either you as the client or the datastore, needs to keep track of this position 
for each individual subscriber ("mySubscriptionId" in the example above). If the datastore doesn't provide this feature, you should use a `BlockingSubscription` implementation that also implement the 
`org.occurrent.subscription.api.blocking.PositionAwareBlockingSubscription` interface. The `PositionAwareBlockingSubscription`  is an example of a `BlockingSubscription` that returns a wrapper around 
`io.cloudevents.CloudEvent` called `org.occurrent.subscription.PositionAwareCloudEvent` which adds an additional method, `SubscriptionPosition getStreamPosition()`, that you can use to get  
the current subscription position. You can check if a cloud event contains a subscription position by calling `PositionAwareCloudEvent.hasSubscriptionPosition(cloudEvent)`
and then get the position by using `PositionAwareCloudEvent.getSubscriptionPositionOrThrowIAE(cloudEvent)`. Note that `PositionAwareCloudEvent` is fully compatible with `io.cloudevents.CloudEvent` and it's ok to treat it as such. So given that
you're subscribing from a `PositionAwareBlockingSubscription`, you are responsible for [keeping track of the subscription position](#blocking-subscription-position-storage), so 
that it's possible to resume this subscription from the last known position on application restart. This interface also provides means to get the so called "current global subscription position", 
by calling the `globalSubscriptionPosition` method which can be useful when starting a new subscription. 

For example, consider the case when subscription "A" starts 
subscribing at the current time (T1). Event E1 is written to the `EventStore` and propagated to subscription "A". But imagine there's a bug in "A" that prevents it
from performing its action. Later, the bug is fixed and the application is restarted at the "current time" (T2). But since T2 is after T1, E1 will not sent to "A" again since
it happened before T2. Thus this event is missed! Whether or not this is actually a problem depends on your use case. But to avoid it you should not start the subscription
at the "current time", but rather from the "global subscription position". This position should be written to a [subscription position storage](#blocking-subscription-position-storage)
_before_ subscription "A" is started. Thus the subscription can continue from this position on application restart and no events will be missed.               

### Blocking Subscription Filters

You can also provide a subscription filter, applied at the datastore level so that it's really efficient, if you're only interested in
certain events:

{% capture java %}
subscription.subscribe("mySubscriptionId", filter(type("GameEnded")), System.out::println);
{% endcapture %}
{% capture kotlin %}
subscription.subscribe("mySubscriptionId", filter(type("GameEnded")), ::println)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

This will  print each cloud event written to the event store, and has type equal to "GameEnded", to the console.
The `filter` method is statically imported from `org.occurrent.subscription.OccurrentSubscriptionFilter` and `type` is statically imported from `org.occurrent.condition.Condition`.
The `OccurrentSubscriptionFilter` is generic and should be applicable to a wide variety of different datastores. However, subscription implementations
may provide different means to express filters. For example, the MongoDB subscription implementations allows you to use filters specific to MongoDB:

{% capture java %}
subscription.subscribe("mySubscriptionId", filter().id(Filters::eq, "3c0364c3-f4a7-40d3-9fb8-a4a62d7f66e3").type(Filters::eq, "GameStarted")), System.out::println);
{% endcapture %}
{% capture kotlin %}
subscription.subscribe("mySubscriptionId", filter().id(Filters::eq, "3c0364c3-f4a7-40d3-9fb8-a4a62d7f66e3").type(Filters::eq, "GameStarted")), ::println)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Now `filter` is statically imported from `org.occurrent.subscription.mongodb.MongoDBFilterSpecification` and `Filters` is imported from 
`com.mongodb.client.model.Filters` (i.e the normal way to express filters in MongoDB). However, it's recommended to always start with an `OccurrentSubscriptionFilter`
and only pick a more specific implementation if you cannot express your filter using the capabilities of `OccurrentSubscriptionFilter`. 

### Blocking Subscription Start Position

A subscription can can be started at different locations in the event store. You can define where to start when a subscription is started. This is done by supplying a 
`org.occurrent.subscription.StartAt` instance. It provides two ways to specify the start position, either by using `StartAt.now()` (default if `StartAt` is not defined when 
calling the `subscribe` function), or `StartAt.subscriptionPosition(<subscriptionPosition>)`, where `<subscriptionPosition>` is a datastore-specific 
implementation of the `org.occurrent.subscription.SubscriptionPosition` interface which provides the start position as a `String`. You may want to store the 
`String` returned by a `SubscriptionPosition` in a database so that it's possible to resume a subscription from the last processed position on application restart.
You can do this anyway you like, but for most cases you probably should consider if there's a [Subscription Position Storage](#blocking-subscription-position-storage)
available that suits your needs. If not, you can still have a look at them for inspiration on how to write your own.

   
### Blocking Subscription Position Storage

It's very common that an application needs to start at its last known location in the subscription stream when it's restarted. While you're free to store the subscription position
provided by a [blocking subscription](#blocking-subscriptions) any way you like, Occurrent provides an interface
called `org.occurrent.subscription.api.blocking.BlockingSubscriptionPositionStorage` acts as a uniform abstraction for this purpose. A `BlockingSubscriptionPositionStorage` 
is defined like this:

```java
public interface BlockingSubscriptionPositionStorage {
    SubscriptionPosition read(String subscriptionId);
    SubscriptionPosition save(String subscriptionId, SubscriptionPosition subscriptionPosition);
    void delete(String subscriptionId);
}
```

I.e. it's a way to read/write/delete the `SubscriptionPosition` for a given subscription. Occurrent ships with three pre-defined implementations:

1\. **BlockingSubscriptionPositionStorageForMongoDB**<br>
    Uses the vanilla MongoDB Java (sync) driver to store `SubscriptionPosition`'s in MongoDB.
    {% include macros/subscription/blocking/mongodb/native/storage/maven.md %}   
2\. **SpringBlockingSubscriptionPositionStorageForMongoDB**<br>
    Uses the Spring MongoTemplate to store `SubscriptionPosition`'s in MongoDB.    
    {% include macros/subscription/blocking/mongodb/spring/storage/maven.md %}
3\. **SpringBlockingSubscriptionPositionStorageForRedis**<br>
    Uses the Spring RedisTemplate to store `SubscriptionPosition`'s in Redis.    
    {% include macros/subscription/blocking/redis/spring/storage/maven.md %} 



If you want to roll your own implementation (feel free to contribute to the project if you do) you can depend on the "blocking subscription API" which contains the `BlockingSubscriptionPositionStorage` interface:

{% include macros/subscription/blocking/api/maven.md %}

### Blocking Subscription Implementations

These are the _non-durable_ [blocking subscription implementations](#blocking-subscriptions): 

**MongoDB**

* [Blocking subscription using the "native" Java MongoDB driver](#blocking-subscription-using-the-native-java-mongodb-driver)
* [Blocking subscription using Spring MongoTemplate](#blocking-subscription-using-spring-mongotemplate)
{% include macros/subscription/common/mongodb/oplog_warning.md %}

By "non-durable" we mean implementations that doesn't store the subscription position in a durable storage automatically.  
It might be that the datastore does this automatically _or_ that [subscription position storage](#blocking-subscription-position-storage) is not required
for your use case. If the datastore _doesn't_ support storing the subscription position automatically, a subscription will typically implement the
`org.occurrent.subscription.api.blocking.PositionAwareBlockingSubscription` interface (since these types of subscriptions doesn't need to be aware of the position).

   
Typically, if you want the stream to continue where it left off on application restart you want to store away the subscription position. You can do this anyway you like,
but for most cases you probably want to look into implementations of `org.occurrent.subscription.api.blocking.PositionAwareBlockingSubscription`. 
These subscriptions can be combined with a [subscription position storage](#blocking-subscription-position-storage) implementation to store the position in a durable 
datastore. 

Occurrent provides a [utility](#automatic-subscription-position-persistence-blocking) that combines a `PositionAwareBlockingSubscription` and 
a `BlockingSubscriptionPositionStorage` (see [here](#blocking-subscription-position-storage)) to automatically store the subscription position   
_after each processed event_. If you don't want the position to be persisted after _every_ event, it's recommended to pick a 
[subscription position storage](#blocking-subscription-position-storage) implementation, and store the position yourself when you find fit.

#### Blocking Subscription using the "Native" Java MongoDB Driver

Uses the vanilla Java MongoDB synchronous driver (no Spring dependency is required).

To get started first include the following dependency:

{% include macros/subscription/blocking/mongodb/native/impl/maven.md %}

Then create a new instance of `BlockingSubscriptionForMongoDB` and start subscribing: 

{% include macros/subscription/blocking/mongodb/native/impl/example.md %}
<div class="comment">BlockingSubscriptionForMongoDB can be imported from the "org.occurrent.subscription.mongodb.nativedriver.blocking" package.</div>

There are a few things to note here that needs explaining. First we have the `TimeRepresentation.DATE` that is passed as the third constructor argument which you can read more about 
[here](#mongodb-time-representation). Secondly we have the `Executors.newCachedThreadPool()`. A thread will be created from this executor for each call to 
"subscribe" (i.e. for each subscription). Make sure that you have enough threads to cover all your subscriptions or the "BlockingSubscription" may hang.
Last we have the `RetryStrategy` which defines what should happen if there's e.g. a connection issue during the life-time of a subscription or if subscription fails to process a cloud event
(i.e. the `action` throws an exception). These retry strategies are available:

| Name | Description |
|:----|:----|
| `none` | Don't retry! Instead the subscription will fail fast and not continue if there's an error. |     
| `fixed` | Retry operation after a fixed number of milliseconds or `Duration`.  |     
| `backoff` &nbsp;&nbsp;&nbsp; | Retry after with exponential backoff if an action throws an exception.  |     

Note that you can provide a [filter](#blocking-subscription-filters), [start position](#blocking-subscription-start-position) and [position persistence](#blocking-subscription-position-storage) for this subscription implementation. 

#### Blocking Subscription using Spring MongoTemplate

An implementation that uses Spring's [MongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/MongoTemplate.html) for 
event subscriptions. 

First include the following dependency:

{% include macros/subscription/blocking/mongodb/spring/impl/maven.md %}

Then create a new instance of `SpringBlockingSubscriptionForMongoDB` and start subscribing:

{% include macros/subscription/blocking/mongodb/spring/impl/example.md %}
<div class="comment">SpringBlockingSubscriptionForMongoDB can be imported from the "org.occurrent.subscription.mongodb.spring.blocking" package.</div>

The "eventCollectionName" specifies the event collection in MongoDB where events are stored. It's important that this collection is the same as the collection
used by the `EventStore` implementation. Secondly, we have the `TimeRepresentation.RFC_3339_STRING` that is passed as the third constructor argument, which you can read more about 
[here](#mongodb-time-representation). It's also very important that this is configured the same way as the `EventStore`.

It should also be noted that Spring takes care of re-attaching to MongoDB if there's a connection issue or other transient errors. This can be configured when creating the `MongoTemplate` instance. 

When it comes to retries, if the "action" fails (i.e. if the higher-order function you provide when calling `subscribe` throws an exception), Occurrent doesn't provide retries out of the box.
This is most likely something you want to add, and since you're using Spring you probably want to look into [Spring Retry](https://github.com/spring-projects/spring-retry). For example
consider that you have a simple Spring bean that writes each cloud event to a repository:

```java
@Component
public class WriteToRepository {

	private final SomeRepository someRepository;

	public WriteToRepository(SomeRepository someRepository) {
		this.someRepository = someRepository;
	}

	public void write(CloudEvent cloudEvent) {
		someRepository.persist(cloudEvent);
	}
}
```   
 
And you want to subscribe to all "GameStarted" events and write them to the repository:

```java                                    
WriteToRepository writeToRepository = ...
subscriptions.subscribe("gameStartedLog", writeToRepository::write);
```   
   
But if the connection to `someRepository` is flaky you can add [Spring Retry](https://github.com/spring-projects/spring-retry) so allow for retry with exponential backoff:

```java
@Component
public class WriteToRepository {

	private final SomeRepository someRepository;

	public WriteToRepository(SomeRepository someRepository) {
		this.someRepository = someRepository;
	}

    @Retryable(backoff = @Backoff(delay = 200, multiplier = 2, maxDelay = 30000))
	public void write(CloudEvent cloudEvent) {
		someRepository.persist(cloudEvent);
	}
}
```   
     
Don't forget to add `@EnableRetry` in to your Spring Boot application as well.

Note that you can provide a [filter](#blocking-subscription-filters), [start position](#blocking-subscription-start-position) and [position persistence](#blocking-subscription-position-storage) for this subscription implementation.

#### Automatic Subscription Position Persistence (Blocking)

Storing the subscription position is useful if you need to resume a subscription from its last known position when restarting an application. 
Occurrent provides a utility that implements `BlockingSubscription` and combines a `PositionAwareBlockingSubscription` and a `BlockingSubscriptionPositionStorage` implementation 
(see [here](#blocking-subscription-position-storage)) to automatically store the subscription position, by default,   
after each processed event. If you don't want the position to be persisted after _every_ event, you can control how often this should happen by supplying a predicate 
to `BlockingSubscriptionWithAutomaticPositionPersistenceConfig`. There's a pre-defined predicate, `org.occurrent.subscription.util.predicate.EveryN`, that allow   
the position to be stored for _every n_ event instead of simply _every_ event. There's also a shortcut, e.g. `new BlockingSubscriptionWithAutomaticPositionPersistenceConfig(3)` that 
creates an instance of `EveryN` that stores the position for every third event. 

If you want full control, it's recommended to pick a [subscription position storage](#blocking-subscription-position-storage) implementation, 
and store the position yourself using its API.

To use it, first we need to add the dependency:

{% include macros/subscription/blocking/util/autopersistence/maven.md %}

Then we should instantiate a `PositionAwareBlockingSubscription`, that subscribes to the events from the event store, and an instance of a `BlockingSubscriptionPositionStorage`, 
that stores the subscription position, and combine them to a `BlockingSubscriptionWithAutomaticPositionPersistence`: 

{% include macros/subscription/blocking/util/autopersistence/example.md %}

#### Catch-up Subscription (Blocking)

When starting a new subscription it's often useful to first replay historic events to get up-to-speed and then subscribing to new events
as the arrive. A catch-up subscription allows for exactly this! It combines the [EventStoreQueries](#eventstore-queries) API with a 
[subscription](#blocking-subscriptions) and an optional [subscription storage](#blocking-subscription-position-storage). It starts off by streaming
historic events from the event store and then automatically switch to continuous streaming mode once the historic events have caught up.

To get start you need to add the following dependency:

{% include macros/subscription/blocking/util/catchup/maven.md %}

For example:

{% include macros/subscription/blocking/util/catchup/example.md %}

`CatchupSupportingBlockingSubscription` maintains an in-memory cache of event ids. The size of this cache is configurable using a `CatchupSupportingBlockingSubscriptionConfig` but it defaults to 100.
The purpose of the cache is to reduce the likely hood of duplicate events when switching from replay mode to continuous mode. Otherwise, there would be a chance
that event written _exactly_ when the switch from replay mode to continuous mode takes places, can be lost. To prevent this, the continuous mode subscription 
starts at a position before the last event read from the history. The purpose of the cache is thus to filter away events that are detected as duplicates during the 
switch. If the cache is too small, duplicate events will be sent to the continuous subscription. Typically, you want your application to be idempotent anyways and if so this shouldn't be a problem.        

`CatchupSupportingBlockingSubscription` can be configured to store the subscription position in the supplied storage (see example above) so that, if the application crashes during replay mode, it doesn't need to 
start replaying from the beginning again. Note that if you don't want subscription persistence during replay, you can disable this by doing `new CatchupSupportingBlockingSubscriptionConfig(dontUseSubscriptionPositionStorage())`.

## Reactive Subscriptions

A "reactive subscription" is a subscription that uses non-blocking IO when reading events from the event store, i.e. reading changes from an [EventStore](#choosing-an-eventstore) 
will _not_ block a thread. It uses concepts from [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) which is well-suited for working with streams 
of data. This is arguably a bit more complex for the typical Java developer, and you should consider using [blocking subscriptions](#blocking-subscriptions) 
if high throughput, low CPU and memory-consumption is not critical. 
 
All reactive subscriptions implements the `org.occurrent.subscription.api.reactor.ReactorSubscription` interface which uses 
components from [project reactor](https://projectreactor.io). This interface provide means to subscribe to new events from an `EventStore` as they are written. For example:

{% capture java %}
subscription.subscribe("mySubscriptionId").doOnNext(System.out::println).subscribe();
{% endcapture %}
{% capture kotlin %}
subscription.subscribe("mySubscriptionId").doOnNext(::println).subscribe()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
<div class="comment">The "subscribe" method returns an instance of "Flux&lt;CloudEvent&gt;".</div>


This will simply print each cloud event written to the event store to the console.

Note that the signature of `subscribe` is defined like this:

```java
public interface ReactorSubscription {

    /**
     * Stream events from the event store as they arrive. Use this method if want to start streaming from a specific position.
     *
     * @return A Flux with cloud events which may also includes the SubscriptionPosition that can be used to resume the stream from the current position.
     */
    Flux<CloudEvent> subscribe(SubscriptionFilter filter, StartAt startAt);

    // Default methods 

}
``` 

It's common that subscriptions produce "wrappers" around the vanilla `io.cloudevents.CloudEvent` type that includes 
the subscription position (if the datastore doesn't maintain the subscription position on behalf of the clients). Someone, either you as the client or the datastore, needs to keep track of this position 
for each individual subscriber ("mySubscriptionId" in the example above). If the datastore doesn't provide this feature, you should use a `ReactorSubscription` implementation that also implement the 
`org.occurrent.subscription.api.reactor.PositionAwareReactorSubscription` interface. The `PositionAwareReactorSubscription`  is an example of a `ReactorSubscription` that returns a wrapper around 
`io.cloudevents.CloudEvent` called `org.occurrent.subscription.PositionAwareCloudEvent` which adds an additional method, `SubscriptionPosition getStreamPosition()`, that you can use to get  
the current subscription position. You can check if a cloud event contains a subscription position by calling `PositionAwareCloudEvent.hasSubscriptionPosition(cloudEvent)`
and then get the position by using `PositionAwareCloudEvent.getSubscriptionPositionOrThrowIAE(cloudEvent)`. 
Note that `PositionAwareCloudEvent` is fully compatible with `io.cloudevents.CloudEvent` and it's ok to treat it as such. So given that
you're subscribing from a `PositionAwareReactorSubscription`, you are responsible for [keeping track of the subscription position](#reactive-subscription-position-storage), so 
that it's possible to resume this subscription from the last known position on application restart. This interface also provides means to get the so called "current global subscription position", 
by calling the `globalSubscriptionPosition` method which can be useful when starting a new subscription. 

For example, consider the case when subscription "A" starts subscribing at the current time (T1). Event E1 is written to the `EventStore` and propagated to subscription "A". But imagine there's a bug in "A" that prevents it
from performing its action. Later, the bug is fixed and the application is restarted at the "current time" (T2). But since T2 is after T1, E1 will not sent to "A" again since
it happened before T2. Thus this event is missed! Whether or not this is actually a problem depends on your use case. But to avoid it you should not start the subscription
at the "current time", but rather from the "global subscription position". This position should be written to a [subscription position storage](#reactive-subscription-position-storage)
_before_ subscription "A" is started. Thus the subscription can continue from this position on application restart and no events will be missed.               


### Reactive Subscription Filters

You can also provide a subscription filter, applied at the datastore level so that it's really efficient, if you're only interested in
certain events:

{% capture java %}
subscription.subscribe("mySubscriptionId", filter(type("GameEnded"))).doOnNext(System.out::println).subscribe();
{% endcapture %}
{% capture kotlin %}
subscription.subscribe("mySubscriptionId", filter(type("GameEnded")).doOnNext(::println).subscribe()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

This will  print each cloud event written to the event store, and has type equal to "GameEnded", to the console.
The `filter` method is statically imported from `org.occurrent.subscription.OccurrentSubscriptionFilter` and `type` is statically imported from `org.occurrent.condition.Condition`.
The `OccurrentSubscriptionFilter` is generic and should be applicable to a wide variety of different datastores. However, subscription implementations
may provide different means to express filters. For example, the MongoDB subscription implementations allows you to use filters specific to MongoDB:

{% capture java %}
subscription.subscribe("mySubscriptionId", filter().id(Filters::eq, "3c0364c3-f4a7-40d3-9fb8-a4a62d7f66e3").type(Filters::eq, "GameStarted")).doOnNext(System.out::println).subscribe();
{% endcapture %}
{% capture kotlin %}
subscription.subscribe("mySubscriptionId", filter().id(Filters::eq, "3c0364c3-f4a7-40d3-9fb8-a4a62d7f66e3").type(Filters::eq, "GameStarted")).doOnNext(::println).subscribe()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Now `filter` is statically imported from `org.occurrent.subscription.mongodb.MongoDBFilterSpecification` and `Filters` is imported from 
`com.mongodb.client.model.Filters` (i.e the normal way to express filters in MongoDB). However, it's recommended to always start with an `OccurrentSubscriptionFilter`
and only pick a more specific implementation if you cannot express your filter using the capabilities of `OccurrentSubscriptionFilter`. 

### Reactive Subscription Start Position

A subscription can can be started at different locations in the event store. You can define where to start when a subscription is started. This is done by supplying a 
`org.occurrent.subscription.StartAt` instance. It provides two ways to specify the start position, either by using `StartAt.now()` (default if `StartAt` is not defined when 
calling the `subscribe` function), or `StartAt.subscriptionPosition(<subscriptionPosition>)`, where `<subscriptionPosition>` is a datastore-specific 
implementation of the `org.occurrent.subscription.SubscriptionPosition` interface which provides the start position as a `String`. You may want to store the 
`String` returned by a `SubscriptionPosition` in a database so that it's possible to resume a subscription from the last processed position on application restart.
You can do this anyway you like, but for most cases you probably should consider if there's a [Subscription Position Storage](#reactive-subscription-position-storage)
available that suits your needs. If not, you can still have a look at them for inspiration on how to write your own.

   
### Reactive Subscription Position Storage

It's very common that an application needs to start at its last known location in the subscription stream when it's restarted. While you're free to store the subscription position
provided by a [reactive subscription](#reactive-subscriptions) any way you like, Occurrent provides an interface
called `org.occurrent.subscription.api.reactor.ReactorSubscriptionPositionStorage` acts as a uniform abstraction for this purpose. A `ReactorSubscriptionPositionStorage` 
is defined like this:

```java
public interface ReactorSubscriptionPositionStorage {
    Mono<SubscriptionPosition> read(String subscriptionId);
    Mono<SubscriptionPosition> save(String subscriptionId, SubscriptionPosition subscriptionPosition);
    Mono<Void> delete(String subscriptionId);
}
```

I.e. it's a way to read/write/delete the `SubscriptionPosition` for a given subscription. Occurrent ships one pre-defined reactive implementation (please contribute!):

1\. **SpringReactorSubscriptionPositionStorageForMongoDB**<br>
    Uses the vanilla MongoDB Java (sync) driver to store `SubscriptionPosition`'s in MongoDB.
    {% include macros/subscription/reactor/mongodb/spring/storage/maven.md %}   


If you want to roll your own implementation (feel free to contribute to the project if you do) you can depend on the "reactive subscription API" which contains the `ReactorSubscriptionPositionStorage` interface:

{% include macros/subscription/reactor/api/maven.md %}

### Reactive Subscription Implementations

These are the _non-durable_ [reactive subscription implementations](#reactive-subscriptions): 

**MongoDB**

* [Reactive subscription using Spring ReactiveMongoTemplate](#reactive-subscription-using-spring-reactivemongotemplate)
{% include macros/subscription/common/mongodb/oplog_warning.md %}

By "non-durable" we mean implementations that doesn't store the subscription position in a durable storage automatically.  
It might be that the datastore does this automatically _or_ that [subscription position storage](#reactive-subscription-position-storage) is not required
for your use case. If the datastore _doesn't_ support storing the subscription position automatically, a subscription will typically implement the
`org.occurrent.subscription.api.reactor.PositionAwareReactorSubscription` interface (since these types of subscriptions doesn't need to be aware of the position).
However you can do this anyway you like.
   
Typically, if you want the stream to continue where it left off on application restart you want to store away the subscription position. You can do this anyway you like,
but for most cases you probably want to look into implementations of `org.occurrent.subscription.api.reactor.ReactorSubscriptionPositionStorage`. 
These subscriptions can be combined with a [subscription position storage](#reactive-subscription-position-storage) implementation to store the position in a durable 
datastore. 

Occurrent provides a [utility](#automatic-subscription-position-persistence-reactive) that combines a `PositionAwareReactorSubscription` and 
a `ReactorSubscriptionPositionStorage` (see [here](#reactive-subscription-position-storage)) to automatically store the subscription position   
_after each processed event_. If you don't want the position to be persisted after _every_ event, it's recommended to pick a 
[subscription position storage](#reactive-subscription-position-storage) implementation, and store the position yourself when you find fit.

#### Reactive Subscription using Spring ReactiveMongoTemplate

An implementation that uses Spring's [ReactiveMongoTemplate](https://docs.spring.io/spring-data/data-mongo/docs/current/api/org/springframework/data/mongodb/core/ReactiveMongoTemplate.html) for 
event subscriptions. 

First include the following dependency:

{% include macros/subscription/reactor/mongodb/spring/impl/maven.md %}

Then create a new instance of `SpringReactorSubscriptionForMongoDB` and start subscribing:

{% include macros/subscription/reactor/mongodb/spring/impl/example.md %}
<div class="comment">SpringReactorSubscriptionForMongoDB can be imported from the "org.occurrent.subscription.mongodb.spring.reactor" package.</div>

The "eventCollectionName" specifies the event collection in MongoDB where events are stored. It's important that this collection is the same as the collection
used by the `EventStore` implementation. Secondly, we have the `TimeRepresentation.RFC_3339_STRING` that is passed as the third constructor argument, which you can read more about 
[here](#mongodb-time-representation). It's also very important that this is configured the same way as the `EventStore`.

It should also be noted that Spring takes care of re-attaching to MongoDB if there's a connection issue or other transient errors. This can be configured when creating the `ReactiveMongoTemplate` instance. 

Note that you can provide a [filter](#reactive-subscription-filters), [start position](#reactive-subscription-start-position) and [position persistence](#reactive-subscription-position-storage) for this subscription implementation.

#### Automatic Subscription Position Persistence (Reactive)
 
Storing the subscription position is useful if you need to resume a subscription from its last known position when restarting an application.
Occurrent provides a utility that combines a `PositionAwareReactorSubscription` and a `ReactorSubscriptionPositionStorage` implementation 
(see [here](#reactive-subscription-position-storage)) to automatically store the subscription position, by default,   
after each processed event. If you don't want the position to be persisted after _every_ event, you can control how often this should happen by supplying a predicate 
to `ReactorSubscriptionWithAutomaticPositionPersistenceConfig`. There's a pre-defined predicate, `org.occurrent.subscription.util.predicate.EveryN`, that allow   
the position to be stored for _every n_ event instead of simply _every_ event. There's also a shortcut, e.g. `new ReactorSubscriptionWithAutomaticPositionPersistenceConfig(3)` that 
creates an instance of `EveryN` that stores the position for every third event. 

To use it, first to add the following dependency:

{% include macros/subscription/reactor/util/autopersistence/maven.md %}

Then we should instantiate a `PositionAwareReactorSubscription`, that subscribes to the events from the event store, and an instance of a `ReactorSubscriptionPositionStorage`, 
that stores the subscription position, and combine them to a `ReactorSubscriptionWithAutomaticPositionPersistence`: 

{% include macros/subscription/reactor/util/autopersistence/example.md %}  

# Blogs

[Johan](https://github.com/johanhaleby) has created a couple of blog-posts on Occurrent on his [blog](https://code.haleby.se):

1. [Occurrent - Event Sourcing for the JVM](https://code.haleby.se/2020/11/21/occurrent-event-sourcing-for-the-jvm/)

# Contact & Support

Would you like to contribute to Occurrent? That's great! You should join the [mailing-list](https://groups.google.com/g/occurrent) or contribute on [github](https://github.com/johanhaleby/occurrent).
The [mailing-list](https://groups.google.com/g/occurrent) can also be used for support and discussions.

# Credits

Thanks to [Per Ökvist](https://github.com/perokvist) for discussions and ideas, and [David Åse](https://www.linkedin.com/in/davidaase/) for letting me fork 
the awesome [javalin](https://javalin.io/) website. 