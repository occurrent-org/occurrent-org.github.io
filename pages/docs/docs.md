---
layout: default
title: Documentation
rightmenu: false
permalink: /documentation
---

{% include notificationBanner.html %}

{% assign cloudevents_spec = "https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md" %}

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
* * * [Stream Filtering](#eventstore-stream-filtering)
* * [Subscriptions](#subscriptions)
* * [Views](#views)
* * [Commands](#commands)
* * * [Philosophy](#command-philosophy)
* * * [In Occurrent](#commands-in-occurrent)
* * * [Composition](#command-composition)
* * [CloudEvent Conversion](#cloudevent-conversion)
* * * [Generic](#generic-cloudevent-converter)
* * * [XStream](#xstream-cloudevent-converter)
* * * [Jackson](#jackson-cloudevent-converter)
* * * * [Jackson 3](#jackson3-cloudevent-converter)
* * * * [Jackson 2](#jackson2-cloudevent-converter)
* * * [Custom](#custom-cloudevent-converter)
* * [Application Service](#application-service)
* * * [Usage](#using-the-application-service)
* * * [Stream Filtering and Execute Options](#application-service-stream-filtering-and-execute-options)
* * * [Side-Effects](#application-service-side-effects)
* * * [Transactional Side-Effects](#application-service-transactional-side-effects)
* * * [Kotlin](#application-service-kotlin-extensions)
* * [Command Dispatch](#command-dispatch)
* * * [Convenience Factories](#convenience-factories)
* * * [Deriving the Stream Id From Annotations](#deriving-the-stream-id-from-annotations)
* * [Sagas](#sagas)
* * [Policy](#policy)
* * * [Asynchronous](#asynchronous-policy)
* * * [Synchronous](#synchronous-policy)
* * [Snapshots](#snapshots)
* * * [Snapshotting a decider](#snapshotting-a-decider)
* * * [Choosing when to snapshot](#choosing-when-to-snapshot)
* * * [Snapshots without a decider](#snapshots-without-a-decider)
* * * [Snapshots with Spring Boot](#snapshots-with-spring-boot)
* * * [DCB snapshots](#dcb-snapshots)
* * * [Closing the Books](#closing-the-books)
* * [Deadlines](#deadlines)
* * * [JobRunr](#jobrunr-deadline-scheduler)
* * * [InMemory](#in-memory-deadline-scheduler)
* * * [Other](#other-ways-of-expressing-deadlines)
* [Standalone Spring Library Modules](#standalone-spring-library-modules)
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
* [Testing Your Own EventStore](#testing-your-own-eventstore)
* * [Capabilities](#capabilities)
* * [Refusing what you weren't built for](#refusing-what-you-werent-built-for)
* * [Positions are monotonic, with permanent gaps](#positions-are-monotonic-with-permanent-gaps)
* * [DCB](#dcb)
* * [Time precision](#time-precision)
* * [The reactive bridge](#the-reactive-bridge)
* [Using Subscriptions](#using-subscriptions)
* * [Blocking](#blocking-subscriptions)
* * * [Filters](#blocking-subscription-filters)
* * * [Start Position](#blocking-subscription-start-position)
* * * [Checkpoint Storage](#blocking-subscription-checkpoint-storage)
* * * [Implementations](#blocking-subscription-implementations)
* * * * [MongoDB Native Driver](#blocking-subscription-using-the-native-java-mongodb-driver)
* * * * [MongoDB with Spring](#blocking-subscription-using-spring-mongotemplate)
* * * * [InMemory](#inmemory-subscription)
* * * * [Push Subscription](#push-subscription-blocking)
* * * * [Durable Subscriptions](#durable-subscriptions-blocking)
* * * * [Catch-up Subscription](#catch-up-subscription-blocking)
* * * * * [Usage](#catch-up-subscription-usage)
* * * * [Competing Consumer Subscription](#competing-consumer-subscription-blocking)
* * * * [Life-cycle & Testing](#subscription-life-cycle--testing-blocking) 
* * [Reactive](#reactive-subscriptions)
* * * [Filters](#reactive-subscription-filters)
* * * [Start Position](#reactive-subscription-start-position)
* * * [Checkpoint Storage](#reactive-subscription-checkpoint-storage)
* * * [Implementations](#reactive-subscription-implementations)
* * * * [MongoDB with Spring](#reactive-subscription-using-spring-reactivemongotemplate)
* * * * [Durable Subscriptions](#durable-subscriptions-reactive)
* * * * [Push Subscription](#push-subscription-reactive)
* [Decider](#decider)
* * [Application Service](#using-an-applicationservice-with-deciders)
* * * [Java](#application-service-decider-java)
* * * [Kotlin](#application-service-decider-kotlin)
* * [Combining Deciders](#combining-deciders)
* [Dynamic Consistency Boundary](#dynamic-consistency-boundary)
* * [Enabling DCB](#enabling-dcb)
* * [Tags and Criteria](#tags-and-criteria)
* * [The DCB Event Store](#the-dcb-event-store)
* * [The DCB Application Service](#the-dcb-application-service)
* * [Deriving Tags From Annotations](#deriving-tags-from-annotations)
* * [Coupling a Decider to a Boundary](#coupling-a-decider-to-a-boundary)
* * [Subscribing to DCB Events](#subscribing-to-dcb-events)
* * [Reactive DCB](#reactive-dcb)
* * [Notes](#notes)
* [Retry](#retry-configuration-blocking)
* * [Retry and Transactions](#retry-and-transactions)
* [DSL's](#dsls)
* * [Subscription DSL](#subscription-dsl)
* * [Query DSL](#query-dsl)
* * * [DCB Query DSL](#dcb-query-dsl)
* * [The View DSL](#view-dsl)
* * * [Storing a view](#materialized-view)
* * * [Materializing with Spring](#materialized-view-spring)
* * [Projection DSL](#projection-dsl)
* * * [Single-instance Projections](#single-instance-projections)
* * * [Stored Read Model](#maintaining-a-stored-read-model)
* * * [Event Metadata](#projection-event-metadata)
* * * [DCB Projections](#dcb-projections)
* * * [Reading On Demand](#reading-on-demand)
* * * [Read-your-writes](#read-your-writes)
* * * [Reactor](#reactor)
* * * [The `@Projection` Annotation](#the-projection-annotation)
* * * * [Store](#projection-annotation-store)
* * * * [Read-your-writes (Synchronous Mode)](#projection-annotation-synchronous)
* * * * [Without the Starter](#projection-annotation-without-starter)
* * [Saga DSL](#saga-dsl)
* * * [The Core DSL](#saga-core-dsl)
* * * [The Flow DSL](#saga-flow-dsl)
* * * [Correlation](#saga-correlation)
* * * [Event Metadata](#saga-event-metadata)
* * * [Effects Are Data](#saga-effects)
* * * [Running a Saga](#running-a-saga)
* * * [The `@Saga` Annotation](#the-saga-annotation)
* * * [Delivery Contract](#saga-delivery-contract)
* * * [Running Across Multiple Instances](#saga-multi-instance)
* * * [Side Effects and Compensation](#saga-side-effects)
* * * [Observing Saga Instances](#observing-saga-instances)
* [Spring Boot Starter](#spring-boot-starter)
* * [Reactive Spring Boot Starter](#reactive-spring-boot-starter)
* * [Annotations](#spring-boot-annotations)
* * * [Start Position](#subscription-start-position)
* * * [Selective Events](#selective-events)
* * * [Event Metadata](#event-metadata)
* * * [Startup Mode](#subscription-startup-mode)
* [Upgrading](#upgrading)
* [Examples](#examples)
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
  While this may seem like a limitation at first, why not just serialize your POJO directly to arbitrary JSON like you're used to?, it really enables a lot of use cases and peace of mind. For example:
  * It should be possible to hook in various standard components into Occurrent that understands cloud events. For example a component could visualize a distributed tracing graph from the cloud events
    if using the [distributed tracing cloud event extension](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/distributed-tracing.md).
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
In Occurrent, you don't persist your domain events directly to an event store, instead you convert them to a [cloud event](https://cloudevents.io/). You may regard a CloudEvent as a standardized envelope around the 
data in your domain event. 
  
In practice, this means that instead of storing events in a proprietary or arbitrary format, Occurrent, stores events in accordance with the cloud event specification, even at the data-store level. 
I.e. you know the structure of your events, even in the database that the event store uses. It's up to you as a user of the library to [convert](#cloudevent-conversion) your domain events into cloud events when 
writing to the [event store](#eventstore). This is extremely powerful, not only does it allow you to design your domains event in any way you find fit (for example without compromises enforced by a JSON serialization library) but it also allows for easier migration, 
data consistency and features such as (fully-consistent) [queries](#eventstore-queries) to the event store for certain use cases. A cloud event is made-up by a set of pre-defined attributes described in the [cloud event specification]({{cloudevents_spec}}).
In the context of event sourcing, we can leverage these attributes in the way suggested below:
<br><br>


| Cloud&nbsp;Event<br>Attribute&nbsp;Name | Event&nbsp;Sourcing Nomenclature&nbsp; | Description |
|:---------------------------:|:-----:|:----|
| [id]({{cloudevents_spec}}#id) | event&nbsp;id | The cloud event `id` attribute is used to store the id of a unique event in a particular context ("source"). Note that this id doesn't necessarily need to be _globally_ unique (but the combination of `id` and `source` _must_). Typically this would be a UUID.<br><br> |     
| [source]({{cloudevents_spec}}#source-1) | category | You can regard the "source" attribute as the "stream type" or a "category" for certain streams. For example, if you're creating a game, you may have two kinds of aggregates in your bounded context, a "game" and a "player". You can regard these as two different sources (categories). These are represented as URN's, for example the "game" may have the source "urn:mycompany:mygame:game" and "player" may have "urn:mycompany:mygame:player". This allows, for example, [subscriptions](#subscriptions) to subscribe to all events related to any player (by using a [subscription filter](#blocking-subscription-filters) for the `source` attribute).<br><br>|     
| [subject]({{cloudevents_spec}}#subject) | "subject" (~identifier) | A subject describes the event in the context of the source, typically an entity (aggregate) id that all events in the stream are related to. This property is optional (because Occurrent automatically adds the `streamid` attribute) and it's possible that you may not need to add it. But it can be quite useful. For example, a stream may not _necessarily_, just hold contents of a single aggregate, and if so the `subject` can be used to distinguish between different aggregates/entities in a stream. Another example would be if you have multiple streams that represents different aspects of the same entity. For example, if you have a game where players are awarded points based on their performance in the game _after_ the game has ended, you may decide to represent "point awarding" and "game play" as different streams, but they refer to the same "game id". You can then use the "game id" as subject.<br><br>|
| [type]({{cloudevents_spec}}#type) | event&nbsp;type | The type of the event. It may be enough to just use name of the domain event, such as "GameStarted" but you may also consider using a URN (e.g. "urn:mycompany:game:started") or qualify it ("com.mycompany.game.started"). Note that you should try to avoid using the fully-qualified class name of the domain event since you'll run into trouble if you're moving the domain event to a different package.<br><br>|
| [time]({{cloudevents_spec}}#time) | event&nbsp;time | The time when the event occurred (typically would be the application time and not the processing time) described by [RFC 3339](https://tools.ietf.org/html/rfc3339) (represented as `java.time.OffsetDateTime` by the [CloudEvent SDK](https://github.com/cloudevents/sdk-java)).<br><br>|
| [datacontenttype]({{cloudevents_spec}}#datacontenttype) | content-type | The content-type of the data attribute, typically you want to use "application/json", which is also the default if you don't specify any content-type at all.<br><br>|
| [dataschema]({{cloudevents_spec}}#dataschema) | schema | The URI to a schema describing the data in the cloud event (optional).<br><br>|
| [data]({{cloudevents_spec}}#event-data) | event&nbsp;data | The actual data needed to represent your domain event, for example the contents of a `GameStarted` event. You can leave out this attribute entirely if your event is fully described by other attributes.<br><br>|
     

Note that the table above is to be regarded as a rule of thumb, it's ok to map things differently if it's better suited for your application, but it's a good idea to keep things consistent throughout your organization.
To see an example of how this may look in code, refer to the [application service](#application-service) documentation.


### Occurrent CloudEvent Extensions

Occurrent automatically adds two [extension attributes]({{cloudevents_spec}}#extension-context-attributes) to each cloud event written to the [event store](#eventstore):<br><br>

{% include macros/occurrent-cloudevent-extension.md %}

These are required for Occurrent to operate. A long-term goal of Occurrent is to come up with a standardized set of cloud event extensions that are agreed upon and used by several different vendors.

Since version {{site.occurrentversion}}, Occurrent also stamps every event with a global, monotonically increasing `position` extension, shared by stream-written and DCB events alike. It gives stream consumers the same total-ordering guarantee that DCB relies on, and stream catch-up reconciles on it rather than on wall-clock time. It is enabled by default for a new store. When a MongoDB store starts up against a collection that already holds events without a `position`, and position was only on by default rather than turned on explicitly, the store turns position off for itself instead of building the position index over the existing collection, and logs how to enable it. Enabling position explicitly with `EventStoreConfig.withStreamPosition()` (or the property `occurrent.event-store.stream.position=true`) keeps it on even over that existing data, in which case backfill the existing events first. A stream-only store can opt out with `EventStoreConfig.withoutStreamPosition()` (or `occurrent.event-store.stream.position=false`), but a store with the DCB capability always has it enabled.

In the meantime, it's quite possible that Occurrent will provide a wider set of optional extensions in the future (such as correlation id and/or sequence number). But for now, it's up to you as a user to add these if you need them (see [CloudEvent Metadata](#cloudevent-metadata)), 
you would typically do this by creating or extending/wrapping an already existing [application service](#application-service).    

### CloudEvent Metadata

You can specify metadata to the cloud event by making use of [extension attributes]({{cloudevents_spec}}#extension-context-attributes). This is the place to add things such as sequence number, correlation id, causation id etc. 
Actually there's already a standard way of applying [distributed tracing](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/distributed-tracing.md) and [sequence number generation](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/extensions/sequence.md) 
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
 
Then we could write a generic application service that takes a higher-order function `(List<CloudEvent>) -> List<CloudEvent>`:

{% capture java %}
public class ApplicationService {

    private final EventStore eventStore;

    public ApplicationService(EventStore eventStore) {
        this.eventStore = eventStore;
    }

    public void execute(String streamId, Function<List<CloudEvent>, List<CloudEvent>> functionThatCallsDomainModel) {
        // Read all events from the event store for a particular stream
        EventStream<CloudEvent> eventStream = eventStore.read(streamId);

        // Invoke the domain model  
        List<CloudEvent> newEvents = functionThatCallsDomainModel.apply(eventStream.eventList());

        // Persist the new events  
        eventStore.write(streamId, eventStream.version(), newEvents);
    }
}
{% endcapture %}
{% capture kotlin %}
class ApplicationService constructor (val eventStore : EventStore) {

    fun execute(streamId : String, functionThatCallsDomainModel : (List<CloudEvent>) -> List<CloudEvent>) {
        // Read all events from the event store for a particular stream
        val  eventStream : EventStream<CloudEvent> = eventStore.read(streamId)
        
         // Invoke the domain model 
        val newEvents = functionThatCallsDomainModel(eventStream.eventList())

        // Persist the new events
        eventStore.write(streamId, eventStream.version(), newEvents)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
<div class="comment">Note that typically the domain model, WordGuessingGame in this example, would not return CloudEvents but rather a list of a custom data structure, domain events, that would then be <i>converted</i> to CloudEvent's. 
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
applicationService.execute(gameId, events -> WordGuessingGame.guessWord(events, guess));
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
applicationService.execute(gameId) { events ->
    WordGuessingGame.guessWord(events, guess)
}
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

// "withdraw" is a pure function in the Account domain model which takes a List
//  of all current events and the amount to withdraw, and returns new events. 
// In this case, a "MoneyWasWithdrawn" event is returned,  since 15 EUR is OK to withdraw.     
List<CloudEvent> events = Account.withdraw(eventStream.eventList(), Money.of(15, EUR));

// We write the new events to the event store  
eventStore.write("account1", events);

// Now in a different thread let's imagine Person B at _time 1_
EventStream<CloudEvent> eventStream = eventStore.read("account1"); // B

// Again we want to withdraw money, and the system will think this is OK, 
// since event streams for A and B has not yet recorded that the balance is negative.   
List<CloudEvent> events = Account.withdraw(eventStream.eventList(), Money.of(10, EUR));

// We write the new events to the event store without any problems! 😱 
// But this shouldn't work since it would violate the business rule!   
eventStore.write("account1", events);
{% endcapture %}
{% capture kotlin %}
// Person A at _time 1_
val eventStream = eventStore.read("account1") // A

// "withdraw" is a pure function in the Account domain model which takes a List
//  of all current events and the amount to withdraw. It returns a list of 
// new events, in this case only a "MoneyWasWithdrawn" event,  since 15 EUR is OK to withdraw.     
val events = Account.withdraw(eventStream.eventList(), Money.of(15, EUR))

// We write the new events to the event store  
eventStore.write("account1", events)

// Now in a different thread let's imagine Person B at _time 1_
val eventStream = eventStore.read("account1") // B

// Again we want to withdraw money, and the system will think this is OK, 
// since the Account thinks that 10 EUR will have a balance of 10 EUR after 
// the withdrawal.   
val events = Account.withdraw(eventStream.eventList(), Money.of(10, EUR))

// We write the new events to the event store without any problems! 😱 
// But this shouldn't work since it would violate the business rule!   
eventStore.write("account1", events)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

<div class="comment">Note that typically the domain model, Account in this example, would not return CloudEvents but rather a list of a custom data structure, domain events, that would then be <i>converted</i> to CloudEvent's. 
This is not shown in the example above for brevity, look at the <a href="#commands">command</a> section for a more real-life example.</div>

To avoid the problem above we want to make use of conditional writes. Let's see how:

{% capture java %}
// Person A at _time 1_
EventStream<CloudEvent> eventStream = eventStore.read("account1"); // A
long currentVersion = eventStream.version(); 

// Withdraw money
List<CloudEvent> events = Account.withdraw(eventStream.eventList(), Money.of(15, EUR));

// We write the new events to the event store with a write condition that implies
// that the version of the event stream must be A.   
eventStore.write("account1", currentVersion, events);

// Now in a different thread let's imagine Person B at _time 1_
EventStream<CloudEvent> eventStream = eventStore.read("account1"); // A 
long currentVersion = eventStream.version();

// Again we want to withdraw money, and the system will think this is OK, 
// since event streams for A and B has not yet recorded that the balance is negative.   
List<CloudEvent> events = Account.withdraw(eventStream.eventList(), Money.of(10, EUR));

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
val events = Account.withdraw(eventStream.eventList(), Money.of(15, EUR));

// We write the new events to the event store with a write condition that implies
// that the version of the event stream must be A.   
eventStore.write("account1", currentVersion, events)

// Now in a different thread let's imagine Person B at _time 1_
val eventStream = eventStore.read("account1"); // A 
val currentVersion = eventStream.version()

// Again we want to withdraw money, and the system will think this is OK, 
// since event streams for A and B has not yet recorded that the balance is negative.   
val events = Account.withdraw(eventStream.eventList(), Money.of(10, EUR))

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
eventStore.write("streamId", WriteCondition.streamVersion(and(lt(10), ne(5))), events);
{% endcapture %}
{% capture kotlin %}
eventStore.write("streamId", WriteCondition.streamVersion(and(lt(10), ne(5))), events)
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
Stream<CloudEvent> events = eventStore.query(subject("123").and(time(gte(lastTwoHours))), SortBy.time(DESCENDING));
{% endcapture %}
{% capture kotlin %}
val lastTwoHours = OffsetDateTime.now().minusHours(2);
// Query the database for all events the last two hours that have "subject" equal to "123" and sort these in descending order
val events : Stream<CloudEvent> = eventStore.query(subject("123").and(time(gte(lastTwoHours))), SortBy.time(DESCENDING))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

<div class="comment"><span>&#42;</span>There's a trade-off when it's appropriate to query the database vs creating materialized views/projections and you should most likely create indexes to allow for fast queries.</div>

The `subject` and `time` methods are statically imported from `org.occurrent.filter.Filter` and `gte` is statically imported from `org.occurrent.condition.Condition`.  

`EventStoreQueries` is not bound to a particular stream, rather you can query _any_ stream (or multiple streams at the same time). 
It also provides the ability to get an "all" stream:
  
{% capture java %}
// Return all events in an event store sorted by descending order
Stream<CloudEvent> events = eventStore.all(SortBy.time(DESCENDING));
{% endcapture %}
{% capture kotlin %}
// Return all events in an event store sorted by descending order
val events : Stream<CloudEvent> = eventStore.all(SortBy.time(DESCENDING))
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

### EventStore Operations

Occurrent event store implementations may optionally also implement the `EventStoreOperations` interface. It provides means to delete a specific event, or an entire 
event stream. For example:

{% capture java %}
// Delete an entire event stream
eventStoreOperations.deleteEventStream("streamId");
// Delete a specific event
eventStoreOperations.deleteEvent("cloudEventId", cloudEventSource);
// This will delete all events in stream "myStream" that has a version less than or equal to 19.
eventStoreOperations.delete(streamId("myStream").and(streamVersion(lte(19L))));
{% endcapture %}
{% capture kotlin %}
// Delete an entire event stream
eventStoreOperations.deleteEventStream("streamId")
// Delete a specific event
eventStoreOperations.deleteEvent("cloudEventId", cloudEventSource)
// This will delete all events in stream "myStream" that has a version less than or equal to 19.
eventStoreOperations.delete(streamId("myStream").and(streamVersion(lte(19L))))
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
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Stream Filtering {#eventstore-stream-filtering}

`org.occurrent.eventstore.api.StreamReadFilter` is an EventStore read capability for cases where a command or use case only depends on a subset of the events in a stream.
It is useful when you want to avoid reading and deserializing events that are irrelevant for a specific decision.

Filtering is a read optimization, not a correctness feature.
Do not filter away events that are needed to enforce invariants, rebuild state correctly, or make valid domain decisions.

`StreamReadFilter` is intentionally scoped to stream reads and validates reserved stream fields such as `streamid` and `streamversion`.

Filtered stream reads are exposed via optional capability interfaces:

* `org.occurrent.eventstore.api.blocking.ReadEventStreamWithFilter`
* `org.occurrent.eventstore.api.reactor.ReadEventStreamWithFilter`

The following event stores support filtered stream reads:

* `InMemoryEventStore`
* `MongoEventStore`
* `SpringMongoEventStore`
* `ReactorMongoEventStore`

A blocking example:

{% capture java %}
if (eventStore instanceof ReadEventStreamWithFilter filteredEventStore) {
    EventStream<CloudEvent> eventStream = filteredEventStore.read(
            "streamId",
            StreamReadFilter.type("com.acme.NameDefined")
    );
}
{% endcapture %}
{% capture kotlin %}
val filteredEventStore = eventStore as? ReadEventStreamWithFilter
val eventStream = filteredEventStore?.read(
    "streamId",
    StreamReadFilter.type(NameDefined::class.java.name)
)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

A reactor example:

{% capture java %}
if (eventStore instanceof org.occurrent.eventstore.api.reactor.ReadEventStreamWithFilter filteredEventStore) {
    Mono<EventStream<CloudEvent>> eventStream = filteredEventStore.read(
            "streamId",
            StreamReadFilter.type("com.acme.NameDefined")
    );
}
{% endcapture %}
{% capture kotlin %}
val filteredEventStore = eventStore as? org.occurrent.eventstore.api.reactor.ReadEventStreamWithFilter
val eventStream = filteredEventStore?.read(
    "streamId",
    StreamReadFilter.type(NameDefined::class.java.name)
)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

## Subscriptions

A subscription is a way to get notified when new events are written to an event store. Typically, a subscription will be used to create views from events (such as projections, sagas, snapshots etc) or
create integration events that can be forwarded to another piece of infrastructure such as a message bus. There are two different kinds of API's, the first one is a [blocking API](#blocking-subscriptions) 
represented by the `org.occurrent.subscription.api.blocking.SubscriptionModel` interface (in the `org.occurrent:occurrent-subscription-api-blocking` module), and second one is a [reactive API](#reactive-subscriptions) 
represented by the `org.occurrent.subscription.api.reactor.SubscriptionModel` interface (in the `org.occurrent:occurrent-subscription-api-reactor` module). 


The blocking API is callback based, which is fine if you're working with individual events (you can of course use a simple function that aggregates events into batches yourself).
If you want to work with streams of data, the reactor `SubscriptionModel` is probably a better option since it's using the [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html)
publisher from [project reactor](https://projectreactor.io/).

Note that it's fine to use reactive `SubscriptionModel`, even though the event store is implemented using the blocking api, and vice versa.
If the datastore allows it, you can also run subscriptions in a different process than the processes reading and writing to the event store.   

To get started with subscriptions refer to [Using Subscriptions](#using-subscriptions).

Independently of the blocking-versus-reactive choice above, a subscription is either asynchronous or synchronous. Everything so far is asynchronous: it runs on its own thread and fires after the write commits. A [synchronous subscription](#synchronous-subscriptions) instead runs inline on the writer thread, before `execute` returns, so it can update a projection in the write path and, with a transaction, atomically with the write.
     
## Views

Occurrent has a higher-level [Projection DSL](#projection-dsl) for maintaining views/projections, described further down. You don't have to reach for it, though. At its simplest a view is just a [subscription](#subscriptions) in which you create and store 
the view as you find fit. And even that doesn't have to be difficult! Here's a trivial example of a view that maintains the number of
ended games. It does so by inceasing the "numberOfEndedGames" field in an (imaginary) database for each "GameEnded" event that is written to the event store:

{% capture java %}
// An imaginary database API
Database someDatabase = ...
// Subscribe to all "GameEnded" events by starting a subscription named "my-view" 
// and increase "numberOfEndedGames" for each ended game.   
subscriptionModel.subscribe("my-view", filter(type("GameEnded")), cloudEvent -> someDatabase.inc("numberOfEndedGames"));        
{% endcapture %}
{% capture kotlin %}
// An imaginary database API
val someDatabase : Database = ...
// Subscribe to all "GameEnded" events by starting a subscription named "my-view" 
// and increase "numberOfEndedGames" for each ended game. 
subscriptionModel.subscribe("my-view", filter(type("GameEnded"))) {  
    someDatabase.inc("numberOfEndedGames")
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Where `filter` is imported `from org.occurrent.subscription.StreamSubscriptionFilter` and `type` is imported from `org.occurrent.condition.Condition`.

While this is a trivial example it shouldn't be difficult to create a view that is backed by a JPA entity in a relational database based on a subscription.

When the fold gets more involved, or you want to unit-test it in isolation and reuse it across an asynchronous subscription, a synchronous write, and an on-demand query, reach for Occurrent's [View DSL](#view-dsl) (`org.occurrent:occurrent-view-dsl`). It is the read-side counterpart of a [decider](#decider): a decider folds events and decides new ones, a `View` folds events into state you read. It is blocking-only, and it is the primitive the higher-level [Projection DSL](#projection-dsl) builds on.

So there are three levels for a read model, and you should pick the lowest one that does the job. A plain [subscription](#subscriptions) that writes to your store, as at the top of this section, when the fold is trivial. The [View DSL](#view-dsl), when you want a fold you can unit-test on its own and store wherever you like. The [Projection DSL](#projection-dsl), when you want the fold, the event types it handles, the view-instance id, and the delivery mode declared together in one place.

## Commands

A command is used to represent an _intent_ in an event sourced system, i.e. something that you _want_ to do. They're different, in a very important way, from events in that commands 
can fail or be rejected, where-as events cannot. A typical example of a command would be a data structure whose name is defined as an imperative verb, for example `PlaceOrder`. 
The resulting event, if the command is processed successfully, could then be `OrderPlaced`. However, in Occurrent, as explained in more detail in the [Command Philosophy](#command-philosophy)
section below, you may start off by not using explicit data structures for commands unless you want to. In Occurrent, you can instead use pure functions 
to represent commands and command handling. Combine this with function composition and you have a powerful way to invoke the domain model (refer to the [application service](#application-service) for examples).           

### Command Philosophy

Occurrent doesn't contain a built-in command bus. Instead, you're encouraged to pick any infrastructure component you need to act as the command bus to 
send commands to another service. Personally, I typically make a call to a REST API or make an RPC invocation instead of using a distributed command bus
that routes the commands to my aggregate. There are of course exceptions to this, such as the need for [location transparency](https://en.wikipedia.org/wiki/Location_transparency) or if you're using [Decider's](#decider).
If you need location transparency, a command bus or an actor model can be of help. But I would argue that you may not always need the complexity by prematurely going down this route
if your business requirements doesn't point you in this direction. [Decider's](#decider) are a nice alternative, that doesn't require any additional infrastructure.    

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
2. Commands are defined as explicit data structures with framework-specific annotations when arguably they don't have to. This is fine if you need to serialize the command (in order to send it
   to another location or to schedule it for the future) but one could argue that you don't want to couple your commands to some infrastructure.
   This is of course a trade-off, in Occurrent you're free to choose any approach you like (i.e. commands/functions can be completely free of framework/library/infrastructure concerns). 

### Commands in Occurrent 

So how would one dispatch commands in Occurrent? As we've already mentioned there's nothing stopping you from using a (distributed) command bus or to create explicit commands, 
and dispatch them the way we did in the example above. For example, if you're using [Decider's](#decider), it could be nice to have commands explicitly defined.
But if you recognize some of the points described above and are looking for a simpler approach, here's another
way to go about. First let's refactor the domain model to pure functions, without any state or dependencies to Occurrent or any other library/framework. 

{% include macros/domain/wordGuessingGameDomainEvents.md java=java kotlin=kotlin %}

If you define your behavior like this it'll be easy to test (and also to compose using normal function composition techniques). There are no side-effects 
(such as publishing events) which also allows for easier testing and [local reasoning](https://www.inner-product.com/posts/fp-what-and-why/).

But where are our commands!? In this example we've decided to represent them as functions. I.e. the "command" is modeled as simple function, e.g. `startNewGame`!
This means that the command handling logic is handled by function as well. You don't need to switch/match over the command since you directly invoke the function itself.
Again, you may prefer to actually define your commands explicitly, but in this example we'll just be using normal functions.

But wait, how are these functions called? Create or copy a generic `ApplicationService` class like the one below 
(or use the generic [application service](#application-service) provided by Occurrent):         

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
            
We're leveraging higher-order functions instead of using explicit commands.

### Command Composition

Many times it's useful to compose multiple commands into a single unit-of-work for the same stream/aggregate. What this means that you'll "merge" several commands into one, and they will be executed in an atomic fashion. 
I.e. either _all_ commands succeed, or all commands fail.

While you're free to use any means and/or library to achieve this, Occurrent ships with a "command composition" library that you can leverage:

{% include macros/command/composition-maven.md %}

As an example consider this simple domain model:

{% include macros/command/composition-domain.md %}

Imagine that for a specific API you want to allow starting a new game and making a guess in the same request. Instead of changing your domain model, 
you can use function composition! If you statically import `composeCommands` from `org.occurrent.application.composition.command.ListCommandComposition` you can do like this:

{% include macros/command/composition-example.md %}
<div class="comment">If you're using Kotlin you should import the "composeCommands" extension function from 
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
that you can use to further enhance the example above (if you like). If you statically import `partial` method from `org.occurrent.application.composition.command.partial.PartialFunctionApplication` 
you can refactor the code above into this:

{% include macros/command/composition-example-partial.md %}
<div class="comment">If you're using Kotlin, important the "partial" extension function from "org.occurrent.application.composition.command.partial".</div>

With Kotlin, you can also use `andThen` (described above) to do:

```kotlin
applicationService.execute(gameId, 
    WordGuessingGame::startNewGame.partial(gameId, wordToGuess)
            andThen WordGuessingGame::makeGuess.partial(guess))
```

## CloudEvent Conversion

To convert between domain events and cloud events you can use the cloud event converter API that's shipped with Occurrent. This is optional, but components such as the [application service](#application-service) and [subscription dsl](#subscription-dsl) uses a cloud event converter to function.
If you're only using an [event store](#eventstore) and [subscriptions](#subscriptions) then you don't need a cloud event converter (or you can roll your own).
All cloud event converters implements the `org.occurrent.application.converter.CloudEventConverter` interface from the `org.occurrent:occurrent-cloudevent-converter-api` module (see [custom cloudevent converter](#custom-cloudevent-converter)). 

### Generic CloudEvent Converter

This is a really simple cloud event converter to which you can pass two higher-order functions that converts to and from domain events respectively. To use it depend on:

{% include macros/cloudevent-converter/generic-maven.md %}

For example:

```java
Function<CloudEvent, DomainEvent> convertCloudEventToDomainEventFunction = .. // You implement this function
Function<DomainEvent, CloudEvent> convertDomainEventToCloudEventFunction = .. // You implement this function
CloudEventConverter<CloudEvent> cloudEventConverter = new GenericCloudEventConverter<>(convertCloudEventToDomainEventFunction, convertDomainEventToCloudEventFunction);
```

If your domain model is already using a `CloudEvent` (and not a custom domain event) then you can just pass a `Function.identity()` to the `GenericCloudEventConverter`:

```java
CloudEventConverter<CloudEvent> cloudEventConverter = new GenericCloudEventConverter<>(Function.identity(), Function.identity());
```         

### XStream CloudEvent Converter

This cloud event converter uses [XStream](https://x-stream.github.io/) to convert domain events to cloud events to XML and back. To use it, first depend on this module:

{% include macros/cloudevent-converter/xstream-maven.md %}

Next you can instantiate it like this:

{% capture java %}
XStream xStream = new XStream();
xStream.allowTypeHierarchy(MyDomainEvent.class);
URI cloudEventSource = URI.create("urn:company:domain") 
XStreamCloudEventConverter<MyDomainEvent> cloudEventConverter = new XStreamCloudEventConverter<>(xStream, cloudEventSource);
{% endcapture %}
{% capture kotlin %}
val xStream = XStream().apply { allowTypeHierarchy(MyDomainEvent::class.java) }
val cloudEventSource = URI.create("urn:company:domain")
val cloudEventConverter = new XStreamCloudEventConverter<>(xStream, cloudEventSource)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

You can also configure how different attributes of the domain event should be represented in the cloud event by using the builder, `new XStreamCloudEventConverter.Builder<MyDomainEvent>().. build()`.

### Jackson CloudEvent Converter

#### Jackson 3 {#jackson3-cloudevent-converter}

Occurrent `0.20.0` provides a Jackson 3-native CloudEvent converter and that is the recommended choice for new code.
To use it, first depend on this module:

{% include macros/cloudevent-converter/jackson-maven.md %}

Next you can instantiate it like this:

{% capture java %}
import org.occurrent.application.converter.jackson3.JacksonCloudEventConverter;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.json.JsonMapper;

ObjectMapper objectMapper = JsonMapper.builder().build();
URI cloudEventSource = URI.create("urn:company:domain")
JacksonCloudEventConverter<MyDomainEvent> cloudEventConverter = new JacksonCloudEventConverter<>(objectMapper, cloudEventSource);
{% endcapture %}
{% capture kotlin %}
import org.occurrent.application.converter.jackson3.JacksonCloudEventConverter
import tools.jackson.module.kotlin.jacksonObjectMapper

val objectMapper = jacksonObjectMapper()
val cloudEventSource = URI.create("urn:company:domain")
val cloudEventConverter = JacksonCloudEventConverter<MyDomainEvent>(objectMapper, cloudEventSource)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

You can also configure how different attributes of the domain event should be represented in the cloud event by using the builder.
In production, you almost certainly want to change the way the `JacksonCloudEventConverter` generates the cloud event type from the domain event. By default, the cloud event type will be generated
from the fully-qualified class name of the domain event class type. I.e. if you do:

```java
import org.occurrent.application.converter.jackson3.JacksonCloudEventConverter;

CloudEventConverter<MyDomainEvent> cloudEventConverter = new JacksonCloudEventConverter<>(objectMapper, cloudEventSource);
CloudEvent cloudEvent = cloudEventConverter.toCloudEvent(new SomeDomainEvent());
```

Then `cloudEvent.getType()` will return `com.mycompany.SomeDomainEvent`. Typically, you want to decouple the cloud event type from the fully-qualified name of the class. A better, but arguably still not optimal way, would be to make
`cloudEvent.getType()` return `SomeDomainEvent` instead. The `JacksonCloudEventConverter` allows us to do this by using the builder: 

```java
import org.occurrent.application.converter.jackson3.JacksonCloudEventConverter;

CloudEventConverter<MyDomainEvent> cloudEventConverter = new JacksonCloudEventConverter.Builder<MyDomainEvent>(objectMapper, cloudEventSource)
        .typeMapper(..) // Specify a custom way to map the domain event to a cloud event and vice versa
        .build();
```

But when using Jackson, we can't just configure the type mapper to return the "simple name" of the domain event class instead of the fully-qualified name. This is because there's no generic way to derive the fully-qualified name from 
just the simple name. The fully-qualified name is needed in order for Jackson to map the cloud event back into a domain event. In order to work-around this you could implement your own type mapper (that you pass to the builder above)
or create an instance of [ReflectionCloudEventTypeMapper](https://github.com/johanhaleby/occurrent/blob/occurrent-{{site.occurrentversion}}/application/cloudevent-type-mapper/reflection/src/main/java/org/occurrent/application/converter/typemapper/ReflectionCloudEventTypeMapper.java)
that knows how to convert the "simple name" cloud event type back into the domain event class. There are a couple of ways, the most simple one is probably this:

```java
CloudEventTypeMapper<MyDomainEvent> typeMapper = ReflectionCloudEventTypeMapper.simple(MyDomainEvent.class);
```

This will create an instance of `ReflectionCloudEventTypeMapper` that uses the simple name of the domain event as cloud event type. But the crucial thing is that when deriving the domain event type from the cloud event, 
the `ReflectionCloudEventTypeMapper` will prepend the package name of supplied domain event type (`MyDomainEvent`) to the cloud event type, thus reconstructing the fully-qualified name of the class. 
For this to work, _all_ domain events must reside in exactly the same package as `MyDomainEvent`.

Another approach would be to supply a higher-order function that knows how to map the cloud event type back into a domain event class.

```java
CloudEventTypeMapper<MyDomainEvent> typeMapper = ReflectionCloudEventTypeMapper.simple(cloudEventType -> ...);
```

Again, this will create an instance of `ReflectionCloudEventTypeMapper` that uses the simple name of the domain event as cloud event type, but
you are responsible to, somehow, map the cloud event type (`cloudEventType`) back into a domain event class.

If you don't want to use reflection or don't want to couple the class name to the event name (which is recommended) you can roll your own custom `CloudEventTypeMapper` by implementing the 
[org.occurrent.application.converter.typemapper.CloudEventTypeMapper](https://github.com/johanhaleby/occurrent/blob/occurrent-{{site.occurrentversion}}/application/cloudevent-type-mapper/api/src/main/java/org/occurrent/application/converter/typemapper/CloudEventTypeMapper.java)
interface.

As of version 0.20.5 the builder can also truncate the cloud event time to a given precision with `timePrecision(ChronoUnit)`:

{% capture java %}
CloudEventConverter<MyDomainEvent> cloudEventConverter = new JacksonCloudEventConverter.Builder<MyDomainEvent>(objectMapper, cloudEventSource)
        .timePrecision(ChronoUnit.MILLIS)
        .build();
{% endcapture %}
{% capture kotlin %}
val cloudEventConverter = JacksonCloudEventConverter.Builder<MyDomainEvent>(objectMapper, cloudEventSource)
        .timePrecision(ChronoUnit.MILLIS)
        .build()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

This matters when the event store uses `TimeRepresentation.DATE`, which cannot store the nanoseconds that `Instant.now()` and `OffsetDateTime.now()`
carry on modern JVMs, so an append would otherwise fail. With the Spring Boot starter you set it through the `occurrent.cloud-event-converter.time-precision`
property (a `ChronoUnit`, for example `millis`). When that property is unset and the event store `time-representation` is `DATE`, the converter defaults
to truncating to `MILLIS`, so the common case needs no configuration. `RFC_3339_STRING` keeps full precision.

If you are migrating an existing application and need to stay on the old Jackson 2 API for a while, `org.occurrent:occurrent-cloudevent-converter-jackson` is still available as a compatibility lane.
However, the recommended direction for new applications and updated documentation is Jackson 3.

#### Jackson 2 Compatibility {#jackson2-cloudevent-converter}

If you're maintaining an existing application that still uses the Jackson 2 API, you can continue to use the Jackson 2 compatibility lane.
Depend on `org.occurrent:occurrent-cloudevent-converter-jackson`:

```xml
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-cloudevent-converter-jackson</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
```

Then instantiate it like this:

{% capture java %}
import com.fasterxml.jackson.databind.ObjectMapper;
import org.occurrent.application.converter.jackson.JacksonCloudEventConverter;

ObjectMapper objectMapper = new ObjectMapper();
URI cloudEventSource = URI.create("urn:company:domain");
JacksonCloudEventConverter<MyDomainEvent> cloudEventConverter = new JacksonCloudEventConverter<>(objectMapper, cloudEventSource);
{% endcapture %}
{% capture kotlin %}
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.occurrent.application.converter.jackson.JacksonCloudEventConverter

val objectMapper = jacksonObjectMapper()
val cloudEventSource = URI.create("urn:company:domain")
val cloudEventConverter = JacksonCloudEventConverter<MyDomainEvent>(objectMapper, cloudEventSource)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Jackson 2 still works and is intended for existing applications that are not yet ready to move to the Jackson 3 API.
For new applications, prefer the Jackson 3 converter documented above.

### Custom CloudEvent Converter

To create a custom cloud event converter first depend on:

{% include macros/cloudevent-converter/api-maven.md %}

Let's have a look at a naive example of how we can create a custom converter that converts domain events to cloud events (and vice versa). This cloud event converter can then be used with the [generic application service](#application-service) (the application service implementation provided by Occurrent) and other Occurrent components that requires a `CloudEventConverter`.
Note that instead of using the code below you might as well use the [Jackson CloudEvent Converter](#jackson-cloudevent-converter), this is just an example showing how you could roll your own.

```java
import tools.jackson.databind.ObjectMapper;
import io.cloudevents.CloudEvent;
import io.cloudevents.core.builder.CloudEventBuilder;
import org.occurrent.application.converter.CloudEventConverter;

import java.io.IOException;
import java.net.URI;

import static java.time.ZoneOffset.UTC;
import static org.occurrent.functional.CheckedFunction.unchecked;
import static org.occurrent.time.TimeConversion.toLocalDateTime;

public class MyCloudEventConverter implements CloudEventConverter<DomainEvent> {

    private final ObjectMapper objectMapper;

    public MyCloudEventConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public CloudEvent toCloudEvent(DomainEvent e) {
        try {
            return CloudEventBuilder.v1()
                    .withId(e.getEventId())
                    .withSource(URI.create("urn:myapplication:streamtype"))
                    .withType(getCloudEventType(e))
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

    @Override
    public DomainEvent toDomainEvent(CloudEvent cloudEvent) {
        try {
            return (DomainEvent) objectMapper.readValue(cloudEvent.getData().toBytes(), Class.forName(cloudEvent.getType()));
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    
    @Override
    public String getCloudEventType(Class<? extends T> type) {
        return type.getName();
    }
}        
```
<div class="comment">While this implementation works for simple cases, make sure that you think before simply copying and pasting this class into your own code base. 
The reason is that you may not need to serialize all data in the domain event to the data field (some parts of the domain event, such as id and type, is already present in the cloud event), 
and the "type" field contains the fully-qualified name of the class which makes it more difficult to move without loosing backward compatibility. Also your domain events
might not be serializable to JSON without conversion. For these reasons, it's recommended to create a more custom mapping between a cloud event and domain event.</div>

To see what the attributes mean in the context of event sourcing refer to the [CloudEvents](#cloudevents) documentation. 
You can also have a look at [GenericApplicationServiceTest.java](https://github.com/johanhaleby/occurrent/blob/occurrent-{{site.occurrentversion}}/application/service/blocking/src/test/java/org/occurrent/application/service/blocking/generic/GenericApplicationServiceTest.java) 
for an actual code example.

Note that if the data content type in the CloudEvent is specified as "application/json" (or a json compatible content-type) then Occurrent will automatically store it as [Bson](http://bsonspec.org/) in a MongoDB event store.
The reason for this so that you're able to query the data, either by the [EventStoreQueries](#eventstore-queries) API, or manually using MongoDB queries. 
In order to do this, the `byte[]` passed to `withData`, will be converted into a `org.bson.Document` that is later written to the database. This is not optimal from a performance perspective.
A more performant option would be to make use of the `io.cloudevents.core.data.PojoCloudEventData` class. This class implements the `io.cloudevents.CloudEventData` interface and
allows passing a pre-baked `Map` or `org.bson.Document` instance to it. Then no additional conversion will need to take place! Here's an example:

```java
import tools.jackson.databind.ObjectMapper;
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

public class MyCloudEventConverter implements CloudEventConverter<DomainEvent> {
    
    private final ObjectMapper objectMapper;
    
    public MyCloudEventConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    } 

    @Override
    public CloudEvent toCloudEvent(DomainEvent e) {  
            // Convert the data in the domain event into a Document 
            Map<String, Object> eventData = convertDataInDomainEventToMap(e);
            return CloudEventBuilder.v1()
                    .withId(e.getEventId())
                    .withSource(URI.create("http://name"))
                    .withType(getCloudEventType(e))
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
    
    @Override
    public DomainEvent toDomainEvent(CloudEvent cloudEvent) {
        CloudEventData cloudEventData = cloudEvent.getData();
        if (cloudEventData instanceof PojoCloudEventData && cloudEventData.getValue() instanceof Map) {
            Map<String, Object> eventData = ((PojoCloudEventData<Map<String, Object>>) cloudEventData).getValue();
            return convertToDomainEvent(cloudEvent, eventData);
        } else {
            return objectMapper.readValue(cloudEventData.toBytes(), DomainEvent.class); // try-catch omitted
        }
    }
    
    @Override
    public String getCloudEventType(Class<? extends T> type) {
        return type.getSimpleName();
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

## Application Service

Occurrent provides a generic application service that is a good starting point for most use cases. First add the module as a dependency to your project:

{% include macros/applicationservice/blocking-maven.md %}

This module provides an interface, `org.occurrent.application.service.blocking.ApplicationService`, and a default implementation, 
`org.occurrent.application.service.blocking.generic.GenericApplicationService`. The `GenericApplicationService` takes an `EventStore` and 
a `org.occurrent.application.converter.CloudEventConverter` implementation as parameters. The latter is used to convert domain events to and from 
cloud events when loaded/written to the event store. There's a default implementation that you *may* decide to use called, 
`org.occurrent.application.converter.implementation.GenericCloudEventConverter` available in the `org.occurrent:occurrent-cloudevent-converter-generic` module. 
You can see an example in the [next](#using-the-application-service) section.

As of version 0.11.0, the `GenericApplicationService` also takes a [RetryStrategy](#retry) as an optional third parameter.  
By default, the retry strategy uses exponential backoff starting with 100 ms and progressively go up to max 2 seconds wait time between
each retry, if a `WriteConditionNotFulfilledException` is caught (see [write condition](#write-condition) docs). 
It will, again by default, only retry 5 times before giving up, rethrowing the original exception. You can override the default strategy
by calling `new GenericApplicationService(eventStore, cloudEventConverter, retryStrategy)`. 
Use `new GenericApplicationService(eventStore, cloudEventConverter, RetryStrategy.none())` to disable retry. This is also useful if you 
want to use another retry library.

That retry runs wherever `execute` runs, so if you wrap the call in your own `@Transactional` it retries inside your transaction, where it cannot succeed. See [Retry and Transactions](#retry-and-transactions).

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

You're now ready to use the generic application service in your application. 
<div class="comment">
If you're using <a href="#decider">Decider's</a> then refer to the docs <a href="#using-an-applicationservice-with-deciders">here</a>.  
</div>

As an example let's say you have a domain model with a method defined like this:

```java
public class WordGuessingGame {
    public static List<DomainEvent> guessWord(List<DomainEvent> events, String guess) {
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

When you need more control over the execution, for example filtered stream reads or synchronous side effects, use `ExecuteOptions`.
This is now the preferred API for these concerns.

{% capture java %}
applicationService.execute(
        gameId,
        ExecuteOptions.<DomainEvent>options()
                .filter(StreamReadFilter.type(GameWasStarted.class.getName()))
                .sideEffect(newEvents -> newEvents.forEach(this::publish)),
        events -> WordGuessingGame.guessWord(events, guess)
);
{% endcapture %}
{% capture kotlin %}
applicationService.execute(
    gameId,
    filter(StreamReadFilter.type(GameWasStarted::class.java.name)).sideEffect(
        { event: GameWasStarted -> publish(event) }
    )
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

For EventStore capability details and supported implementations, see [Stream Filtering](#eventstore-stream-filtering).

### Stream Filtering and Execute Options {#application-service-stream-filtering-and-execute-options}

At the `ApplicationService` level, stream filtering is exposed through `ExecuteOptions`.
This is the preferred way to say both:

* which events should be read before command execution
* which synchronous side effects should run after a successful write

As of `0.20.0` the `ApplicationService` supports filtered reads and side effects by using the `ExecuteOptions` object.

`org.occurrent.application.service.blocking.ExecuteOptions` is the preferred way to configure blocking `ApplicationService` execution when you need:

* filtered stream reads before command execution
* synchronous post-write side effects
* both at the same time

A Java example:

{% capture java %}
WriteResult result = applicationService.execute(
        gameId,
        ExecuteOptions.<DomainEvent>options()
                .filter(StreamReadFilter.type(GameWasStarted.class.getName()))
                .sideEffect(newEvents -> newEvents.forEach(this::publish)),
        events -> WordGuessingGame.guessWord(events, guess)
);
{% endcapture %}
{% capture kotlin %}
val result = applicationService.execute(
    gameId,
    options().filter(StreamReadFilter.type(GameWasStarted::class.java.name)).sideEffect(
        { event: GameWasStarted -> publish(event) }
    )
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

For EventStore support details, filtering semantics, and direct EventStore examples, see [Stream Filtering](#eventstore-stream-filtering).

### Synchronous Side Effects

Use `ExecuteOptions.sideEffect(...)` for synchronous side effects going forward.
This is now the preferred API for new code.

The lower-level `SideEffect.executeSideEffect(...)` helper (formerly `PolicySideEffect.executePolicy(...)`) still exists, but it is no longer the recommended primary approach.
If you are documenting or writing new synchronous side-effect code, prefer `ExecuteOptions.sideEffect(...)`.

A side effect is not the same as a [synchronous subscription](#synchronous-subscriptions). A side effect is a closure you pass at each call site, whereas a synchronous subscription is declared once and reacts to every matching write, the same way an asynchronous subscription does. Reach for a synchronous subscription when the reaction should be declared once and decoupled from the call, or should commit atomically with the write through a `TransactionExecutor`.

### Java Examples

{% capture java %}
applicationService.execute(
        gameId,
        ExecuteOptions.<DomainEvent>options()
                .sideEffect(newEvents -> newEvents
                        .filter(event -> event instanceof GameWasStarted)
                        .findFirst()
                        .map(GameWasStarted.class::cast)
                        .ifPresent(registerOngoingGame::registerGameAsOngoingWhenGameWasStarted)),
        events -> WordGuessingGame.guessWord(events, guess)
);
{% endcapture %}
{% capture kotlin %}
applicationService.execute(
    gameId,
    sideEffect { event: GameWasStarted ->
        registerOngoingGame.registerGameAsOngoingWhenGameWasStarted(event)
    }
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Kotlin Examples

For Kotlin, the domain function is a `(List<DomainEvent>) -> List<DomainEvent>` lambda passed straight to `execute`. You can start from either `options()` or the top-level helper functions:

```kotlin
applicationService.execute(
    gameId,
    sideEffect(
        { event: GameWasStarted -> registerOngoingGame.registerGameAsOngoingWhenGameWasStarted(event) }
    )
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
```

```kotlin
applicationService.execute(
    gameId,
    options().filter(ExecuteFilters.type<GameWasStarted>()).sideEffect(
        { event: GameWasStarted -> registerOngoingGame.registerGameAsOngoingWhenGameWasStarted(event) }
    )
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
```

Both Kotlin forms above invoke the callback once per matching event. When you want the whole batch of matching events in a single call instead, use `sideEffectOnList`, which hands you a `List` of them (it filters to the event type the same way):

```kotlin
applicationService.execute(
    gameId,
    options().sideEffectOnList { startedGames: List<GameWasStarted> ->
        registerOngoingGame.registerAll(startedGames)
    }
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
```

It is `sideEffectOnList` rather than `sideEffect` because `ExecuteOptions` already has a Java `sideEffect(Consumer<List<E>>)` method, and a Kotlin extension of the same name would be shadowed by it. In Java, call that `sideEffect(...)` method directly with the whole list.

### When Not to Use Filtering

Filtering is a read optimization, not a correctness feature.
Do not filter away events that are needed to enforce invariants, rebuild state correctly, or make valid domain decisions.
If the command depends on the whole stream, read the whole stream.

### Application Service Side-Effects

The `GenericApplicationService` supports executing side-effects after the events returned from the domain model have been written to the event store.
This is useful if you need to update a view _synchronously_ after a successful write. To perform side-effects asynchronously, use a [subscription](#subscriptions) instead.

For synchronous side effects, use `ExecuteOptions.sideEffect(...)` going forward. This is now the preferred API.

As an example, consider that you want to synchronously register a game as ongoing when it is started. It may be defined like this:

{% capture java %}
public class RegisterOngoingGame {
    private final DatabaseApi someDatabaseApi;

    public RegisterOngoingGame(DatabaseApi someDatabaseApi) {
        this.someDatabaseApi = someDatabaseApi;
    }

    public void registerGameAsOngoingWhenGameWasStarted(GameWasStarted event) {
        // Add the id of the game started event to a set to handle duplicates and idempotency.
        someDatabaseApi.addToSet("ongoingGames", Map.of("gameId", event.gameId(), "date", event.getDate()));
    }
}
{% endcapture %}
{% capture kotlin %}
class RegisterOngoingGame(private val someDatabaseApi : DatabaseApi) {
    fun registerGameAsOngoingWhenGameWasStarted(event : GameWasStarted) {
        // Add the id of the game started event to a set to handle duplicates and idempotency.
        someDatabaseApi.addToSet("ongoingGames", Map.of("gameId", event.gameId(), "date", event.getDate()));
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Now that we have the code that registers ongoing games, we can call it from the application service like this:

{% capture java %}
RegisterOngoingGame registerOngoingGame = ..
applicationService.execute(
        gameId,
        ExecuteOptions.<DomainEvent>options()
                .sideEffect(newEvents -> newEvents
                        .filter(event -> event instanceof GameWasStarted)
                        .findFirst()
                        .map(GameWasStarted.class::cast)
                        .ifPresent(registerOngoingGame::registerGameAsOngoingWhenGameWasStarted)),
        events -> WordGuessingGame.guessWord(events, guess)
);
{% endcapture %}
{% capture kotlin %}
val registerOngoingGame : RegisterOngoingGame = ..
applicationService.execute(
    gameId,
    sideEffect { event: GameWasStarted ->
        registerOngoingGame.registerGameAsOngoingWhenGameWasStarted(event)
    }
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Voila! Now `registerGameAsOngoingWhenGameWasStarted` will be called after the events returned from `WordGuessingGame.guessWord(..)` are written to the event store.

The lower-level `SideEffect.executeSideEffect(...)` helper (formerly `PolicySideEffect.executePolicy(...)`) still exists, but it is no longer the preferred primary approach for new code.
If you already use it, you can keep doing so, but new examples and new synchronous side-effect code should prefer `ExecuteOptions.sideEffect(...)`.

### Application Service Transactional Side-Effects

In the example above, writing the events to the event store and executing synchronous side effects is not an atomic operation.
If your app crashes after one side effect has run, but before the rest of the work completes, you will need to handle idempotency.
But if your side effects write data to the same database as the event store, you can make use of transactions to write everything atomically.
This is very easy if you're using a [Spring EventStore](#eventstore-with-spring-mongotemplate-blocking). What you need to do is to wrap the `ApplicationService` provided
by Occurrent in your own application service, something like this:

{% capture java %}
@Service
public class CustomApplicationServiceImpl {
	private final GenericApplicationService<DomainEvent> occurrentApplicationService;

	public CustomApplicationService(GenericApplicationService<DomainEvent> occurrentApplicationService) {
		this.occurrentApplicationService = occurrentApplicationService;
	}

	@Transactional
    public WriteResult execute(String gameId,
                               ExecuteOptions<DomainEvent> executeOptions,
                               Function<List<DomainEvent>, List<DomainEvent>> functionThatCallsDomainModel) {
		return occurrentApplicationService.execute(gameId, executeOptions, functionThatCallsDomainModel);
    }
}
{% endcapture %}
{% capture kotlin %}
@Service
class CustomApplicationServiceImpl(private val occurrentApplicationService: GenericApplicationService<DomainEvent>) {

    @Transactional
    fun execute(
        gameId: String,
        executeOptions: ExecuteOptions<DomainEvent>,
        functionThatCallsDomainModel: Function<List<DomainEvent>, List<DomainEvent>>
    ): WriteResult {
        return occurrentApplicationService.execute(gameId, executeOptions, functionThatCallsDomainModel)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Given that you've defined a `MongoTransactionManager` in your Spring Boot configuration (and use this when creating your [event store instance](#eventstore-with-spring-mongotemplate-blocking)) the side effects and events
are written atomically in the same transaction!

### Application Service Kotlin Extensions

If you're using [Kotlin](https://kotlinlang.org/), the domain function you pass to `execute` is a `(List<E>) -> List<E>` lambda that binds directly to the Java `execute(..., Function<List<E>, List<E>>)` member.

Occurrent provides Kotlin extensions for the surrounding options in the application service module:

{% include macros/applicationservice/blocking-maven.md %}

Use these:

* `options()` when you want to start an `ExecuteOptions` chain explicitly
* `filter(...)` when you want to start directly with a `StreamReadFilter` or `ExecuteFilter`
* `sideEffect(...)` when you want to configure synchronous side effects
* `ExecuteFilters.type(...)` / `ExecuteFilters.includeTypes(...)` / `ExecuteFilters.excludeTypes(...)` when you want typed filters based on domain event classes
* `sideEffectOnList(...)` when the side effect itself wants a filtered collection view

For example:

```kotlin
applicationService.execute(gameId) { events ->
    WordGuessingGame.guessWord(events, guess)
}
```

```kotlin
applicationService.execute(
    gameId,
    sideEffect { event: GameWasStarted ->
        registerOngoingGame.registerGameAsOngoingWhenGameWasStarted(event)
    }
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
```

```kotlin
applicationService.execute(
    gameId,
    options().filter(ExecuteFilters.type<GameWasStarted>()).sideEffect(
        { event: GameWasStarted -> registerOngoingGame.registerGameAsOngoingWhenGameWasStarted(event) }
    )
) { events ->
    WordGuessingGame.guessWord(events, guess)
}
```

For synchronous side effects, prefer `sideEffect(...)` or `options().sideEffect(...)` rather than the older policy-style helpers.

## Command Dispatch

A saga or a policy needs to issue commands without knowing how those commands get turned into events. `CommandDispatcher<C>` is the interface for that. It has one method you must write, `void dispatch(C command)`, so a plain lambda is a valid dispatcher. Delivery is at-least-once, so whatever `dispatch` calls into must be safe to run twice on the same command. Running it twice should never append the same events a second time.

There is a second, optional method, `void dispatchAll(List<C> commands)`. A saga hands one reaction's whole command list to it in a single call, and the default implementation just dispatches them one at a time, which is what a lambda dispatcher gets. Override it when your commands all target one stream or one decider and you can write them together, for example inside a single transaction.

That matters because a saga dispatches before it saves its own state. If the third of three commands fails, the first two have already been dispatched, the state is not saved, and the redelivery runs the reaction again from the top. There is no per-command progress marker, so a command that keeps failing re-issues the ones before it every time. For a receiver backed by an `ApplicationService` that costs nothing, because it re-reads the stream and the target rejects a command it has already applied. For something external and not idempotent, such as sending an email or charging a card, it is worth overriding `dispatchAll` to make the batch atomic.

Overriding it does not make dispatch exactly-once, and Occurrent does not promise that. It closes the window for the one dispatcher that can, and the contract stays at-least-once either way.

{% include macros/command-dispatch/core/maven.md %}

`ApplicationService` is the write engine underneath. It takes a stream id and a decider, reads the stream, decides what to append, and appends it. A `CommandDispatcher` is what the saga calls instead of the `ApplicationService` directly. It resolves which stream the command targets, then hands the command to the `ApplicationService` (or an equivalent write path) that does the actual read, decide, and append. The saga only knows the command, not the stream id or the decider behind it.

To resolve the target stream, a `CommandDispatcher` implementation needs a `StreamIdResolver<C>`, another single-method interface, `String streamId(C command)`. Write one by hand when the stream id has to be computed from the command, or derive it automatically with `@TargetStreamId`.

### Convenience Factories

Wiring a `CommandDispatcher` by hand means picking an `ApplicationService`, a `Decider`, and (for the stream case) a `StreamIdResolver`, and gluing them together yourself. `CommandDispatchers.decider(...)` and `DcbCommandDispatchers.decider(...)` do that gluing for you, one factory per style of decider.

For a stream-keyed decider, `org.occurrent.command.CommandDispatchers.decider(deciderApplicationService, decider, streamIdResolver)` builds a `CommandDispatcher<C>` that resolves the stream id, then executes the decider through the application service. It lives in `occurrent-command-dispatch`, the same module as `CommandDispatcher` itself, but using it also pulls in `occurrent-decider`, a light, optional dependency you'd otherwise add yourself.

{% capture java %}
public record PlaceOrder(@TargetStreamId String orderId, String productId, int quantity) {
}

Decider<PlaceOrder, OrderState, OrderEvent> placeOrderDecider = ...;
DeciderApplicationService<OrderEvent> applicationService = ...;
StreamIdResolver<PlaceOrder> streamIdResolver = new AnnotationStreamIdResolver<>();

CommandDispatcher<PlaceOrder> dispatcher = CommandDispatchers.decider(applicationService, placeOrderDecider, streamIdResolver);

dispatcher.dispatch(new PlaceOrder(orderId, productId, quantity));
{% endcapture %}
{% capture kotlin %}
data class PlaceOrder(
    @get:TargetStreamId val orderId: String,
    val productId: String,
    val quantity: Int
)

val placeOrderDecider: Decider<PlaceOrder, OrderState, OrderEvent> = ...
val applicationService: DeciderApplicationService<OrderEvent> = ...
val streamIdResolver: StreamIdResolver<PlaceOrder> = AnnotationStreamIdResolver()

val dispatcher: CommandDispatcher<PlaceOrder> = CommandDispatchers.decider(applicationService, placeOrderDecider, streamIdResolver)

dispatcher.dispatch(PlaceOrder(orderId, productId, quantity))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

For a [`DcbDecider`](#coupling-a-decider-to-a-boundary), `org.occurrent.command.dcb.DcbCommandDispatchers.decider(dcbDeciderApplicationService, dcbDecider)` takes only those two arguments. A `DcbDecider` already carries its own `DcbCriteria` and `TagGenerator`, so there's no stream id to resolve. This factory lives in its own module, `occurrent-command-dispatch-dcb`, kept separate from `occurrent-command-dispatch` so that dispatching commands to plain, stream-keyed deciders doesn't drag in the DCB and CloudEvent stack.

{% include macros/command-dispatch/dcb/maven.md %}

{% capture java %}
DcbDecider<EnrollStudent, EnrollmentState, DomainEvent> enrollmentDecider = ...;
DcbDeciderApplicationService<DomainEvent> applicationService = ...;

CommandDispatcher<EnrollStudent> dispatcher = DcbCommandDispatchers.decider(applicationService, enrollmentDecider);

dispatcher.dispatch(new EnrollStudent(courseId, studentId));
{% endcapture %}
{% capture kotlin %}
val enrollmentDcbDecider: DcbDecider<EnrollStudent, EnrollmentState, DomainEvent> = ...
val applicationService: DcbDeciderApplicationService<DomainEvent> = ...

val dispatcher: CommandDispatcher<EnrollStudent> = DcbCommandDispatchers.decider(applicationService, enrollmentDcbDecider)

dispatcher.dispatch(EnrollStudent(courseId, studentId))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Deriving the Stream Id From Annotations

Put `@TargetStreamId` on the field, record component, or getter that already holds the command's target stream id, and `AnnotationStreamIdResolver` reads it with reflection, so you don't have to write a `StreamIdResolver` by hand.

{% capture java %}
public record EnrollStudent(@TargetStreamId String courseId, String studentId) {
}

StreamIdResolver<EnrollStudent> streamIdResolver = new AnnotationStreamIdResolver<>();
// streamIdResolver.streamId(command) returns command.courseId()
{% endcapture %}
{% capture kotlin %}
data class EnrollStudent(
    @get:TargetStreamId val courseId: String,
    val studentId: String
)

val streamIdResolver: StreamIdResolver<EnrollStudent> = AnnotationStreamIdResolver()
// streamIdResolver.streamId(command) returns command.courseId
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Only one field, record component, or getter per command class can carry `@TargetStreamId`. `AnnotationStreamIdResolver` also accepts a different annotation of your own, for a command that already carries one you'd rather reuse.

{% include macros/command-dispatch/annotation/maven.md %}

This is the single-stream match to [deriving DCB tags from annotations](#deriving-tags-from-annotations). `@DcbTag` marks the fields that become the tags for a DCB boundary spanning several streams. `@TargetStreamId` marks the one field that already is the id of a single stream.

The Spring Boot starter registers a default `StreamIdResolver` bean backed by `AnnotationStreamIdResolver`, scanning your commands for `@TargetStreamId`. Define your own `StreamIdResolver` bean when a command's stream id needs computing rather than reading off one field, and the starter uses that bean instead.

## Sagas

<div class="comment">As of version 0.31.0, Occurrent has its own <a href="#saga-dsl">Saga DSL</a> for writing event-driven process managers in code, with timers, correlation, and Spring wiring. Reach for it before the external libraries below.</div>

A "saga" can be used to represent and coordinate a long-lived business transaction/process (where "long-lived" is kind of arbitrary). This is an advanced subject
and you should try to avoid sagas if there are other means available to solve the problem (for example use [policies](#policy) if they are sufficient, or [DCB](#dynamic-consistency-boundary) when two rules must hold in one append). If the built-in DSL doesn't fit your needs, Occurrent is a library, so you can also hook in an existing solution, for example:   

* [Temporal](https://temporal.io/) - Open source microservices orchestration platform for running mission critical code at any scale.
* [zio-saga](https://github.com/VladKopanev/zio-saga) - If you're using [Scala](https://scala-lang.org/) and [zio](https://zio.dev/)  (there's also a [cats implementation](https://github.com/VladKopanev/cats-saga)).
* [Apache Camel Saga](https://camel.apache.org/components/latest/eips/saga-eip.html) - If you're using Java and don't mind bringing in [Apache Camel](https://camel.apache.org/) as a dependency.
* [nflow](https://github.com/NitorCreations/nflow) - Battle-proven solution for orchestrating business processes in Java.
* [saga-coordinator-java](https://github.com/fernandoBRS/saga-coordinator-java) - Saga Coordinator as a Finite State Machine (FSM) in Java.
* [Baker](https://github.com/ing-bank/baker) - Baker is a library that reduces the effort to orchestrate (micro)service-based process flows.
* Use the [routing-slip pattern](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RoutingTable.html) from the [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/) book.
* Represent sagas as todo lists. This is described in the [event modeling](https://eventmodeling.org/) documentation in the [automation section](https://eventmodeling.org/posts/what-is-event-modeling/#automation).  

The way to integrate Occurrent with any of these libraries/frameworks/patterns is to create a [subscription](#subscriptions) that forwards the events written to the event store to the 
preferred library/framework/[view](#views). 

## Policy

A policy (aka reaction/trigger) can be used to deal with workflows such as "whenever _this_ happens, do _that_". For example, whenever a game is won, send an email to the winner. For simple workflows
like this there's typically no need for a full-fledged [saga](#sagas). 

### Asynchronous Policy

In Occurrent, you can create asynchronous policies by creating a [subscription](#subscriptions). Let's consider the example above:

{% include macros/policy/email-policy.md %}     

You could also create a generic policy that simply forwards all events to another piece of infrastructure. For example, you may wish to forward all events to [rabbitmq](https://www.rabbitmq.com/) (by publishing them)
or [Spring's event infrastructure](https://www.baeldung.com/spring-events), and _then_ create policies that subscribes to events from these systems instead. There's an example in the
[github repository](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/forwarder/mongodb-subscription-to-spring-event) that shows an example of how one can achieve this.

You may also want to look into the "todo-list" pattern described in the [automation section](https://eventmodeling.org/posts/what-is-event-modeling/#automation) on the in the [event modeling](https://eventmodeling.org/) website.

### Synchronous Policy

In some cases, for example if you have a simple website and you want views to be updated when a command is dispatched by a REST API, it can be useful to update a policy in a synchronous fashion. The application service
provided by Occurrent allows for this through a synchronous `SideEffect` that runs as part of executing the command, please see the [application service documentation](#application-service-side-effects) for an example.    

## Snapshots
<div class="comment">Snapshots are an opt-in optimization. Reach for them only when folding a stream to its current state has genuinely become too slow.</div>

A snapshot caches the folded state of a stream at a known version, so a later command replays only the events written after it instead of the whole history. Occurrent ships first-class support for this, from a [Decider](#decider) (the decision state) and from a plain [View](#views), across stream and DCB and both the blocking and reactor stacks.

A snapshot is a discardable, schema-versioned cache, never a source of truth. If the stored schema version does not match the one you declare, or no snapshot exists, Occurrent falls back to a full replay. Enabling a snapshot costs one snapshot load and one tail read per command that snapshots, and nothing at all when you do not use it. The rationale is recorded in [ADR 61](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0061-first-class-snapshot-support.md).

A snapshot whose version is ahead of the stream's true head is now discarded rather than trusted, and folding restarts from the initial state. This happens when a stream is reset or truncated below the snapshot, for example [archiving a stream](#eventstore-operations) with `deleteEventStream` after a "closing the books" cutover. The version check is a safety net, not the primary defense, so pair a stream reset with `SnapshotStore.delete(key)` to drop the stale snapshot up front. The maintained `@Snapshot` path applies the same guard: a reset below the snapshot makes it rebuild and self-heal instead of freezing on stale state. DCB snapshots are immune to this, because a DCB snapshot is versioned by the global DCB position, which is monotonic and never resets.

### Snapshotting a decider

Build a `SnapshotDeciderApplicationService` once, around the application service you already have. For each aggregate, wrap the decider in a `SnapshotDecider`, created with `SnapshotDecider.from(...)`, which bundles it with a `SnapshotStore` and a `SnapshotOptions`. The store keeps one snapshot per stream. `SnapshotStore.inMemory()` is handy for tests, and `SpringMongoSnapshotStore` persists to MongoDB.

{% capture java %}
var snapshots = new SnapshotDeciderApplicationService<>(applicationService);
SnapshotStore<AccountState> store = SnapshotStore.inMemory();

// Reads the snapshot, folds only the events after it, decides, writes, and
// saves a new snapshot every 100 events. The first argument is the schema version.
var account = SnapshotDecider.from(accountDecider, store, SnapshotOptions.everyNEvents(1, 100));
WriteResult result = snapshots.execute(accountId, new Deposit(100), account);
{% endcapture %}
{% capture kotlin %}
val snapshots = SnapshotDeciderApplicationService(applicationService)
val store = SnapshotStore.inMemory<AccountState>()

// Reads the snapshot, folds only the events after it, decides, writes, and
// saves a new snapshot every 100 events. The first argument is the schema version.
val account = SnapshotDecider.from(accountDecider, store, SnapshotOptions.everyNEvents(1, 100))
snapshots.execute(accountId, Deposit(100), account)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The schema version guards you against stale state. Whenever you change the shape of the decider's state, bump the schema version. Snapshots written under the old version are then ignored and rebuilt from a full replay, so you never deserialize an old shape into a new type.

### Choosing when to snapshot

`SnapshotOptions.everyNEvents(schemaVersion, n)` is the common case. For anything else, pass a `SnapshotPolicy` to `SnapshotOptions.of(schemaVersion, policy)`. The built-in policies are `everyNEvents(n)`, `onEvent(SomeEvent.class)`, `whenState(predicate)`, `always()`, and `never()`, and you combine them with `or`. `SnapshotPolicies.whenTerminal(decider)` snapshots when the decider reports a terminal state, which is the "closing the books" trigger described below. Whichever policy you land on, it goes into the `SnapshotOptions` you pass to `SnapshotDecider.from(...)`.

{% capture java %}
// Snapshot every 100 events, and also whenever the decider reaches a terminal state.
SnapshotPolicy<AccountState, AccountEvent> policy =
        SnapshotPolicy.<AccountState, AccountEvent>everyNEvents(100)
                .or(SnapshotPolicies.whenTerminal(accountDecider));

var account = SnapshotDecider.from(accountDecider, store, SnapshotOptions.of(1, policy));
snapshots.execute(accountId, new CloseBooks(june), account);
{% endcapture %}
{% capture kotlin %}
// Snapshot every 100 events, and also whenever the decider reaches a terminal state.
val policy = SnapshotPolicy.everyNEvents<AccountState, AccountEvent>(100)
        .or(SnapshotPolicies.whenTerminal(accountDecider))

val account = SnapshotDecider.from(accountDecider, store, SnapshotOptions.of(1, policy))
snapshots.execute(accountId, CloseBooks(june), account)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Snapshot persistence is best-effort. The snapshot is saved after the write has completed, so a handler failure never undoes the write and a lost snapshot only means the next replay is a little longer. Because a snapshot is always reproducible from the events, this is a safe default. If you need the stored state to stay consistent with every write, maintain it on the write path with `@Snapshot(mode = SYNCHRONOUS)` (below) or a [synchronous subscription](#synchronous-subscriptions) instead.

### Snapshots without a decider

If you only need the folded state and no command handling, describe the fold with a `SnapshotView`, then build a `SnapshotViews` facade once over the event store and the converter. For each view, bundle it with its `SnapshotStore` in a `SnapshotViewSource`, created with `SnapshotViewSource.from(view, store)`, and pass that per call. Calling `readState(id, source)` loads the latest snapshot, folds the events written since, and returns the current state. It is a plain read that never writes. To persist a fresh snapshot for a deciders-free view on demand, call `snapshots.refresh(accountId, source)`, which folds to the current head and saves a snapshot. There is no automatic write on the read path.

{% capture java %}
SnapshotView<AccountState, AccountEvent> view = SnapshotView.<AccountState, AccountEvent>builder(AccountState.EMPTY)
        .schemaVersion(1)
        .on(MoneyDeposited.class, (state, e) -> state.add(e.amount()))
        .on(MoneyWithdrawn.class, (state, e) -> state.subtract(e.amount()))
        .build();

SnapshotViews<AccountEvent> snapshots = SnapshotViews.create(eventStore, cloudEventConverter);
var accountSource = SnapshotViewSource.from(view, store);
AccountState current = snapshots.readState(accountId, accountSource);
{% endcapture %}
{% capture kotlin %}
val view = snapshotView<AccountState, AccountEvent>(AccountState.EMPTY) {
    schemaVersion(1)
    on<MoneyDeposited> { state, e -> state.add(e.amount) }
    on<MoneyWithdrawn> { state, e -> state.subtract(e.amount) }
}

val snapshots = SnapshotViews.create(eventStore, cloudEventConverter)
val accountSource = SnapshotViewSource.from(view, store)
val current = snapshots.readState(accountId, accountSource)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Snapshots with Spring Boot

You can declare a maintained snapshot with `@Snapshot` on both the blocking and reactor stacks. A factory method returning a `SnapshotView` is registered as a managed subscription that keeps one snapshot per stream up to date, exactly like `@Projection`, including catch-up from history and durable resume. A factory returning a `DcbSnapshotView` instead maintains one snapshot per DCB boundary. Resolve the store with `store = SomeStore.class` or `storeName`, or leave both unset for a zero-config MongoDB store (`SpringMongoSnapshotStore` on the blocking stack, `ReactiveSpringMongoSnapshotStore` on the reactor stack). `everyNEvents` throttles how often the maintained snapshot is written, and `mode` selects `ASYNC` (catch-up then live) or `SYNCHRONOUS` (updated on the write path for read-your-writes).

{% capture java %}
@Snapshot(id = "account-state", everyNEvents = 100)
public SnapshotView<AccountState, AccountEvent> accountSnapshot() {
    return SnapshotView.<AccountState, AccountEvent>builder(AccountState.EMPTY)
            .schemaVersion(1)
            .on(MoneyDeposited.class, (state, e) -> state.add(e.amount()))
            .on(MoneyWithdrawn.class, (state, e) -> state.subtract(e.amount()))
            .build();
}
{% endcapture %}
{% capture kotlin %}
@Snapshot(id = "account-state", everyNEvents = 100)
fun accountSnapshot(): SnapshotView<AccountState, AccountEvent> = snapshotView(AccountState.EMPTY) {
    schemaVersion(1)
    on<MoneyDeposited> { state, e -> state.add(e.amount) }
    on<MoneyWithdrawn> { state, e -> state.subtract(e.amount) }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

<div class="comment">The declarative <code>@Snapshot</code> annotation works on both the blocking and reactor stacks, for stream and DCB. The DSL executors below are the programmatic path when you would rather not use the annotation.</div>

### DCB snapshots

For the [Dynamic Consistency Boundary](#dynamic-consistency-boundary), build a `SnapshotDcbDeciderApplicationService` once around the DCB application service. Wrap each `DcbDecider` in a `SnapshotDcbDecider`, created with `SnapshotDcbDecider.from(...)`, which bundles it with a `SnapshotStore` and a `SnapshotOptions`. The snapshot is keyed by a canonical form of the command's `DcbCriteria`, overridable with your own key function through the `SnapshotDcbDecider.from(dcbDecider, store, options, keyFunction)` overload, and versioned by the global DCB position, so a resumed execute reads only the events after the snapshot while still guarding the append against any later matching event. Because the key comes from the criteria, changing the boundary later (say a business rule that widens or narrows it) produces a new key, so the old snapshot is left behind and the state rebuilds from the events on its own. If you supply your own key function, keep the criteria's identifying detail in it, so a boundary change still rebuilds cleanly.

{% capture java %}
var snapshots = new SnapshotDcbDeciderApplicationService<>(dcbApplicationService);
SnapshotStore<AccountState> store = SnapshotStore.inMemory();

var account = SnapshotDcbDecider.from(accountDcbDecider, store, SnapshotOptions.everyNEvents(1, 100));
Optional<DcbAppendResult> result = snapshots.execute(new Deposit(100), account);
{% endcapture %}
{% capture kotlin %}
val snapshots = SnapshotDcbDeciderApplicationService(dcbApplicationService)
val store = SnapshotStore.inMemory<AccountState>()

val account = SnapshotDcbDecider.from(accountDcbDecider, store, SnapshotOptions.everyNEvents(1, 100))
snapshots.execute(Deposit(100), account)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Closing the Books

"Closing the books" is a domain concept in areas such as accounting, where a period is closed and its closing balance becomes the opening balance of the next period. It is the domain-driven counterpart to a technical every-N snapshot, and Occurrent models it with the tools you have already seen rather than a separate mechanism.

Give the decider a terminal state for the closed period. Its `isTerminal` returns true once the books are closed, and from then on the decider refuses any further command. That terminal state is the snapshot trigger, so pair it with `SnapshotPolicies.whenTerminal(decider)`.

The period is the stream, not the account. A closed period is a stream that has reached its end, so you never keep appending to a stream you have already marked terminal. You close `account-42:2026-Q1` and open `account-42:2026-Q2` as a fresh stream. Carry the balance across by modelling it as a real domain event, so the closing state lives in the event log and the snapshot stays a discardable optimization.

{% capture java %}
SnapshotOptions<AccountState, AccountEvent> onClose =
        SnapshotOptions.of(1, SnapshotPolicies.whenTerminal(accountDecider));
var accounts = new SnapshotDeciderApplicationService<>(applicationService, store, onClose);

// Q1 is its own stream. Closing it makes the decider terminal, which triggers the snapshot.
accounts.execute("account-42:2026-Q1", new Deposit(100), accountDecider);
accounts.execute("account-42:2026-Q1", new Withdraw(30), accountDecider);
accounts.execute("account-42:2026-Q1", new CloseBooks("2026-Q1"), accountDecider);
long closingBalance = store.findLatest("account-42:2026-Q1").orElseThrow().state().balance(); // 70

// Q2 is a new stream. The opening balance is a real event, so it survives archiving Q1.
accounts.execute("account-42:2026-Q2", new SetOpeningBalance(closingBalance), accountDecider);
var account = SnapshotDecider.from(accountDecider, store, onClose);
var accounts = new SnapshotDeciderApplicationService<>(applicationService);

// Q1 is its own stream. Closing it makes the decider terminal, which triggers the snapshot.
accounts.execute("account-42:2026-Q1", new Deposit(100), account);
accounts.execute("account-42:2026-Q1", new Withdraw(30), account);
accounts.execute("account-42:2026-Q1", new CloseBooks("2026-Q1"), account);
long closingBalance = store.findLatest("account-42:2026-Q1").orElseThrow().state().balance(); // 70

// Q2 is a new stream. The opening balance is a real event, so it survives archiving Q1.
accounts.execute("account-42:2026-Q2", new SetOpeningBalance(closingBalance), account);
eventStore.deleteEventStream("account-42:2026-Q1");
{% endcapture %}
{% capture kotlin %}
val onClose = SnapshotOptions.of(1, SnapshotPolicies.whenTerminal(accountDecider))
val accounts = SnapshotDeciderApplicationService(applicationService, store, onClose)

// Q1 is its own stream. Closing it makes the decider terminal, which triggers the snapshot.
accounts.execute("account-42:2026-Q1", Deposit(100), accountDecider)
accounts.execute("account-42:2026-Q1", Withdraw(30), accountDecider)
accounts.execute("account-42:2026-Q1", CloseBooks("2026-Q1"), accountDecider)
val closingBalance = store.findLatest("account-42:2026-Q1").orElseThrow().state().balance // 70

// Q2 is a new stream. The opening balance is a real event, so it survives archiving Q1.
accounts.execute("account-42:2026-Q2", SetOpeningBalance(closingBalance), accountDecider)
val account = SnapshotDecider.from(accountDecider, store, onClose)
val accounts = SnapshotDeciderApplicationService(applicationService)

// Q1 is its own stream. Closing it makes the decider terminal, which triggers the snapshot.
accounts.execute("account-42:2026-Q1", Deposit(100), account)
accounts.execute("account-42:2026-Q1", Withdraw(30), account)
accounts.execute("account-42:2026-Q1", CloseBooks("2026-Q1"), account)
val closingBalance = store.findLatest("account-42:2026-Q1").orElseThrow().state().balance // 70

// Q2 is a new stream. The opening balance is a real event, so it survives archiving Q1.
accounts.execute("account-42:2026-Q2", SetOpeningBalance(closingBalance), account)
eventStore.deleteEventStream("account-42:2026-Q1")
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Once a closed period's events are genuinely no longer needed, archive them with the event store's [delete operations](#eventstore-operations). If the archived stream had a snapshot, delete it in the same call with `SnapshotStore.delete(key)`. Occurrent's version guard catches a snapshot left ahead of a truncated stream, but do not rely on it as the primary defense. The runnable [`closing-the-books`](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/snapshot/closing-the-books) example runs this end to end.

## Deadlines

Deadlines (aka scheduling, alarm clock) is a very handy technique to schedule to something to be executed in the future. 
Imagine, for example, a multiplayer game (like word guessing game shown in previous examples), where we want to game to end automatically after 
10 hours of inactivity. This means that as soon as a player has made a guess, we'd like to schedule a "timeout game command" to be executed after 10 hours.

The way it works in Occurrent is that you schedule a Deadline (`org.occurrent.deadline.api.blocking.Deadline`) using a DeadlineScheduler (`org.occurrent.deadline.api.blocking.DeadlineScheduler`) implementation.
The Deadline is a date/time in the future when the deadline is up. To handle the deadline, you also register a DeadlineConsumer (`org.occurrent.deadline.api.blocking.DeadlineConsumer`) to a 
DeadlineConsumerRegistry (`org.occurrent.deadline.api.blocking.DeadlineConsumerRegistry`) implementation, and it'll be invoked when a deadline is up. For example: 

```java
// In some method we schedule a deadline two hours from now with data "hello world" 
var deadlineId = UUID.randomUUID(); 
var deadlineCategory = "hello-world"; 
var deadline = Deadline.afterHours(2);
deadlineScheduler.schedule(deadlineId, deadlineCategory, deadline, "hello world");

// In some other method, during application startup, we register a deadline consumer to the registry for the "hello-world" deadline category
deadlineConsumerRegistry.register("hello-world", (deadlineId, deadlineCategory, deadline, data) -> System.out.println(data));
```

In the example above, the deadline consumer will print "hello world" after 2 hours.

There are two implementations of `DeadlineScheduler` and `DeadlineConsumerRegistry`, [JobRunr](#jobrunr-deadline-scheduler) and [InMemory](#in-memory-deadline-scheduler). 

### JobRunr Deadline Scheduler 

This is a persistent (meaning that your application can be restarted and deadlines are still around) DeadlineScheduler based on [JobRunr](https://www.jobrunr.io/). To get started, depend on:  

{% include macros/deadline/jobrunr-maven.md %}

You then need to create an instance of `org.jobrunr.scheduling.JobRequestScheduler` (see [JobRunr documentation](https://www.jobrunr.io/en/documentation/configuration/fluent/) for different ways of doing this). 
Once you have a `JobRequestScheduler` you need to create an instance of `org.occurrent.deadline.jobrunr.JobRunrDeadlineScheduler`:

```java
JobRequestScheduler jobRequestScheduler = ..
DeadlineScheduler deadlineScheduler = new JobRunrDeadlineScheduler(jobRequestScheduler); 
```

You also need to create an instance of `org.occurrent.deadline.jobrunr.JobRunrDeadlineConsumerRegistry`: 

```java
DeadlineConsumerRegistry deadlineConsumerRegistry = new JobRunrDeadlineConsumerRegistry();  
```
                                                                                          
You register so-called "deadline consumers" to the DeadlineConsumerRegistry for a certain "category" (see example [above](#deadlines)). A deadline consumer will be invoked once a deadline is up. 
Note that you can only have one deadline consumer instance per category. You want to register your deadline consumer everytime your application starts up. If you're using Spring, you can, for example, do this 
using a `@PostConstructor` method:

```java
@PostConstruct
void registerDeadlineConsumersOnApplicationStart() {
    deadlineConsumerRegistry.register("CancelPayment", (id, category, deadline, data) -> {
        CancelPayment cancelPayment = (CancelPayment) data; 
        paymentApi.cancel(cancelPayment.getPaymentId());    
    }):
}
```

The example above will register a deadline consumer for the "CancelPayment" category and call an imaginary api (`paymentApi`) to cancel the payment. The deadline consumer will be called by Occurrent when the scheduled deadline is up. Here's an example of you can schedule this deadline using
the `JobRunrDeadlineConsumerRegistry`, but first lets see what `CancelPayment` looks like:

```java
public class CancelPayment {
    private String paymentId;

    CancelPayment() {
    }

    public CancelPayment(String paymentId) {
        this.paymentId = paymentId;
    }
    
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getPaymentId() {
        return paymentId;
    }
}
```

As you can see it's a regular Java POJO. This is very important since JobRunr needs to serialize/de-serialize this class to the database. Typically, this is done using Jackson (so it's fine to use Jackson annotations etc), but JobRunr has support for other mappers as well.
 
Now lets see how we can schedule a "CancelPayment":

```java
String paymentId = ...
deadlineScheduler.schedule(UUID.randomUUID(), "CancelPayment", Deadline.afterWeeks(2), new CancelPayment(paymentId));
```
          
This will schedule a deadline after 2 weeks, that'll be picked-up by the deadline consumer registered in the `registerDeadlineConsumersOnApplicationStart` method. Note that in this case, the class (`CancelPayment`) has the same name as the category, but this is not required.  
                                      
Here's an example of you can setup Occurrent Deadline Scheduling in Spring Boot:

```java
@Configuration
public class DeadlineSpringConfig {

    @Bean
    JobRunrConfigurationResult initJobRunr(ApplicationContext applicationContext, MongoClient mongoClient,
                                           @Value("${spring.data.mongodb.uri}") String mongoUri) {
        var connectionString = new ConnectionString(mongoUri);
        var database = connectionString.getDatabase();

        return JobRunr.configure()
                .useJobActivator(applicationContext::getBean)
                .useStorageProvider(new MongoDBStorageProvider(mongoClient, database, "jobrunr-"))
                .useBackgroundJobServer()
                .useDashboard(
                        JobRunrDashboardWebServerConfiguration
                                .usingStandardDashboardConfiguration()
                                .andPort(8082)
                                .andAllowAnonymousDataUsage(false)
                )
                .initialize();
    }

    @PostConstruct
    void destroyJobRunnerOnShutdown() {
        JobRunr.destroy();
    }

    @Bean
    DeadlineScheduler deadlineScheduler(JobRunrConfigurationResult jobRunrConfigurationResult) {
        return new JobRunrDeadlineScheduler(jobRunrConfigurationResult.getJobRequestScheduler());
    }

    @Bean
    DeadlineConsumerRegistry deadlineConsumerRegistry() {
        return new JobRunrDeadlineConsumerRegistry();
    }
}
```

Have a look at [JobRunr](https://www.jobrunr.io/) for more configuration options.

### In-Memory Deadline Scheduler

This is an in-memory, non-persistent (meaning that scheduled deadlines will be lost on application restart), DeadlineScheduler. To get started, depend on:  

{% include macros/deadline/inmemory-maven.md %}

Next, you need to create in instance of `org.occurrent.deadline.inmemory.InMemoryDeadlineScheduler` and `org.occurrent.deadline.inmemory.InMemoryDeadlineConsumerRegistry`. In order for these two components to communicate with each other, 
you also need to provide an instance of a `e java.util.concurrent.BlockingDeque` to the constructor. Here's an example:

```java
BlockingDeque<Object> queue = new LinkedBlockingDeque<>();
DeadlineConsumerRegistry deadlineConsumerRegistry = new InMemoryDeadlineConsumerRegistry(queue);
DeadlineConsumerRegistry deadlineScheduler = new InMemoryDeadlineScheduler(queue);
```

You can configure things, such as poll interval and retry strategy, for `InMemoryDeadlineConsumerRegistry` by supplying an instance of `org.occurrent.deadline.inmemory.InMemoryDeadlineConsumerRegistry$Config` as the second constructor argument:

```java
new InMemoryDeadlineConsumerRegistry(queue, new Config().pollIntervalMillis(300).retryStrategy(RetryStrategy.fixed(Duration.of(2, SECONDS))));
```

Note that it's very important to call `shutdown` on both `InMemoryDeadlineConsumerRegistry` and `InMemoryDeadlineScheduler` on application/test end.

For usage examples, see [Deadlines](#deadlines) and [JobRunr Scheduler](#jobrunr-deadline-scheduler).

### Other Ways of Expressing Deadlines

If you don't want to use any of the Occurrent libraries for deadline scheduling, or if you're looking for more features that are not (yet) available, you can use other libraries from the Java ecosystem, such as:

* [JobRunr](https://www.jobrunr.io/) - An easy way to perform background processing in Java. Distributed and backed by persistent storage.
* [Quartz](http://www.quartz-scheduler.org/) - Can be used to create simple or complex schedules for executing tens, hundreds, or even tens-of-thousands of jobs.
* [db-scheduler](https://github.com/kagkarlsson/db-scheduler) - Task-scheduler for Java that was inspired by the need for a clustered `java.util.concurrent.ScheduledExecutorService` simpler than Quartz.
* [Spring Scheduling](https://spring.io/guides/gs/scheduling-tasks/) - Worth looking into if you're already using Spring.
  

# Standalone Spring Library Modules

The [Spring Boot Starter](#spring-boot-starter) auto-wires a saga state store, a snapshot store, and a Spring transaction executor for you. If you're on Spring but not on the Occurrent starter (for example, you wire beans by hand or only need one of these pieces), each is also published as a standalone library artifact with no starter dependency:

* A Spring Data MongoDB `SagaStateStore` implementation, used by [Sagas](#sagas):

{% include macros/saga/mongodb-spring/maven.md %}

* A Spring Data MongoDB blocking `SnapshotStore` implementation, used by [Snapshots](#snapshots):

{% include macros/snapshot/mongodb-spring-blocking/maven.md %}

* A Spring Data MongoDB reactive `SnapshotStore` implementation, the reactive counterpart of the one above:

{% include macros/snapshot/mongodb-spring-reactor/maven.md %}

* A generic Spring `TransactionExecutor` (depends only on `spring-tx`, not MongoDB-specific), used for [transactional side-effects](#application-service-transactional-side-effects):

{% include macros/application-service/transaction-spring/maven.md %}

* A generic reactive Spring `ReactiveTransactionExecutor`, the reactive counterpart of the one above:

{% include macros/application-service/transaction-spring-reactor/maven.md %}

Construct each one directly and pass it wherever the corresponding interface is expected. The starter still gives you these beans for free if you're using it, this is only for manual wiring.

# Getting started

<div class="notification">Occurrent {{site.occurrentversion}} requires <b>Java 21</b> or later (earlier versions required Java 17).</div>

<div class="comment">If you're using Spring Boot, consider a Spring Boot starter, which auto-configures most of the steps below for you. There's a <a href="#spring-boot-starter">blocking starter</a> and a <a href="#reactive-spring-boot-starter">reactive starter</a>. You can then return to this section for the underlying concepts.</div>

Getting started with Occurrent involves these steps:
<div class="comment">It's recommended to read up on <a href="#cloudevents">CloudEvent's</a> and its <a href="{{cloudevents_spec}}">specification</a> so that you're familiar with the structure and schema of a CloudEvent.</div>

1. Choose an underlying datastore for an [event store](#choosing-an-eventstore). Luckily there are only two choices at the moment, MongoDB and an in-memory implementation. Hopefully this will be a more difficult decision in the future :)
1. Once a datastore has been decided, it's time to [choose an EventStore implementation](#choosing-an-eventstore) for this datastore since there may be more than one.
1. If you need [subscriptions](#using-subscriptions) (i.e. the ability to subscribe to changes from an EventStore) then you need to pick a library that implements this for the datastore that you've chosen. 
   Again, there may be several implementations to choose from.
1. If a subscriber needs to be able to continue from where it left off on application restart, it's worth looking into a so called [checkpoint storage](#blocking-subscription-checkpoint-storage) library. 
   These libraries provide means to automatically (or selectively) store the checkpoint for a subscriber to a datastore. Note that the datastore that stores this checkpoint
   can be a different datastore than the one used as EventStore. For example, you can use MongoDB as EventStore but store checkpoints in Redis.
1. You're now good to go, but you may also want to look into more higher-level components if you don't have the need to role your own. We recommend looking into:
    * [Application Service](#application-service)
    * [Subscription DSL](#subscription-dsl)
    * [Query DSL](#query-dsl)
    * [Retry Component](#retry)
    * [Decider's](#decider)

# Choosing An EventStore

There are currently two different datastores to choose from, [MongoDB](#mongodb) and [In-Memory](#in-memory-eventstore). 

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

A json schema describing a complete Occurrent CloudEvent, as it will be persisted to a MongoDB collection, can be found [here](https://github.com/johanhaleby/occurrent/blob/occurrent-{{site.occurrentversion}}/cloudevents-schema-occurrent.json) 
(a "raw" cloud event json schema can be found [here](https://github.com/tsurdilo/cloudevents-schema-vscode/blob/master/schemas/cloudevents-schema.json) for comparison).

Note that MongoDB will automatically add an [\_id](https://docs.mongodb.com/manual/reference/method/ObjectId/) field (which is not used by Occurrent). 
The reason why the CloudEvent `id` attribute is not stored as `_id` in MongoDB is that the `id` of a CloudEvent is not globally unique! 
The combination of `id` and `source` is a globally unique CloudEvent. Note also that `_id` will _not_ be included when the `CloudEvent` is read from an `EventStore`.    

Here's an example of what you can expect to see in the "events" collection when storing events in an `EventStore` backed by MongoDB
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
	"streamversion" : NumberLong(1)
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
	"streamversion" : NumberLong(2)
}
``` 

### MongoDB Time Representation

The CloudEvents specification says that the [time attribute]({{cloudevents_spec}}#time), if present, must adhere to the [RFC 3339 specification](https://tools.ietf.org/html/rfc3339).
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
eventStore.write(List.of(cloudEvent));
```

Instead, you need to remove nano seconds do like this explicitly:

```java
// Remove millis and make sure to use UTC as timezone                                          
var now = OffsetDateTime.now().truncatedTo(ChronoUnit.MILLIS).withOffsetSameInstant(ZoneOffset.UTC);
var cloudEvent = new CloudEventBuilder().time(now). .. .build();

// Now you can write the cloud event
```

For more thoughts on this, refer to the [architecture decision record](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0004-mongodb-datetime-representation.md) on time representation in MongoDB. 

### MongoDB Indexes

Each MongoDB `EventStore` [implementation](#mongodb-eventstore-implementations) creates a few indexes for the "events collection" the first time they're instantiated. These are:

|  Name | Properties | Description |
|:----|:------|:-----|
| `id` + `source` | ascending `id`,<br>descending&nbsp;`source`,&nbsp;&nbsp;<br>unique<br><br> | Compound index of `id` and `source` to comply with the [specification]({{cloudevents_spec}}) that the `id`+`source` combination must be unique. |     
| `streamid` + `streamversion`&nbsp;&nbsp;| ascending `streamid`,<br>descending `streamversion`,<br>unique | Compound index of `streamid` and `streamversion` (Occurrent CloudEvent extension) used for fast retrieval of the latest cloud event in a stream. |

<div class="comment">Prior to version 0.7.3, a <code>streamid</code> index was also automatically created, but it was removed in 0.7.3 since this index is covered by the <code>streamid+streamversion</code> index.</div>

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


This implementation also supports filtered stream reads via `org.occurrent.eventstore.api.blocking.ReadEventStreamWithFilter`. See [Stream Filtering](#eventstore-stream-filtering) for when and how to use it.

Now you can start reading and writing events to the EventStore:

{% include macros/eventstore/mongodb/native/read-and-write-events.md %}

#### Examples

| Name  | Description  | 
|:----|:-----|  
| [Number&nbsp;Guessing&nbsp;Game](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/number-guessing-game/mongodb/native) | A simple game implemented using a pure domain model and stores events in MongoDB using `MongoEventStore`. It also generates integration events and publishes these to RabbitMQ. |
| [Uno](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/uno/mongodb/native) | A port of [FsUno](https://github.com/thinkbeforecoding/FsUno), a classic card game. Stores events in MongoDB using `MongoEventStore`.

### EventStore with Spring MongoTemplate (Blocking)  

#### What is it?
An implementation that uses Spring's [MongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/MongoTemplate.html)
to read and write events to/from MongoDB.     

#### When to use?
If you're already using Spring and you don't need reactive support then this is a good choice. You can make use of the `@Transactional` annotation to write events and views in the same transaction (but make sure you understand what you're going before attempting this).

#### Dependencies

{% include macros/eventstore/mongodb/spring/blocking/maven.md %}

#### Getting Started

Once you've imported the dependencies you create a new instance of `org.occurrent.eventstore.mongodb.spring.reactor.ReactorMongoEventStore`.
It takes two arguments, a [ReactiveMongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/ReactiveMongoTemplate.html) and 
an `org.occurrent.eventstore.mongodb.spring.reactor.EventStoreConfig`.

For example:  

{% include macros/eventstore/mongodb/spring/blocking/example-configuration.md %}

This implementation also supports filtered stream reads via `org.occurrent.eventstore.api.blocking.ReadEventStreamWithFilter`. See [Stream Filtering](#eventstore-stream-filtering) for when and how to use it.

Now you can start reading and writing events to the EventStore:

{% include macros/eventstore/mongodb/spring/blocking/read-and-write-events.md %}

#### Examples

| Name  | Description  | 
|:----|:-----|  
| [Number&nbsp;Guessing&nbsp;Game](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/number-guessing-game/mongodb/spring/blocking) | A simple game implemented using a pure domain model and stores events in MongoDB using `SpringMongoEventStore` and Spring Boot. It also generates integration events and publishes these to RabbitMQ. |
| [Word&nbsp;Guessing&nbsp;Game](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/word-guessing-game/mongodb/spring/blocking) | Similar to the "Number Guessing Game" but more advanced, leveraging several Occurrent features such as CQRS, queries, and transactional projections. Implemented using a pure domain model and stores events in MongoDB using `SpringMongoEventStore` and Spring Boot.
| [Uno](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/uno/mongodb/spring/blocking) | A port of [FsUno](https://github.com/thinkbeforecoding/FsUno), a classic card game. Implemented using a pure domain model and stores events in MongoDB using `SpringMongoEventStore` and Spring Boot.
| [Subscription&nbsp;View](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/spring-subscription-based-mongodb-projections/src/main/java/org/occurrent/example/eventstore/mongodb/spring/subscriptionprojections) | An example showing how to create a subscription that listens to certain events stored in the EventStore and updates a view/projection from these events. |
| [Transactional&nbsp;View](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/spring-transactional-projection-mongodb/src/main/java/org/occurrent/example/eventstore/mongodb/spring/transactional) | An example showing how to combine writing events to the `SpringMongoEventStore` and update a view transactionally using the `@Transactional` annotation. | 
| [Custom&nbsp;Aggregation&nbsp;View](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/spring-adhoc-eventstore-mongodb-queries/src/main/java/org/occurrent/example/eventstore/mongodb/spring/projections/adhoc) | Example demonstrating that you can query the `SpringMongoEventStore` using custom MongoDB aggregations. |

### EventStore with Spring ReactiveMongoTemplate (Reactive)
  
#### What is it?
An implementation that uses Spring's [ReactiveMongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/ReactiveMongoTemplate.html)
to read and write events to/from MongoDB.     

#### When to use?
If you're already using Spring and want to use the reactive driver ([project reactor](https://projectreactor.io/)) then this is a good choice. It uses the `ReactiveMongoTemplate` to write events to MongoDB. You can make use of the `@Transactional` annotation to write events and views in the same tx (but make sure that you understand what you're going before attempting this).

#### Dependencies

{% include macros/eventstore/mongodb/spring/reactor/maven.md %}

#### Getting Started

Once you've imported the dependencies you create a new instance of `org.occurrent.eventstore.mongodb.spring.reactor.ReactorMongoEventStore`.
It takes two arguments, a [ReactiveMongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/ReactiveMongoTemplate.html) and 
an `org.occurrent.eventstore.mongodb.spring.reactor.EventStoreConfig`.

For example:  

{% include macros/eventstore/mongodb/spring/reactor/example-configuration.md %}

This implementation also supports filtered stream reads via `org.occurrent.eventstore.api.reactor.ReadEventStreamWithFilter`. See [Stream Filtering](#eventstore-stream-filtering) for when and how to use it.

Now you can start reading and writing events to the EventStore:

{% include macros/eventstore/mongodb/spring/reactor/read-and-write-events.md %}

#### Examples

| Name  | Description  | 
|:----|:-----|  
| [Custom&nbsp;Aggregation&nbsp;View](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/spring-adhoc-eventstore-mongodb-queries/src/main/java/org/occurrent/example/eventstore/mongodb/spring/projections/adhoc) | Example demonstrating that you can query the `SpringMongoEventStore` using custom MongoDB aggregations. |

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

This implementation also supports filtered stream reads via `org.occurrent.eventstore.api.blocking.ReadEventStreamWithFilter`. See [Stream Filtering](#eventstore-stream-filtering) for when and how to use it.

Now you can start reading and writing events to the EventStore:

{% include macros/eventstore/in-memory/read-and-write-events.md %}

# Testing Your Own EventStore

Occurrent's own MongoDB and in-memory `EventStore` implementations are all checked against a shared conformance suite, and if you write your own you can hold it to the same contract. `occurrent-tck-eventstore-blocking` contains the suite for a blocking store:

{% include macros/tck/eventstore/blocking/maven.md %}

Depend on it in test scope. The suite classes themselves live in the artifact's `src/main`, not `src/test`, because that's the only way their JUnit 5 base classes end up on a consumer's compile path at all, so they appear as ordinary compile-scope classes even though you'll only ever extend them from a test.

You extend one of the concrete suites, once per capability your store supports, and hand it an `EventStoreFixture` that builds a store holding no events:

```java
class MyEventStoreTest extends StreamEventStoreConformance {

    @Override
    protected EventStoreFixture createFixture() {
        return new MyEventStoreFixture();
    }
}
```

## Capabilities

An `EventStore` can be built to support two independent things, described by `EventStoreCapability`: `STREAM` (stream-based reads, writes, queries, and operations) and `DCB` ([Dynamic Consistency Boundary](#dynamic-consistency-boundary) reads and appends). A store can enable one or both, and the fixture declares which by overriding `capabilities()`. That declaration is what a suite checks before it runs a single test, in a shared `@BeforeEach` on `EventStoreConformance`, the base every concrete suite extends. Extend a suite whose required capability you haven't declared, and it fails immediately with the missing capability named, rather than failing confusingly deep inside a test.

Each concrete suite requires one capability, or both:

| Suite | Requires |
|:----|:-----|
| `StreamEventStoreConformance`, `EventStoreQueriesConformance`, `EventStoreOperationsConformance`, `EventStoreTimePrecisionConformance`, `StreamPositionConformance`, `StreamPositionDisabledConformance` | `STREAM` |
| `DcbEventStoreConformance`, `DcbConcurrencyConformance` | `DCB` |
| `CapabilityGuardConformance`, `DcbStreamInteropConformance` | `STREAM` and `DCB` |

Every accessor on `EventStoreFixture` you don't override throws `UnsupportedOperationException` the moment a suite reaches for it, so a fixture that declares `DCB` but forgets to override `dcbEventStore()` (or `appendConditionModel()`, which has no default answer at all) fails right away, naming the capability and the method it's missing, instead of failing deep inside an unrelated test.

## Refusing what you weren't built for

If your store only supports one capability, calling into the other has to fail loudly. Refuse with `UnsupportedOperationException` (a subclass is fine too, choosing a more specific type isn't a contract violation) whose message names the capability, the way Occurrent's own MongoDB stores word it: "DCB capability is not enabled for this MongoEventStore." Never answer with an empty result or a silent no-op. An empty DCB read from a stream-only store looks identical to a correct query for events nobody wrote, and `CapabilityGuardConformance` exists specifically to catch that shortcut.

That suite needs a store built with only `STREAM` and one built with only `DCB` to check each refusal against, so it only runs once you declare both capabilities. Those two limited stores come from `storeWithoutStream()` and `storeWithoutDcb()` on the fixture, returning `Optional<StoreWithoutStream>` and `Optional<StoreWithoutDcb>`, records that bundle exactly the views a capability-limited store still exposes. Leave either `Optional.empty()` and the corresponding half of the suite has nothing to check.

## Positions are monotonic, with permanent gaps

A global sequence position, whether it's what `PositionOrderedReader` hands back or the token a DCB append returns, is positive, unique, and strictly increasing, but never asserted to be contiguous. `StreamPositionConformance` and `DcbEventStoreConformance` both derive every bound they read from a position they got back from an earlier write, never from a literal like `1` or `2`. That's deliberate. A store is allowed to reserve a block of positions before it knows whether the write will succeed, and a rejected write can leave that block permanently unclaimed (see the [architecture decision record](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0084-what-a-position-guarantees.md) on what a position guarantees). Write your own assertions the same way if you extend these suites yourself, compare positions to each other, never to what you expect the next one to literally be.

A store that hands out no global position at all is a legitimate design too. Declare it by returning a value from `storeWithoutPosition()`, and extend `StreamPositionDisabledConformance` in place of `StreamPositionConformance`. It asserts the opposite contract, that `currentPosition()` and `readInPositionOrder()` both refuse by name, and that a written event carries no position extension at all. Extending this suite while leaving `storeWithoutPosition()` empty is treated as a test failure, not a skip, since the suite exists to prove a position-disabled store still behaves correctly rather than to be quietly opted out of.

## DCB

`DcbEventStoreConformance` covers reading by criteria (event types, tags, exclusions, and combinations of them), read-range options, `exists`/`count`, append results, and append-condition semantics, but stays silent on how your store actually enforces a condition under contention. `DcbConcurrencyConformance` covers that instead, by driving real concurrent writers into a barrier-synchronized collision (`ConcurrentRendezvous`, from `occurrent-tck-common`) against overlapping and disjoint consistency boundaries, and asserting exactly one winner where boundaries overlap and no false conflicts where they don't. A loser must surface `DcbAppendConditionNotFulfilledException`, not a raw duplicate-key or write-conflict error leaking up from the underlying storage.

The fixture also declares `appendConditionModel()`, one of two ways a store can evaluate a token-qualified append condition: `EXACT_CRITERIA`, comparing the condition against the exact query criteria (the in-memory store's approach), or `TAG_MARKER`, comparing by tag (the approach all three MongoDB stores take, see [ADR 21](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0021-dcb-write-path-query-scoped-concurrency.md)). A few edge-case assertions in `DcbEventStoreConformance` branch on this, so declare whichever your store actually implements.

If your store supports both `STREAM` and `DCB` against the same underlying storage, add `DcbStreamInteropConformance`. It checks that the two views stay logically separate over one physical store. A DCB read never sees a stream-written event, a stream write refuses an event carrying DCB tags, and both still share a single global position sequence.

## Time precision

`EventStoreTimePrecisionConformance` exists because the fixed-instant events every other suite writes carry no sub-second digits, so a store that silently truncates nanoseconds would otherwise pass unnoticed. Declare `timePrecision()` (`ChronoUnit.NANOS` by default) and `preservesTimeOffset()` (`true` by default) on the fixture, and the suite checks accordingly, expecting `IllegalArgumentException` from a write it knows your declared precision or offset handling can't satisfy, rather than a silent truncation.

## The reactive bridge

Occurrent's reactive event stores, and any you write yourself, are checked against the same blocking suites through a bridge, rather than a second copy of them described a second time in terms of `Mono` and `Flux`, the same approach used for [reactive subscription models](#reactive-subscription-checkpoint-storage). `BlockingEventStoreOverReactive`, in `occurrent-tck-eventstore-reactor`, wraps a reactive store as a blocking one, provided that store implements all six reactive interfaces its accessors need: `EventStore`, `EventStoreQueries`, `EventStoreOperations`, `ReadEventStreamWithFilter`, `PositionOrderedReader`, and `DcbEventStore`. It materializes reads eagerly, so a suite that reads, writes, then reads again always sees the snapshot it started with rather than one a concurrent write changed underneath it.

```java
class MyReactiveEventStoreFixture implements EventStoreFixture {

    private final EventStore bridge = BlockingEventStoreOverReactive.of(new MyReactiveEventStore());

    @Override
    public Set<EventStoreCapability> capabilities() {
        return Set.of(EventStoreCapability.STREAM);
    }

    @Override
    public EventStore eventStore() {
        return bridge;
    }

    // queries(), operations(), filteredReader() and positionOrderedReader() all return the same bridge
}
```

`BlockingEventStoreOverReactive.of(store)` takes one object implementing all six interfaces at once. Reach for the overload taking six separate arguments instead when your capabilities live on different objects.

This bridge is test-only. Every wait blocks the calling thread, exactly what a reactive store exists to avoid, so it has no place outside a test. And a bridge that blocks on a result can't see what happens before that block, so `ReactiveEventStoreConformance` covers what's left. It asserts that a write, a delete, or an update only does anything once its publisher is actually subscribed to, that a write-condition violation or a duplicate event fails through the publisher rather than being thrown when you assemble the call, that a `Mono` documented to always emit never completes empty, and that cancelling a read early (`.take(1)`) leaves the store still readable afterwards. It takes a smaller `ReactiveEventStoreFixture`, just `eventStore()`, `queries()`, `operations()`, `positionOrderedReader()`, and `close()`, with no capability declaration, since these are properties of how the publisher is built rather than of what the store supports:

```java
class MyReactiveEventStoreConformanceTest extends ReactiveEventStoreConformance {

    @Override
    protected ReactiveEventStoreFixture createFixture() {
        return new MyReactiveEventStoreFixture();
    }
}
```

A single dependency covers both suites, since `occurrent-tck-eventstore-reactor` depends on `occurrent-tck-eventstore-blocking` itself:

{% include macros/tck/eventstore/reactor/maven.md %}

# Using Subscriptions
<div class="comment">Before you start using subscriptions you should read up on what they are <a href="#subscriptions">here</a>.</div>

There a two different kinds of subscriptions, [blocking subscriptions](#blocking-subscriptions) and [reactive subscriptions](#reactive-subscriptions).
For blocking subscription implementations see [here](#blocking-subscription-implementations) and for reactive subscription implementations see [here](#reactive-subscription-implementations). 


## Blocking Subscriptions

A "blocking subscription" is a subscription that uses the normal Java threading mechanism for IO operations, i.e. reading changes from an [EventStore](#choosing-an-eventstore) 
will block the thread. This is arguably the easiest and most familiar way to use subscriptions for the typical Java developer, 
and it's probably good-enough for most scenarios. If high throughput, low CPU and memory-consumption is critical then consider using
[reactive subscription](#reactive-subscriptions) instead. Reactive subscriptions are also better suited if you want to work with streaming data.   

To create a blocking subscription, you first need to choose which "subscription model" to use. Then you create a subscription instance from this subscription model.
All blocking subscriptions implements the `org.occurrent.subscription.api.blocking.SubscriptionModel` 
interface. This interface provide means to subscribe to new events from an `EventStore` as they are written. For example:

{% capture java %}
subscriptionModel.subscribe("mySubscriptionId", System.out::println);
{% endcapture %}
{% capture kotlin %}
subscriptionModel.subscribe("mySubscriptionId", ::println)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

This will simply print each cloud event written to the event store to the console.

Note that the signature of `subscribe` is defined like this:

```java
public interface SubscriptionModel {
    /**
     * Start listening to cloud events persisted to the event store using the supplied start position and <code>filter</code>.
     *
     * @param subscriptionId  The id of the subscription, must be unique!
     * @param filter          The filter used to limit which events that are of interest from the EventStore.
     * @param startAt         The position to start the subscription from
     * @param action          This action will be invoked for each cloud event that is stored in the EventStore.
     */
    Subscription subscribe(String subscriptionId, SubscriptionFilter filter, StartAt startAt, Consumer<CloudEvent> action);

    // Default methods 

}
``` 

It's common that subscriptions produce "wrappers" around the vanilla `io.cloudevents.CloudEvent` type that includes 
the checkpoint (if the datastore doesn't maintain the checkpoint on behalf of the clients). Someone, either you as the client or the datastore, needs to keep track of this checkpoint 
for each individual subscriber ("mySubscriptionId" in the example above). If the datastore doesn't provide this feature, you should use a `SubscriptionModel` implementation that also implement the 
`org.occurrent.subscription.api.blocking.CheckpointAwareSubscriptionModel` interface. The `CheckpointAwareSubscriptionModel`  is an example of a `SubscriptionModel` that returns a wrapper around 
`io.cloudevents.CloudEvent` called `org.occurrent.subscription.CheckpointAwareCloudEvent` which adds an additional method, `Checkpoint getCheckpoint()`, that you can use to get  
the current checkpoint. You can check if a cloud event contains a checkpoint by calling `CheckpointAwareCloudEvent.hasCheckpoint(cloudEvent)`
and then get the checkpoint by using `CheckpointAwareCloudEvent.getCheckpointOrThrowIAE(cloudEvent)`. Note that `CheckpointAwareCloudEvent` is fully compatible with `io.cloudevents.CloudEvent` and it's ok to treat it as such. So given that
you're subscribing from a `CheckpointAwareSubscriptionModel`, you are responsible for [keeping track of the checkpoint](#blocking-subscription-checkpoint-storage), so 
that it's possible to resume this subscription from the last known checkpoint on application restart. This interface also provides means to get the so called "current global checkpoint", 
by calling the `globalCheckpoint` method which can be useful when starting a new subscription. 

For example, consider the case when subscription "A" starts 
subscribing at the current time (T1). Event E1 is written to the `EventStore` and propagated to subscription "A". But imagine there's a bug in "A" that prevents it
from performing its action. Later, the bug is fixed and the application is restarted at the "current time" (T2). But since T2 is after T1, E1 will not sent to "A" again since
it happened before T2. Thus this event is missed! Whether or not this is actually a problem depends on your use case. But to avoid it you should not start the subscription
at the "current time", but rather from the "global checkpoint". This checkpoint should be written to a [checkpoint storage](#blocking-subscription-checkpoint-storage)
_before_ subscription "A" is started. Thus the subscription can continue from this checkpoint on application restart and no events will be missed.               

### Blocking Subscription Filters

You can also provide a subscription filter, applied at the datastore level so that it's really efficient, if you're only interested in
certain events:

{% capture java %}
subscriptionModel.subscribe("mySubscriptionId", filter(type("GameEnded")), System.out::println);
{% endcapture %}
{% capture kotlin %}
subscriptionModel.subscribe("mySubscriptionId", filter(type("GameEnded")), ::println)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

This will  print each cloud event written to the event store, and has type equal to "GameEnded", to the console.
The `filter` method is statically imported from `org.occurrent.subscription.StreamSubscriptionFilter` and `type` is statically imported from `org.occurrent.condition.Condition`.
The `StreamSubscriptionFilter` is generic and should be applicable to a wide variety of different datastores. However, subscription implementations
may provide different means to express filters. For example, the MongoDB subscription implementations allows you to use filters specific to MongoDB:

{% capture java %}
subscriptionModel.subscribe("mySubscriptionId", filter().id(Filters::eq, "3c0364c3-f4a7-40d3-9fb8-a4a62d7f66e3").type(Filters::eq, "GameStarted")), System.out::println);
{% endcapture %}
{% capture kotlin %}
subscriptionModel.subscribe("mySubscriptionId", filter().id(Filters::eq, "3c0364c3-f4a7-40d3-9fb8-a4a62d7f66e3").type(Filters::eq, "GameStarted")), ::println)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Now `filter` is statically imported from `org.occurrent.subscription.mongodb.MongoDBFilterSpecification` and `Filters` is imported from 
`com.mongodb.client.model.Filters` (i.e the normal way to express filters in MongoDB). However, it's recommended to always start with a `StreamSubscriptionFilter`
and only pick a more specific implementation if you cannot express your filter using the capabilities of `StreamSubscriptionFilter`. 

These filters also decide which event-store capability a subscription sees. `StreamSubscriptionFilter` (the one built above) scopes delivery to
stream-written events. On a store that also has the DCB capability enabled, `AgnosticSubscriptionFilter.filter(...)` wraps the same kind of plain
`Filter` but delivers matching events from every enabled capability, so it sees stream-written and DCB-appended events together and catches up over
the shared global `position`. `DcbSubscriptionFilter.filter(...)` wraps a `DcbCriteria` and narrows delivery to the DCB events matching it. The
capability-neutral [`@Subscription`](#spring-boot-annotations) annotation and [`subscriptions(...)`](#subscription-dsl) DSL already deliver both on a
dual-capability store, so you only reach for these filters when subscribing through a `SubscriptionModel` directly. See
[Subscribing to DCB Events](#subscribing-to-dcb-events) for the DCB side.

### Blocking Subscription Start Position

A subscription can can be started at different locations in the event store. You can define where to start when a subscription is started. This is done by supplying a 
`org.occurrent.subscription.StartAt` instance. It provides several ways to specify the start position, either by using `StartAt.now()`, `StartAt.subscriptionModelDefault()` (default if `StartAt` is not defined when 
calling the `subscribe` function), or `StartAt.checkpoint(<checkpoint>)`, where `<checkpoint>` is a datastore-specific 
implementation of the `org.occurrent.subscription.Checkpoint` interface which provides the start position as a `String`. You may want to store the 
`String` returned by a `Checkpoint` in a database so that it's possible to resume a subscription from the last processed checkpoint on application restart.
You can do this anyway you like, but for most cases you probably should consider if there's a [checkpoint storage](#blocking-subscription-checkpoint-storage)
available that suits your needs. If not, you can still have a look at them for inspiration on how to write your own.

   
### Blocking Subscription Checkpoint Storage {#blocking-subscription-checkpoint-storage}

It's very common that an application needs to start at its last known location in the subscription stream when it's restarted. While you're free to store the checkpoint
provided by a [blocking subscription](#blocking-subscriptions) any way you like, Occurrent provides an interface
called `org.occurrent.subscription.api.blocking.CheckpointStorage` acts as a uniform abstraction for this purpose. A `CheckpointStorage` 
is defined like this:

```java
public interface CheckpointStorage {
    Checkpoint read(String subscriptionId);
    Checkpoint save(String subscriptionId, Checkpoint checkpoint);
    void delete(String subscriptionId);
    boolean exists(String subscriptionId);
}
```

I.e. it's a way to read/write/delete the `Checkpoint` for a given subscription, and to ask whether one is stored at all. Occurrent ships with four pre-defined implementations:

1\. **NativeMongoCheckpointStorage**<br>
    Uses the vanilla MongoDB Java (sync) driver to store `Checkpoint`'s in MongoDB.
    {% include macros/subscription/blocking/mongodb/native/storage/maven.md %}   
2\. **SpringMongoCheckpointStorage**<br>
    Uses the Spring MongoTemplate to store `Checkpoint`'s in MongoDB.    
    {% include macros/subscription/blocking/mongodb/spring/storage/maven.md %}
3\. **SpringRedisCheckpointStorage**<br>
    Uses the Spring RedisTemplate to store `Checkpoint`'s in Redis.    
    {% include macros/subscription/blocking/redis/spring/storage/maven.md %} 
4\. **InMemoryCheckpointStorage**<br>
    Keeps `Checkpoint`'s in a `ConcurrentHashMap`, so they are gone when the process is. Useful in tests, and in an application that can replay from the start after a restart.
    {% include macros/subscription/blocking/inmemory/impl/maven.md %}

Note that the two MongoDB implementations recognize their own checkpoint types (a change stream resume token and an operation time) and give them back as the same type, while every other type is stored as the string it reports and read back as a `StringBasedCheckpoint`. The Redis implementation does that to everything, including the two MongoDB types. So if you write code that reads a checkpoint back out of storage, rely on `Checkpoint.asString()` rather than casting to the type you saved.

If you want to roll your own implementation (feel free to contribute to the project if you do) you can depend on the "blocking subscription API" which contains the `CheckpointStorage` interface:

{% include macros/subscription/blocking/api/maven.md %}

You can also have Occurrent's own conformance suite check it for you. `occurrent-tck-subscription-blocking` contains `CheckpointStorageConformance`, an abstract JUnit 5 test class that all four implementations above run against. Extend it, supply a `CheckpointStorageFixture` that hands back a storage holding no checkpoints, and you get the whole contract asserted:

```java
class MyCheckpointStorageTest extends CheckpointStorageConformance {

    @Override
    protected CheckpointStorageFixture createFixture() {
        return new MyCheckpointStorageFixture();
    }
}
```

The fixture also declares whether your storage gives back a checkpoint of the same type it was handed, since both answers are legitimate and nothing on `CheckpointStorage` reports which way an implementation goes.

{% include macros/tck/subscription/blocking/maven.md %}

The same artifact holds the suites for a subscription model, so if you write your own you can have Occurrent check it against the same contract its five models are held to. `SubscriptionModelConformance` covers delivery and filtering, the whole life cycle, and cancelling. `IntrospectableSubscriptionModelConformance` covers `subscriptionIds()`, for a model that can list its subscriptions. `InProcessDeliveryConformance` is for a model that calls the handler on the publishing thread, the way the synchronous and push models do.

You supply a `SubscriptionModelFixture`. Because a subscription model has no single way of being fed an event (a MongoDB model watches a change stream, an in-process one is handed the event directly), the fixture is what publishes:

```java
class MySubscriptionModelTest extends SubscriptionModelConformance {

    @Override
    protected SubscriptionModelFixture createFixture() {
        return new MySubscriptionModelFixture();
    }
}
```

The fixture also declares three things the API cannot be asked: whether a paused subscription's events are held for it or dropped, whether a throwing handler is retried or the exception reaches whoever published the event, and whether the model accepts more than one subscription at a time. Both answers to each are asserted, so declaring one is a promise rather than a way out of a test.

Worth knowing if you read a checkpoint back after pausing: the two MongoDB models differ here. The native driver's model resumes gap-free, so an event written while a subscription was paused arrives once it resumes, while the Spring model resumes at the present and does not deliver it. Both are deliberate, and which one the contract should require is still open.

### Blocking Subscription Implementations

These are the _non-durable_ [blocking subscription implementations](#blocking-subscriptions): 

**MongoDB**

* [Blocking subscription using the "native" Java MongoDB driver](#blocking-subscription-using-the-native-java-mongodb-driver)
* [Blocking subscription using Spring MongoTemplate](#blocking-subscription-using-spring-mongotemplate)
{% include macros/subscription/common/mongodb/oplog_warning.md %}

**In-Memory**

* [In-Memory subscription](#inmemory-subscription)

By "non-durable" we mean implementations that doesn't store the checkpoint in a durable storage automatically.  
It might be that the datastore does this automatically _or_ that [checkpoint storage](#blocking-subscription-checkpoint-storage) is not required
for your use case. If the datastore _doesn't_ support storing the checkpoint automatically, a subscription will typically implement the
`org.occurrent.subscription.api.blocking.CheckpointAwareSubscriptionModel` interface (since these types of subscriptions needs to be aware of the checkpoint).

   
Typically, if you want the stream to continue where it left off on application restart you want to store away the checkpoint. You can do this anyway you like,
but for most cases you probably want to look into implementations of `org.occurrent.subscription.api.blocking.CheckpointAwareSubscriptionModel`. 
These subscriptions can be combined with a [checkpoint storage](#blocking-subscription-checkpoint-storage) implementation to store the checkpoint in a durable 
datastore. 

Occurrent provides a [utility](#durable-subscriptions-blocking) that combines a `CheckpointAwareSubscriptionModel` and 
a `CheckpointStorage` (see [here](#blocking-subscription-checkpoint-storage)) to automatically store the checkpoint   
_after each processed event_. You can tweak how often the checkpoint should be persisted in the configuration.

#### Blocking Subscription using the "Native" Java MongoDB Driver

Uses the vanilla Java MongoDB synchronous driver (no Spring dependency is required).

To get started first include the following dependency:

{% include macros/subscription/blocking/mongodb/native/impl/maven.md %}

Then create a new instance of `NativeMongoSubscriptionModel` and start subscribing: 

{% include macros/subscription/blocking/mongodb/native/impl/example.md %}
<div class="comment">NativeMongoSubscriptionModel can be imported from the "org.occurrent.subscription.mongodb.nativedriver.blocking" package.</div>

There are a few things to note here that needs explaining. First we have the `TimeRepresentation.DATE` that is passed as the third constructor argument which you can read more about 
[here](#mongodb-time-representation). Secondly we have the `Executors.newCachedThreadPool()`. A thread will be created from this executor for each call to 
"subscribe" (i.e. for each subscription). Make sure that you have enough threads to cover all your subscriptions or the "SubscriptionModel" may hang.
Last we have the [RetryStrategy](#retry-configuration-blocking) which defines what should happen if there's e.g. a connection issue during the life-time of a subscription or if subscription fails to process a cloud event
(i.e. the `action` throws an exception). 

Note that you can provide a [filter](#blocking-subscription-filters), [start position](#blocking-subscription-start-position) and [checkpoint persistence](#blocking-subscription-checkpoint-storage) for this subscription implementation. 

#### Blocking Subscription using Spring MongoTemplate

An implementation that uses Spring's [MongoTemplate](https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/MongoTemplate.html) for 
event subscriptions. 

First include the following dependency:

{% include macros/subscription/blocking/mongodb/spring/impl/maven.md %}

Then create a new instance of `SpringMongoSubscriptionModel` and start subscribing:

{% include macros/subscription/blocking/mongodb/spring/impl/example.md %}
<div class="comment">SpringMongoSubscriptionModel can be imported from the "org.occurrent.subscription.mongodb.spring.blocking" package.</div>

The "eventCollectionName" specifies the event collection in MongoDB where events are stored. It's important that this collection is the same as the collection
used by the `EventStore` implementation. Secondly, we have the `TimeRepresentation.RFC_3339_STRING` that is passed as the third constructor argument, which you can read more about 
[here](#mongodb-time-representation). It's also very important that this is configured the same way as the `EventStore`.

It should also be noted that Spring takes care of re-attaching to MongoDB if there's a connection issue or other transient errors. This can be configured when creating the `MongoTemplate` instance. 

When it comes to retries, if the "action" fails (i.e. if the higher-order function you provide when calling `subscribe` throws an exception), either using something like [Spring Retry](https://github.com/spring-projects/spring-retry)
or the [Occurrent Retry Module](#retry-configuration-blocking). By default, all subscription models will use the Occurrent retry module with exponential backoff starting with 100 ms and progressively
 go up to max 2 seconds wait time between each retry when reading/saving/deleting the checkpoint. You can customize this by passing an instance of `RetryStrategy` to the `SpringMongoSubscriptionModel` constructor.  

If you want to disable the Occurrent retry module, pass `RetryStrategy.none()` to the `SpringMongoSubscriptionModel` constructor and then handle retries anyway you find fit. For example, let's say you want to use `spring-retry`, and you have a simple Spring bean that writes each cloud event to a repository:

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
subscriptionModel.subscribe("gameStartedLog", writeToRepository::write);
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

Note that you can provide a [filter](#blocking-subscription-filters), [start position](#blocking-subscription-start-position) and [checkpoint persistence](#blocking-subscription-checkpoint-storage) for this subscription implementation.

##### Restart Subscription when Oplog Lost 

If there's not enough history available in the MongoDB oplog to resume a subscription created from a `SpringMongoSubscriptionModel`, you can configure it to restart the subscription from the current 
time automatically. This is only of concern when an application is restarted, and the subscriptions are configured to start from a position in the oplog that is no longer available. It's disabled by default since it might not 
be 100% safe (meaning that you can miss some events when the subscription is restarted). It's not 100% safe if you run subscriptions in a different process than the event store _and_ you have lot's of 
writes happening to the event store. It's safe if you run the subscription in the same process as the writes to the event store _if_ you make sure that the
subscription is started _before_ you accept writes to the event store on startup. To enable automatic restart, you can do like this:
  
```java
var subscriptionModel = new SpringMongoSubscriptionModel(mongoTemplate, SpringSubscriptionModelConfig.withConfig("events", TimeRepresentation.RFC_3339_STRING).restartSubscriptionsOnChangeStreamHistoryLost(true));
```

An alternative approach to restarting automatically is to use a [catch-up subscription](#catch-up-subscription-blocking) and restart the subscription from an earlier date.

#### Tuning the MongoDB change stream {#change-stream-tuning}

Both blocking MongoDB subscription models let you tune the change stream they read from. Both options are opt-in. Leave them unset and you get the driver and server defaults, which is what every subscription did before these existed, so upgrading changes nothing on its own.

`batchSize` sets how many change-stream documents the server returns per batch. A larger batch means fewer round trips to the server, which helps throughput on a high-volume subscription such as an outbox, and costs more memory per batch. Values in the low hundreds work well for high throughput, but the right number depends on your event size and load.

`maxAwaitTime` bounds how long the server holds an idle cursor before returning a batch, possibly an empty one. A shorter wait delivers events sooner and costs more `getMore` round trips while the stream is quiet. A longer wait keeps an idle cursor waiting and reduces that chatter. Somewhere between 200 ms and 1000 ms suits most workloads.

```java
var config = NativeMongoSubscriptionModelConfig.withConfig()
        .batchSize(500)
        .maxAwaitTime(Duration.ofMillis(500));

var subscriptionModel = new NativeMongoSubscriptionModel(database, "events", TimeRepresentation.DATE, executor, config);
```

**The two models do not offer the same options, and that is a Spring Data limitation rather than a choice.** `NativeMongoSubscriptionModel` has both, because it drives the sync driver's `ChangeStreamIterable` directly. `SpringMongoSubscriptionModel` has `maxAwaitTime` only:

```java
var config = SpringMongoSubscriptionModelConfig
        .withConfig("events", TimeRepresentation.RFC_3339_STRING)
        .maxAwaitTime(Duration.ofMillis(500));
```

It reads the change stream through Spring's `MessageListenerContainer`, whose `ChangeStreamRequestOptions` carries a `maxAwaitTime` but no batch size, and Spring's `ChangeStreamTask` never applies one. So there is no supported way to set a batch size on that path. Reach for `NativeMongoSubscriptionModel` when you need it.

`ReactorMongoSubscriptionModel` offers neither yet. Spring Data's `ReactiveMongoTemplate.changeStream` and its `ChangeStreamOptions` carry neither option, so exposing them means driving the raw reactive driver, which is left as a follow-up.

#### InMemory Subscription

If you're using the [InMemory EventStore](#in-memory-eventstore) you can use the "InMemorySubscriptionModel" to subscribe to new events. For add the dependency:

{% include macros/subscription/blocking/inmemory/impl/maven.md %}

Then you can use it like this:

{% include macros/subscription/blocking/inmemory/impl/example.md %}

#### Push Subscription (Blocking)

Use this when events aren't read from a MongoDB change stream at all, but forwarded by the writing application to a message broker such as RabbitMQ or Kafka, and consumed by a separate listener. `org.occurrent.subscription.push.blocking.PushSubscriptionModel` is a register-only `Subscribable`. It has no lifecycle, start position, checkpoint, catch-up, or replay, and it never talks to an event store. You feed it events yourself, and it dispatches each one to whichever registered handlers match it.

First include the dependency:

```xml
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-subscription-push-blocking</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
```

Because `PushSubscriptionModel` implements the same `Subscribable` interface as every other subscription model, it plugs into the [Subscription DSL](#subscription-dsl), and into `ProjectionRunner` from Occurrent's `projection-dsl` module, unchanged:

```java
PushSubscriptionModel pushModel = new PushSubscriptionModel();

ProjectionRunner.agnostic(pushModel, cloudEventConverter)
        .project("order-status", orderStatusProjection(), repository);
```

On the producer side, forward the stored `CloudEvent` to the broker as CloudEvents JSON, unchanged. On the listener side, reconstruct it from that CloudEvents JSON payload before handing it to the model, for example in a Spring `@RabbitListener`:

```java
@RabbitListener(queues = "orders")
public void onMessage(byte[] body) {
    CloudEvent cloudEvent = EventFormatProvider.getInstance()
            .resolveFormat(JsonFormat.CONTENT_TYPE)
            .deserialize(body);
    pushModel.accept(cloudEvent);
}
```

`accept(CloudEvent)` runs every matching handler synchronously, on the calling thread, in registration order. A handler's exception propagates back to the caller, which is what lets the listener decide whether to acknowledge the message or trigger a redelivery. There's also an `accept(Iterable<CloudEvent>)` overload for delivering several events at once.

Occurrent stays transport-neutral here. No broker dependency is added by this module, you pick and wire up RabbitMQ, Kafka, or anything else yourself. The `CloudEventConverter.toDomainEvent(...)` call inside the projection runner needs the extension attributes your handlers rely on, so make sure the pushed `CloudEvent` carries at least `streamid` and `streamversion`, and `position` too if something downstream (such as a catch-up model) reads it.

A push subscription only ever sees the live tail. A broker is not a log, so a new or rebuilt projection can't be backfilled from the queue. Replay history from the event store first, with [EventStore Queries](#eventstore-queries) or a [catch-up subscription](#catch-up-subscription-blocking), and only then attach the push feed to keep the projection current.

`CatchupThenPushSubscriptionModel` automates that catch-up. Wrap it around the push model and give it the event store as the replay source. On the first subscribe it replays the projection's history in position order, then hands over to the live feed, buffering the feed during the replay and de-duplicating the overlap by event id so nothing is lost or delivered twice across the seam:

```java
PushSubscriptionModel pushModel = new PushSubscriptionModel();
CatchupThenPushSubscriptionModel model = new CatchupThenPushSubscriptionModel(eventStore, pushModel, checkpointStorage);

ProjectionRunner.agnostic(model, cloudEventConverter)
        .project("order-status", orderStatusProjection(), repository);
```

Two knobs control the handover, both with sensible defaults you can ignore until you cannot. The de-dup cache holds the last 10000 delivered event ids, which is how far the replay-to-live overlap is suppressed exactly. Past that window the at-least-once contract takes over and the idempotent fold absorbs the duplicate. The live buffer holds at most 100000 events during the replay and is a fail-loud ceiling rather than a throttle, so hitting it throws instead of dropping events. Pass `CatchupThenLiveOptions` to change either:

```java
CatchupThenPushSubscriptionModel model = new CatchupThenPushSubscriptionModel(
        eventStore, pushModel, checkpointStorage, new CatchupThenLiveOptions(50_000, 200_000));
```

In Spring Boot the same two knobs are properties, which is how you tune a projection that the `@Projection` wiring bootstraps for you:

```properties
occurrent.subscription.catchup-then-live.dedup-cache-size=50000
occurrent.subscription.catchup-then-live.max-buffered-events=200000
```

Set one and the other keeps its default. A zero or negative value fails startup rather than falling back.

Live-resume stays the broker's job. The model persists no live position watermark, it only records a one-shot catch-up marker (in the `checkpointStorage` you pass, or none if you pass `null`) that the catch-up finished, so a restart skips the replay and lets the broker redeliver whatever the consumer had not yet acknowledged. Delivery is therefore at-least-once, so keep the fold idempotent. This means correctness across a restart depends on the broker retaining the backlog for an offline consumer (a durable queue with a preserved offset). If the consumer is offline longer than the broker retains, rebuild the projection. Only stream and capability-agnostic subscriptions can catch up this way.

Declaratively, a `@Projection` binds to a push source with `source = Source.PUSH` and `subscriptionModel` or `subscriptionModelName` to pick the `PushSubscriptionModel` bean. The starter then wraps it in the catch-up for you, on both the blocking and reactor stacks. Push source is rejected together with `mode = Mode.SYNCHRONOUS`, the catch-up start knobs, and a `DcbProjection`.

##### Feeding domain events instead of CloudEvents

If your listener already hands you domain events (for example a broker message converter deserializes them for you), pushing them through the CloudEvent model means `domainEvent` to `CloudEvent` and back, a full serialize and deserialize per event. Feed the projection in domain space instead and the live path does no conversion at all.

`Projections.domainEventFeed(projection, repository)` is the live-only feed. On the blocking stack it returns a `MaterializedView<E>`, call `update(event)` or `update(metadata, event)`. On the reactor stack it returns a `BiFunction<EventMetadata, E, Mono<Void>>`. Either way it folds a domain event straight into the read model:

```java
MaterializedView<OrderEvent> feed = Projections.domainEventFeed(orderStatusProjection(), repository);

@RabbitListener(queues = "orders")
public void onMessage(OrderEvent event) {
    feed.update(event);   // no CloudEvent conversion
}
```

For a new or rebuilt projection that also needs to catch up, use `CatchupProjectionFeed`. Its live path still folds domain events directly, and only the one-time catch-up reads the event store and decodes each replayed event once. It de-duplicates the replay-to-live overlap by an id you extract from the domain event, so the de-dup does not depend on the CloudEvent id:

```java
CatchupProjectionFeed<OrderEvent> feed = CatchupProjectionFeed.create(
        "order-status", orderStatusProjection(), repository,
        eventStore, cloudEventConverter, OrderEvent::eventId, checkpointStorage);

// wire the listener to feed.accept(...), then catch up once:
feed.catchUp();
```

Declaratively, `DomainEventFeed<E>` is a feed you declare as a bean (carrying the `eventId` function) and feed from your listener, and `@Projection(source = Source.PUSH, subscriptionModelName = "ordersFeed")` binds a projection to it. Push source is one attribute: the starter looks at the referenced feed bean and, seeing a `DomainEventFeed` rather than a `PushSubscriptionModel`, folds domain events directly. It registers the projection on the feed and runs its catch-up. One feed can drive several projections. On the reactor stack the projection's store must be a `ViewStateRepository`. The `occurrent.subscription.catchup-then-live.*` properties do not reach this feed, because you declare the bean yourself, so tune its catch-up by passing `CatchupThenLiveOptions` to the `DomainEventFeed` constructor.

A replayed event always has a real `CloudEvent` behind it, so the catch-up always folds with real metadata. A live event does not, so metadata on the live path is whatever the source supplies. Both `CatchupProjectionFeed` and `DomainEventFeed` accept it as a second argument, `feed.accept(metadata, event)` beside the plain `feed.accept(event)`, so call the two-argument form when the broker message carries the stream id, version or position, and the one-argument form when it does not. A projection keyed on metadata (such as the stream id) that is fed through the one-argument form now fails loud with an `IllegalStateException` instead of silently dropping the event.

The same limits as the CloudEvent push apply, live-resume is the broker's job and delivery is at-least-once, so keep the fold idempotent.

#### Durable Subscriptions (Blocking)

Storing the checkpoint is useful if you need to resume a subscription from its last known checkpoint when restarting an application. 
Occurrent provides a utility that implements `SubscriptionModel` and combines a `CheckpointAwareSubscriptionModel` and a `CheckpointStorage` implementation 
(see [here](#blocking-subscription-checkpoint-storage)) to automatically store the checkpoint, by default,   
after each processed event. If you don't want the checkpoint to be persisted after _every_ event, you can control how often this should happen by supplying a predicate 
to `DurableSubscriptionModelConfig`. There's a pre-defined predicate, `org.occurrent.subscription.util.predicate.EveryN`, that allow   
the checkpoint to be stored for _every n_ event instead of simply _every_ event. There's also a shortcut, e.g. `new DurableSubscriptionModelConfig(3)` that 
creates an instance of `EveryN` that stores the checkpoint for every third event. 

If you want full control, it's recommended to pick a [checkpoint storage](#blocking-subscription-checkpoint-storage) implementation, 
and store the checkpoint yourself using its API.

To use it, first we need to add the dependency:

{% include macros/subscription/blocking/util/autopersistence/maven.md %}

Then we should instantiate a `CheckpointAwareSubscriptionModel`, that subscribes to the events from the event store, and an instance of a `CheckpointStorage`, 
that stores the checkpoint, and combine them to a `DurableSubscriptionModel`: 

{% include macros/subscription/blocking/util/autopersistence/example.md %}

#### Catch-up Subscription (Blocking)

When starting a new subscription it's often useful to first replay historic events to get up-to-speed and then subscribing to new events
as they arrive. A catch-up subscription allows for exactly this! It combines the [EventStoreQueries](#eventstore-queries) API with a 
[subscription](#blocking-subscriptions) and an optional [checkpoint storage](#blocking-subscription-checkpoint-storage). It starts off by streaming
historic events from the event store and then automatically switch to continuous streaming mode once the historic events have caught up.

To get start you need to add the following dependency:

{% include macros/subscription/blocking/util/catchup/maven.md %}

For example:

{% include macros/subscription/blocking/util/catchup/example.md %}

To reduce the likelihood of duplicate events when switching from replay mode to continuous mode, a `CatchupSubscriptionModel` maintains an in-memory cache of event ids. 
The size of this cache is configurable using a `CatchupSubscriptionModelConfig` but it defaults to 100,000. Otherwise, there would be a chance
that event written _exactly_ when the switch from replay mode to continuous mode takes places, can be lost. To prevent this, the continuous mode subscription 
starts at a position before the last event read from the history. The purpose of the cache is thus to filter away events that are detected as duplicates during the 
switch. If the cache is too small, duplicate events will be sent to the continuous subscription. Typically, you want your application to be idempotent anyways and if so this shouldn't be a problem.        

As of 0.30.0 a catch-up that starts from the beginning or from a position reconciles the handover on the global `position` rather than on wall-clock
time, which closes a class of silent event loss during the switch. Starting from a specific point in time still uses time-based catch-up, since a
timestamp has no position to map to. Catch-up also fails loud now: `StreamCatchupSubscriptionModel` and `DcbCatchupSubscriptionModel` throw an
`IllegalStateException` instead of silently falling back to a start position that could drop events, so make sure to configure a valid start position.

A `CatchupSubscriptionModel` can be configured to store the checkpoint in the supplied storage (see example above) so that, if the application crashes during replay mode, it doesn't need to 
start replaying from the beginning again. Note that if you don't want checkpoint persistence during replay, you can disable this by doing `new CatchupSubscriptionModelConfig(dontUseCheckpointStorage())`.

It's also possible to change how the `CatchupSubscriptionModel` sorts events read from the event store during catch-up phase. For example:
  
```java
var subscriptionModel = ...
var eventStore = ..
var cfg = new CatchupSubscriptionModelConfig(100).catchupPhaseSortBy(SortBy.descending(TIME));
var catchupSubscriptionModel = CatchupSubscriptionModel(subscriptionModel, eventStore, cfg);  
```

By default, events are sorted by time and then stream version (if two or more events have the same time).

##### Catch-up Subscription Usage

The subscription model will only stream historic events if started with a `StartAt` instance with a so called `TimeBasedCheckpoint`, for example:

{% capture java %}
subscriptionModel.subscribe("subscriptionId", StartAt.checkpoint(TimeBasedCheckpoint.beginningOfTime()), e -> System.out.println("Event: " + e));
{% endcapture %}
{% capture kotlin %}
subscriptionModel.subscribe("subscriptionId", StartAt.checkpoint(TimeBasedCheckpoint.beginningOfTime())) { e -> 
    println("Event: $e")
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

If you don't specify a `StartAt` position (or specify `StartAt.subscriptionModelDefault()` explicitly), the `CatchupSubscriptionModel` will just delegate to the parent subscription model and
replay of old events will not happen. This means that for a subscription you can start it off by e.g. replaying from beginning of time then change the code and remove the `StartAt` position. 
It'll then resume from the position of the last consumed event.

There are also some "shortcuts" to make it a bit more concise to start replay from beginning of time:

{% capture java %}
var subscriptionModel = new CatchupSubscriptionModel(..);
// All examples below are equivalent:
subscriptionModel.subscribeFromBeginningOfTime("subscriptionId", e -> System.out.println("Event: " + e));
subscriptionModel.subscribe("subscriptionId", StartAtTime.beginningOfTime(), e -> System.out.println("Event: " + e));
subscriptionModel.subscribe("subscriptionId", StartAt.checkpoint(TimeBasedCheckpoint.beginningOfTime()), e -> System.out.println("Event: " + e));
{% endcapture %}
{% capture kotlin %}
val subscriptionModel = CatchupSubscriptionModel(..)
// All examples below are equivalent:
subscriptionModel.subscribeFromBeginningOfTime("subscriptionId") { e -> println("Event: $e") }
subscriptionModel.subscribe("subscriptionId", StartAtTime.beginningOfTime()) { e -> println("Event: $e") }
subscriptionModel.subscribe("subscriptionId", StartAt.checkpoint(TimeBasedCheckpoint.beginningOfTime())) { e -> println("Event: $e") }
// beginningOfTime is an extension function imported from org.occurrent.subscription.blocking.durable.catchup.CatchupSubscriptionModelExtensions.kt  
subscriptionModel.subscribe("subscriptionId", StartAt.beginningOfTime()) { e -> println("Event: $e") }
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

It's also possible to start from a specific `java.time.OffsetDateTime`, for example:

{% capture java %}
var offsetDateTime = OffsetDateTime.of(2024, 2, 3, 10, 4, 2, 0, ZoneOffset.UTC)
subscriptionModel.subscribe("subscriptionId", StartAtTime.offsetDateTime(offsetDateTime)) { e -> println("Event: $e") }
{% endcapture %}
{% capture kotlin %}
val offsetDateTime = OffsetDateTime.of(2024, 2, 3, 10, 4, 2, 0, ZoneOffset.UTC)
subscriptionModel.subscribe("subscriptionId", StartAt.offsetDateTime(offsetDateTime)) { e -> println("Event: $e") }
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

#### Competing Consumer Subscription (Blocking)

A competing consumer subscription model wraps another subscription model to allow several subscribers to subscribe to the same subscription. One of the subscribes will get a lock of the subscription
and receive events from it, the others will be in standby. If a subscriber looses its lock, another subscriber will take over automatically. To achieve distributed locking, the subscription model uses a `org.occurrent.subscription.api.blocking.CompetingConsumerStrategy` to
support different algorithms. You can write custom algorithms by implementing this interface yourself. But to use it, first depend on the `CompetingConsumerSubscriptionModel`:

{% include macros/subscription/blocking/util/competingconsumer/maven.md %}
                                                                          
A `CompetingConsumerSubscriptionModel` takes a `CompetingConsumerStrategy` as second parameter. There are currently two different implementations, both are based on MongoDB. Use the following if you're using the native Java MongoDB driver (i.e. you're _not_ using Spring):

{% include macros/subscription/blocking/util/competingconsumer/maven-strategy-native.md %}

The `CompetingConsumerStrategy` implementation in this module is called `NativeMongoLeaseCompetingConsumerStrategy`. If you're using Spring, depend on this module instead:

{% include macros/subscription/blocking/util/competingconsumer/maven-strategy-spring.md %}

The `CompetingConsumerStrategy` implementation in this module is called `SpringMongoLeaseCompetingConsumerStrategy` and it's using the `MongoTemplate` from the Spring ecosystem. Both of these strategies are heavily inspired by the awesome work
of [Alec Henninger](https://github.com/alechenninger). To understand how these strategies work under the hood, refer to his [blog post](https://www.alechenninger.com/2020/05/building-kafka-like-message-queue-with.html).  

Just like several other subscription models, the `CompetingConsumerSubscriptionModel` wraps another subscription model and decorates it with additional functionality, in this case to add competing consumer support to it. 
Below is an example that uses `NativeMongoLeaseCompetingConsumerStrategy` from module `org.occurrent:occurrent-subscription-mongodb-native-blocking-competing-consumer-strategy` with a [DurableSubscriptionModel](#durable-subscriptions-blocking) 
which in turn wraps the [Native MongoDB](#blocking-subscription-using-the-native-java-mongodb-driver) subscription model.

{% include macros/subscription/blocking/util/competingconsumer/example.md %}

If the above code is executed on multiple nodes/processes, then only *one* subscriber will receive events.

Note that you can make several tweaks to the `CompetingConsumerStrategy` using the `Builder`, (`new NativeMongoLeaseCompetingConsumerStrategy.Builder()` or `new SpringMongoLeaseCompetingConsumerStrategy.Builder()`). 
You can, for example, tweak how long the lease time should be for the lock (default is 20 seconds), the name of lease collection in MongoDB, as well as the retry strategy and other things. 

If you write your own `CompetingConsumerStrategy`, the same `occurrent-tck-subscription-blocking` artifact used for [checkpoint storage and subscription model conformance](#blocking-subscription-checkpoint-storage) also holds `CompetingConsumerStrategyConformance`. Extend it and supply a `CompetingConsumerStrategyFixture`:

```java
class MyCompetingConsumerStrategyTest extends CompetingConsumerStrategyConformance {

    @Override
    protected CompetingConsumerStrategyFixture createFixture() {
        return new MyCompetingConsumerStrategyFixture();
    }
}
```

Two things the fixture supplies that nothing on the interface can. First, a `newCompetingConsumerStrategy()` factory that hands back a rival strategy contending over the *same* storage as the one under test. The suite needs a rival to register against, and in places a third instance that outlives a rival it deliberately shuts down. Constructing several strategies over one shared storage is therefore an explicit constraint on your implementation, since nothing on `CompetingConsumerStrategy` lets one instance reach another. Second, `timeToConverge()`, the longest the suite waits for the strategy's own coordination to settle who holds a lock when nothing told it directly. This is a bound rather than a delay. The suite stops waiting the moment the condition holds, so a generous value costs a passing run nothing and is only paid in full by a run that was going to fail anyway.

The suite takes no position on *how* a strategy coordinates. Nothing in it knows a lease exists, waits one out, or asserts when one expires, and Occurrent's own two MongoDB-backed strategies assert that timing separately, in deterministic tests against the MongoDB support class with a clock the test moves itself. What the suite asserts instead is the property a lease is one way of providing. A holder that stops coordinating (the way a crashed instance would, without calling `release` or `unregister`) loses the lock to a rival within `timeToConverge()`, rather than holding it forever.

It also asserts the contract both ways Occurrent relies on it. `CompetingConsumerSubscriptionModel` registers a listener and reacts to being told it gained or lost the lock. `SagaRunner` registers a consumer, never adds a listener at all, and asks `hasLock(subscriptionId, subscriberId)` on every poll instead. A strategy that reports changes only through a listener, or only answers correctly when asked directly, fails half of what the suite checks.

#### Subscription Life-cycle & Testing (Blocking)

Subscription models may also implement the `SubscriptionLifeCycle` interface (currently all blocking subscription models implements this). These subscription models supports canceling, pausing and  resuming individual subscriptions. You can also stop an entire subscription model temporarily (`stop`) and restart it later (`start`).

Note the difference between canceling and pausing a subscription. Canceling a subscription will _remove_ it and it's not possible to resume it again later. Pausing a subscription will temporarily 
pause the subscription, but it can later be resumed using the `resumeSubscription` method.

Many of the methods in the `SubscriptionLifeCycle` are good to have when you write integration tests.
It's often useful to e.g. write events to the event store _without_ triggering all subscriptions listening to the events. The life cycle methods allows you to selectively start/stop individual subscriptions so that you can (integration) test them in isolation.

## Reactive Subscriptions

A "reactive subscription" is a subscription that uses non-blocking IO when reading events from the event store, i.e. reading changes from an [EventStore](#choosing-an-eventstore) 
will _not_ block a thread. It uses concepts from [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) which is well-suited for working with streams 
of data. This is arguably a bit more complex for the typical Java developer, and you should consider using [blocking subscriptions](#blocking-subscriptions) 
if high throughput, low CPU and memory-consumption is not critical. 
 
To create a reactive subscription you first need to choose which "subscription model" to use. Then you create a subscription instance from this subscription model. 
All reactive subscriptions implements the `org.occurrent.subscription.api.reactor.SubscriptionModel` interface which uses 
components from [project reactor](https://projectreactor.io). This interface provide means to subscribe to new events from an `EventStore` as they are written. For example:

{% capture java %}
subscriptionModel.subscribe("mySubscriptionId").doOnNext(System.out::println).subscribe();
{% endcapture %}
{% capture kotlin %}
subscriptionModel.subscribe("mySubscriptionId").doOnNext(::println).subscribe()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
<div class="comment">The "subscribe" method returns an instance of "Flux&lt;CloudEvent&gt;".</div>


This will simply print each cloud event written to the event store to the console.

Note that the signature of `subscribe` is defined like this:

```java
public interface SubscriptionModel {

    /**
     * Stream events from the event store as they arrive. Use this method if want to start streaming from a specific position.
     *
     * @return A Flux with cloud events which may also includes the Checkpoint that can be used to resume the stream from the current checkpoint.
     */
    Flux<CloudEvent> subscribe(SubscriptionFilter filter, StartAt startAt);

    // Default methods 

}
``` 

It's common that subscriptions produce "wrappers" around the vanilla `io.cloudevents.CloudEvent` type that includes 
the checkpoint (if the datastore doesn't maintain the checkpoint on behalf of the clients). Someone, either you as the client or the datastore, needs to keep track of this checkpoint 
for each individual subscriber ("mySubscriptionId" in the example above). If the datastore doesn't provide this feature, you should use a `SubscriptionModel` implementation that also implement the 
`org.occurrent.subscription.api.reactor.CheckpointAwareSubscriptionModel` interface. The `CheckpointAwareSubscriptionModel`  is an example of a `SubscriptionModel` that returns a wrapper around 
`io.cloudevents.CloudEvent` called `org.occurrent.subscription.CheckpointAwareCloudEvent` which adds an additional method, `Checkpoint getCheckpoint()`, that you can use to get  
the current checkpoint. You can check if a cloud event contains a checkpoint by calling `CheckpointAwareCloudEvent.hasCheckpoint(cloudEvent)`
and then get the checkpoint by using `CheckpointAwareCloudEvent.getCheckpointOrThrowIAE(cloudEvent)`. 
Note that `CheckpointAwareCloudEvent` is fully compatible with `io.cloudevents.CloudEvent` and it's ok to treat it as such. So given that
you're subscribing from a `CheckpointAwareSubscriptionModel`, you are responsible for [keeping track of the checkpoint](#reactive-subscription-checkpoint-storage), so 
that it's possible to resume this subscription from the last known checkpoint on application restart. This interface also provides means to get the so called "current global checkpoint", 
by calling the `globalCheckpoint` method which can be useful when starting a new subscription. 

For example, consider the case when subscription "A" starts subscribing at the current time (T1). Event E1 is written to the `EventStore` and propagated to subscription "A". But imagine there's a bug in "A" that prevents it
from performing its action. Later, the bug is fixed and the application is restarted at the "current time" (T2). But since T2 is after T1, E1 will not sent to "A" again since
it happened before T2. Thus this event is missed! Whether or not this is actually a problem depends on your use case. But to avoid it you should not start the subscription
at the "current time", but rather from the "global checkpoint". This checkpoint should be written to a [checkpoint storage](#reactive-subscription-checkpoint-storage)
_before_ subscription "A" is started. Thus the subscription can continue from this checkpoint on application restart and no events will be missed.               


### Reactive Subscription Filters

You can also provide a subscription filter, applied at the datastore level so that it's really efficient, if you're only interested in
certain events:

{% capture java %}
subscriptionModel.subscribe("mySubscriptionId", filter(type("GameEnded"))).doOnNext(System.out::println).subscribe();
{% endcapture %}
{% capture kotlin %}
subscriptionModel.subscribe("mySubscriptionId", filter(type("GameEnded")).doOnNext(::println).subscribe()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

This will  print each cloud event written to the event store, and has type equal to "GameEnded", to the console.
The `filter` method is statically imported from `org.occurrent.subscription.StreamSubscriptionFilter` and `type` is statically imported from `org.occurrent.condition.Condition`.
The `StreamSubscriptionFilter` is generic and should be applicable to a wide variety of different datastores. However, subscription implementations
may provide different means to express filters. For example, the MongoDB subscription implementations allows you to use filters specific to MongoDB:

{% capture java %}
subscriptionModel.subscribe("mySubscriptionId", filter().id(Filters::eq, "3c0364c3-f4a7-40d3-9fb8-a4a62d7f66e3").type(Filters::eq, "GameStarted")).doOnNext(System.out::println).subscribe();
{% endcapture %}
{% capture kotlin %}
subscriptionModel.subscribe("mySubscriptionId", filter().id(Filters::eq, "3c0364c3-f4a7-40d3-9fb8-a4a62d7f66e3").type(Filters::eq, "GameStarted")).doOnNext(::println).subscribe()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Now `filter` is statically imported from `org.occurrent.subscription.mongodb.MongoDBFilterSpecification` and `Filters` is imported from 
`com.mongodb.client.model.Filters` (i.e the normal way to express filters in MongoDB). However, it's recommended to always start with a `StreamSubscriptionFilter`
and only pick a more specific implementation if you cannot express your filter using the capabilities of `StreamSubscriptionFilter`. 

The capability-scoped filters (`StreamSubscriptionFilter`, `AgnosticSubscriptionFilter`, and `DcbSubscriptionFilter`) work the same way here as on
the [blocking side](#blocking-subscription-filters): the agnostic filter delivers events from every enabled capability, and the DCB filter narrows
delivery to matching DCB events.

### Reactive Subscription Start Position

A subscription can can be started at different locations in the event store. You can define where to start when a subscription is started. This is done by supplying a 
`org.occurrent.subscription.StartAt` instance. It provides several ways to specify the start position, either by using `StartAt.now()`, `StartAt.subscriptionModelDefault()` (default if `StartAt` is not defined when 
calling the `subscribe` function), or `StartAt.checkpoint(<checkpoint>)`, where `<checkpoint>` is a datastore-specific 
implementation of the `org.occurrent.subscription.Checkpoint` interface which provides the start position as a `String`. You may want to store the 
`String` returned by a `Checkpoint` in a database so that it's possible to resume a subscription from the last processed checkpoint on application restart.
You can do this anyway you like, but for most cases you probably should consider if there's a [checkpoint storage](#reactive-subscription-checkpoint-storage)
available that suits your needs. If not, you can still have a look at them for inspiration on how to write your own.

   
### Reactive Subscription Checkpoint Storage {#reactive-subscription-checkpoint-storage}

It's very common that an application needs to start at its last known location in the subscription stream when it's restarted. While you're free to store the checkpoint
provided by a [reactive subscription](#reactive-subscriptions) any way you like, Occurrent provides an interface
called `org.occurrent.subscription.api.reactor.CheckpointStorage` acts as a uniform abstraction for this purpose. A `CheckpointStorage` 
is defined like this:

```java
public interface CheckpointStorage {
    Mono<Checkpoint> read(String subscriptionId);
    Mono<Checkpoint> save(String subscriptionId, Checkpoint checkpoint);
    Mono<Void> delete(String subscriptionId);
}
```

I.e. it's a way to read/write/delete the `Checkpoint` for a given subscription. Occurrent ships two pre-defined reactive implementations:

1\. **ReactorCheckpointStorage**<br>
    Uses the [project reactor](https://projectreactor.io/) driver to store `Checkpoint`'s in MongoDB.
    {% include macros/subscription/reactor/mongodb/spring/storage/maven.md %}   
2\. **InMemoryCheckpointStorage**<br>
    Keeps `Checkpoint`'s in a `ConcurrentHashMap`, in the `org.occurrent.subscription.inmemory.reactor` package. It's the reactive twin of the [blocking `InMemoryCheckpointStorage`](#blocking-subscription-checkpoint-storage) and ships from the very same `occurrent-subscription-inmemory` artifact, as an optional class. The artifact declares `occurrent-subscription-api-reactor` (and with it reactor-core) as an `optional` dependency, so a blocking-only consumer never pulls in the reactive stack. Depend on both to use it:
    {% include macros/subscription/blocking/inmemory/impl/maven.md %}
    {% include macros/subscription/reactor/api/maven.md %}

If you want to roll your own implementation (feel free to contribute to the project if you do) you can depend on the "reactive subscription API" which contains the `CheckpointStorage` interface:

{% include macros/subscription/reactor/api/maven.md %}

Occurrent's own reactive subscription models, and any you write yourself, are checked against a leaf built on top of the blocking suites rather than a second copy of them. `BlockingSubscriptionOverReactive`, in `occurrent-tck-subscription-reactor`, wraps a reactor `SubscriptionModel` (plus `IntrospectableSubscriptionModel`, and optionally `CheckpointAwareSubscriptionModel`) as a blocking one. Every blocking conformance suite (`SubscriptionModelConformance`, `IntrospectableSubscriptionModelConformance`, `CheckpointAwareSubscriptionModelConformance`) then runs against a reactor model unchanged, instead of being described a second time in terms of `Mono` and `Flux`. This bridge is test-only. Every wait blocks the calling thread, exactly what a reactive model exists to avoid, so it has no place outside a test.

A bridge that blocks on a result cannot see what happens before that block, so `ReactiveSubscriptionModelConformance` covers what is left. It asserts that the model actually subscribes to the `Mono<Void>` an action returns rather than assembling and dropping it. A handler written the idiomatic way, `ce -> repository.save(ce)`, silently does nothing under a model that gets this wrong. It asserts that an action whose `Mono` errors fails through the model's own error path instead of detonating somewhere unrelated or killing the model outright. And it asserts that `Subscription#waitUntilStarted()` answers more than once, and still after an earlier, abandoned wait was disposed of.

To wire an out-of-tree reactor model into both suites, supply a blocking fixture that wraps it in the bridge, and a reactive-only fixture that hands it over directly:

```java
class MySubscriptionModelFixture implements SubscriptionModelFixture {

    private final MySubscriptionModel model = new MySubscriptionModel();

    @Override
    public SubscriptionModel subscriptionModel() {
        return BlockingSubscriptionOverReactive.of(model);
    }

    @Override
    public void publish(List<CloudEvent> events) {
        // however the model is fed, e.g. a change stream write or an in-process dispatch
    }

    @Override
    public boolean deliversEventsPublishedWhilePaused() {
        return false;
    }

    @Override
    public boolean retriesAFailingHandler() {
        return false;
    }
}

class MySubscriptionModelConformanceTest extends SubscriptionModelConformance {

    @Override
    protected SubscriptionModelFixture createFixture() {
        return new MySubscriptionModelFixture();
    }
}

class MyReactiveSubscriptionModelFixture implements ReactiveSubscriptionModelFixture {

    private final MySubscriptionModel model = new MySubscriptionModel();

    @Override
    public SubscriptionModel subscriptionModel() {
        return model;
    }

    @Override
    public void publish(List<CloudEvent> events) {
        // the same feed as above, handed to the model directly rather than through the blocking bridge
    }
}

class MyReactiveSubscriptionModelConformanceTest extends ReactiveSubscriptionModelConformance {

    @Override
    protected ReactiveSubscriptionModelFixture createFixture() {
        return new MyReactiveSubscriptionModelFixture();
    }
}
```

`BlockingSubscriptionOverReactive.of(...)` needs a model that implements both the reactor `SubscriptionModel` and `IntrospectableSubscriptionModel`. Every reactive model shipping with Occurrent is both, and an out-of-tree one is likely to be too. Reach for `BlockingSubscriptionOverReactive.ofCheckpointAware(...)` instead when the model also implements `CheckpointAwareSubscriptionModel`, to additionally run `CheckpointAwareSubscriptionModelConformance` against it.

A single dependency covers both suites, since `occurrent-tck-subscription-reactor` depends on `occurrent-tck-subscription-blocking` itself:

{% include macros/tck/subscription/reactor/maven.md %}

### Reactive Subscription Implementations

These are the _non-durable_ [reactive subscription implementations](#reactive-subscriptions): 

**MongoDB**

* [Reactive subscription using Spring ReactiveMongoTemplate](#reactive-subscription-using-spring-reactivemongotemplate)
{% include macros/subscription/common/mongodb/oplog_warning.md %}

By "non-durable" we mean implementations that doesn't store the checkpoint in a durable storage automatically.  
It might be that the datastore does this automatically _or_ that [checkpoint storage](#reactive-subscription-checkpoint-storage) is not required
for your use case. If the datastore _doesn't_ support storing the checkpoint automatically, a subscription will typically implement the
`org.occurrent.subscription.api.reactor.CheckpointAwareSubscriptionModel` interface (since these types of subscriptions needs to be aware of the checkpoint).
However, you can do this anyway you like.
   
Typically, if you want the stream to continue where it left off on application restart you want to store away the checkpoint. You can do this anyway you like,
but for most cases you probably want to look into implementations of `org.occurrent.subscription.api.reactor.CheckpointStorage`. 
These subscriptions can be combined with a [checkpoint storage](#reactive-subscription-checkpoint-storage) implementation to store the checkpoint in a durable 
datastore. 

Occurrent provides a [utility](#durable-subscriptions-reactive) that combines a `CheckpointAwareSubscriptionModel` and 
a `ReactorCheckpointStorage` (see [here](#reactive-subscription-checkpoint-storage)) to automatically store the checkpoint   
_after each processed event_. If you don't want the checkpoint to be persisted after _every_ event, it's recommended to pick a 
[checkpoint storage](#reactive-subscription-checkpoint-storage) implementation, and store the checkpoint yourself when you find fit.

#### Reactive Subscription using Spring ReactiveMongoTemplate

An implementation that uses Spring's [ReactiveMongoTemplate](https://docs.spring.io/spring-data/data-mongo/docs/current/api/org/springframework/data/mongodb/core/ReactiveMongoTemplate.html) for 
event subscriptions. 

First include the following dependency:

{% include macros/subscription/reactor/mongodb/spring/impl/maven.md %}

Then create a new instance of `ReactorMongoSubscriptionModel` and start subscribing:

{% include macros/subscription/reactor/mongodb/spring/impl/example.md %}
<div class="comment">ReactorMongoSubscriptionModel can be imported from the "org.occurrent.subscription.mongodb.spring.reactor" package.</div>

The "eventCollectionName" specifies the event collection in MongoDB where events are stored. It's important that this collection is the same as the collection
used by the `EventStore` implementation. Secondly, we have the `TimeRepresentation.RFC_3339_STRING` that is passed as the third constructor argument, which you can read more about 
[here](#mongodb-time-representation). It's also very important that this is configured the same way as the `EventStore`.

It should also be noted that Spring takes care of re-attaching to MongoDB if there's a connection issue or other transient errors. This can be configured when creating the `ReactiveMongoTemplate` instance. 

Note that you can provide a [filter](#reactive-subscription-filters), [start position](#reactive-subscription-start-position) and [checkpoint persistence](#reactive-subscription-checkpoint-storage) for this subscription implementation.

#### Durable Subscriptions (Reactive)
 
Storing the checkpoint is useful if you need to resume a subscription from its last known checkpoint when restarting an application.
Occurrent provides a utility that combines a `CheckpointAwareSubscriptionModel` and a `ReactorCheckpointStorage` implementation 
(see [here](#reactive-subscription-checkpoint-storage)) to automatically store the checkpoint, by default,   
after each processed event. If you don't want the checkpoint to be persisted after _every_ event, you can control how often this should happen by supplying a predicate 
to `ReactorDurableSubscriptionModelConfig`. There's a pre-defined predicate, `org.occurrent.subscription.util.predicate.EveryN`, that allow   
the checkpoint to be stored for _every n_ event instead of simply _every_ event. There's also a shortcut, e.g. `new ReactorDurableSubscriptionModelConfig(3)` that 
creates an instance of `EveryN` that stores the checkpoint for every third event. 

To use it, first to add the following dependency:

{% include macros/subscription/reactor/util/autopersistence/maven.md %}

Then we should instantiate a `CheckpointAwareSubscriptionModel`, that subscribes to the events from the event store, and an instance of a `ReactorCheckpointStorage`, 
that stores the checkpoint, and combine them to a `ReactorDurableSubscriptionModel`: 

{% include macros/subscription/reactor/util/autopersistence/example.md %}  

#### Push Subscription (Reactive)

The reactive twin of the [blocking push subscription](#push-subscription-blocking). Use it when the writing application forwards events to a broker such as RabbitMQ or Kafka instead of a MongoDB change stream, and a reactive listener consumes them. `org.occurrent.subscription.push.reactor.PushSubscriptionModel` is a register-only `Subscribable` with no lifecycle, start position, checkpoint, catch-up, or replay.

First include the dependency:

```xml
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-subscription-push-reactor</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
```

Register it like any other `Subscribable`, for example with `ReactiveProjectionRunner` from Occurrent's `projection-dsl` module:

```java
PushSubscriptionModel pushModel = new PushSubscriptionModel();

ReactiveProjectionRunner.agnostic(pushModel, cloudEventConverter)
        .project("order-status", orderStatusProjection(), repository);
```

Reconstruct the `CloudEvent` from the CloudEvents JSON payload on the listener side, then hand it to the model:

```java
Mono<Void> onMessage(byte[] body) {
    CloudEvent cloudEvent = EventFormatProvider.getInstance()
            .resolveFormat(JsonFormat.CONTENT_TYPE)
            .deserialize(body);
    return pushModel.accept(cloudEvent);
}
```

`accept(CloudEvent)` returns a `Mono<Void>` and runs the matching handlers one after another. A handler error propagates through that `Mono`, so the caller decides whether to acknowledge, retry, or dead-letter the message. There's also an `accept(Iterable<CloudEvent>)` overload for delivering several events at once.

The same limits apply as on the blocking side. A push subscription only ever sees the live tail, and a broker is not a log, so a new or rebuilt projection can't be backfilled from the queue. Replay history from the event store first (see [EventStore Queries](#eventstore-queries) or the [catch-up subscription](#catch-up-subscription-blocking) pattern), then attach the push feed to keep it current.

The reactive `CatchupThenPushSubscriptionModel` automates that catch-up, the same way as the [blocking one](#push-subscription-blocking). Wrap it around the reactive push model with the reactive event store as the replay source, and register it through `ReactiveProjectionRunner`. It replays the history first, then hands over to the live feed with id de-duplication over the overlap, records a one-shot catch-up marker so a restart skips the replay, and leaves live-resume to the broker. Delivery is at-least-once, so keep the fold idempotent, and rebuild the projection if the consumer is offline longer than the broker retains the backlog.
## Synchronous Subscriptions

The subscriptions described so far are asynchronous. They run on their own thread, driven by a MongoDB change stream, a catch-up replay, or an in-memory background dispatcher, and they fire only after the write has committed. That is the right default for a read model that is allowed to lag the write slightly, and for anything that must survive a restart or run cluster-wide.

Sometimes you want the opposite. A synchronous subscription runs on the writer thread, before `execute` returns, so a projection is updated in the same call that produced the events, and (when a transaction is available) in the same transaction as the write. You declare it once, decoupled from the call site, exactly the way you declare an asynchronous subscription, but the application service invokes it inline on every matching write instead of off a change stream.

This mirrors the split Axon draws between a Subscribing Event Processor, which runs in the publishing thread inside the publish transaction and can roll it back, and a Tracking Event Processor, which runs on its own thread with a token store for replay. The synchronous-versus-asynchronous choice belongs to the subscription, not to the command, so there is no per-`execute` flag.

Reach for a synchronous subscription when the reaction must be visible the moment `execute` returns, or must commit atomically with the write. Keep using an asynchronous [subscription](#subscriptions) for anything that should run cluster-wide, replay from history, or survive a crash. Note also that this is a different tool from a [synchronous side effect](#synchronous-side-effects). A side effect is a per-call closure passed at the call site through `ExecuteOptions.sideEffect(...)`, whereas a synchronous subscription is declared once and reacts to every matching write, the same way an asynchronous subscription does.

### Semantics

* **Single writer, local only.** A synchronous subscription reacts only to events written through the local application-service instance, on that writer's thread. It does not see events written by another instance or through a different path. For cluster-wide reaction, use an asynchronous subscription.
* **No replay or catch-up.** There is no checkpoint, resume, or catch-up. A synchronous subscription reacts only to the events handed to it here and now.
* **Enriched events.** The handler receives the just-written events as the store recorded them, carrying `streamVersion` and the global `position`, so `EventMetadata` is fully populated and filters work on every attribute.
* **No free lunch.** Enabling synchronous subscriptions adds one read per event-producing write, to recover the global `position` for the handler. You pay it only while at least one synchronous subscription is registered. An application that declares none does exactly what it did before, with no extra read.
* **Reentrancy and latency.** The handler runs on the writer thread, inside the transaction when there is one, so a handler that calls `execute` again re-enters on the same thread, and a slow handler directly increases write latency and lock-hold time. Keep synchronous handlers small, and do not let one issue a command that re-triggers itself.

### The transaction model

By default a synchronous subscription is best-effort. The handler runs before `execute` returns, but the write has already committed, so a handler that throws does not roll it back. The events stay, and `execute` still surfaces the exception. This is the deliberate trade for running in the write path with no transaction.

To make the write and the handlers commit or roll back together, configure a `TransactionExecutor` (`org.occurrent.application.service.TransactionExecutor`, in the `occurrent-application-service-common` module) on the application service. It defaults to `TransactionExecutor.noTransaction()`, a pass-through. Two real executors ship:

* **Spring.** The [Spring Boot Starter](#spring-boot-starter) wires a `SpringTransactionExecutor` (backed by `TransactionTemplate`, or `TransactionalOperator` on the reactive starter) by default, so a `@SynchronousSubscription` handler that writes to the same MongoDB commits atomically with the event write, without a call-site `@Transactional`.
* **Native, no Spring.** `NativeMongoTransactionExecutor` (module `occurrent-application-service-transaction-mongodb-native`) opens a MongoDB `ClientSession` and transaction that the native event store's write joins, giving a no-Spring application the same atomic guarantee.

A handler's own `@Transactional` composes with this. On the same datastore it joins the write's transaction, so the two are atomic. On a different datastore it opens its own transaction, which commits independently and is never atomic with the event write, because there is no distributed transaction. For a handler's `@Transactional` to take effect at all, the annotation processor invokes the handler through its Spring proxy rather than the raw target.

The executor also owns the transaction it opens, which makes it the place a write conflict gets retried. See [Retry and Transactions](#retry-and-transactions).

Best-effort against transactional, side by side:

| | With a `TransactionExecutor` (for example Spring) | `noTransaction()` (best-effort default) |
|---|---|---|
| Handler runs | before commit, in the write transaction | after the store already committed |
| Handler throws | write and handler roll back together | events stay committed, `execute` still throws |
| Crash mid-way | nothing committed, safe | the reaction can be lost, with no replay |
| Guarantee | atomic, exactly-once with the write | synchronous, at-most-once, no rollback |

If handler side effects matter, prefer a `TransactionExecutor`. The best-effort default is a real footgun, because an `execute` exception then means the write may already have succeeded.

### Without Spring

Register handlers on a `SynchronousSubscriptionModel` through the ordinary [Subscription DSL](#subscription-dsl), then hand that model to the application-service builder. The blocking model is in `occurrent-subscription-synchronous-blocking`, and its reactive twin in `occurrent-subscription-synchronous-reactor`.

{% capture java %}
SynchronousSubscriptionModel synchronous = new SynchronousSubscriptionModel();

// Declare the handlers once, through the same Subscriptions DSL used for async subscriptions.
Subscriptions<DomainEvent> subscriptions = new Subscriptions<>(synchronous, cloudEventConverter);
subscriptions.subscribe("ongoing-games", GameStarted.class, event -> someDatabase.registerOngoing(event));

// Drive them from the application service, atomically via a ClientSession-backed executor.
ApplicationService<DomainEvent> applicationService =
        GenericApplicationService.builder(eventStore, cloudEventConverter)
                .synchronousSubscriptions(synchronous)
                .transactionExecutor(new NativeMongoTransactionExecutor(mongoClient)) // optional, defaults to noTransaction()
                .build();
{% endcapture %}
{% capture kotlin %}
val synchronous = SynchronousSubscriptionModel()

// Declare the handlers once, through the same Subscriptions DSL used for async subscriptions.
subscriptions(synchronous, cloudEventConverter) {
    subscribe<GameStarted>("ongoing-games") { event -> someDatabase.registerOngoing(event) }
}

// Drive them from the application service, atomically via a ClientSession-backed executor.
val applicationService = GenericApplicationService.builder(eventStore, cloudEventConverter)
    .synchronousSubscriptions(synchronous)
    .transactionExecutor(NativeMongoTransactionExecutor(mongoClient)) // optional, defaults to noTransaction()
    .build()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Leave the `transactionExecutor(...)` call off to run best-effort with no transaction. The same builder and DSL exist on the reactive stack (a `ReactiveTransactionExecutor` and the reactive `SynchronousSubscriptionModel`) and on the DCB application services.

### With Spring Boot

Annotate a handler method with `@SynchronousSubscription` (`org.occurrent.annotation.SynchronousSubscription`). It is the synchronous counterpart of [`@Subscription`](#spring-boot-annotations) and carries only an `id` and optional `eventTypes`, none of the asynchronous-only knobs (`startAt`, `resumeBehavior`, `startupMode`), which have no meaning for at-write-time dispatch.

{% capture java %}
@Component
public class OngoingGamesProjection {

    // Runs on the writer thread, before execute() returns. With the starter's default
    // transaction executor, it commits atomically with the event write.
    @SynchronousSubscription(id = "ongoing-games")
    public void on(GameStarted event) {
        someDatabase.registerOngoing(event);
    }
}
{% endcapture %}
{% capture kotlin %}
@Component
class OngoingGamesProjection(private val someDatabase: Database) {

    // Runs on the writer thread, before execute() returns. With the starter's default
    // transaction executor, it commits atomically with the event write.
    @SynchronousSubscription(id = "ongoing-games")
    fun on(event: GameStarted) {
        someDatabase.registerOngoing(event)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Because the starter wires a Spring-backed `TransactionExecutor` by default, the handler above already commits atomically with the event write. Add `@Transactional` to the method to compose your own transaction on top. On the same MongoDB it joins the write's transaction, and on a different datastore it commits independently.

# Decider

As of version 0.17.0, Occurrent has basic support for [Deciders](https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider). 
A decider is a model that can be used as a structured way of implementing decision logic for a business entity (typically aggregate) or use case/command.
Some benefits of using deciders are:
1. You don't need to implement any folding of events to state yourself.
2. You get a good structure for defining your aggregate/use case.
3. A decider can return either the new events, the new state, or both events and state (called `Decision` in Occurrent), for a specific command.
4. Occurrent's decider implementation supports sending multiple commands to a decider atomically.
5. Deciders are combinable. You can widen a decider to broader command and event types with `adapt`, and combine several feature deciders into one with `compose` (see [Combining Deciders](#combining-deciders)).

The decider folds the stream to its current state on every command. When that stream grows long enough that the fold becomes too slow, you can accelerate it with a [snapshot](#snapshots), which folds only the events written since a saved state.

To use a decider, you need to model your commands as explicit data structures instead of functions.


To create a decider, first include the dependency:

{% include macros/decider/maven.md %}

You can then either implement the `org.occurrent.dsl.decider.Decider` interface or use the default implementation (see more below). The interface is defined like this:

```java
public interface Decider<C, S, E> {
    S initialState();

    @NotNull
    List<E> decide(@NotNull C command, S state);

    S evolve(S state, @NotNull E event);

    default boolean isTerminal(S state) {
        return false;
    }
}
```

where:

| Parameter Type | Description                                          |
|----------------|------------------------------------------------------|
| C              | The type of the commands that the decider can handle |
| S              | The state that the decider works with                |
| E              | The type of events that the decider returns          |


The interface contains four methods:

| Method name  | Description                                                                                                                                                          |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| initialState | Returns the initial state of the decider, for example `null` or something like "`NotStarted`" (a domain specific state implemented by you), depending on your domain |
| decide       | A function that takes a command and the current state and returns a list of new events that represents the changes the occurred after the commands was handled       |
| evolve       | A method that takes the current state and an event, and return an update state after applying this event                                                             |
| isTerminal   | An optional method that can be implemented/overridden to tell the Decider to stop evolving the state if the Decider has reached a specific state                     |

It's highly recommended to read [this](https://thinkbeforecoding.com/post/2021/12/17/functional-event-sourcing-decider) blog post to get a better understanding of the rationale behind Deciders. 

But you don't actually need to implement this interface yourself, instead you can create a default implementation by passing in functions to `Decider.create(..)`.

Imagine that you have commands, events and state defined like this:

{% include macros/decider/example_events_state_cmd.md %}

Then you can create a decider like this:

{% include macros/decider/example_create.md %}

Now that you have an instance of `Decider`, you can then call any of the many default methods to return either the name state, the new events, or both. For example:

{% include macros/decider/example_usage.md %}

## Using an ApplicationService with Decider's

It's possible to integrate [Decider's](#decider) with an [ApplicationService](#application-service) to easily load existing events from an [event store](#eventstore).

### Java<a id="application-service-decider-java"></a>

To use the existing [ApplicationService](#application-service) infrastructure with Deciders from Java, wrap it in a `DeciderApplicationService`, the Java counterpart to the Kotlin `execute(streamId, command, decider)` extension:

```java
ApplicationService<Event> applicationService = ...
Command command = ...

var deciderApplicationService = new DeciderApplicationService<>(applicationService);
var writeResult = deciderApplicationService.execute("streamId", command, decider);
```

The decider's event type must match the application service's event type. If the decider only handles a subset of the events, for example one feature's events while the application service handles them all, convert it to the service's event type first with `Decider.adapt(...)`. If you would rather not introduce the facade, the decider works with a `List<Event>`, which is exactly what the `ApplicationService` expects, so you can pass the decision function straight to `execute`:

```java
var writeResult = applicationService.execute("streamId", events -> decider.decideOnEventsAndReturnEvents(events, command));
```


### Kotlin<a id="application-service-decider-kotlin"></a>

The `org.occurrent:occurrent-decider` module contains Kotlin extension functions, located in the `org.occurrent.dsl.decider.ApplicationServiceDeciderExtensions.kt` file, that allows you to easily integrate deciders
with existing [ApplicationService](#application-service) infrastructure. Here's an example:

```kotlin
import org.occurrent.dsl.decider.execute

// Create the application service and decider
val applicationService = ...
val decider = ... 

// Then you can pass the decider and command to the application service instance 
val writeResult = applicationService.execute(streamId, command, decider)
```

It's also possible to return the decision, state or new events when calling execute:

```kotlin
import org.occurrent.dsl.decider.executeAndReturnDecision
import org.occurrent.dsl.decider.executeAndReturnState
import org.occurrent.dsl.decider.executeAndReturnEvents

// Invoke the decider with the command and return both state and new events (decision) 
val decision = applicationService.executeAndReturnDecision(streamId, command, decider)
// Invoke the decider with the command and return the new state
val state = applicationService.executeAndReturnState(streamId, command, decider)
// Invoke the decider with the command and return the new events
val newEvents = applicationService.executeAndReturnEvents(streamId, command, decider)
```
           
## Combining Deciders

As of version 0.20.5 deciders are combinable. You can write one small decider per feature, each over its own command, state, and event
types, and combine them into a larger decider without losing the type safety of the small ones. The combinators live in the
`org.occurrent:occurrent-decider` module.

### Widening a decider with `adapt`

A feature decider is usually written over its own narrow types, for example `Decider<CourseCommand, CourseState, CourseEvent>`, while an
`ApplicationService` is over the broadest event type in your domain. `adapt` widens a decider to the shared supertypes, ignoring foreign
events and treating foreign commands as no-ops.

From Java you pass the narrow command and event types as `Class` tokens. In Kotlin it is a `reified` extension, so the narrow types
come from the receiver and the broad types from the call site, and you just write `courseDecider.adapt()`:

{% capture java %}
// courseDecider is a Decider<CourseCommand, CourseState, CourseEvent>, but the application service
// works with the whole domain's commands and events.
Decider<DomainCommand, CourseState, DomainEvent> widened =
        Decider.adapt(courseDecider, CourseCommand.class, CourseEvent.class);
{% endcapture %}
{% capture kotlin %}
import org.occurrent.dsl.decider.adapt

// courseDecider: Decider<CourseCommand, CourseState, CourseEvent>
val widened: Decider<DomainCommand, CourseState, DomainEvent> = courseDecider.adapt()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Combining with `compose`

`compose` merges several feature deciders into one whose state is the product of the individual states. A command is routed to whichever
decider recognizes it, each event updates only its own decider's state, and the composed decider is terminal once every part is.

In Kotlin the two and three decider forms adapt each decider for you and return a typed `Pair` or `Triple`, so you can pass the feature
deciders directly. In Java, and in Kotlin for four or more deciders, the state is a `CompositeState` and you widen each decider with `adapt`
first and read each slice back by the order the deciders were passed in:

{% capture java %}
// Widen each decider, then compose. The combined state is a CompositeState, read each slice back by position.
Decider<DomainCommand, CompositeState, DomainEvent> combined = Decider.compose(
        Decider.adapt(courseDecider, CourseCommand.class, CourseEvent.class),
        Decider.adapt(studentDecider, StudentCommand.class, StudentEvent.class));

CompositeState state = combined.initialState();
CourseState course = state.slice(0);
StudentState student = state.slice(1);
{% endcapture %}
{% capture kotlin %}
import org.occurrent.dsl.decider.compose

// Two deciders, adapted for you, state is a Pair
val twoDeciders: Decider<DomainCommand, Pair<CourseState, StudentState>, DomainEvent> =
        compose(courseDecider, studentDecider)

// Three deciders, adapted for you, state is a Triple
val threeDeciders: Decider<DomainCommand, Triple<CourseState, StudentState, EnrollmentState>, DomainEvent> =
        compose(courseDecider, studentDecider, enrollmentDecider)

// The two decider case also has an infix form
val infix = courseDecider compose studentDecider

// Four or more: widen each with adapt yourself, state is a CompositeState, read a slice with slice(index)
val many: Decider<DomainCommand, CompositeState, DomainEvent> =
        compose(courseDecider.adapt(), studentDecider.adapt(), enrollmentDecider.adapt(), roomDecider.adapt())
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The typed `Pair` and `Triple` results are Kotlin only. In Java `compose` always yields a `CompositeState`. `compose` requires at least two deciders and throws `IllegalArgumentException` if given fewer, since composing zero or one would build a degenerate decider that combines nothing.

### Passing a feature decider to an ApplicationService

The Kotlin `execute` extensions widen a decider's event type for you, so a feature decider over its own narrow event type can go straight
to an `ApplicationService` over a broader event type, without calling `adapt` first. From Java you widen the decider with `adapt` and then
use it the same way as the [Java decider example above](#application-service-decider-java):

{% capture java %}
// applicationService: ApplicationService<DomainEvent>, courseDecider: Decider<CourseCommand, CourseState, CourseEvent>
Decider<DomainCommand, CourseState, DomainEvent> widened =
        Decider.adapt(courseDecider, CourseCommand.class, CourseEvent.class);
var writeResult = applicationService.execute("streamId", events -> widened.decideOnEventsAndReturnEvents(events, command));
{% endcapture %}
{% capture kotlin %}
import org.occurrent.dsl.decider.execute

// applicationService: ApplicationService<DomainEvent>, courseDecider: Decider<CourseCommand, CourseState, CourseEvent>
// The execute extension widens the decider's event type for you, so no adapt is needed.
val writeResult = applicationService.execute(streamId, command, courseDecider)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

If you only need to widen the event type yourself, there is `adaptEvents`, the event-only counterpart to `adapt`.


# Dynamic Consistency Boundary

Most invariants live inside a single entity: an order cannot ship twice, an account cannot go negative. Occurrent's stream event store handles those well, because a stream is exactly the boundary the invariant needs.

Some invariants do not respect a single stream. Take a course-enrollment system: a student can enroll in a course only if the course still has a free seat, and only if the student has not already reached the maximum number of courses they are allowed to take at once. The first half of that rule lives on the course. The second half lives on the student. Classic domain-driven design pushes you toward picking one aggregate to own the rule, inventing a saga, or accepting eventual consistency to bridge the two. Dynamic Consistency Boundary (DCB) removes the need for any of that. It lets a single decision read events from both the course and the student, and append its result under one atomic, conditional write that is guarded against both invariants at once.

DCB is not a different storage model bolted onto Occurrent. It is a capability layered on the same CloudEvent storage you already use for streams, not a new store and not a new event format. A DCB event is a normal CloudEvent. What makes it a DCB event is two extensions the store stamps on it: `dcbtags`, a canonical encoding of the event's DCB tags, and `position`, the same shared global sequence position extension that stream reads use once stream position is enabled. Because the position is shared, stream consumers and subscriptions still see a DCB event, and a store can freely mix stream-written and DCB-written events, reading either with whichever vocabulary fits the decision at hand.

## Enabling DCB

An event store advertises which of its APIs are switched on through a set of `EventStoreCapability` values, `STREAM`, `DCB`, or both. The default is `STREAM` only, so an existing application that has never heard of DCB keeps behaving exactly as before, with no new indexes and no new guards added underneath it. Turning DCB on is a deliberate opt-in on the store's configuration (for example `EventStoreConfig.Builder.eventStoreCapabilities(...)` on the MongoDB stores), and a store can enable both `STREAM` and `DCB` at once if an application wants to keep using streams for some entities and DCB for others.

## Tags and Criteria

A `Tag` is an opaque string. Build the common `key:value` form with `Tag.of("course", courseId)`, or a value-less marker tag with `Tag.of("premium")`. `Tag.parse` reads a tag back from its string form, and `canonical()` returns it. Tags are how you scope events to a consistency boundary without threading a stream id through the model.

A `DcbCriteria` describes which events belong to a boundary. Build one alternative with `DcbCriteria.type(...)`, `DcbCriteria.types(...)`, or `DcbCriteria.tags(...)`, then refine it fluently. Inside one alternative, types are matched any-of and tags are matched all-of, so `DcbCriteria.type("StudentEnrolledInCourse").tags(course, student)` reads as "this type, and both of these tags together". `excludingTypes` removes matching events whose type is in that set. Several alternatives are OR'd together with `DcbCriteria.anyOf(...)`, and `DcbCriteria.tagsAnyOf(...)` is a shortcut for OR-ing several single-tag alternatives.

{% capture java %}
Tag course = Tag.of("course", courseId);
Tag student = Tag.of("student", studentId);

// One alternative: this type, and both tags together (all-of)
DcbCriterion enrollment = DcbCriteria.type("StudentEnrolledInCourse").tags(course, student);

// Two alternatives OR'd together: the course's own events, or the student's own events
DcbCriteria boundary = DcbCriteria.anyOf(
        DcbCriteria.type("CourseDefined").tags(course),
        DcbCriteria.type("StudentRegistered").tags(student)
);

// Shortcut for OR-ing single-tag alternatives
DcbCriteria eitherEntity = DcbCriteria.tagsAnyOf(course, student);

// Course events, but never a cancellation
DcbCriterion activeCourse = DcbCriteria.type("CourseDefined").excludingTypes("CourseCancelled");
{% endcapture %}
{% capture kotlin %}
val course = Tag.of("course", courseId)
val student = Tag.of("student", studentId)

// One alternative: this type, and both tags together (all-of)
val enrollment = DcbCriteria.type("StudentEnrolledInCourse").tags(course, student)

// Two alternatives OR'd together: the course's own events, or the student's own events
val boundary = DcbCriteria.anyOf(
    DcbCriteria.type("CourseDefined").tags(course),
    DcbCriteria.type("StudentRegistered").tags(student)
)

// Shortcut for OR-ing single-tag alternatives
val eitherEntity = DcbCriteria.tagsAnyOf(course, student)

// Course events, but never a cancellation
val activeCourse = DcbCriteria.type("CourseDefined").excludingTypes("CourseCancelled")
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The type names above are strings, which is convenient but unchecked. If you would rather build criteria from your event classes, a
`DcbCriteriaBuilder` maps each class to its CloudEvent type name for you. Construct one from a `CloudEventConverter` (or a `CloudEventTypeMapper`),
then call `type(...)`, `types(...)`, `tags(...)`, `tagsAnyOf(...)`, `anyOf(...)`, or `all()` on it with event classes in place of the type strings. It
produces the same `DcbCriteria`, only spelled with `Class` references, and it is what the DCB DSL uses under the hood through its `criteria()` helper.

{% capture java %}
// A DcbCriteriaBuilder maps event classes to their CloudEvent type names
DcbCriteriaBuilder<DomainEvent> c = new DcbCriteriaBuilder<>(cloudEventConverter);

DcbCriterion enrollment = c.type(StudentEnrolledInCourse.class).tags(course, student);
DcbCriteria boundary = c.anyOf(
        c.type(CourseDefined.class).tags(course),
        c.type(StudentRegistered.class).tags(student)
);
{% endcapture %}
{% capture kotlin %}
// DcbSubscriptions and DcbDomainEventQueries hand you a converter-bound builder via criteria()
val c = dcbDomainEventQueries.criteria()

val enrollment = c.type<StudentEnrolledInCourse>().tags(course, student)
val boundary = c.anyOf(
    c.type<CourseDefined>().tags(course),
    c.type<StudentRegistered>().tags(student)
)

// Multiple types in one alternative (any-of), reified or via KClass
val enrollmentOrUnenrollment = c.types<StudentEnrolledInCourse, StudentUnenrolledFromCourse>()
val enrollmentOrUnenrollmentByClass = c.types(StudentEnrolledInCourse::class, StudentUnenrolledFromCourse::class)

// Seed the builder with a shared boundary, then add query-specific types.
// This refines the boundary's tags with these types, it does not OR across alternatives.
val studentBoundary: DcbCriterion = DcbCriteria.tags(student)
val studentEnrollmentEvents = dcbDomainEventQueries.criteria(studentBoundary).types<StudentEnrolledInCourse, StudentUnenrolledFromCourse>()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

## The DCB Event Store

`DcbEventStore` is the low-level API. `read(criteria)` returns a `DcbEventStream`, `exists(criteria)` and `count(criteria)` answer cheaper yes-or-no and how-many questions over the same criteria, and `append(events)` or `append(events, condition)` writes DCB-tagged CloudEvents.

The read-decide-append cycle is how you use it directly, without an application service. Read the events for your boundary. The returned `DcbEventStream` carries both the events and a `DcbConsistencyToken`. Decide the new events from what you read, then append them under a `DcbAppendCondition.failIfEventsMatch(criteria, consistencyToken)`. That condition fails the append with a `DcbAppendConditionNotFulfilledException` if anything matching your boundary was committed after your read, and that exception is your signal to retry the whole cycle. To fail on any concurrent append at all, rather than one matching a specific boundary, use `DcbAppendCondition.wholeStoreLock()` (or `wholeStoreLock(consistencyToken)`). It is the intent-revealing form of `failIfEventsMatch(DcbCriteria.all())` and is the recommended way to express a whole-store lock.

{% capture java %}
DcbCriteria boundary = DcbCriteria.tagsAnyOf(Tag.of("course", courseId), Tag.of("student", studentId));

DcbEventStream stream = eventStore.read(boundary);
List<CloudEvent> currentEvents = stream.events();

// Decide the new events from what is currently true for this boundary
List<CloudEvent> newEvents = decideEnrollment(currentEvents, courseId, studentId);

DcbAppendCondition condition = DcbAppendCondition.failIfEventsMatch(boundary, stream.consistencyToken());
try {
    DcbAppendResult result = eventStore.append(newEvents, condition);
} catch (DcbAppendConditionNotFulfilledException e) {
    // Something matching the boundary was committed after the read, retry the cycle
}
{% endcapture %}
{% capture kotlin %}
val boundary = DcbCriteria.tagsAnyOf(Tag.of("course", courseId), Tag.of("student", studentId))

val stream = eventStore.read(boundary)
val currentEvents = stream.events()

// Decide the new events from what is currently true for this boundary
val newEvents = decideEnrollment(currentEvents, courseId, studentId)

val condition = DcbAppendCondition.failIfEventsMatch(boundary, stream.consistencyToken())
try {
    val result = eventStore.append(newEvents, condition)
} catch (e: DcbAppendConditionNotFulfilledException) {
    // Something matching the boundary was committed after the read, retry the cycle
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Reading part of a boundary {#dcb-read-options}

`read`, `exists` and `count` each take an optional `DcbReadOptions` with a position window. A read can also select part of the matching events with a `direction`, `skip` and `limit`. `exists` and `count` use the criteria and position window, but ignore those three selection options.

The position window is what a catch-up or a resumed subscription uses. `DcbReadOptions.afterPosition(p)` reads only what was appended after DCB sequence position `p`, `upToPosition(p)` stops at `p` inclusive, and `between(after, upTo)` does both. Without options you get `fromBeginning()`, everything up to the store's DCB head at read time.

Direction decides which end of the match selection starts from. `FORWARD` starts with the oldest matching event, while `BACKWARD` starts with the newest. The store skips from that end and then applies the limit. `DcbReadOptions.fromBeginning().backwards().limit(1)` reads the single newest event in a boundary, while adding `skip(4)` reads the fifth newest. This is how a gapless sequence finds its last entry without folding the whole boundary.

{% capture java %}
DcbCriteria boundary = DcbCriteria.tagsAnyOf(Tag.of("invoice-sequence", "2026"));

// The newest matching event, without reading the rest
DcbEventStream last = eventStore.read(boundary, DcbReadOptions.fromBeginning().backwards().limit(1));

// Ten events after the five newest matches, inside a position window
DcbReadOptions options = DcbReadOptions.afterPosition(1000).backwards().skip(5).limit(10);
DcbEventStream recent = eventStore.read(boundary, options);
{% endcapture %}
{% capture kotlin %}
val boundary = DcbCriteria.tagsAnyOf(Tag.of("invoice-sequence", "2026"))

// The newest matching event, without reading the rest
val last = eventStore.read(boundary, DcbReadOptions.fromBeginning().backwards().limit(1))

// Ten events after the five newest matches, inside a position window
val options = DcbReadOptions.afterPosition(1000).backwards().skip(5).limit(10)
val recent = eventStore.read(boundary, options)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Three things about these options are easy to get wrong, so they are worth stating plainly.

**Direction never changes the order you get back.** A `DcbEventStream` always lists events ascending by DCB position. `BACKWARD` decides which end `skip` and `limit` start from. Read 10 events backwards and you get the 10 newest, still oldest-first.

**Skip happens before limit.** `backwards().skip(4).limit(1)` skips the four newest matches and returns the fifth newest. A large MongoDB skip can be expensive, so use position windows for catch-up and large scans.

**Direction, skip and limit do not affect the consistency token.** The token reflects every event matching the criteria at read time, not the handful you asked for. A read using `fromBeginning().backwards().limit(1)` followed by a `failIfEventsMatch(boundary, token)` append still fails if anything else landed in that boundary, including events the read never returned.

## The DCB Application Service

Running that cycle by hand for every command gets repetitive, and it is easy to forget the retry. `DcbApplicationService` does the read, decide, tag, and append for you, retrying automatically on a `DcbAppendConditionNotFulfilledException` (five attempts by default, with exponential backoff). `execute(criteria, fn)` reads the events matching `criteria`, hands them to your function, converts and tags whatever new domain events it returns, and appends them under the same boundary. The service needs a way to derive DCB tags for the events it appends, supplied once as a `TagGenerator` when constructing `GenericDcbApplicationService`, or per call through `DcbExecuteOptions.tagGenerator(...)`. That built-in retry sits inside whatever transaction is open around `execute`, so if you open one yourself, retry at your own boundary instead. See [Retry and Transactions](#retry-and-transactions).

The Java signature returns `Optional<DcbAppendResult>`, empty when your function decided there was nothing to do. The Kotlin extension `executeOrNull` returns a nullable `DcbAppendResult` instead, so a no-op command reads as `null` rather than an `Optional`.

When a boundary matches many events and folding them on every command becomes too slow, you can accelerate it with a [DCB snapshot](#dcb-snapshots).

{% capture java %}
DcbCriteria boundary = DcbCriteria.tagsAnyOf(Tag.of("course", courseId), Tag.of("student", studentId));

Optional<DcbAppendResult> result = applicationService.execute(boundary, events -> {
    if (isCourseFull(events, courseId) || isStudentAtEnrollmentLimit(events, studentId)) {
        return List.of();
    }
    return List.of(new StudentEnrolledInCourse(courseId, studentId));
});
{% endcapture %}
{% capture kotlin %}
val boundary = DcbCriteria.tagsAnyOf(Tag.of("course", courseId), Tag.of("student", studentId))

val result: DcbAppendResult? = applicationService.executeOrNull(boundary) { events ->
    if (isCourseFull(events, courseId) || isStudentAtEnrollmentLimit(events, studentId)) {
        emptyList()
    } else {
        listOf(StudentEnrolledInCourse(courseId, studentId))
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

## Deriving Tags From Annotations

Hand-writing a `TagGenerator` works, but for the common case, where an event's own fields are the tag values, `AnnotationTagGenerator` derives one from `@DcbTag`. Annotate a record component, field, or no-arg getter. The tag key comes from `@DcbTag`'s `value` (or its alias `key`), and falls back to the member's own name when neither is set. The tag value is the member's runtime value converted with `toString()`. A null or blank value skips that tag rather than failing.

{% capture java %}
public record StudentEnrolledInCourse(
        @DcbTag("course") String courseId,
        @DcbTag("student") String studentId) {
}

TagGenerator<StudentEnrolledInCourse> tagGenerator = new AnnotationTagGenerator<>();
// tagGenerator.tags(event) returns {Tag.of("course", courseId), Tag.of("student", studentId)}
{% endcapture %}
{% capture kotlin %}
// On a Kotlin data class, apply @DcbTag to the generated getter with the @get use-site target
data class StudentEnrolledInCourse(
    @get:DcbTag("course") val courseId: String,
    @get:DcbTag("student") val studentId: String
)

val tagGenerator: TagGenerator<StudentEnrolledInCourse> = AnnotationTagGenerator()
// tagGenerator.tags(event) returns setOf(Tag.of("course", courseId), Tag.of("student", studentId))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

## Coupling a Decider to a Boundary

A `DcbDecider` couples three things a feature would otherwise have to keep in sync by hand: the plain `Decider` (decide and evolve), a function from command to the `DcbCriteria` boundary that command needs, and a `TagGenerator` for the events it emits. Build one with `DcbDecider.create(...)` (or `DcbDecider.from` around an existing `Decider`), or the Kotlin `dcbDecider(...)` factory, which reads a little more naturally at the call site. In Kotlin you can also turn an existing `Decider` into a `DcbDecider` with the `toDcb { ... }` extension, supplying the `criteria` and `tags` for the boundary.

Once a decider is a `DcbDecider`, it is self-describing: given a command, it knows both what to decide and where to read from. Running it is a single call, the Kotlin DSL's `execute(command, dcbDecider)` or, from Java, a `DcbDeciderApplicationService` wrapping the DCB application service. Either one asks the decider for the command's boundary, reads the matching events, decides, tags the new events with the decider's own `TagGenerator`, and appends, all without you naming a `DcbCriteria` at the call site.

{% capture java %}
DcbDecider<EnrollStudent, EnrollmentState, DomainEvent> enrollmentDecider = DcbDecider.create(
        new EnrollmentState(),
        (command, state) -> decide(command, state),
        (state, event) -> evolve(state, event),
        command -> DcbCriteria.tagsAnyOf(Tag.of("course", command.courseId()), Tag.of("student", command.studentId())),
        event -> tagsFor(event)
);

// DcbDeciderApplicationService resolves the boundary, decides, tags, and appends in one call
var deciderApplicationService = new DcbDeciderApplicationService<>(applicationService);
Optional<DcbAppendResult> result = deciderApplicationService.execute(
        new EnrollStudent(courseId, studentId),
        enrollmentDecider);
{% endcapture %}
{% capture kotlin %}
val enrollmentDcbDecider: DcbDecider<EnrollStudent, EnrollmentState, DomainEvent> = dcbDecider(
    initialState = EnrollmentState(),
    decide = ::decide,
    evolve = ::evolve,
    criteria = { command -> DcbCriteria.tagsAnyOf(Tag.of("course", command.courseId), Tag.of("student", command.studentId)) },
    tags = { event -> tagsFor(event) }
)

// execute(command, dcbDecider) resolves the boundary, decides, tags, and appends in one call
val result: DcbAppendResult? = applicationService.execute(
    EnrollStudent(courseId, studentId),
    enrollmentDcbDecider
)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

## Subscribing to DCB Events

A DCB read model needs to see DCB events as they are written, and for a durable one, catch up on history first. `@DcbSubscription` is the declarative, framework-managed way to do that. It is the DCB counterpart to `@StreamSubscription`, filtering by event types and tags instead of an Occurrent `Filter`, and starting at a `position` instead of a time.

For an ephemeral, per-connection subscription you start and cancel by hand, a Server-Sent-Events feed scoped to one request, for example, inject the `DcbSubscriptions` DSL instead and call `subscribe` (or the Kotlin `subscribeDcb`) directly, passing a `DcbCriteria` and a `DcbStartAt`. `DcbStartAt.beginning()` replays the whole DCB sequence by position before switching to live delivery, the same catch-up behavior `@DcbSubscription`'s `startAt = DcbStartPosition.BEGINNING` gives you declaratively.

{% capture java %}
@DcbSubscription(id = "courseDashboard", startAt = DcbStartPosition.BEGINNING)
void onEvent(CourseEvent event) {
    dashboard.update(event);
}
{% endcapture %}
{% capture kotlin %}
val subscriptions = DcbSubscriptions(subscriptionModel, cloudEventConverter)

subscriptions.subscribeDcb(
    subscriptionId = "courseDashboard-$connectionId",
    criteria = DcbCriteria.tags(Tag.of("course", courseId)),
    startAt = DcbStartAt.beginning()
) { event: CourseEvent ->
    dashboard.update(event)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

`@DcbSubscription` filters by the DCB query built from its `eventTypes` (matched as any-of, and taken from the handler's event parameter when left empty) and its `tags` (matched as all-of, each in `"key:value"` form and validated at startup so a malformed tag fails fast). `startAt = DcbStartPosition.BEGINNING` replays from the start of the DCB sequence, or use `startAtDcbPosition` to resume after a specific position instead.

{% capture java %}
@DcbSubscription(
        id = "courseDashboard",
        eventTypes = {CourseRegistered.class, StudentEnrolled.class},
        tags = {"course:123"},
        startAt = DcbStartPosition.BEGINNING)
void onEvent(CourseEvent event) {
    dashboard.update(event);
}
{% endcapture %}
{% capture kotlin %}
@DcbSubscription(
    id = "courseDashboard",
    eventTypes = [CourseRegistered::class, StudentEnrolled::class],
    tags = ["course:123"],
    startAt = DcbStartPosition.BEGINNING
)
fun onEvent(event: CourseEvent) {
    dashboard.update(event)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Reading DCB Metadata

A DCB subscription handler can read the event's metadata the same way a stream subscription can. Declare an `org.occurrent.cloudevents.EventMetadata` parameter for the generic parts (stream id, version, `position`, and any CloudEvent extension), or an `org.occurrent.dsl.dcb.DcbEventMetadata` parameter for a DCB-focused view that also exposes the event's tags and its position as an `OptionalLong`. `DcbEventMetadata` wraps an `EventMetadata`, so `eventMetadata()` always gets you back to the generic view. In Kotlin there is also a `dcbTags` extension property on `EventMetadata`, for handlers that take the generic type.

{% capture java %}
@DcbSubscription(id = "courseDashboard")
void onEvent(CourseEvent event, DcbEventMetadata metadata) {
    Set<Tag> tags = metadata.dcbTags();
    OptionalLong position = metadata.position();
    long streamVersion = metadata.eventMetadata().getStreamVersion();
    dashboard.update(event);
}
{% endcapture %}
{% capture kotlin %}
subscriptions.subscribeDcbWithMetadata(
    subscriptionId = "courseDashboard-$connectionId",
    criteria = DcbCriteria.tags(Tag.of("course", courseId))
) { metadata: DcbEventMetadata, event: CourseEvent ->
    val tags: Set<Tag> = metadata.dcbTags()
    val position = metadata.eventMetadata().position
    dashboard.update(event)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

## Reactive DCB

Everything above has a reactive counterpart, the same way Occurrent pairs a blocking and a reactive API everywhere else. `org.occurrent.eventstore.api.dcb.reactor.DcbEventStore` returns `Mono<DcbEventStream>` from `read` and `Mono<DcbAppendResult>` from `append`, using the same criteria, tags, and append-condition types as the blocking store. The reactive `DcbApplicationService.execute(criteria, fn)` returns a `Mono<DcbAppendResult>` that completes empty when the domain function produced no new events. The domain function itself stays a plain synchronous `Function<List<E>, List<E>>`, since deciding is a pure computation over a list the read has already materialized, only the read and the append are reactive. `DcbSubscriptions` has a Project Reactor variant too, so a live subscription or a from-the-beginning catch-up works the same way over `Flux` as it does over the blocking callback API.

## Notes

- Existing historical stream events are not automatically DCB-readable. A DCB read matches on the `dcbtags` extension, and a stream-written event never carries one, so history written before DCB was enabled needs its own tag metadata and a `position` backfill before a DCB query can see it.
- Enabling a capability can create indexes and other support structures on startup. Turning on `DCB` (or `STREAM`) for the first time on an existing store may add what that capability needs, so plan for that the same way you would for any other startup migration.

# Retry

## Retry Configuration (Blocking)

Occurrent contains a retry module that you can depend on using:

{% include macros/retry/blocking/maven.md %}
<div class="comment">Typically you don't need to depend on this module explicitly since many of Occurrent's components already uses this library under the hood and is thus depended on transitively.</div>

Occurrent components that support retry ([subscription model](#blocking-subscriptions) and [checkpoint storage](#blocking-subscription-checkpoint-storage) implementations)
typically accepts an instance of `org.occurrent.retry.RetryStrategy` to their constructors. This allows you to configure how they should do retry. You can configure max attempts, 
a retry predicate, error listener, before/after retry listener, as well as the backoff strategy. Here's an example:
  
```java
RetryStrategy retryStrategy = RetryStrategy
                                    .exponentialBackoff(Duration.ofMillis(100), Duration.ofSeconds(2), 2.0)
                                    .retryIf(UncategorizedSQLException.class::isInstance)
                                    .maxAttempts(5)
                                    .onBeforeRetry(throwable -> log.warn("Caught exception {}, will retry.", throwable.getClass().getSimpleName()))
                                    .onError((info, throwable) -> if(info.isLastAttempt()) log.error("Ended with exception {}.", throwable.getClass().getSimpleName()));
```

You can then use a `RetryStrategy` instance to call methods that you want to be retried on exception by using the `execute` method:

```java
RetryStrategy retryStrategy = ..
// Retry the method if it throws an exception
retryStrategy.execute(Something::somethingThing);
```
 
`RetryStrategy` is immutable, which means that you can safely do things like this:

```java
RetryStrategy retryStrategy = RetryStrategy.retry().fixed(200).maxAttempts(5);
// Uses default 200 ms fixed delay
retryStrategy.execute(() -> Something.something());
// Use 600 ms fixed delay
retryStrategy.backoff(fixed(600)).execute(() -> SomethingElse.somethingElse());
// 200 ms fixed delay again
retryStrategy.execute(() -> Thing.thing());
```
 
You can also disable retries by calling `RetryStrategy.none()`.

As of version 0.11.0 you can also use the `mapRetryPredicate` function easily allows you to map the current retry predicate into a new one. This is useful if you e.g. want to add a predicate to the existing predicate. For example:

```java
// Let's say you have a retry strategy:
RetryStrategy retry = RetryStrategy.exponentialBackoff(Duration.ofMillis(100), Duration.ofSeconds(2), 2.0f).maxAttempts(5).retryIf(WriteConditionNotFulfilledException.class::isInstance);
// Now you also want to retry if an IllegalArgumentException is thrown:
retry.mapRetryPredicate(currentRetryPredicate -> currentRetryPredicate.or(IllegalArgumentException.class::isInstance))
```

As of version 0.16.3, `RetryStrategy` now accepts a function that takes an instance of `org.occurrent.retry.RetryInfo`. This is useful if you need to know the current state of your of the retry while retrying. For example:

```java  
RetryStrategy retryStrategy = RetryStrategy
                              .exponentialBackoff(initialDelay, maxDelay, 2.0)
                              .maxAttempts(10)
retryStrategy.execute(info -> {
    if (info.getNumberOfAttempts() > 2 &&  info.getNumberOfAttempts() < 6) {
        System.out.println("Number of attempts is between 3 and 5");
    }
    ...     
});
```

## Retry and Transactions

A retry only works where it also owns the transaction, because only the code that began a transaction can begin a fresh one. A retry running inside somebody else's transaction spends its attempts on a transaction MongoDB already aborted at the first conflict, and every later attempt fails immediately on its first read. As of version {{site.occurrentversion}} Occurrent applies that rule across the whole write path.

The two Spring MongoDB event stores check for an active transaction before they retry. When they find one they run the write once and let the conflict reach whoever owns the transaction. That covers the DCB append conflict, the any-version write condition, and the global position counter's first write. The native driver store has always behaved this way when it finds an ambient `ClientSession`.

The retry the store gives up is taken over by the layer that does own the transaction. `SpringTransactionExecutor` and `SpringReactiveTransactionExecutor` retry a conflict around the transaction they open, and skip the retry when they are themselves joining a caller's transaction. That is what keeps a [synchronous subscription](#synchronous-subscriptions) setup retrying, since there Occurrent opens the transaction itself so the event write and the handlers commit together.

When neither the store nor an executor owns the transaction, nothing in Occurrent retries and the conflict reaches you right away. That is the intended outcome, and it means you have to retry at your own transaction boundary, outside the transaction rather than inside it. Catching the conflict and carrying on inside the same transaction does not work: a participating write that throws marks the surrounding transaction rollback-only, so a further attempt runs in a transaction whose inner commit is a no-op, and the outer commit then fails with `UnexpectedRollbackException` instead of giving you the partial success you expected. The same goes for the `RetryStrategy` you hand to `GenericApplicationService` or `GenericDcbApplicationService`, because it sits inside your transaction too.

With Spring Retry you get the right shape for free, since retry advice sits outside transaction advice and each attempt therefore runs a fresh transaction:

```kotlin
@Retryable(include = [DcbAppendConditionNotFulfilledException::class, DataIntegrityViolationException::class], maxAttempts = 5, backoff = Backoff(delay = 100, multiplier = 2.0, maxDelay = 1000))
operator fun invoke(gameId: GameId, timeOfGuess: Timestamp, playerId: PlayerId, word: Word) {
    applicationService.execute(GameDcbQueries.gameplay(gameId)) { events ->
        guessWord(events, timeOfGuess, playerId, word)
    }
}
```

`DataIntegrityViolationException` belongs in that list even though a write conflict is not an integrity violation. MongoDB labels the conflict `TransientTransactionError`, but Spring translates it to `DataIntegrityViolationException`, which is not one of Spring's transient types, so a retry predicate built on `TransientDataAccessException` alone misses the most common conflict there is. Both DCB versions of the [word guessing game](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/word-guessing-game) retry this way.

One consequence worth knowing when you read a failure. [ADR 21](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0021-dcb-write-path-query-scoped-concurrency.md) describes the global position counter as being updated outside the append transaction, which holds only while the store owns that transaction. When the store joins your transaction the counter update joins it as well, so one shared document becomes a conflict point for every concurrent append in that transaction, even for appends to boundaries that have nothing to do with each other. A nested append often loses on the counter before it ever reaches the append itself.

The full reasoning is in [ADR 74](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0074-retry-only-where-the-transaction-is-owned.md).

# DSL's

## Subscription DSL

The subscription DSL is a utility that you can use to easier create subscriptions by using a [CloudEventConverter](#cloudevent-conversion).
There's a both a Kotlin DSL and Java DSL. First you need to depend on the `subscription-dsl` module:

{% include macros/subscription/blocking/dsl/maven.md %}

As of version {{site.occurrentversion}} this DSL comes in three flavors that mirror the [subscription annotations](#spring-boot-annotations): `subscriptions(...)` builds a capability-neutral `Subscriptions` that delivers both stream and DCB events, `streamSubscriptions(...)` builds a stream-only `StreamSubscriptions`, and [`DcbSubscriptions`](#subscribing-to-dcb-events) (from the `dcb-dsl` module) subscribes to DCB events by tags and event types. The examples below use the neutral `subscriptions(...)`.

Which one to reach for: `subscriptions(...)` is the default, for a read model or policy that reacts to events by type and does not care which write model produced them. On a store that has both capabilities it is the only flavor that sees stream-written and DCB-appended events together, filtered by type alone. Use `streamSubscriptions(...)` when a subscription must stay scoped to stream events, because it excludes DCB-appended events even on a store that has both, which matters when the consumer relies on classic stream and version semantics. Use [`DcbSubscriptions`](#subscribing-to-dcb-events) when you want DCB events selected by tags, for a short-lived, per-connection subscription you start and cancel yourself (such as a Server-Sent-Events feed), and reach for the [`@DcbSubscription`](#subscribing-to-dcb-events) annotation instead for a durable, framework-managed read model that catches up from history on startup.

The same DSL also builds [synchronous subscriptions](#synchronous-subscriptions). Pass a `SynchronousSubscriptionModel` as the `Subscribable` instead of an asynchronous subscription model, and the handlers you register run inline on the writer thread, before `execute` returns, rather than off a change stream.

If you're using Kotlin you can then define subscriptions like this:

```kotlin
val subscriptionModel = SpringMongoSubscriptionModel(..)
val cloudEventConverter = GenericCloudEventConverter<DomainEvent>(..)

subscriptions(subscriptionModel, cloudEventConverter) {
    subscribe<GameStarted>("id1") { gameStarted ->
        log.info("Game was started $gameStarted")
    }
    subscribe<GameWon, GameLost>("id2") { domainEvent ->
        log.info("Game was either won or lost: $domainEvent")
    }
    subscribe("everything") { domainEvent ->
        log.info("I subscribe to every event: $domainEvent")
    }
} 
```

Note that as of version 0.6.0 you can also do:

```kotlin
subscribe<GameStarted> { gameStarted ->
    log.info("Game was started $gameStarted")
}
```

i.e. you don't need to specify an id explicitly. Be careful here though, since the name of the
subscription will be generated from the event name (the unqualified name, in this case the subscription 
id would be "GameStarted"). This can lead to trouble if you rename your event because then the id of your subscription 
will change as well, and it won't continue from the previous checkpoint in the checkpoint storage. 

If using Java you can do:
          
```java
SpringMongoSubscriptionModel subscriptionModel = SpringMongoSubscriptionModel(..);
GenericCloudEventConverter cloudEventConverter = GenericCloudEventConverter<DomainEvent>(..);

Subscriptions<DomainEvent> subscriptions = new Subscriptions<DomainEvent>(subscriptionModel, cloudEventConverter); 
        
subscriptions.subscribe("gameStarted", GameStarted.class, gameStarted -> {
    log.info("Game was started {}", gameStarted)
});
```

For this to work, your domain events must all "implement" a `DomainEvent` interface (or a sealed class in Kotlin). Note that `DomainEvent` is something you create yourself, 
it's not something that is provided by Occurrent.

As of version 0.17.0 you can also get metadata (such as stream version, stream id and all other cloud event extension properties) when consuming an event:

{% include macros/subscription/dsl/subscription_dsl_metadata_example.md %}

`Subscriptions` and `subscriptions(...)` accept any `Subscribable`. That includes a [`PushSubscriptionModel`](#push-subscription-blocking) (or its [reactive counterpart](#push-subscription-reactive)), which feeds events from a broker such as RabbitMQ or Kafka instead of reading a MongoDB change stream.

## Query DSL

The "Query DSL" (or "domain query DSL") is a small wrapper around the [EventStoreQueries](#eventstore-queries) API that lets you query for domain events instead of CloudEvents. 
Depend on the `org.occurrent:occurrent-query-dsl-blocking` module and create an instance of `org.occurrent.dsl.query.blocking.DomainEventQueries`. For example:

```java                                                      
EventStoreQueries eventStoreQueries = .. 
CloudEventConverter<DomainEvent> cloudEventConverter = ..
DomainEventQueries<DomainEvent> domainEventQueries = new DomainEventQueries<DomainEvent>(eventStoreQueries, cloudEventConverter);
 
Stream<DomainEvent> events = domainQueries.query(Filter.subject("someSubject"));
```

There's also support for skip, limits and sorting and convenience methods for querying for a single event:

```java                                                      
Stream<DomainEvent> events = domainQueries.query(GameStarted.class, GameEnded.class); // Find only events of this type
GameStarted event1 = domainQueries.queryOne(GameStarted.class); // Find the first event of this type
GamePlayed event2 = domainQueries.queryOne(Filter.id("d7542cef-ac20-4e74-9128-fdec94540fda")); // Find event with this id
```

There are also some Kotlin extensions that you can use to query for a `Sequence` of events instead of a `Stream`:
 ```kotlin
 val events : Sequence<DomainEvent> = domainQueries.queryForSequence(GamePlayed::class, GameWon::class, skip = 2) // Find only events of this type and skip the first two events
 val event1 = domainQueries.queryOne<GameStarted>() // Find the first event of this type
 val event2 = domainQueries.queryOne<GamePlayed>(Filter.id("d7542cef-ac20-4e74-9128-fdec94540fda")) // Find event with this id
 ```
             
### DCB Query DSL

The Query DSL has a DCB counterpart, `org.occurrent.dsl.dcb.blocking.DcbDomainEventQueries`, that queries by a [`DcbCriteria`](#the-dcb-event-store) (event types and tags) instead of a `Filter`, and returns domain events. Depend on `org.occurrent:occurrent-dcb-dsl-blocking` and wrap a regular `DomainEventQueries`. The [Spring Boot starter](#spring-boot-starter) registers one for you when the DCB capability is enabled, so you normally just inject it.

Which one to reach for: use [`DomainEventQueries`](#query-dsl) for ordinary queries by `Filter` and event type. It is capability-neutral, so on a store that has both capabilities it returns stream-written and DCB-appended events alike, exactly like the underlying [`EventStoreQueries`](#eventstore-queries). Use `DcbDomainEventQueries` when a query needs DCB tags or a `DcbCriteria`, or when you need the read's consistency token and position for a later conditional append. It only adds the DCB queries on top, so the plain ones are still there through `domainEventQueries()`.

{% capture java %}
DomainEventQueries<CourseEvent> domainEventQueries = ..
DcbDomainEventQueries<CourseEvent> dcbQueries = new DcbDomainEventQueries<>(domainEventQueries);

// All events tagged with this course
Stream<CourseEvent> events = dcbQueries.query(DcbCriteria.tags(Tag.of("course", courseId)));

// Restrict the position range with DcbReadOptions, and read each event's position too
DcbDomainEventStream<CourseEvent> recent = dcbQueries.queryWithPosition(DcbCriteria.all(), DcbReadOptions.afterPosition(1000));
{% endcapture %}
{% capture kotlin %}
val dcbQueries = DcbDomainEventQueries(domainEventQueries)

// All events tagged with this course (tags are all-of), or use queryForListAnyOf for any-of
val events: List<CourseEvent> = dcbQueries.queryForList(Tag.of("course", courseId))

// Restrict the position range with DcbReadOptions
val recent: List<CourseEvent> = dcbQueries.queryForList(DcbCriteria.all(), DcbReadOptions.afterPosition(1000))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Use `DcbReadOptions` (`fromBeginning`, `afterPosition`, `upToPosition`, `between`) to restrict the position range, and `queryWithPosition` (Kotlin `queryForListWithPosition`) when you also need each event's global position. Call `domainEventQueries()` to drop back to the regular stream [Query DSL](#query-dsl).

## The View DSL {#view-dsl}

A `View<S, E>` is a pure fold, an initial state and an `evolve` that folds one event into state. It has no I/O, no storage, and no subscription, so it unit-tests with plain equality assertions, the same way a decider or a saga does. Here is a view that folds a person's name events into their current name:

{% capture java %}
record NameState(String userId, String name) {}

View<NameState, DomainEvent> view = View.create(null, (state, event) -> switch (event) {
    case NameDefined e    -> new NameState(e.userId(), e.name());
    case NameWasChanged e -> new NameState(state.userId(), e.name());
    default               -> state;
});

// Folding a list of events gives the current state, which is all a unit test needs
NameState current = view.evolve(List.of(nameDefined, nameWasChanged));
{% endcapture %}
{% capture kotlin %}
data class NameState(val userId: String, val name: String)

val view: View<NameState?, DomainEvent> = view(initialState = null) { state, event ->
    when (event) {
        is NameDefined    -> NameState(event.userId(), event.name)
        is NameWasChanged -> state!!.copy(name = event.name)
    }
}

// Folding a list of events gives the current state
val current: NameState? = view.evolveAll(nameDefined, nameWasChanged)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

A view can also fold with the delivering event's metadata, its stream id and version, global position, and CloudEvent extensions, through the metadata-carrying `evolve(state, metadata, event)` (`View.create(initialState, (state, metadata, event) -> ...)` in Java, `view(initialState) { state, metadata, event -> ... }` in Kotlin). The event-only form folds with empty metadata. That lets a view key on the stream id or fold on the global position without carrying either in the event payload. Metadata folding was added in 0.31.0.

### Storing a view {#materialized-view}

A `View` on its own does not know where its state lives or which instance an event updates. A `MaterializedView<E>` binds a `View` to a `ViewStateRepository` and a function that derives the view-instance id from the event, so a single `update(event)` loads the current state, folds the event in, and saves it back. `ViewStateRepository<S, ID>` is storage-neutral, just `findById` and `save`, so you can back it with any store by passing a pair of functions:

{% capture java %}
// A storage-neutral repository, here over a plain map. Back it with JPA, Mongo, or anything else in production.
Map<String, NameState> store = new ConcurrentHashMap<>();
ViewStateRepository<NameState, String> repository = ViewStateRepository.create(store::get, store::put);

// Key each instance by user id and keep it current one event at a time
MaterializedView<DomainEvent> names = MaterializedView.create(DomainEvent::userId, view, repository);

names.update(nameDefined);
names.update(nameWasChanged);
{% endcapture %}
{% capture kotlin %}
// A storage-neutral repository, here over a plain map. Back it with JPA, Mongo, or anything else in production.
val store = ConcurrentHashMap<String, NameState>()
val repository = viewStateRepository<NameState, String>(find = store::get, save = store::put)

// Key each instance by user id and keep it current one event at a time
val names: MaterializedView<DomainEvent> = MaterializedView.create({ it.userId() }, view, repository)

names.update(nameDefined)
names.update(nameWasChanged)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

To key on something only the delivery carries rather than the event body, derive the id from metadata with the `(metadata, event)` form, for example `MaterializedView.create((metadata, event) -> metadata.getStreamId(), view, repository)`.

### Materializing with Spring {#materialized-view-spring}

On the Spring MongoDB stack, `View.materialized(...)` hands you a Mongo-backed `MaterializedView` in one call, over the same `MongoOperations` the rest of Occurrent uses. It stores each instance as a document keyed by the id you derive, retries an optimistic-locking clash with a backoff, and ignores a duplicate-key race by default. Point the blocking [subscription DSL](#subscription-dsl)'s `updateView` at it and the view catches up and then follows the live stream like any other subscription:

```kotlin
val view: View<NameState?, DomainEvent> = view(initialState = null) { state, event ->
    when (event) {
        is NameDefined    -> NameState(event.userId(), event.name)
        is NameWasChanged -> state!!.copy(name = event.name)
    }
}

// Mongo-backed, keyed by user id
val names: MaterializedView<DomainEvent> = view.materialized(mongoOperations) { it.userId() }

// Keep it up to date from a subscription named "names"
subscriptions.updateView("names", names)

// Read a stored instance back
val current: NameState? = view.currentState(mongoOperations, userId)
```

<div class="comment">The Spring materialization helpers are Kotlin extensions, and the View DSL is blocking-only. From Java, build a <code>ViewStateRepository</code> over <code>MongoOperations</code> yourself and use <code>MaterializedView.create(...)</code> as shown above.</div>

The id function can take the event's [metadata](#event-metadata) as well, so a Mongo-backed view can be keyed by the stream id rather than by something in the payload:

```kotlin
val names: MaterializedView<DomainEvent> = view.materialized(mongoOperations) { metadata, _ -> metadata.streamId }
```

One rule to know about, because getting it wrong used to produce a view that quietly stayed empty. The document you store must carry the same id the function resolves, as its `@Id`. Reads look the document up by the resolved id, while writes let Spring Data take the document id from the object you save, so if the two disagree every update reads nothing back, folds from the initial state, and writes a fresh document. Occurrent now fails with a message naming both ids instead of letting that happen. Types that Spring Data converts for you are fine, so a hex `String` resolved against an `ObjectId` id, or an `Int` against a `Long`, are not mismatches.

## Projection DSL

A read model is the read side's counterpart to a decider. A [decider](#decider) folds events into state and decides new events. A projection folds events into state that you read. Occurrent already gives you a [`View`](#views) for the pure fold, but a `View` on its own doesn't know which events feed it, which view instance an event updates, or where its state is stored. The projection DSL couples those together, so a feature describes its read model right next to its fold, the same way [`DcbDecider`](#coupling-a-decider-to-a-boundary) couples a decider with its boundary and tags on the write side.

A `Projection<S, E, ID>` is a `View` plus either an `id` function (which view instance an event updates) or, for a single-instance read model, no `id` at all (see [Single-instance projections](#single-instance-projections) below), plus the event types the fold handles. You build one with a type-safe handler builder, registering a fold per event type:

{% capture java %}
Projection<Integer, CourseEvent, String> enrolledStudents =
        Projection.<Integer, CourseEvent, String>builder(0)
                .id(CourseEvent::courseId)
                .on(StudentEnrolled.class,   (count, event) -> count + 1)
                .on(StudentUnenrolled.class, (count, event) -> count - 1)
                .build();
{% endcapture %}
{% capture kotlin %}
val enrolledStudents = projection<Int, CourseEvent, String>(initialState = 0) {
    id { event -> event.courseId }
    on<StudentEnrolled> { count, _ -> count + 1 }
    on<StudentUnenrolled> { count, _ -> count - 1 }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The builder both assembles the `View` and records the event types you registered handlers for, so the subscription that feeds the projection is filtered to exactly those events. There's no separate list of subscribed types to keep in sync with the fold. The fold returns the state unchanged for any event type without a handler, so it's always safe to point a projection at a broader stream than it handles. When you need to select on more than the event type, for example a subject, a source, or a time range, set an explicit `filter(...)` on the builder.

### Single-instance projections

Whether a projection needs an `id` comes down to how many views it maintains. A leaderboard folded from every player's events is one view over the whole stream, so it is single-instance and needs no `id`. A per-player profile is one view per player, keyed by player id, so it needs an `id` to pick out which profile each event updates. Rule of thumb: a single view over all events is single-instance and takes no `id`, one view per subject is keyed and takes an `id`.

A single-instance projection folds into one slot rather than one per key, so it has no per-event key to derive and no `id` function to write. Build it with `singletonBuilder(...)` instead of `builder(...)` in Java, or reach for the top-level `singletonProjection` in Kotlin. Contrast with the keyed `enrolledStudents` above, one instance per `courseId`:

{% capture java %}
Projection<Integer, CourseEvent, String> totalEnrolledStudents =
        Projection.<Integer, CourseEvent>singletonBuilder(0)
                .on(StudentEnrolled.class,   (count, event) -> count + 1)
                .on(StudentUnenrolled.class, (count, event) -> count - 1)
                .build();
{% endcapture %}
{% capture kotlin %}
val totalEnrolledStudents = singletonProjection<Int, CourseEvent>(initialState = 0) {
    on<StudentEnrolled> { count, _ -> count + 1 }
    on<StudentUnenrolled> { count, _ -> count - 1 }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The framework keys the single stored slot by the projection's own runtime identity, the subscription id passed to `project(...)`, or the `@Projection` id, so on a document store the state's `@Id` must equal that identity, the same constraint as the keyed case. The DCB counterpart, `dcbSingletonProjection`, pairs the same singleton fold with a DCB read boundary. See the `registered-account-count` example under [the `@Projection` annotation](#the-projection-annotation).

### Maintaining a stored read model

Hand the projection to a subscription runner and it does both halves of the work, starting the subscription and keeping the stored read model up to date as events arrive. Supply a `ViewStateRepository` (or a `MaterializedView`, or a Spring `MongoOperations` for the built-in Mongo view store):

{% capture java %}
ProjectionRunner.stream(subscriptionModel, cloudEventConverter)
        .project("enrolled-students", enrolledStudents, repository);
{% endcapture %}
{% capture kotlin %}
streamSubscriptions(subscriptionModel, cloudEventConverter) {
    project("enrolled-students", enrolledStudents, repository)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The runner comes in the same three flavours as the [subscription DSL](#subscription-dsl), so `project` is not tied to stream events. `ProjectionRunner.stream(...)` and the Kotlin `streamSubscriptions { }` above stay scoped to stream events, excluding anything a DCB append wrote. `ProjectionRunner.agnostic(...)` and `subscriptions { }` are capability-neutral: on a store that has both capabilities they feed the projection stream-written and DCB-appended events together, selected by the projection's own event types alone. Reach for the neutral pair when the read model just wants the events, whichever write model produced them, and for the stream pair when it must stay on stream events.

DCB has its own pair rather than an option on these, because a `DcbProjection` is scoped by tags rather than by event type. `DcbProjectionRunner` and the Kotlin `dcbSubscriptions { }` take a `DcbProjection` and subscribe to its `DcbCriteria`, covered under [DCB projections](#dcb-projections).

`project` derives the subscription filter from the projection's handlers, loads the current state for the event's `id`, folds the event in, and saves the result.

### Event metadata {#projection-event-metadata}

A fold and the `id` function can also see the event's metadata, its stream id and version, the global position, and any CloudEvent extension, through additional overloads. This is the same [`EventMetadata`](#event-metadata) a plain subscription already hands a subscriber, so a projection reads exactly what a subscriber would see. Use it to key a view instance by something other than its payload, for example the stream id:

{% capture java %}
Projection<Integer, CourseEvent, String> enrolledStudentsByStream =
        Projection.<Integer, CourseEvent, String>builder(0)
                .id((metadata, event) -> metadata.getStreamId())
                .on(StudentEnrolled.class,   (count, metadata, event) -> count + 1)
                .on(StudentUnenrolled.class, (count, metadata, event) -> count - 1)
                .build();
{% endcapture %}
{% capture kotlin %}
val enrolledStudentsByStream = projection<Int, CourseEvent, String>(initialState = 0) {
    id { metadata, _ -> metadata.streamId }
    on<StudentEnrolled>   { count, _, _ -> count + 1 }
    on<StudentUnenrolled> { count, _, _ -> count - 1 }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Every event-only `on(...)` and `id(...)` keeps working unchanged, plain code never has to opt in to metadata. A `DcbProjection` gets the same fold and `id` overloads, and `DcbProjectionRunner` builds the metadata from the delivered event the same way the stream runner does, so a DCB fold can also read the position, or wrap the metadata with `DcbEventMetadata.from(metadata)` for the event's tags.

The [on-demand](#reading-on-demand) query path has no originating CloudEvent, so it folds with `EventMetadata.empty()`: reading the stream id or version throws, and `getPosition()` (`.position` in Kotlin) is `null`. That path genuinely has no metadata to give. A live domain-event feed is different: the application can supply real metadata itself with `accept(metadata, event)` on `DomainEventFeed` and `CatchupProjectionFeed` (see [Feeding domain events instead of CloudEvents](#feeding-domain-events-instead-of-cloudevents)). A projection keyed by metadata is therefore no longer limited to a subscription runner, only the on-demand query still has no metadata to key on.

### DCB projections

On a DCB store a projection reads inside a consistency boundary rather than by event type alone. A `DcbProjection` adds a `DcbCriteria`, a tag filter, to a `Projection`. This is the read-side answer to a question such as "is this username already claimed?", scoped to the events tagged for that one username. There's one flag per username, and the tag boundary already pins the projection to a single username, so it folds into a single slot with no `id` function:

{% capture kotlin %}
fun isUsernameClaimed(username: String) =
    dcbSingletonProjection<Boolean, AccountEvent>(initialState = false) {
        tags("username:$username")
        on<AccountRegistered> { _, _ -> true }
        on<AccountClosed>     { _, _ -> false }
        on<UsernameChanged>   { _, event -> event.newUsername == username }
    }
{% endcapture %}
{% capture java %}
DcbProjection<Boolean, AccountEvent, String> isUsernameClaimed(String username) {
    Projection<Boolean, AccountEvent, String> view =
            Projection.<Boolean, AccountEvent>singletonBuilder(false)
                    .on(AccountRegistered.class, (state, event) -> true)
                    .on(AccountClosed.class,     (state, event) -> false)
                    .on(UsernameChanged.class,   (state, event) -> event.newUsername().equals(username))
                    .build();
    return new DcbProjection<>(view, DcbCriteria.tags(Tag.parse("username:" + username)));
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Feed it with a DCB subscription the same way you feed a stream projection: `dcbSubscriptions(dcbSubscriptionModel, cloudEventConverter) { project("...", isUsernameClaimed(username), repository) }`.

### Reading on demand

When you want a strongly consistent answer at the moment you ask, skip the subscription and fold a query straight into the projection. This reads the events in the boundary and returns the folded state, with no stored read model to keep in sync:

{% capture kotlin %}
val claimed: Boolean = dcbQueries.project(isUsernameClaimed("alice"))
{% endcapture %}
{% capture java %}
boolean claimed = Projections.project(isUsernameClaimed("alice"), dcbQueries);
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The same projection definition works both ways. Subscribe to keep a read model eventually consistent, or fold a query on demand for a strongly consistent read. The plain, non-DCB `DomainEventQueries` has the same `project` method.

In Java, the on-demand fold is also a static entry point, `Projections.project(projection, queries)`, the counterpart to the Kotlin `project` extension above:

```java
int total = Projections.project(totalEnrolledStudents, domainEventQueries);
```

It's only valid for a single-instance (singleton) projection, since folding every instance of a keyed projection into one blended state on demand would be nonsense; use `Projections.project(projection, queries, instanceId)` to scope a keyed projection to one instance instead. `Projections.project(dcbProjection, dcbQueries)` is the DCB counterpart to both; a DCB projection's criteria already scopes the read to one instance, so there's no keyed/singleton distinction to make.

Three guards keep a projection from silently doing the wrong thing. `DomainEventFeed.register(id, ...)` rejects a duplicate `id`, since the durable checkpoint key it derives from `id` must be unique across every registered projection, on both the blocking and reactor feeds. A `DcbProjection` rejects a wrapped `Projection` that carries its own explicit `filter()`, because that filter would otherwise be silently ignored, a `DcbProjection` reads through its `DcbCriteria`, not the wrapped projection's filter. And a projection keyed by metadata that is fed through the metadata-less `accept(event)` on a `DomainEventFeed` or `CatchupProjectionFeed` throws an `IllegalStateException` rather than resolving to a null instance id and dropping the event, feed it with `accept(metadata, event)` instead.

### Read-your-writes

Register the projection on a synchronous subscription model and build the application service with it, and the read model updates inside the same transaction as the write. The projected state is then visible the moment `execute(...)` returns, with no eventual-consistency lag. This trades a little write latency for read-your-writes consistency, so reach for it when a command needs to see its own effect immediately.

### Reactor

Everything above has a reactor counterpart in `org.occurrent.dsl.projection.reactor` with the same shape. The push callbacks return `Mono<Void>`, the on-demand `project` returns `Mono<S>`, and you supply either a reactive update function for a reactive store or a blocking view store that the runner bridges onto a bounded-elastic scheduler.

### The `@Projection` annotation {#the-projection-annotation}

If you're on the [Spring Boot Starter](#spring-boot-starter), you don't have to wire up a `ProjectionRunner` yourself. Annotate a factory method that returns a `Projection` or `DcbProjection` with `org.occurrent.annotation.Projection`, and the framework registers it as a persistent read model for you. It subscribes through the same catch-up, durable-resume, and [competing-consumer](#competing-consumer-subscription-blocking) machinery as [`@Subscription` and `@DcbSubscription`](#spring-boot-annotations), for both a stream `Projection` and a `DcbProjection`:

{% capture java %}
import org.occurrent.annotation.Projection;

@Configuration
class ProjectionConfig {

    @Projection(id = "enrolled-students", startAt = Projection.StartPosition.BEGINNING)
    org.occurrent.dsl.projection.Projection<Integer, CourseEvent, String> enrolledStudents() {
        return org.occurrent.dsl.projection.Projection.<Integer, CourseEvent, String>builder(0)
                .id(CourseEvent::courseId)
                .on(StudentEnrolled.class,   (count, event) -> count + 1)
                .on(StudentUnenrolled.class, (count, event) -> count - 1)
                .build();
    }
}
{% endcapture %}
{% capture kotlin %}
import org.occurrent.annotation.Projection

@Configuration
class ProjectionConfig {

    @Projection(id = "enrolled-students", startAt = Projection.StartPosition.BEGINNING)
    fun enrolledStudents() = projection<Int, CourseEvent, String>(initialState = 0) {
        id { event -> event.courseId }
        on<StudentEnrolled> { count, _ -> count + 1 }
        on<StudentUnenrolled> { count, _ -> count - 1 }
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The annotation and the DSL class share the name `Projection`, so a Java factory method needs to qualify one of them, as above. Kotlin doesn't have this problem since the DSL's entry point is the lowercase `projection` function.

The factory method doesn't have to be a `@Bean` on a `@Configuration` class. The bean post-processor scans every Spring bean's declared methods for `@Projection`, so a plain `@Component` works too, and reads better for a single dedicated projection:

```kotlin
import org.occurrent.annotation.Projection

@Component
class CourseDashboardProjection {

    @Projection(id = "course-dashboard", startAt = Projection.StartPosition.BEGINNING, store = CourseDashboard::class)
    fun courseDashboardProjection() = singletonProjection<DashboardState, DomainEvent>(initialState = DashboardState.EMPTY) {
        on<StudentEnrolled> { state, event -> state.withEnrollment(event) }
    }
}
```

The `@Configuration` plus `@Bean` form still works, and is handy for grouping several projections in one class. For a single projection, `@Component` is the cleaner shape: with `@Bean`, Spring also registers the returned `Projection` as an unused context bean and calls the factory method an extra time, whereas `@Component` invokes it once.

`@Projection` takes:

| Attribute | Description |
|:----------|:-------------|
| `id` | The subscription id (required). |
| `startAt` | `Projection.StartPosition.BEGINNING`, `NOW`, or `DEFAULT`. Same start-position idea as [`@Subscription`'s `startAt`](#subscription-start-position), but note the constant is named `BEGINNING` here, not `BEGINNING_OF_TIME`. |
| `startAtPosition` | Start after a specific global or DCB position instead, to rewind a durable read model to a known-good point. Mutually exclusive with a non-default `startAt`. |
| `resumeBehavior` | `DEFAULT` or `SAME_AS_START_AT`, the same [resume-behavior idea](#subscription-start-position) as `@Subscription`. |
| `startupMode` | `DEFAULT`, `WAIT_UNTIL_STARTED`, or `BACKGROUND`, the same [startup-mode idea](#subscription-startup-mode) as `@Subscription`. |
| `capability` | `AGNOSTIC` (both stream and DCB events) or `STREAM` (stream events only). Only read for a `Projection` factory. A `DcbProjection` factory ignores it and always subscribes over its own `DcbCriteria`. |
| `mode` | `ASYNC` (the default) or `SYNCHRONOUS`, see below. |
| `store` | Select the store bean by type, for example `CourseDashboard.class` (`CourseDashboard::class` in Kotlin). `Void.class`, the default, leaves the type unset. |
| `storeName` | Select the store bean by name, on its own or together with `store` to disambiguate when several beans share that type. Empty, the default, leaves the name unset. |

`startAt`, `startAtPosition`, and `resumeBehavior` are mutually exclusive with `mode = SYNCHRONOUS`. A synchronous projection has no catch-up or checkpoint to configure since it never falls behind in the first place.

With both `store` and `storeName` unset, the store resolves by convention: the unique `MaterializedView` bean, then `ViewStateRepository`, then `CrudRepository`, then the Mongo default on the blocking stack. The reactive stack has no Mongo default, so an unset pair only resolves there if a unique `MaterializedView` or `ViewStateRepository` bean exists. Naming a `store` type or a `storeName` with no matching bean is an error, not a silent fall-through to convention.

On a DCB store, point the factory method at a `DcbProjection` instead and the subscription runs inside that projection's `DcbCriteria` rather than by event type. A factory that takes a parameter, like [`isUsernameClaimedProjection(username)`](#dcb-projections), doesn't fit here, `@Projection` calls the factory once with no arguments. Use a `DcbCriteria` broad enough to cover every instance the read model needs. Here there's exactly one instance total, a count across every `AccountRegistered` event in the boundary, so the fold is `singleton()` rather than keyed by `id`:

{% capture kotlin %}
import org.occurrent.annotation.Projection

@Configuration
class ProjectionConfig {

    @Projection(id = "registered-account-count")
    fun registeredAccountCount() = dcbSingletonProjection<Int, AccountEvent>(initialState = 0) {
        criteria(DcbCriteria.type(AccountRegistered::class.java))
        on<AccountRegistered> { count, _ -> count + 1 }
    }
}
{% endcapture %}
{% capture java %}
import org.occurrent.annotation.Projection;

@Configuration
class ProjectionConfig {

    @Projection(id = "registered-account-count")
    DcbProjection<Integer, AccountEvent, String> registeredAccountCount() {
        org.occurrent.dsl.projection.Projection<Integer, AccountEvent, String> view =
                org.occurrent.dsl.projection.Projection.<Integer, AccountEvent>singletonBuilder(0)
                        .on(AccountRegistered.class, (count, event) -> count + 1)
                        .build();
        return new DcbProjection<>(view, DcbCriteria.type(AccountRegistered.class));
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

#### Store {#projection-annotation-store}

You choose where the projection is stored. `store` selects the bean by type, `MaterializedView`, `ViewStateRepository`, or a `CrudRepository` subinterface on the blocking stack (no `CrudRepository` on reactive), and `storeName` selects by name on its own or alongside `store` to disambiguate. Leave both unset to fall back to the convention resolution described above. It's the same store abstraction [`ProjectionRunner.project(...)`](#maintaining-a-stored-read-model) already takes as a method argument, just resolved through the annotation instead of passed in code.

#### Read-your-writes (synchronous mode) {#projection-annotation-synchronous}

`mode = Mode.SYNCHRONOUS` runs the projection's fold [in the write transaction](#read-your-writes) instead of on a subscription, reusing the synchronous subscription model the application service dispatches to after a successful write. The projected state is visible the moment `execute(...)` returns, at the cost of doing that fold on every write. Since there's no subscription to catch up or resume, `startAt`, `startAtPosition`, and `resumeBehavior` don't apply in this mode.

#### Without the starter {#projection-annotation-without-starter}

The starter is optional. `ProjectionRunner.project(...)` already takes a `StartAt` directly, so a plain (non-Spring) caller wiring its own catch-up-capable subscription model, for example a `CatchupSubscriptionModel`, gets the same behavior by computing the position itself:

{% capture java %}
StartAt startAt = ResumeStartPositions.replayThenResume("enrolled-students", checkpointStorage, StartAt.checkpoint(TimeBasedCheckpoint.beginningOfTime()));
ProjectionRunner.stream(subscriptionModel, cloudEventConverter)
        .project("enrolled-students", enrolledStudents, repository, startAt);
{% endcapture %}
{% capture kotlin %}
val startAt = ResumeStartPositions.replayThenResume("enrolled-students", checkpointStorage, StartAt.checkpoint(TimeBasedCheckpoint.beginningOfTime()))
streamSubscriptions(subscriptionModel, cloudEventConverter) {
    project("enrolled-students", enrolledStudents, repository, startAt)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The DCB side is the same. `DcbProjectionRunner` and the Kotlin `dcbSubscriptions { }` DSL both take a `DcbStartAt`, so given a catch-up-capable DCB model, for example a `DcbCatchupSubscriptionModel`, the same catch-up-then-resume recipe applies, computed with `replayThenResumeDcb(...)`:

{% capture java %}
DcbStartAt startAt = ResumeStartPositions.replayThenResumeDcb("registered-account-count", checkpointStorage, DcbStartAt.beginning());
new DcbProjectionRunner<>(dcbCatchupSubscriptionModel, cloudEventConverter)
        .project("registered-account-count", registeredAccountCount(), repository, startAt);
{% endcapture %}
{% capture kotlin %}
val startAt = ResumeStartPositions.replayThenResumeDcb("registered-account-count", checkpointStorage, DcbStartAt.beginning())
dcbSubscriptions(dcbCatchupSubscriptionModel, cloudEventConverter) {
    project("registered-account-count", registeredAccountCount(), repository, startAt)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

`ResumeStartPositions.replayThenResume(...)` (package `org.occurrent.subscription.api.blocking`, with the `replayThenResumeDcb(...)` counterpart returning a `DcbStartAt`) checks `checkpointStorage` for an existing checkpoint. It replays from the given position only when there isn't one yet, then resumes from the stored checkpoint on every later run. `@Projection` and `@DcbSubscription` run this same check internally for `resumeBehavior = DEFAULT`. These helpers expose it as plain functions so non-Spring code gets the same catch-up-then-resume behavior.

Whether `DcbProjectionRunner` catches up from history and resumes durably, or only sees live events, depends entirely on the subscription model you hand it. Given a plain live DCB model with no catch-up support it is live-only, the same as pulling a query on demand. Given a catch-up-capable model like `DcbCatchupSubscriptionModel` it catches up and resumes durably across restarts, exactly like the stream `ProjectionRunner`. The `@Projection` annotation gives you the catch-up-capable path automatically by subscribing through the Spring catch-up composite.
## Saga DSL

A saga (more precisely a process manager) reacts to events, and to their absence over time, by issuing commands. Use one for a process that spans more than one stream and unfolds over real time, such as "cancel the order if payment is not reserved within 30 minutes". A `Saga<E, S, C>` is the mirror image of a [decider](#decider): a decider turns commands into events, a saga turns events (and its own timeouts) into commands. Like a decider it is only data and functions, with no I/O, so a test asserts equality on the effects it returns and needs no infrastructure at all.

Here is the order-fulfillment process. `OrderPlaced` reserves payment and arms a 30-minute timer, `PaymentReserved` ships the order, `PaymentFailed` cancels it, and the timer firing (nobody reserved or failed the payment in time) also cancels it:

{% capture kotlin %}
val orderFulfillment: Saga<OrderEvent, FlowState<OrderEvent>, OrderCommand> =
    saga {
        correlateAll { it.orderId }
        startsOn<OrderPlaced> { order ->
            issue(ReservePayment(order.orderId, order.amount))
        }
        step("awaiting-payment") {
            on<PaymentReserved>(then = end) { payment -> issue(ShipOrder(payment.orderId)) }
            on<PaymentFailed>(then = end) { failure -> issue(CancelOrder(failure.orderId, failure.reason)) }
            timeout(after = Duration.ofMinutes(30), then = end) { received ->
                issue(CancelOrder(received.initiating<OrderPlaced>().orderId, "payment timeout"))
            }
        }
    }
{% endcapture %}
{% capture java %}
Saga<OrderEvent, FlowState<OrderEvent>, OrderCommand> orderFulfillment =
        FlowSaga.<OrderEvent, OrderCommand>builder()
                .correlateAll(OrderEvent::orderId)
                .startsOn(OrderPlaced.class,
                        order -> List.of(new ReservePayment(order.orderId(), order.amount())))
                .step("awaiting-payment", step -> step
                        .on(PaymentReserved.class, Continuation.end(),
                                payment -> List.of(new ShipOrder(payment.orderId())))
                        .on(PaymentFailed.class, Continuation.end(),
                                failure -> List.of(new CancelOrder(failure.orderId(), failure.reason())))
                        .timeout(Duration.ofMinutes(30), Continuation.end(),
                                received -> List.of(new CancelOrder(received.initiating(OrderPlaced.class).orderId(), "payment timeout"))))
                .build();
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

A saga is not a substitute for a [Dynamic Consistency Boundary](#dynamic-consistency-boundary). When two rules must hold atomically in one append, express both as a single `DcbCriteria` and let one decider decide against them together, which is cheaper and stronger. Reach for a saga only when the process is genuinely cross-boundary and time-involving. The "cancel if payment is not reserved within 30 minutes" rule has no single append at which both facts are known, because the payment may simply never arrive and the deciding write has to be triggered by the passage of time rather than by an event. That is the gap a saga fills, and the only one.

There are two ways to write a saga, and both produce the same `Saga<E, S, C>`, so the runner only ever runs one kind of thing. The flow DSL above is the shorthand for the common case, a linear process moving through a few named steps. Underneath it is the core DSL, an explicit fold and reaction per event type. Use the flow DSL when your process is a small sequence of steps, and drop to the core DSL when it is not.

### The Core DSL {#saga-core-dsl}

The core DSL is `Saga.builder(initialState)` in Java and `saga(initialState) { }` in Kotlin. You register, per event type, an `evolve` that folds the event into state and a `react` that decides what to do now that the event has been applied. Timers get their own `evolveOnTimeout` and `reactOnTimeout`, keyed by name. `evolve` and `react` are kept separate on purpose. Rehydrating an instance from history calls only `evolve`, so replay can never re-issue a command.

Here is the same order-fulfillment process as the flow example above, written against an explicit `OrderSagaState`:

{% capture kotlin %}
val orderFulfillment = saga<OrderEvent, OrderSagaState?, OrderCommand>(initialState = null) {
    correlateAll { it.orderId }
    startsOn<OrderPlaced>()
    evolve<OrderPlaced> { _, e -> AwaitingPayment(e.orderId) }
    react<OrderPlaced> { _, e ->
        issue(ReservePayment(e.orderId, e.amount))
        startTimeout("payment", Duration.ofMinutes(30))
    }
    evolve<PaymentReserved> { _, e -> Completed(e.orderId) }
    react<PaymentReserved> { _, e ->
        issue(ShipOrder(e.orderId))
        cancelTimeout("payment")
    }
    evolve<PaymentFailed> { _, e -> Cancelled(e.orderId, e.reason) }
    react<PaymentFailed> { _, e ->
        issue(CancelOrder(e.orderId, e.reason))
        cancelTimeout("payment")
    }
    evolveOnTimeout("payment") { _, t -> Cancelled(t.sagaId, "payment timeout") }
    reactOnTimeout("payment") { _, t -> issue(CancelOrder(t.sagaId, "payment timeout")) }
    isTerminal { it is Completed || it is Cancelled }
}
{% endcapture %}
{% capture java %}
Saga<OrderEvent, OrderSagaState, OrderCommand> orderFulfillment =
        Saga.<OrderEvent, OrderSagaState, OrderCommand>builder(null)
                .correlateAll(OrderEvent::orderId)
                .startsOn(OrderPlaced.class)
                .evolve(OrderPlaced.class, (state, e) -> new AwaitingPayment(e.orderId()))
                .react(OrderPlaced.class, (state, e) -> List.of(
                        SagaEffect.issue(new ReservePayment(e.orderId(), e.amount())),
                        SagaEffect.startTimeout("payment", Duration.ofMinutes(30))))
                .evolve(PaymentReserved.class, (state, e) -> new Completed(e.orderId()))
                .react(PaymentReserved.class, (state, e) -> List.of(
                        SagaEffect.issue(new ShipOrder(e.orderId())),
                        SagaEffect.cancelTimeout("payment")))
                .evolve(PaymentFailed.class, (state, e) -> new Cancelled(e.orderId(), e.reason()))
                .react(PaymentFailed.class, (state, e) -> List.of(
                        SagaEffect.issue(new CancelOrder(e.orderId(), e.reason())),
                        SagaEffect.cancelTimeout("payment")))
                .evolveOnTimeout("payment", (state, t) -> new Cancelled(t.sagaId(), "payment timeout"))
                .reactOnTimeout("payment", (state, t) -> List.of(SagaEffect.issue(new CancelOrder(t.sagaId(), "payment timeout"))))
                .isTerminal(state -> state instanceof Completed || state instanceof Cancelled)
                .build();
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

`startsOn` names the event types that create a new instance, and `correlateAll` (or a per-type `correlate`) says which instance every other event belongs to, described under [correlation](#saga-correlation) below. `isTerminal` marks the states that end the process. A terminal instance ignores further input, and the runner cancels its outstanding timers.

The flow DSL cannot express everything, on purpose. It has no dynamic N-of-M joins, no accumulators across steps, and no "this event is valid in every step" matching. A process that needs any of those drops to the core DSL, where `evolve` and `react` can express them directly.

### The Flow DSL {#saga-flow-dsl}

The flow DSL describes a process as a linear sequence of named steps. A step is either a set of `on(...)` branches (first match wins) or a single `join(...)`, and it can carry a `timeout(...)`. Each branch and timeout names where the saga goes next through a `Continuation`. `end` completes the saga, `next` advances to the following step, and `transitionTo("step")` jumps (a back-edge models a retry loop). The whole step graph is validated at `build()` time, so a `transitionTo` to a step that does not exist is a build error, not a run-time surprise.

The order-fulfillment example above is the shape to copy for a branch-and-timeout step. For a timeout on its own, here is the "close the game if no player joins within 10 minutes" case:

{% capture kotlin %}
val gameLobby = saga<GameEvent, CloseGame> {
    startsOn<GameCreated>()
    correlateAll { it.gameId }
    step("awaiting-players") {
        on<PlayerJoined>(then = end)
        timeout(after = Duration.ofMinutes(10), then = end) { received ->
            issue(CloseGame(received.initiating<GameCreated>().gameId))
        }
    }
}
{% endcapture %}
{% capture java %}
Saga<GameEvent, FlowState<GameEvent>, CloseGame> gameLobby =
        FlowSaga.<GameEvent, CloseGame>builder()
                .startsOn(GameCreated.class)
                .correlateAll(GameEvent::gameId)
                .step("awaiting-players", step -> step
                        .on(PlayerJoined.class, Continuation.end())
                        .timeout(Duration.ofMinutes(10), Continuation.end(),
                                received -> List.of(new CloseGame(received.initiating(GameCreated.class).gameId()))))
                .build();
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Notice that `on<PlayerJoined>(then = end)` has no reaction at all. A branch, join, timeout or start that issues nothing simply omits it, in Java through a `StepBuilder` overload that takes no reaction.

When there is a reaction, it returns what `issue` gives back rather than nothing. That is what makes the mistake below a compile error instead of a saga that silently does nothing at runtime, since a Kotlin lambda expecting `Unit` would have accepted the command and discarded it:

```kotlin
// Does not compile: the command is produced and never issued
on<PaymentReserved>(then = end) { ShipOrder(it.orderId) }
```

You write reactions exactly as you always would, because `issue` and the timer calls already return the receiver. Conditionals included, as long as the reaction ends on a command:

```kotlin
on<PaymentReserved>(then = end) {
    if (it.partial) issue(ReserveRemainder(it.orderId))
    issue(ShipOrder(it.orderId))
}
```

When a reaction issues a command only in some cases and none in the others, say so with `nothing`. It means there is nothing to issue, not that nothing happens: the branch still fires and still follows its `then`, so the flow advances either way. An `if` without an `else` has type `Unit` and cannot close the lambda, so give it an else branch or end on `nothing`:

```kotlin
// Issue only when the payment was partial, otherwise nothing
on<PaymentReserved>(then = end) {
    if (it.partial) issue(ReserveRemainder(it.orderId)) else nothing
}

// The same thing when the conditional is the last of several statements
on<PaymentReserved>(then = end) {
    if (it.partial) issue(ReserveRemainder(it.orderId))
    nothing
}
```

A `when` works the same way, as long as every branch ends on a command or on `nothing`. Issuing no command is a real outcome worth stating rather than an omission, which is what the word is for.

A flow reaction reads `ReceivedEvents`, the events this instance has seen so far with the initiating event first. In Kotlin `received.initiating<GameCreated>()` gets the start event back to build the command from (Java uses `received.initiating(GameCreated.class)`), and `first`, `all`, and `count` have the same reified form. A `timeout(after = ...)` fires once a relative duration has elapsed, and `timeout(at = { received -> ... })` fires at an absolute `Instant` you compute from the received events, an auction's end time for example.

A step is either a set of `on(...)` branches or a single `join(...)`, never both. A join waits until every `Expectation` it lists is met, counted since the step was entered, then runs once and follows its `Continuation`. Here is a step that waits for both players in the lobby above to ready up before it advances. It needs no new correlation, because the lobby's `correlateAll` already covers `PlayerReady`, which is what that fallback buys you:

{% capture kotlin %}
step("waiting-for-both-players") {
    join(expect<PlayerReady>(2), then = next)
}
{% endcapture %}
{% capture java %}
.step("waiting-for-both-players", step -> step
        .join(List.of(Expectation.of(PlayerReady.class, 2)), Continuation.next()))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

A `transitionTo` names any step, including the current one, which is how a flow expresses a loop. An auction stays open as long as bids keep arriving: each `BidPlaced` transitions the `bidding` step back to itself, and an absolute timeout closes it once its end time passes. Re-entering the step re-arms its timeout, but because the deadline is derived from the initiating event it stays pinned to the auction's end time rather than sliding forward on every bid:

{% capture kotlin %}
val auction = saga<AuctionEvent, CloseAuction> {
    startsOn<AuctionStarted>()
    correlate<AuctionStarted> { it.auctionId }
    correlate<BidPlaced> { it.auctionId }
    step("bidding") {
        on<BidPlaced>(then = transitionTo("bidding"))
        timeout(at = { received -> received.initiating<AuctionStarted>().endsAt }, then = end) { received ->
            issue(CloseAuction(received.initiating<AuctionStarted>().auctionId))
        }
    }
}
{% endcapture %}
{% capture java %}
Saga<AuctionEvent, FlowState<AuctionEvent>, CloseAuction> auction =
        FlowSaga.<AuctionEvent, CloseAuction>builder()
                .startsOn(AuctionStarted.class)
                .correlate(AuctionStarted.class, AuctionStarted::auctionId)
                .correlate(BidPlaced.class, BidPlaced::auctionId)
                .step("bidding", step -> step
                        .on(BidPlaced.class, Continuation.transitionTo("bidding"))
                        .timeout(received -> received.initiating(AuctionStarted.class).endsAt(), Continuation.end(),
                                received -> List.of(new CloseAuction(received.initiating(AuctionStarted.class).auctionId()))))
                .build();
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Correlation {#saga-correlation}

A saga is not one process, it is many instances of the same process, one per order or game or auction. Correlation is how an incoming event finds its instance: for every event the saga is handed, it derives a `String` id, and that id is the key the state store loads and saves under. Two events that produce the same id are the same running saga. The id is a plain `String` so it survives being persisted and read back unchanged, and it is yours to choose, usually the domain id already on the event.

Two declarations do the correlating, and both are available on the core and the flow DSL. A third names the starting event:

`startsOn` names the event type that creates an instance and optionally what to issue when it does, and correlation for that type comes from `correlate` or `correlateAll` like any other type.

`correlate<T>` registers one event type's correlation. Use it when the types key differently, say an event that carries `paymentId` in a saga otherwise keyed by `orderId`, and when you want adding an event type to a step to be a decision you have to make rather than one the fallback makes for you.

`correlateAll` registers a fallback used for every type that has no `correlate` correlation of its own. It fits a sealed event hierarchy exposing one shared id, `correlateAll { it.orderId }`, which is the common case and is what the examples above use. It can be set only once.

The builder checks the rules rather than trusting you to follow them. Every event type the saga handles has to be correlated, by its own `correlate` or by the fallback, and `build()` throws naming the type if one is not. Registering the same type through `correlate` twice throws instead of silently overwriting the first, and so does setting `correlateAll` twice.

Two things happen at run time rather than at build time, and both are deliberately quiet. A correlator that returns `null` means "this event belongs to no instance", and the event is skipped. So is an event that correlates to an instance that does not exist yet, unless its type is a start type, which is what stops a mid-process event from starting a saga at the wrong point.


### Event Metadata {#saga-event-metadata}

`evolve`, `react`, and `onStart` can also see the delivering event's metadata, its stream id and version, the global position, and any CloudEvent extension, through metadata-carrying overloads. This is the same [`EventMetadata`](#event-metadata) a plain subscription already hands a subscriber. A flow step's `on(...)` branch gets the same for its triggering event:

{% capture kotlin %}
react<PaymentReserved> { _, metadata, e ->
    val position = metadata.position
    val streamId = metadata.streamId
    // Do stuff
    issue(ShipOrder(e.orderId))
    cancelTimeout("payment")
}
{% endcapture %}
{% capture java %}
.react(PaymentReserved.class, (state, metadata, e) -> {
    Long position = metadata.getPosition();
    String streamId = metadata.getStreamId();
    // Do stuff
    return List.of(
            SagaEffect.issue(new ShipOrder(e.orderId())),
            SagaEffect.cancelTimeout("payment"));
})
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

A flow branch takes the metadata first, the same order the subscription DSL uses:

{% capture kotlin %}
on<PaymentReserved>(then = end) { metadata, payment ->
    issue(ShipOrder(payment.orderId))
}
{% endcapture %}
{% capture java %}
.on(PaymentReserved.class, Continuation.end(),
        (metadata, payment) -> List.of(new ShipOrder(payment.orderId())))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Every event-only `evolve`, `react`, `onStart`, and flow `on(...)` keeps working unchanged, plain code never has to opt in to metadata. A saga does not persist metadata itself, only the events it folds into its own state, so if a reaction needs to remember something from the metadata beyond the current step, keep that slice in the saga's own state rather than relying on it being there later.

### Effects Are Data {#saga-effects}

A reaction never performs an effect. It returns a list of `SagaEffect` values and the runner interprets them. There are four:

* `issue(command)` hands a command to the dispatcher. It carries no routing information, because a command already carries the id of whatever it targets.
* `startTimeout(name, Duration)` arms (or re-arms) a named timer to fire after a relative duration.
* `startTimeoutAt(name, Instant)` arms a timer for an absolute, data-derived instant.
* `cancelTimeout(name)` cancels a running timer, a no-op if none is running.

Timers use `Duration` and `Instant`, never the [deadline module](#deadlines). Keeping effects as plain data is what makes a reaction pure. A relative `Duration` is resolved against the clock by the runner when it stores the timer, not inside `react`, so the same reaction returns the same effect values every time and you can assert on them with plain equality.

Here are three of them in play: reserving payment issues a command and arms the payment timer, reserving it successfully issues another command and disarms that same timer:

{% capture kotlin %}
react<OrderPlaced> { _, e ->
    issue(ReservePayment(e.orderId, e.amount))
    startTimeout("payment", Duration.ofMinutes(30))
}
react<PaymentReserved> { _, e ->
    issue(ShipOrder(e.orderId))
    cancelTimeout("payment")
}
{% endcapture %}
{% capture java %}
.react(OrderPlaced.class, (state, e) -> List.of(
        SagaEffect.issue(new ReservePayment(e.orderId(), e.amount())),
        SagaEffect.startTimeout("payment", Duration.ofMinutes(30))))
.react(PaymentReserved.class, (state, e) -> List.of(
        SagaEffect.issue(new ShipOrder(e.orderId())),
        SagaEffect.cancelTimeout("payment")))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Running a Saga {#running-a-saga}

Programmatically, `SagaRunner` is the write-side mirror of the read-side [`ProjectionRunner`](#views). It subscribes to the saga's events, folds and persists per-instance state, dispatches the commands each reaction issues, and polls the state store to fire timers. Pick the capability with the factory. `agnostic(...)` delivers both stream-written and DCB-appended events, `stream(...)` only stream-written ones. There is no reactive `SagaRunner`, sagas run on the blocking stack only:

{% capture kotlin %}
val stateStore: SagaStateStore<OrderSagaState> = SagaStateStore.inMemory()
val dispatcher = CommandDispatcher<OrderCommand> { command ->
    applicationService.execute(command.orderId) { events -> handle(events, command) }
}

val runningSaga = SagaRunner.agnostic<OrderEvent, OrderCommand>(subscriptionModel, cloudEventConverter)
    .run("order-fulfillment", orderFulfillment, stateStore, dispatcher)
{% endcapture %}
{% capture java %}
SagaStateStore<OrderSagaState> stateStore = SagaStateStore.inMemory();
CommandDispatcher<OrderCommand> dispatcher = command ->
        applicationService.execute(command.orderId(), events -> handle(events, command));

SagaSubscription runningSaga = SagaRunner.agnostic(subscriptionModel, cloudEventConverter)
        .run("order-fulfillment", orderFulfillment, stateStore, dispatcher);
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The dispatcher is a `CommandDispatcher`, usually just a lambda over an `ApplicationService`. The decider-free path above is first-class, you hand each command to any `ApplicationService`-shaped receiver. When the command target is a decider, `CommandDispatchers.decider(...)` wires it for you:

{% capture kotlin %}
val dispatcher = CommandDispatchers.decider(deciderApplicationService, orderCommandDecider) { it.orderId }
{% endcapture %}
{% capture java %}
CommandDispatcher<OrderCommand> dispatcher =
        CommandDispatchers.decider(deciderApplicationService, orderCommandDecider, OrderCommand::orderId);
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The store's type parameter follows the saga's state, so it is `SagaStateStore<OrderSagaState>` for the core-DSL saga above and `SagaStateStore<FlowState<OrderEvent>>` for the flow one. The `SagaStateStore` persists each instance. `SagaStateStore.inMemory()` is for tests and single-node use, and `SpringMongoSagaStateStore` (in the blocking MongoDB starter) is the durable one. Unlike a read-model store it supports a compare-and-set save, because an event and a timer can touch the same instance concurrently, so the runner detects a lost update and retries instead of overwriting. Timers live in the same stored envelope as the state, not in an external scheduler. A timer poller inside the runner periodically reads instances with a due timer and re-enters them through the same pipeline a live event uses. That means no deadline or JobRunr infrastructure to run, at the cost of firing precision bounded by the poll interval, which does not matter at the minutes-to-days timescale sagas work on.

Building a `SpringMongoSagaStateStore` by hand for a flow saga needs its four-argument constructor, with the application's `CloudEventConverter` passed alongside the state type. That converter is what lets the store serialize a `FlowState`'s retained events by their stable CloudEvent type rather than a Java class name. Passing `null`, or using the three-argument constructor, throws `IllegalArgumentException` rather than silently losing that package independence. A core saga's state carries no such requirement, since it serializes with the application's own `MongoConverter`.

### The `@Saga` Annotation {#the-saga-annotation}

On the [Spring Boot starter](#spring-boot-starter) you do not wire a `SagaRunner` yourself. Annotate a no-arg factory method returning a `Saga` with `org.occurrent.annotation.Saga` and the framework registers it as a managed saga, subscribing through the same catch-up, durable-resume, and [competing-consumer](#competing-consumer-subscription-blocking) machinery as [`@Subscription`](#spring-boot-annotations):

{% capture kotlin %}
import org.occurrent.annotation.Saga

@Component
class OrderFulfillmentSaga {

    @Saga(id = "order-fulfillment")
    fun orderFulfillment() = saga {
        correlateAll { it.orderId }
        startsOn<OrderPlaced> { order ->
            issue(ReservePayment(order.orderId, order.amount))
        }
        step("awaiting-payment") {
            on<PaymentReserved>(then = end) { payment -> issue(ShipOrder(payment.orderId)) }
            on<PaymentFailed>(then = end) { failure -> issue(CancelOrder(failure.orderId, failure.reason)) }
            timeout(after = Duration.ofMinutes(30), then = end) { received ->
                issue(CancelOrder(received.initiating<OrderPlaced>().orderId, "payment timeout"))
            }
        }
    }
}
{% endcapture %}
{% capture java %}
import org.occurrent.annotation.Saga;

@Component
class OrderFulfillmentSaga {

    @Saga(id = "order-fulfillment")
    org.occurrent.dsl.saga.Saga<OrderEvent, FlowState<OrderEvent>, OrderCommand> orderFulfillment() {
        return FlowSaga.<OrderEvent, OrderCommand>builder()
                .correlateAll(OrderEvent::orderId)
                .startsOn(OrderPlaced.class,
                        order -> List.of(new ReservePayment(order.orderId(), order.amount())))
                .step("awaiting-payment", step -> step
                        .on(PaymentReserved.class, Continuation.end(),
                                payment -> List.of(new ShipOrder(payment.orderId())))
                        .on(PaymentFailed.class, Continuation.end(),
                                failure -> List.of(new CancelOrder(failure.orderId(), failure.reason())))
                        .timeout(Duration.ofMinutes(30), Continuation.end(),
                                received -> List.of(new CancelOrder(received.initiating(OrderPlaced.class).orderId(), "payment timeout"))))
                .build();
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The annotation and the DSL class share the name `Saga`, so a Java factory method has to qualify one of them, as above. Kotlin has no such clash, since the DSL entry point is the lowercase `saga` function and the return type can be inferred.

`@Saga` takes:

| Attribute | Description |
|:----------|:-------------|
| `id` | The durable subscription and checkpoint key (required). |
| `startAt` | `StartPosition.BEGINNING`, `NOW`, or `DEFAULT`, the same start-position idea as [`@Subscription`](#subscription-start-position). |
| `startAtGlobalPosition` | Start after a specific global position instead, to rewind a saga to a known point. Mutually exclusive with a non-default `startAt`. |
| `resumeBehavior` | `DEFAULT` or `SAME_AS_START_AT`, the same [resume-behavior idea](#subscription-start-position) as `@Subscription`. |
| `startupMode` | `DEFAULT`, `WAIT_UNTIL_STARTED`, or `BACKGROUND`, the same [startup-mode idea](#subscription-startup-mode) as `@Subscription`. |
| `capability` | `AGNOSTIC` (both stream and DCB events) or `STREAM` (stream events only). |
| `store` / `storeName` | Select the `SagaStateStore` bean by type or name. With both unset the store resolves by convention, the unique `SagaStateStore` bean, otherwise a zero-config MongoDB store in a `saga-<id>` collection. |
| `commandDispatcher` / `commandDispatcherName` | Select the `CommandDispatcher` bean by type or name, otherwise the unique `CommandDispatcher` bean. There is no default dispatcher, since it is usually a lambda over your `ApplicationService`. |

`@Saga` is blocking-only in this first version, the reactive starter does not register it.

### Delivery Contract {#saga-delivery-contract}

Command dispatch is at-least-once. The runner dispatches a reaction's commands before it saves the resulting state, so a crash between the two, or a compare-and-set retry after a concurrent write, can dispatch the same command twice, but never lose one. This is safe when the receiver is idempotent, which an `ApplicationService`-backed dispatcher is by construction. It re-folds the authoritative event stream on every call, so the target's own invariants reject a stale or already-applied command and a duplicate becomes a no-op:

{% capture kotlin %}
val dispatcher = CommandDispatchers.decider(deciderApplicationService, orderCommandDecider) { it.orderId }
// A duplicate ReservePayment re-folds the stream and is rejected by the decider's own invariants, so it is a no-op.
{% endcapture %}
{% capture java %}
CommandDispatcher<OrderCommand> dispatcher =
        CommandDispatchers.decider(deciderApplicationService, orderCommandDecider, OrderCommand::orderId);
// A duplicate ReservePayment re-folds the stream and is rejected by the decider's own invariants, so it is a no-op.
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Timer bookkeeping has no such gap, because `startTimeout` and `cancelTimeout` are saved atomically with the rest of the state in the same write, so timers are exactly-once.

A live event and a firing timer do not fail the same way when a `SagaConcurrencyException` exhausts its compare-and-set retries. On the event path the exception propagates to the subscription model, which redelivers the event and retries the whole step; the event is never lost, but the subscription is one ordered channel shared by every instance the saga handles, so an instance that keeps failing blocks the events queued behind it (head-of-line blocking) until it succeeds or the subscription is intervened on. On the timer path the poller catches the exception per instance, logs it, and leaves the timer due for the next poll, so other instances keep progressing and a stuck timer never blocks the poller. Because commands are dispatched before the save and a lost compare-and-set retries the step, a single input can also re-dispatch its whole command list several times, up to the configured `maxCasAttempts`, so a receiver has to tolerate more than plain at-least-once multiplicity.

A flow saga does not remember its whole history. The received log a join, guard, or timeout reaction reads through `ReceivedEvents` is bounded to a configurable window: the current step's own events plus a carry-over of `historyWindow` earlier events, `FlowSaga.Builder.historyWindow(int events)` in Java and `historyWindow(events)` inside the Kotlin `saga { }` block, defaulting to 100. The initiating event is always retained regardless of the window, since `received.initiating<T>()` is a common lookup, but anything older than the window is dropped and not persisted. Raise the window for a guard or join that needs to count back further than the default 100 events, or lower it to trim what a long-running instance persists. `FlowState`'s bookkeeping fields (`stepEntryIndex`, `previousStep`, `lastAction`, `matchedBranchIndex`, `windowStart`) are internal to the executor and are not a wire-format compatibility guarantee, unlike the retained domain events themselves, which serialize as CloudEvents through the application's `CloudEventConverter`. That means they persist by their stable `CloudEventTypeMapper` type, the same representation the event store uses, not by a Java class name, so a domain event can move to a different package without breaking in-flight saga state, exactly as it can for events in the event store. A core saga's state is your own model and serializes like the [snapshot](#snapshots) store.

For the full design rationale, including the residual cross-node race a compare-and-set retry can produce and the deferred outbox that would make dispatch exactly-once, see [ADR 0063](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0063-saga-dsl.md). The complete, runnable [order-fulfillment example](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/saga/order-fulfillment) wires up both DSLs through `SagaRunner`, with both styles of dispatcher.

### Running Across Multiple Instances {#saga-multi-instance}

Run several instances of your application and a saga has two things happening per instance: it receives events, and it polls the state store for due timers. The event side is already single-active when the subscription model is a [competing-consumer](#competing-consumer-subscription-blocking) one (the [Spring Boot starter](#spring-boot-starter) uses one by default), so for a given saga only one instance receives events at a time. The timer poller is separate. Left uncoordinated, every instance runs its own poller and queries the store for due timers on its own interval, so the timer-query load grows with the instance count even though only one instance needs to fire a due timer. Firing stays correct either way, since a lost compare-and-set is retried and the dispatch is idempotent, but the extra queries are wasted work.

Give the `SagaRunner` a `CompetingConsumerStrategy` with `competingConsumerStrategy(...)`, the same strategy the competing-consumer subscription uses, and the poller is gated too: it takes a lease and only polls while it holds it, so exactly one instance queries the store. The lease is keyed apart from the event subscription's own lease, and released when the `SagaSubscription` is closed, so another instance takes over within about one lease period. A standby instance checks whether it holds the lease in memory, so it costs no query at all:

{% capture kotlin %}
val strategy = NativeMongoLeaseCompetingConsumerStrategy.withDefaults(mongoDatabase)

val runningSaga = SagaRunner.agnostic<OrderEvent, OrderCommand>(subscriptionModel, cloudEventConverter)
    .competingConsumerStrategy(strategy)
    .run("order-fulfillment", orderFulfillment, stateStore, dispatcher)
{% endcapture %}
{% capture java %}
CompetingConsumerStrategy strategy = NativeMongoLeaseCompetingConsumerStrategy.withDefaults(mongoDatabase);

SagaSubscription runningSaga = SagaRunner.<OrderEvent, OrderCommand>agnostic(subscriptionModel, cloudEventConverter)
        .competingConsumerStrategy(strategy)
        .run("order-fulfillment", orderFulfillment, stateStore, dispatcher);
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

On the [Spring Boot starter](#spring-boot-starter) this is on by default. A `@Saga` runner reuses the same `SpringMongoLeaseCompetingConsumerStrategy` the subscription model already builds, so nothing extra to wire. Both the poll interval and the gating are configurable under `occurrent.saga`:

```yaml
occurrent:
  saga:
    timer-poll-interval: 15s   # the default, lower it only if you rely on short timeouts firing promptly
    competing-consumer:
      enabled: true   # set to false to let every instance poll (the uncoordinated behavior)
```

Turn `competing-consumer.enabled` off, or run without a strategy, and the poller runs on every instance exactly as it did before. Single-node and in-memory setups need none of this.

Gating removes the redundant queries. It does not change the residual cross-node race noted in the [delivery contract](#saga-delivery-contract) (an event on one instance interleaving with a timeout fired on another), which stays handled by compare-and-set and an idempotent receiver. See [ADR 0064](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0064-lease-gate-the-saga-timer-poller.md) for the full rationale.

### Side Effects and Compensation {#saga-side-effects}

A saga affects the outside world in exactly one way: it issues commands. There is no "call this API" effect, and that is deliberate, because it keeps `react` a pure function you can test with equality assertions. So a third-party call, whether it runs mid-process or as the last thing a completed saga does, is a command like any other. Write a reaction that issues, say, `NotifyWarehouse(orderId)`, and point that command at a dispatcher that makes the call. The terminal reaction, the one whose `Continuation` is `end`, is where a "now that the whole thing is done" effect belongs.

Compensation works the same way. A saga does not roll back, it moves forward, so an "undo" is just another command you issue on the branch or timeout that detected the failure. The order-fulfillment saga above already does this. When payment fails or the timeout fires it issues `CancelOrder`, which is the compensation for the `ReservePayment` it issued earlier. You decide which command undoes which, there is no automatic inverse:

{% capture kotlin %}
on<PaymentFailed>(then = end) { failure -> issue(CancelOrder(failure.orderId, failure.reason)) }
timeout(after = Duration.ofMinutes(30), then = end) { received ->
    issue(CancelOrder(received.initiating<OrderPlaced>().orderId, "payment timeout"))
}
{% endcapture %}
{% capture java %}
.on(PaymentFailed.class, Continuation.end(),
        failure -> List.of(new CancelOrder(failure.orderId(), failure.reason())))
.timeout(Duration.ofMinutes(30), Continuation.end(),
        received -> List.of(new CancelOrder(received.initiating(OrderPlaced.class).orderId(), "payment timeout")))
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Both branches issue the same forward-moving `CancelOrder` compensation for the `ReservePayment` issued when the step started, whichever failure mode gets there first.

The one thing to watch is idempotency, and it follows directly from the [delivery contract](#saga-delivery-contract). Command dispatch is at-least-once, so a compensating or external command can arrive twice. An `ApplicationService`-backed target handles that for free, because it re-folds the stream and the target's own invariants reject the duplicate. A raw third-party call does not. When a command triggers a non-idempotent external effect such as an email, a payment capture, or a partner request, give it a stable id derived from the saga and the triggering event, and dedupe at that boundary. The deferred document-local outbox described in [ADR 0063](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0063-saga-dsl.md) would make dispatch exactly-once and remove this caveat, but it is not built yet.

### Observing Saga Instances {#observing-saga-instances}

A saga runs for as long as its process does, so sooner or later you need to ask operational questions about one. Is this instance still running, which step is it waiting in, and which instances have stopped moving? `SagaInstance` answers those and nothing else:

{% capture kotlin %}
val instances = runningSaga.instances()

instances.find(orderId).ifPresent { instance ->
    println("${instance.sagaId()} is ${instance.status()} in step ${instance.currentStep()}")
}

// active instances that have not moved for an hour, stalest first
val stalled = instances.findByStatus(SagaStatus.ACTIVE, Instant.now().minus(Duration.ofHours(1)), 50)
{% endcapture %}
{% capture java %}
SagaInstances instances = runningSaga.instances();

instances.find(orderId).ifPresent(instance ->
        System.out.println(instance.sagaId() + " is " + instance.status() + " in step " + instance.currentStep()));

// active instances that have not moved for an hour, stalest first
List<SagaInstance> stalled = instances.findByStatus(SagaStatus.ACTIVE, Instant.now().minus(Duration.ofHours(1)), 50);
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

`SagaInstances` reads the saga's state store, so it is not the event subscription answering these questions. `SagaSubscription.instances()` is a shortcut that hands you a view over the store the saga already runs against, which is also why it keeps working after you close the handle: closing stops that instance's timer poller, it does not close the store. With no handle at hand, in a separate admin process for instance, build one straight from the store with `SagaInstances.of(stateStore)`.

A `SagaInstance` carries the id, the `SagaStatus` (`ACTIVE` or `COMPLETED`), the created, updated, and completed timestamps, when the next pending timer is due, and which step a flow saga is waiting in. `currentStep()` is `null` for a core saga, which names its states in your own state type rather than in a step the executor knows about.

It leaves out the saga's own state and the executor's delivery bookkeeping on purpose. A read model shaped for querying belongs in the [Projection DSL](#views), and folding over a saga's private state from outside ties your code to how that process happens to be written.

There is no way to write through this. Nothing here starts, advances, completes, or deletes an instance, because the executor owns those transitions and a compare-and-set save from outside would race the subscription and the timer poller. Retention tooling that really has to remove an instance calls `SagaStateStore.delete(...)`.

`findByStatus` returns the instances in a status whose `updatedAt` falls strictly before the instant you pass, least recently updated first, at most `limit` of them. Pass `Instant.now()` to list everything in a status, or `Instant.now().minus(threshold)` to find the ones that have gone quiet. Stalest-first is what a stuck-instance check wants, because the worst offenders arrive first rather than last. `limit` bounds the result, it does not page it: timestamps persist at millisecond precision, so instances saved in the same millisecond tie, and a timestamp cursor would drop most of a tie group.

Enumeration is an optional store capability. A store implements `SagaStateStoreQueries` to support it, both shipped stores do, and `findByStatus` throws an `UnsupportedOperationException` on a store that does not. `find(sagaId)` works on any store, so a store you wrote yourself to run sagas never has to answer an ordered query it does not need.

On the Spring stack the `@Saga` registrar publishes each saga's `SagaInstances` under a registry keyed by saga id:

{% capture kotlin %}
@Service
class SagaDashboard(private val registry: SagaInstancesRegistry) {

    fun stalled(sagaId: String, threshold: Duration): List<SagaInstance> =
        registry.get(sagaId).findByStatus(SagaStatus.ACTIVE, Instant.now().minus(threshold), 100)

    fun sagaIds(): Set<String> = registry.sagaIds()
}
{% endcapture %}
{% capture java %}
@Service
class SagaDashboard {

    private final SagaInstancesRegistry registry;

    SagaDashboard(SagaInstancesRegistry registry) {
        this.registry = registry;
    }

    List<SagaInstance> stalled(String sagaId, Duration threshold) {
        return registry.get(sagaId).findByStatus(SagaStatus.ACTIVE, Instant.now().minus(threshold), 100);
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

`get(id)` throws and names every id that is registered, which is what you want when the id is a constant in your own code. `find(id)` returns an `Optional` for an id that came from a request or a configuration value. `sagaIds()` lists them so a dashboard does not hardcode ids. Each saga is also published under the bean name `sagaInstances-<id>`, reachable with `getBean` or a `@Qualifier` if you prefer to inject one saga's view directly.

One timing constraint comes with the annotation path. A `@Saga` factory can only run once the beans it collaborates with are wired, which is after the context has refreshed, so the registry holds nothing until that scan has run. Inject it and read it when a request arrives, never from another bean's constructor.

Enumerating instances does not read saga state at all. The MongoDB store keeps `currentStep` in its own document field, the same way it already keeps the earliest pending timer, and projects the rest away, so listing flow-saga instances never decodes their received events. It indexes status together with `updatedAt` to serve the query. Rationale in [ADR 0070](https://github.com/johanhaleby/occurrent/blob/main/doc/architecture/decisions/0070-saga-instance-observation.md).

# Spring Boot Starter

<div class="notification">Occurrent {{site.occurrentversion}} requires <b>Java 21</b> or later.</div>

Use the "Spring Boot Starter" project to bootstrap Occurrent quickly if using Spring Boot 4. Add the following to your build script:

{% include macros/spring-boot-starter/maven.md %}

Next create a Spring Boot application annotated with `@SpringBootApplication` as you would normally do, and also add the `@EnableOccurrent` annotation (located in package `org.occurrent.springboot.mongo.blocking`). 
Occurrent will then configure the following components automatically:
 
* A Spring MongoDB Event Store instance (`EventStore`)
* A Spring `CheckpointStorage` instance 
* A durable Spring MongoDB competing consumer subscription model (`SubscriptionModel`)
* A Jackson-based `CloudEventConverter`. From `0.20.1`, the starter autoconfigures the Jackson 3 lane by default. Existing applications can still use the Jackson 2 compatibility lane during migration, but in that case you need to define your own `CloudEventConverter` bean explicitly.
  It uses a reflection based cloud event type mapper that uses the fully-qualified class name as cloud event type (you _should_ absolutely override this bean for production use cases).
  You can do this, for example, by doing:
  ```java
  @Bean
  public CloudEventTypeMapper<GameEvent> cloudEventTypeMapper() {
    return ReflectionCloudEventTypeMapper.simple(GameEvent.class);
  }
  ```
  This will use the "simple name" (via reflection) of a domain event as the cloud event type. But since the package name is now lost from the cloud event type property, the `ReflectionCloudEventTypeMapper` will append the package name of `GameEvent` when converting back into a domain event. 
  This _only_ works if all your domain events are located in the exact same package as `GameEvent`. If this is not the case you need to implement a more advanced `CloudEventTypeMapper` such as
  ```kotlin
  class CustomTypeMapper : CloudEventTypeMapper<GameEvent> {
      override fun getCloudEventType(type: Class<out GameEvent>): String = type.simpleName
  
      override fun <E : GameEvent> getDomainEventType(cloudEventType: String): Class<E> = when (cloudEventType) {
          GameStarted::class.simpleName -> GameStarted::class
          GamePlayed::class.simpleName -> GamePlayed::class
          // Add all other events here!!
          ...
          else -> throw IllegalStateException("Event type $cloudEventType is unknown")
      }.java as Class<E>
  }
  ```
  or implement your own custom [CloudEventConverter](#cloudevent-conversion).
* A `GenericApplicationService` instance (`ApplicationService`)
* A subscription dsl instance (`Subscriptions`)
* A query dsl instance (`DomainEventQueries`)
* When the DCB capability is enabled, the DCB counterparts too: a DCB application service (`DcbApplicationService`), a DCB subscription dsl (`DcbSubscriptions`), and a DCB query dsl (`DcbDomainEventQueries`)
* Support for [annotations](#spring-boot-annotations)

For most new Spring Boot applications, the recommended setup is:

* Spring Boot 4
* `occurrent-mongodb-spring-boot-starter`
* `occurrent-cloudevent-converter-jackson3` if you configure the converter explicitly

If you are upgrading an existing application that still depends on the Jackson 2 converter API, you can continue to use that compatibility lane while migrating incrementally. The Spring Boot starter will not autoconfigure the Jackson 2 converter for you, so you must register a `CloudEventConverter` bean yourself, for example:

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import org.occurrent.application.converter.CloudEventConverter;
import org.occurrent.application.converter.jackson.JacksonCloudEventConverter;
import org.occurrent.application.converter.typemapper.CloudEventTypeMapper;

@Bean
CloudEventConverter<GameEvent> cloudEventConverter(ObjectMapper objectMapper, CloudEventTypeMapper<GameEvent> cloudEventTypeMapper) {
    return new JacksonCloudEventConverter.Builder<GameEvent>(objectMapper, URI.create("urn:example:game"))
            .typeMapper(cloudEventTypeMapper)
            .build();
}
```

Any user-defined `CloudEventConverter` bean takes precedence over the starter's built-in fallback converter, regardless of whether your custom converter uses Jackson 2 or Jackson 3.

You can of course override other beans as well to tailor them to your needs. 
See the source code of [org.occurrent.springboot.mongo.blocking.OccurrentMongoAutoConfiguration](https://github.com/johanhaleby/occurrent/blob/occurrent-{{site.occurrentversion}}/framework/spring-boot-starter-mongodb/src/main/java/org/occurrent/springboot/mongo/blocking/OccurrentMongoAutoConfiguration.java)
if you want to know exactly what gets configured automatically.

It's also possible to configure certain aspects from the `application.yaml` file under the "occurrent" namespace.
For example:
                 
```yaml
occurrent:
  application-service:
    enable-default-retry-strategy: false
```

You can code-complete the available properties in Intellij or have a look at [org.occurrent.springboot.common.OccurrentProperties](https://github.com/johanhaleby/occurrent/blob/occurrent-{{site.occurrentversion}}/framework/spring-boot-autoconfigure/common/src/main/java/org/occurrent/springboot/common/OccurrentProperties.java)
to find which configuration properties that are supported.

## Reactive Spring Boot Starter

If your application is reactive (Spring WebFlux with reactive MongoDB), use the reactive starter (`org.occurrent:occurrent-mongodb-reactive-spring-boot-starter`) and annotate your application with `@EnableOccurrentReactive` (package `org.occurrent.springboot.mongo.reactor`) instead of `@EnableOccurrent`. It auto-configures the reactive counterparts of everything the blocking starter sets up: a reactive `EventStore`, a reactive transaction manager, a reactive application service (both the stream and the DCB application service), the query DSLs, a reactive `SubscriptionModel` backed by `CheckpointStorage`, and the reactive `StreamSubscriptions` and `DcbSubscriptions` DSLs. The blocking and reactive starters are mutually exclusive, so pick the one that matches your stack.

## Spring Boot Annotations

If using the [Spring Boot Starter](#spring-boot-starter) you have the option to start subscriptions using the `@Subscription` annotation (`org.occurrent.annotation.Subscription`). 
For example if you have a domain event like this:

{% include macros/annotation/domain-event.md %}

you can create a subscription to _all_ events like this:

{% include macros/annotation/basic-example.md %}

Note that subscriptions started by the `Subscription` annotation will make use of [competing consumers](#competing-consumer-subscription-blocking) so that if you run multiple instances of the application one of them will receive the event(s).

Since version {{site.occurrentversion}}, `@Subscription` is capability-neutral. On an event store that has both the stream and the DCB capability it delivers both stream-written and DCB-appended events, filtered by event type, with catch-up over the shared global position. Use `@StreamSubscription` when you want stream events only, and [`@DcbSubscription`](#subscribing-to-dcb-events) when you want DCB events only with tag-based filtering. `@StreamSubscription` is configured the same way as `@Subscription` described below, only scoped to stream events.

All of these are asynchronous. For a handler that runs synchronously on the writer thread, before `execute` returns, and can commit atomically with the write, use [`@SynchronousSubscription`](#synchronous-subscriptions) instead. It is documented under [Synchronous Subscriptions](#synchronous-subscriptions).

#### Subscription Start Position

When creating a subscription using the `@Subscription` annotation you can specify how it should behave when first starting (creating) the subscription 
as well as how it should be resumed when the application is restarted. Here's an example:

{% include macros/annotation/start-position-example.md %}

This will first replay all historic events from the beginning of time and then continue subscribing to new events continuously. You can also start at a specific date by using `startAtISO8601()` or `startAtTimeEpochMillis()`.

Note that the example above will _start_ replaying historic events from the beginning of time when the subscription is started the first time. However, once the subscription is resumed, e.g. on application restart, it'll continue from the last received event.

Here's a description for each StartPosition:

| StartPosition       | Description                                                                                                                                                                                                                                                            |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BEGINNING_OF_TIME` | Start this subscription from the first event in the event store.                                                                                                                                                                                                       |
| `NOW`               | Start this subscription from current time.                                                                                                                                                                                                                             |
| `DEFAULT`           | Start this subscription using the default behavior of the subscription model. Typically, this means that it'll start from `NOW`, unless the subscription has already been started before, in which case the subscription will be started from its last known checkpoint. |
                                            

If you want a different behavior when the application is restarted, configure a different `resumeBehavior()` (`@Subscription(id="mySubscription", resumeBehavior=..)`):

Resume behavior:

| ResumeBehavior     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DEFAULT`          | Use the default resume behavior of the underlying subscription model. For example, if the `StartPosition` is set to `StartPosition.BEGINNING_OF_TIME`, and `ResumeBehavior` is set to `ResumeBehavior.DEFAULT`, then the subscription will _start_ from the beginning of time the first time it's run. Then, on application restart, it'll continue from the last received event (the checkpoint for the subscription) on restart. |
| `SAME_AS_START_AT` | Always start at the same position as specified by the `StartPosition`. I.e., even if there's a checkpoint stored for the subscription, it'll be ignored on application restart and the subscription will resume from the specified `StartPosition`.                                                                                                                                                                                |


The combination of start and resume behavior can enable various use cases. For example:

| StartPostion        | ResumeBehavior     | Use Case                                                                                                                                                                                                                                                                                                         |
|---------------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BEGINNING_OF_TIME` | `DEFAULT`          | Start a new subscription from "beginning of time", but when the app is restarted, continue from the last processed event (i.e. don't replay all historic events again).                                                                                                                                          |
| `BEGINNING_OF_TIME` | `SAME_AS_START_AT` | The subscription will always (even on restart) subscribe to all historic events, effectively making this an in-memory subscription. Note that this subscription will be called on each instance of the application even though competition consumer behavior is configured.                                      |
| `NOW`               | `SAME_AS_START_AT` | The subscription will always (even on restart) subscribe to events from "now", ignoring the historic events. This will effectively make this an in-memory subscription. Note that this subscription will be called on each instance of the application event though competition consumer behavior is configured. |
| `NOW`               | `DEFAULT`          | The subscription start subscribing to events from "now" when created, but continue (resume) from the last received event on restart.                                                                                                                                                                             |
| `DEFAULT`           | `DEFAULT`          | Same as above (this is the default behavior if start position and resume behavior is not specified).                                                                                                                                                                                                             |


#### Selective Events

If `DomainEvent` is a sealed interface/class (as in the examples above), then all events implementing this interface/class will be received when subscribing to this event.
You can of course subscribe to an individual event, such as `DomainEvent2`. But if you want to receive only some of the events that implement the `DomainEvent` interface, you can use `eventTypes()`.
For example, if you want to subscribe on both `DomainEvent1` and `DomainEvent3` but handle them as a `DomainEvent`:

{% include macros/annotation/event-types-example.md %}

#### Event Metadata

Sometimes it can be useful to get the metadata associated with the received event. For this reason, you can add a parameter of type `org.occurrent.cloudevents.EventMetadata` to a method annotated with `@Subscription` or `@StreamSubscription`.
It contains all extension properties added to the [CloudEvent](#cloudevent-metadata), with typed accessors for the common ones: `streamId`, `streamVersion`, and `position` (the global sequence number, or `null` for a stream-written event on a store that does not record a position). Note that for an event delivered through the capability-neutral `@Subscription` or the DCB path, `streamId` is the internal generated partition id rather than a domain stream id, but it is always present. For example:

{% include macros/annotation/metadata-example.md %}

When you only need the stream id or stream version, annotate a handler parameter with `@StreamId` or `@StreamVersion` instead of taking the whole `EventMetadata`. `@StreamId` binds a `String`, `@StreamVersion` a `long` or `Long`, and they may appear in any order alongside the event and an optional `EventMetadata` parameter. This works on `@Subscription`, `@StreamSubscription`, and `@SynchronousSubscription` (the same internal-partition-id caveat above applies on the capability-neutral `@Subscription`). On `@DcbSubscription` these annotations are rejected at startup, since a DCB handler's stream id and version are internal partition values rather than domain ones.

{% include macros/annotation/stream-id-version-example.md %}

#### Subscription Startup Mode

You can configure whether the subscription should start before the application is ready to receive requests. For example, it might be very important that a certain subscription is started before the first web request comes in:

{% include macros/annotation/startup-mode-wait-until-started-example.md %}

In other cases, such as when replaying a huge number of historic events it might be better to let the application start and let the processing of historic events happen in the background.

{% include macros/annotation/startup-mode-background-example.md %}

Here's a summary of the different startup modes:


| StartupMode          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DEFAULT`            | Determine the startup mode based on the properties of the subscription (such as `startAt()` and `resumeBehavior()`). It'll use `BACKGROUND` if the subscription needs to replay historic events before subscribing to new ones (e.g. if `startAt()` is `StartPosition.BEGINNING_OF_TIME`), otherwise `WAIT_UNTIL_STARTED` will be used.                                                                                                                                                                                                                                                                                                                                                                             |
| `WAIT_UNTIL_STARTED` | The subscription will wait until it's started up fully before Spring continues starting the rest of the application. Most of the time this is recommended because otherwise there could be a small chance that a request is received by your application before the subscription has bootstrapped completely. This can lead to the subscription missing this event. This is only true if the subscription is brand new. As soon as the subscription has received an event that is stored in a `org.occurrent.subscription.api.blocking.CheckpointStorage`, it'll never miss an event during startup.                                                                                      |
| `BACKGROUND`         | The subscription will NOT wait until it's started up fully before Spring continues starting the rest of the application; instead, it will be started in the background. Typically, this is useful if you instruct the subscription to start at an earlier date (such as the beginning of time), and you have a lot of events to read before the subscription has caught up. In this case, you may wish to start the Spring application before the subscription has fully started (i.e., before all historic events have been replayed) because waiting for all events to replay takes too long. The subscription will then replay all historic events in the background before switching to continuous mode. |

# Testing

A saga and a projection are pure data folded by pure functions, so most of what you want to assert needs no store, no subscription, no Docker and no waiting. That is the first level, and it should carry nearly all of your coverage. The second level runs the real executor over an in-memory event store, and one test at that level is usually enough to prove the wiring.

Everything below uses JUnit Jupiter and AssertJ. The API used is the same on JUnit 5 and 6, so the snippets work on either.

## Testing a Saga {#testing-a-saga}

`Saga.step(state, input)` folds `evolve` and then `react`, and returns the new state together with the effects that transition produced. It is what the executor runs per input, which is why it is also what a test drives. No clock, no scheduler, no store.

The sagas below are the ones from [the Flow DSL](#saga-flow-dsl), and they are kept compiling as real tests in `dsl/saga-dsl/common/src/test`, so what you read here is what runs.

Start with a plain event. A branch that leaves a step reports where the flow went next:

{% capture kotlin %}
val started = start(lobby, GameCreated("game-1"))

val step = lobby.step(started.state, SagaInput.event(PlayerJoined("game-1")))

assertThat(step.state.currentStep()).isEqualTo("waiting-for-both-players")
{% endcapture %}
{% capture java %}
Saga.Step<FlowState<GameEvent>, CloseGame> started = start(lobby, new GameCreated("game-1"));

Saga.Step<FlowState<GameEvent>, CloseGame> step = lobby.step(started.state(), SagaInput.event(new PlayerJoined("game-1")));

assertThat(step.state().currentStep()).isEqualTo("waiting-for-both-players");
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Two things to know before you write the first test

**`step` does not apply `onStart`.** A start event creates the instance, and `onStart` runs once at that point, but `step` is only `evolve` plus `react`. So a start event is applied the way the executor does it, and it is worth a small helper because every saga test needs it:

{% capture kotlin %}
fun <E : Any, C : Any> start(saga: Saga<E, FlowState<E>, C>, event: E): Saga.Step<FlowState<E>, C> {
    val state = saga.evolve(saga.initialState(), SagaInput.event(event))
    val effects = saga.onStart(state, event) + saga.react(state, SagaInput.event(event))
    return Saga.Step(state, effects)
}
{% endcapture %}
{% capture java %}
static <E, C> Saga.Step<FlowState<E>, C> start(Saga<E, FlowState<E>, C> saga, E event) {
    FlowState<E> state = saga.evolve(saga.initialState(), SagaInput.event(event));
    List<SagaEffect<C>> effects = new ArrayList<>(saga.onStart(state, event));
    effects.addAll(saga.react(state, SagaInput.event(event)));
    return new Saga.Step<>(state, effects);
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

**Effects are not only commands.** Leaving a step whose timeout was armed cancels that timer, and the cancellation is an effect like any other. So a branch that issues no command does not produce an empty effects list, it produces a `CancelTimeout`. Assert on the commands you care about rather than on the whole list:

{% capture kotlin %}
val step = lobby.step(started.state, SagaInput.event(PlayerJoined("game-1")))

// The branch issues nothing, but leaving the step still cancels its timeout
assertThat(step.effects).containsExactly(SagaEffect.cancelTimeout("step:awaiting-players"))
{% endcapture %}
{% capture java %}
Saga.Step<FlowState<GameEvent>, CloseGame> step = lobby.step(started.state(), SagaInput.event(new PlayerJoined("game-1")));

// The branch issues nothing, but leaving the step still cancels its timeout
assertThat(step.effects()).containsExactly(SagaEffect.cancelTimeout("step:awaiting-players"));
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

### Firing a timeout without waiting {#testing-saga-timeouts}

This is the part worth knowing. A timeout is an input, so you fire it by naming its timer instead of letting time pass. A flow step's timeout is named after the step, with a `step:` prefix, so a step called `awaiting-players` fires as `step:awaiting-players`:

{% capture kotlin %}
val step = lobby.step(started.state, SagaInput.timeout(SagaTimeout("game-1", "step:awaiting-players")))

assertAll(
    { assertThat(step.effects).containsExactly(SagaEffect.issue(CloseGame("game-1"))) },
    { assertThat(step.state.completed()).isTrue() }
)
{% endcapture %}
{% capture java %}
Saga.Step<FlowState<GameEvent>, CloseGame> step =
        lobby.step(started.state(), SagaInput.timeout(new SagaTimeout("game-1", "step:awaiting-players")));

assertAll(
        () -> assertThat(step.effects()).containsExactly(SagaEffect.issue(new CloseGame("game-1"))),
        () -> assertThat(step.state().completed()).isTrue()
);
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

An absolute `timeout(at = ...)` is fired exactly the same way. The deadline decides when the executor would fire the timer, and it has no say in what happens once it does, so a test never has to reach that instant. A timer name the saga does not know is a no-op, which is also worth a test, because it is what a typo in a `reactOnTimeout` name looks like.

### A join, one event at a time {#testing-saga-joins}

A join runs once every expectation is met, counted since the step was entered. The interesting test is the one before that, where the join is partially fulfilled and must not advance. Feed the events one at a time and pass each step's state into the next:

{% capture kotlin %}
// One of the two expected events: the flow must stay put
val afterFirst = lobby.step(joinStepEntered, SagaInput.event(PlayerReady("game-1")))
assertThat(afterFirst.state.currentStep()).isEqualTo("waiting-for-both-players")

// The second one fulfils the join and follows its continuation
val afterSecond = lobby.step(afterFirst.state, SagaInput.event(PlayerReady("game-1")))
assertThat(afterSecond.state.completed()).isTrue()
{% endcapture %}
{% capture java %}
// One of the two expected events: the flow must stay put
Saga.Step<FlowState<GameEvent>, CloseGame> afterFirst = lobby.step(joinStepEntered, SagaInput.event(new PlayerReady("game-1")));
assertThat(afterFirst.state().currentStep()).isEqualTo("waiting-for-both-players");

// The second one fulfils the join and follows its continuation
Saga.Step<FlowState<GameEvent>, CloseGame> afterSecond = lobby.step(afterFirst.state(), SagaInput.event(new PlayerReady("game-1")));
assertThat(afterSecond.state().completed()).isTrue();
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Write the partial case first. A join that advances too early passes a test that only checks the fulfilled path.

### Transitions and loops {#testing-saga-transitions}

`currentStep()` is how you assert where a flow went, and that covers `next`, `end` and `transitionTo` alike. A back-edge is the one that repays testing, because a loop that quietly leaves its step looks the same from the outside as one that stays. Using the auction from the Flow DSL section, each bid re-enters `bidding`, and the deadline still closes it after any number of bids:

{% capture kotlin %}
val afterBid = auction.step(started.state, SagaInput.event(BidPlaced("auction-1", 100)))
assertThat(afterBid.state.currentStep()).isEqualTo("bidding")

val closed = auction.step(afterBid.state, SagaInput.timeout(SagaTimeout("auction-1", "step:bidding")))
assertThat(closed.effects).containsExactly(SagaEffect.issue(CloseAuction("auction-1")))
{% endcapture %}
{% capture java %}
Saga.Step<FlowState<AuctionEvent>, CloseAuction> afterBid = auction.step(started.state(), SagaInput.event(new BidPlaced("auction-1", 100)));
assertThat(afterBid.state().currentStep()).isEqualTo("bidding");

Saga.Step<FlowState<AuctionEvent>, CloseAuction> closed =
        auction.step(afterBid.state(), SagaInput.timeout(new SagaTimeout("auction-1", "step:bidding")));
assertThat(closed.effects()).containsExactly(SagaEffect.issue(new CloseAuction("auction-1")));
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

A guard is tested the same way, by driving the same branch twice with events that differ only in the guarded value and asserting the flow moved in one case and not the other.

### Through the executor, once {#testing-saga-end-to-end}

The level above proves the saga. This level proves the wiring: that the runner subscribes, correlates, persists and dispatches. Use the in-memory event store and subscription model, `SagaStateStore.inMemory()`, and a `CommandDispatcher` that collects into a list so you can assert on it.

A timeout is the one case that genuinely needs time to pass here, and the poll interval is configurable so it does not need much. Shrink both the interval and the saga's own timeout:

{% capture kotlin %}
val issued = CopyOnWriteArrayList<OrderCommand>()
val dispatcher = CommandDispatcher<OrderCommand> { issued.add(it) }
val config = SagaRunnerConfig.defaults().withTimerPollInterval(Duration.ofMillis(50))

val runner = SagaRunner.agnostic<OrderEvent, OrderCommand>(subscriptionModel, converter)
runner.run("orders", orderFulfillment(Duration.ofMillis(150)), stateStore, dispatcher, null, config)
    .waitUntilStarted()

eventStore.write(orderId, converter.toCloudEvents(listOf(OrderPlaced(orderId, 42.0))))

await.atMost(5, TimeUnit.SECONDS).untilAsserted {
    assertThat(issued).containsExactly(ReservePayment(orderId, 42.0), CancelOrder(orderId, "payment timeout"))
}
{% endcapture %}
{% capture java %}
List<OrderCommand> issued = new CopyOnWriteArrayList<>();
CommandDispatcher<OrderCommand> dispatcher = issued::add;
SagaRunnerConfig config = SagaRunnerConfig.defaults().withTimerPollInterval(Duration.ofMillis(50));

SagaRunner<OrderEvent, OrderCommand> runner = SagaRunner.agnostic(subscriptionModel, converter);
runner.run("orders", orderFulfillment(Duration.ofMillis(150)), stateStore, dispatcher, null, config)
        .waitUntilStarted();

eventStore.write(orderId, converter.toCloudEvents(List.of(new OrderPlaced(orderId, 42.0))));

await().atMost(5, TimeUnit.SECONDS).untilAsserted(() ->
        assertThat(issued).containsExactly(new ReservePayment(orderId, 42.0), new CancelOrder(orderId, "payment timeout")));
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The [order-fulfillment example](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/saga/order-fulfillment) runs exactly this, in both languages, with no Docker.

If you use `received.initiating<GameCreated>()` in a Kotlin reaction, import it by name with `import org.occurrent.dsl.saga.flow.initiating`. `ReceivedEvents` also has a no-arg `initiating()`, and a member wins over an extension, so without the import the reified form does not resolve.

## Testing a Projection {#testing-a-projection}

A projection carries its fold in a `View`, so the smallest test asks the view to evolve a state and asserts the result. No store, no subscription:

{% capture kotlin %}
val view = isUsernameClaimed("bob").view()

var state = view.evolve(view.initialState(), AccountRegistered("1", "bob"))
assertThat(state).isTrue()

state = view.evolve(state, UsernameChanged("1", "alice"))
assertThat(state).isFalse()
{% endcapture %}
{% capture java %}
View<Boolean, AccountEvent> view = isUsernameClaimed("bob").view();

Boolean state = view.evolve(view.initialState(), new AccountRegistered("1", "bob"));
assertThat(state).isTrue();

state = view.evolve(state, new UsernameChanged("1", "alice"));
assertThat(state).isFalse();
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Cover the type without a handler too. A projection returns the state unchanged for an event it does not handle, and a fold that accidentally resets instead is easy to write and invisible without that test.

### Into a store {#testing-projection-materialized}

Above that level, run the projection through a `ProjectionRunner` into a repository and assert what landed there. The subscription is asynchronous, so the assertion waits:

{% capture kotlin %}
val store = ConcurrentHashMap<String, String>()
val repository = viewStateRepository<String, String>({ store[it] }, { id, state -> store[id] = state })

ProjectionRunner.agnostic(subscriptionModel, converter).project("current-name", currentName, repository)

eventStore.write("johan", converter.toCloudEvents(listOf(nameDefined("johan", "Johan Haleby"))))

await untilAsserted { assertThat(store["johan"]).isEqualTo("Johan Haleby") }
{% endcapture %}
{% capture java %}
Map<String, String> store = new ConcurrentHashMap<>();
ViewStateRepository<String, String> repository = ViewStateRepository.create(store::get, store::put);

ProjectionRunner.agnostic(subscriptionModel, converter).project("current-name", currentName, repository);

eventStore.write("johan", converter.toCloudEvents(List.of(nameDefined("johan", "Johan Haleby"))));

await().untilAsserted(() -> assertThat(store.get("johan")).isEqualTo("Johan Haleby"));
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

`currentName()` and `nameDefined(...)` are local test factories over your own projection and event types, not part of Occurrent. The snippets in this chapter come from `DocumentedProjectionTest` and `DocumentedProjectionKotlinTest` in `dsl/projection-dsl/blocking/src/test`, which run in CI, so you can read the full setup there.

### Read after write, for a synchronous projection {#testing-projection-synchronous}

A projection in `SYNCHRONOUS` mode updates its read model inside `execute(...)`, which is the whole reason the mode exists, so the test that proves it is the one with no waiting at all. Register the projection against the synchronous subscription model and read the store on the line after the write:

{% capture kotlin %}
ProjectionRunner.agnostic(synchronousSubscriptions, converter).project("current-name", currentName, repository)

applicationService.execute("johan") { listOf(nameDefined("johan", "Johan Haleby")) }

// No await: a synchronous projection is already updated when execute returns
assertThat(store["johan"]).isEqualTo("Johan Haleby")
{% endcapture %}
{% capture java %}
ProjectionRunner.agnostic(synchronousSubscriptions, converter).project("current-name", currentName, repository);

applicationService.execute("johan", state -> List.of(nameDefined("johan", "Johan Haleby")));

// No await: a synchronous projection is already updated when execute returns
assertThat(store.get("johan")).isEqualTo("Johan Haleby");
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Reaching for `await` here would hide the bug you are testing for, because a waiting assertion passes whether the update was synchronous or merely fast.

### Fed from a broker, without a broker {#testing-projection-push}

A projection fed from RabbitMQ or Kafka is driven by `accept(...)`, and your test can call that itself. Register against the push subscription model, then hand it the events your listener would have handed it. No broker, no container:

{% capture kotlin %}
ProjectionRunner.agnostic(pushModel, converter).project("order-status", projection, repository)

// Stand in for the listener
pushModel.accept(converter.toCloudEvent(OrderPlaced("order-1", "The Pragmatic Programmer")))
pushModel.accept(converter.toCloudEvent(OrderShipped("order-1")))

assertThat(store["order-1"]).isEqualTo(OrderStatusView("order-1", "The Pragmatic Programmer", "SHIPPED"))
{% endcapture %}
{% capture java %}
ProjectionRunner.agnostic(pushModel, converter).project("order-status", projection, repository);

// Stand in for the listener
pushModel.accept(converter.toCloudEvent(new OrderPlaced("order-1", "The Pragmatic Programmer")));
pushModel.accept(converter.toCloudEvent(new OrderShipped("order-1")));

assertThat(store.get("order-1")).isEqualTo(new OrderStatusView("order-1", "The Pragmatic Programmer", "SHIPPED"));
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

The catch-up in front of a push feed is worth its own test, because that is where a rebuilt projection either replays its history or silently starts empty. Write history before registering, then assert the projection ends up with the state the whole history implies rather than only the events you pushed afterwards.

### The push and pull agreement {#testing-projection-agreement}

This one is a property rather than a snippet, and it is the strongest test in the set. The same projection descriptor can be run two ways, pushed through a subscription into a stored read model, or folded over a query on demand. Both should give the same answer, so assert that instead of hand-writing the expected value twice:

{% capture kotlin %}
// Push: subscription-fed into a store
ProjectionRunner.agnostic(subscriptionModel, converter).project("current-name", currentName(), repository)
write("johan", nameDefined("johan", "Johan"), nameWasChanged("johan", "Johan Haleby"))

// A second instance, so the pull side actually has to scope to one of them
write("eve", nameDefined("eve", "Eve"))
await untilAsserted { assertThat(store["johan"]).isEqualTo("Johan Haleby") }

// Pull: the same descriptor folded over a query, right now
val queries = DomainEventQueries(eventStore, converter)
assertThat(queries.project(currentName(), "johan")).isEqualTo(store["johan"])
{% endcapture %}
{% capture java %}
// Push: subscription-fed into a store
ProjectionRunner.agnostic(subscriptionModel, converter).project("current-name", currentName(), repository);
write("johan", nameDefined("johan", "Johan"), nameWasChanged("johan", "Johan Haleby"));

// A second instance, so the pull side actually has to scope to one of them
write("eve", nameDefined("eve", "Eve"));
await().untilAsserted(() -> assertThat(store.get("johan")).isEqualTo("Johan Haleby"));

// Pull: the same descriptor folded over a query, right now
DomainEventQueries<DomainEvent> queries = new DomainEventQueries<>(eventStore, converter);
assertThat(Projections.project(currentName(), queries, "johan")).isEqualTo(store.get("johan"));
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

A disagreement is a bug in one of the two paths, and this catches classes of mistake a single expected value never will, a filter that selects different events on replay than live, or an id derivation that only works when metadata is present.

Write a second instance, as above. With only one instance in the store the pull side's scoping is a no-op, so the test cannot tell a correctly scoped fold from one that folds everything and happens to agree.

One thing to know. In Kotlin the on-demand fold is an extension, so it needs `import org.occurrent.dsl.projection.blocking.project` unless your test happens to sit in that package. From Java it's the static `Projections.project(projection, queries, instanceId)`, described under [Reading on demand](#reading-on-demand).

For a DCB projection the same pair is `dcbSubscriptions.project(id, projection, repository)` and `dcbQueries.project(projection)`, and note that a single-instance projection stores its one slot under the subscription id rather than under any value from the events. Reading the wrong key gives a test that looks reasonable and always sees `null`. The [projection-dsl example](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/projection-dsl) does this pairing for every one of its vignettes, in Java and Kotlin, for stream and DCB.

## Integration Testing {#integration-testing}

### Without a framework {#testing-in-memory}

The in-memory event store and subscription model are a complete setup, and they need no Docker. Pass the subscription model into the event store so a write reaches subscribers:

{% capture kotlin %}
val subscriptionModel = InMemorySubscriptionModel()
val eventStore = InMemoryEventStore(subscriptionModel)
{% endcapture %}
{% capture java %}
InMemorySubscriptionModel subscriptionModel = new InMemorySubscriptionModel();
InMemoryEventStore eventStore = new InMemoryEventStore(subscriptionModel);
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

Reach for this first. Every example in the repository tests this way, which is why the examples run without a container.

### With Spring Boot and Testcontainers {#testing-spring-boot}

To test the annotations, and the catch-up and checkpoint machinery behind them, you need a real MongoDB replica set. Provide it as a `@ServiceConnection` bean so Boot points itself at the container:

```java
@SpringBootTest
@Testcontainers
class ProjectionAnnotationTest {

    @TestConfiguration
    static class Containers {

        @Bean
        @ServiceConnection
        MongoDBContainer mongoDbContainer() {
            return new MongoDBContainer("mongo:8.0").withReplicaSet();
        }
    }
}
```

One trap. `MongoDBContainer.getReplicaSetUrl()` with no argument always targets the database named `test`, and you cannot append a suffix to the returned URL because MongoDB rejects dots in database names, so the name silently stays `test` and tests collide. When a test needs its own database, ask for it by name with `getReplicaSetUrl(String)`.

### Using the subscription life cycle {#testing-subscription-lifecycle}

`SubscriptionModelLifeCycle` exists partly for tests, and its own documentation says so: pausing a subscription is described as useful when you want to write events without triggering that particular subscription. That is a sharp tool for an integration test, because it lets you separate writing from consuming.

Pausing is not instantaneous, so wait for it before writing. Skipping this is the single most common way to make one of these tests flaky:

```java
subscriptionModel.pauseSubscription("orders");
await().atMost(ofSeconds(10)).until(() -> subscriptionModel.isPaused("orders"));

// Events written now are not delivered to this subscription
eventStore.write(orderId, events);

subscriptionModel.resumeSubscription("orders");
```

Resuming continues from the stored checkpoint rather than replaying from the beginning, so this is also how you test that resume behaviour is what you think it is: pause, write, resume, and assert the handler saw exactly what was written while it was away.

Two more worth knowing. `waitUntilStarted()` closes the race between subscribing and writing, and it is why the examples call it before their first write. `cancelSubscription(id)` drops a subscription entirely and frees its id, which is useful when one test class exercises several subscriptions in turn. The in-memory subscription model supports all of these, so most of this can be tested with no container at all.

### Stopping every subscription, then opting in {#testing-subscription-deny-by-default}

Pausing the subscriptions a test does not want works until somebody adds a subscription to the application. The new one then runs in every test that never mentioned it, and a test that used to pass can start failing for a reason nowhere in its own code.

Turning the default around removes that whole class of problem. Stop the entire subscription model before each test, and let each test name what it needs:

```java
class StopSubscriptionsExtension implements BeforeEachCallback, AfterEachCallback {

    private final SubscriptionModel subscriptionModel;

    StopSubscriptionsExtension(SubscriptionModel subscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }

    @Override
    public void beforeEach(ExtensionContext context) {
        subscriptionModel.stop();
    }

    @Override
    public void afterEach(ExtensionContext context) {
        subscriptionModel.stop();
    }

    void start(String subscriptionId) {
        subscriptionModel.resumeSubscription(subscriptionId).waitUntilStarted();
    }
}
```

`stop()` leaves every running subscription paused rather than cancelled, which is what lets `resumeSubscription` bring them back one at a time. Keeping `waitUntilStarted()` inside the helper means no test can forget it.

A test now opens with its own dependency list:

```java
@Test
void order_projection_is_updated_when_an_order_is_placed() {
    subscriptions.start("order-projection");

    eventStore.write(orderId, orderPlaced());

    await().untilAsserted(() -> assertThat(orders.findById(orderId)).isPresent());
}
```

Stopping in `afterEach` matters as much as in `beforeEach`. Spring caches the test context across test classes, so a subscription that one class resumed is still running when the next class starts.

If you also flush the database between tests, stop the subscriptions first, and pin the order with `@Order` rather than relying on the order of the fields:

```java
@RegisterExtension
@Order(1)
StopSubscriptionsExtension subscriptions = new StopSubscriptionsExtension(subscriptionModel);

@RegisterExtension
@Order(2)
FlushDatabaseExtension flush = new FlushDatabaseExtension(mongoTemplate);
```

While flushing, delete the documents instead of dropping the collections or the database. Dropping them invalidates a live MongoDB change stream, and the subscriptions you resume afterwards then receive nothing.

Flush the checkpoint collection along with the events, `subscriptions` unless you changed `occurrent.subscription.collection`. Resuming a subscription continues from its stored checkpoint, so a subscription left behind by an earlier test picks up whatever that test wrote while it was stopped, and the second test then sees events it never wrote. Clearing the events alone does not prevent this, because the checkpoint is what decides where the resume starts.

The in-memory subscription model does not have this problem. Events written while a subscription is stopped are dropped rather than queued, so there is nothing to catch up on when a later test starts it again.

Register your subscriptions once, not per test. A second `subscribe` call with an id that already exists fails with `Subscription <id> is already defined`, and the ids stay registered because stopping a subscription is not the same as cancelling it. Under Spring the application registers them at startup and a test never touches that. Without Spring, register them in `@BeforeAll`. Registering in `@BeforeEach` fails on the second test, and it would not work anyway: JUnit runs an extension's `beforeEach` before any `@BeforeEach` method, so a subscription created there is never stopped and runs in every test.

Then keep at least one test with everything running. Deny-by-default means nothing checks two subscriptions reacting to the same event unless you ask it to.

One cost stays. Every subscription still starts once while the application context boots, and is stopped again before the first test, so on MongoDB you pay for a change stream opened and closed per subscription per context. A JUnit extension runs after the context is refreshed, so nothing in the test can prevent that.

A subscription id that no longer exists throws `IllegalArgumentException` from `resumeSubscription`, so renaming one breaks the tests that named it instead of quietly leaving them asserting nothing.

# Upgrading

Most of the mechanical changes between Occurrent versions (type renames, package moves, and the safe part of the `Stream` to `List` write-side migration) are automated by an [OpenRewrite](https://docs.openrewrite.org/) recipe, so you rarely have to hand-edit imports and call sites.

For the {{site.occurrentversion}} release, add the `rewrite-maven-plugin`, point it at the umbrella recipe `org.occurrent.UpgradeToOccurrent_0_30`, and run it. The [upgrade guide](https://github.com/johanhaleby/occurrent/blob/main/doc/migration/upgrading-to-0.30.0.md) has the full plugin setup, the steps the recipe cannot safely make for you (mostly `Stream` to `List` lambda bodies and a few Kotlin call sites), and the runtime defaults to read before you deploy.

0.30.0 also renamed the module artifact coordinates (every artifact now has an `occurrent-` prefix). See the [upgrade guide](https://github.com/johanhaleby/occurrent/blob/main/doc/migration/upgrading-to-0.30.0.md) for the full old to new mapping.

If you are upgrading an existing MongoDB deployment, note that stream `position` is on by default for new stores, but the events already in your collection have none. The store detects this at startup and turns position off for itself rather than triggering a surprise index build on your existing data. To backfill `position` onto those old events and use position-based catch-up against them, follow the [position-backfill runbook](https://github.com/johanhaleby/occurrent/blob/main/doc/runbooks/position-backfill.md) and its [tool](https://github.com/johanhaleby/occurrent/blob/main/eventstore/migration/position-backfill/README.md).

0.31.0 also unifies the annotation `ResumeBehavior` and `StartupMode` enums into shared top-level `org.occurrent.annotation.ResumeBehavior` and `org.occurrent.annotation.StartupMode` types, instead of separate nested enums on `@Subscription`, `@StreamSubscription` and `@DcbSubscription`. This is a breaking rename for 0.30.0 callers, and the `org.occurrent.UpgradeToOccurrent_0_31` recipe rewrites it for you. `@Projection` and `@Snapshot` are new in 0.31.0 and use the shared types from the start, so there is nothing to rewrite for them. The same 0.31.0 release also moves `EventMetadata` from `org.occurrent.dsl.subscription` to `org.occurrent.cloudevents`, and the same recipe updates those imports as well. See the [upgrade guide](https://github.com/johanhaleby/occurrent/blob/main/doc/migration/upgrading-to-0.31.0.md) for the details.

# Examples

The [`example`](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example) folder in the repository has runnable, tested applications that put the concepts on this page together. The table below points to the most instructive ones and highlights which Occurrent features each demonstrates. Every link is pinned to the `{{site.occurrentversion}}` release.

| Example | What it shows | Occurrent features |
|:--------|:--------------|:-------------------|
| [Number guessing game](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/number-guessing-game) | A guess-the-secret-number game in plain Java, wired up two ways: the native MongoDB driver and Spring Boot (blocking). | `GenericApplicationService`, native and Spring (blocking) MongoDB event stores, subscription-based read models, side-effects (policies), integration events, `CloudEventConverter` |
| [Word guessing game](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/word-guessing-game) | A hangman-style word game as a full feature-sliced CQRS app on Spring Boot, in both a classic stream version and a DCB version. | Blocking subscriptions, subscription-driven side-effects (reveal hint, award points, email winner), MongoDB read models with the Query DSL, `CloudEventConverter`, DCB, jqwik property tests |
| [Rock paper scissors](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/rps) | The same game modelled several ways (pragmatic, single-round and multi-round `Decider`), plus a Spring Boot web app that plays it. | `Decider` DSL, combining and multi-round deciders, Spring Boot starter (`@EnableOccurrent`), CQRS gameplay and views, blocking subscriptions |
| [Uno](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/uno) | The Uno card game as a pure event-sourced model, run against the native MongoDB driver and Spring. | Event-sourced model, native and Spring MongoDB event stores, `GenericApplicationService`, command composition, `NativeMongoSubscriptionModel` |
| [Mastermind](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/mastermind) | The Mastermind board game modelled with the `Decider` pattern, playable against the computer. | `Decider` DSL, in-memory event store, `ApplicationService` |
| [Course enrollment](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/course-enrollment) | Enrolling a student holds a course-capacity rule and a per-student limit at once, across two entities, using DCB. | DCB, blocking `DcbApplicationService`, `dcbDecider` DSL, Spring Boot starter auto-configuration, conditional append with retry |
| [Hotel booking](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/hotel-booking) | The reactive twin of course enrollment: no double-booking a room, a per-guest active-booking limit, and a live SSE activity feed. | Reactive DCB, reactive `DcbApplicationService`, DCB subscription DSL (SSE feed), reactive Spring Boot starter, cross-boundary deciders |
| [Appointment scheduling](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/appointment-scheduling) | A clinic scheduler that books a clinician, patient and time slot under one consistency boundary, in plain Java with no Spring. | DCB on the native MongoDB store, plain Java `Decider`s with a hand-built `DcbCriteria`, `@DcbTag` annotation tags (`AnnotationTagGenerator`), Javalin and j2html web |
| [DCB patterns catalog](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/domain/dcb-patterns) | Five self-contained vignettes covering the [dcb.events](https://dcb.events/examples/) patterns the other examples do not show: unique username with a retention period, idempotency, a price change grace period, a consume-once opt-in token, and a gapless invoice number. Kotlin, no Spring, no Docker. | DCB, `DcbDecider`, `GenericDcbApplicationService`, in-memory DCB event store, uniqueness and idempotency as a scoped append condition, `DcbReadOptions.fromBeginning().backwards().limit(1)` |
| [Projection DSL](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/projection-dsl) | Four vignettes on the [Projection DSL](#projection-dsl), in Java and Kotlin, stream and DCB. Each projection is run two ways, pushed through a subscription into a stored read model and folded over a query on demand, and the two are asserted to agree. | `Projection`, `DcbProjection`, the Java handler builder and the Kotlin `projection { }` DSL, `MaterializedView`, an explicit `Filter` selecting on subject, tag-scoped single-instance read models, in-memory event store and subscription model |
| [Global position catch-up](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/global-position-catchup) | The global `position` assigned to every event, and rebuilding a projection by replaying across streams in write order. | Global position, catch-up projections, `DomainEventQueries.readInPositionOrder`, in-memory event store, `withoutStreamPosition()` opt-out |
| [Subscription-based projections](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/spring-subscription-based-mongodb-projections) | Building a MongoDB read model by subscribing to the event stream. | Blocking subscriptions, MongoDB read models, `CloudEventConverter` |
| [Transactional projection (blocking)](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/spring-transactional-projection-mongodb) | Updating a projection in the same MongoDB transaction as the event append. | Blocking Spring MongoDB event store, same-transaction projections |
| [Transactional projection (reactive)](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/spring-reactor-transactional-projection-mongodb) | The reactive version of the transactional projection. | Reactive Spring MongoDB event store, same-transaction projections on Project Reactor |
| [Ad-hoc event store queries](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/projection/spring-adhoc-eventstore-mongodb-queries) | Answering a query (most workouts completed) by querying the event store directly, with no separate read model. | `EventStore` queries, ad-hoc querying, Spring MongoDB |
| [Order fulfillment saga](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/saga/order-fulfillment) | One order-fulfillment process written twice, with the machine-core `Saga.builder(...)` in Java and with the Kotlin flow `saga { }` block, both run through `SagaRunner`. Placing an order reserves payment and arms a timeout, a reservation ships the order, and a payment failure or the timeout firing cancels it. In-memory, no Docker. | `Saga`, the core and flow saga DSLs, `SagaRunner`, per-instance state and timers, `CommandDispatcher` both as a plain `ApplicationService` lambda and through the `CommandDispatchers.decider(...)` adapter |
| [Closing the books](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/snapshot/closing-the-books) | An account ledger using both snapshot styles: `everyNEvents` to keep a long-lived stream's replay bounded, and `whenTerminal` to snapshot the closing balance when the books close. The closing balance carries into the next period as a real event, so the closed period's detailed events can be archived without losing money. In-memory, no Docker. | `SnapshotDeciderApplicationService`, `SnapshotPolicy` (`everyNEvents`, `whenTerminal`), `schemaVersion` falling back to a full replay, `EventStoreOperations.deleteEventStream` |
| [Forward to Spring events](https://github.com/johanhaleby/occurrent/tree/occurrent-{{site.occurrentversion}}/example/forwarder/mongodb-subscription-to-spring-event) | Forwarding CloudEvents from a MongoDB subscription to Spring `ApplicationEvent`s. | Blocking subscriptions, Spring `ApplicationEventPublisher` integration |

# Blogs

[Johan](https://github.com/johanhaleby) has created a couple of blog-posts on Occurrent on his [blog](https://code.haleby.se):

1. [Occurrent - Event Sourcing for the JVM](https://code.haleby.se/2020/11/21/occurrent-event-sourcing-for-the-jvm/)

# Contact & Support

Would you like to contribute to Occurrent? That's great! You should join the [mailing-list](https://groups.google.com/g/occurrent) or contribute on [github](https://github.com/johanhaleby/occurrent).
The [mailing-list](https://groups.google.com/g/occurrent) can also be used for support and discussions.

# Credits

Thanks to [Per Ökvist](https://github.com/perokvist) for discussions and ideas, and [David Åse](https://www.linkedin.com/in/davidaase/) for letting me fork 
the awesome [Javalin](https://javalin.io/) website. Credits should also go to [Alec Henninger](https://github.com/alechenninger) for his work on [competing consumer support](https://www.alechenninger.com/2020/05/building-kafka-like-message-queue-with.html) 
for MongoDB change streams. 
