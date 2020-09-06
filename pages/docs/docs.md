---
layout: default
title: Documentation
rightmenu: false
permalink: /documentation
---

{% include notificationBanner.html %}

<div id="spy-nav" class="left-menu" markdown="1">
* [Introduction](#introduction)
* [Concepts](#concepts)
* * [Event Sourcing](#event-sourcing)
* * [EventStore](#eventstore)
* * * [EventStream](#eventstream)
* * * [WriteCondition](#write-condition)
* * * [Queries](#eventstore-queries)
* * [Subscriptions](#subscriptions)
* * [Views](#views)
* * [Commands](#commands)
* * [Sagas](#sagas)
* * [Snapshots](#snapshots)
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
* * * [Start Position](#blocking-subscription-stream-start-position)
* * * [Stream Position Storage](#blocking-subscription-stream-position-storage)
* * [Reactive](#reactive-subscriptions)
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

A "write condition" can be used to specify conditional writes to the event store. Typically, the purpose of this would be to achieve [optimistic concurrent control](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) (optimistic locking) of an event stream.

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
One such strength is that typically databases have good querying support. Occurrent exposes this with the `EventStoreQueries` interface
that an `EventStore` implementation may implement to expose querying capabilities. For example:

{% capture java %}
ZonedDateTime lastTwoHours = ZonedDateTime.now().minusHours(2); 
// Query the database for all events the last two hours that have "subject" equal to "123" and sort these in descending order
Stream<CloudEvent> events = eventStore.query(time(lte(lastTwoHours)).and(subject("123")), SortBy.TIME_DESC);
{% endcapture %}
{% capture kotlin %}
val lastTwoHours = ZonedDateTime.now().minusHours(2);
// Query the database for all events the last two hours that have "subject" equal to "123" and sort these in descending order
val events : Stream<CloudEvent> = eventStore.query(time(lte(lastTwoHours)).and(subject("123")), SortBy.TIME_DESC)
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

A subscription is a way get notified when new events are written to an event store. Typically, a subscription will forward the event to another piece of infrastructure such as
a message bus, or to create views from the events (such as projections, sagas, snapshots etc). There are two different kinds of API's, the first one is a blocking 
API represented by the `BlockingSubscription` interface (in the `org.occurrent:subscription-api-blocking` module), and second one is a reactive API 
represented by the `ReactorSubscription` interface (in the `org.occurrent:subscription-api-reactor` module). 


The blocking API is callback based, which is fine if you're working with individual events (you can of course write a simple function that aggregates events into batches).
If you want to work with streams of data, the `ReactorSubscription` is probably a better option since it's using the [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html)
publisher from [project reactor](https://projectreactor.io/).

Note that it's fine to use `ReactorSubscription`, even though the event store is implemented using the blocking api, and vice versa.
If the datastore allows it, you can also run subscriptions in a different process than the processes reading and writing to the event store.   

To get started with subscriptions refer to [Using Subscriptions](#using-subscriptions).

## Views

Occurrent has no built-in support for views/projections, it's up to you to create and store views as you find fit. But this doesn't have to be difficult!
All you need to do is to create a [subscription](#subscriptions) and write something to a DB. Here's a trivial example of a view that maintains the number of
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

Occurrent doesn't contain a built-in command bus. The reason for this is that I'm not convinced that it's needed in a majority of cases :)
To send "commands" to another service (remotely) one could call a REST API or make an RPC invocation instead of using a proprietary command bus.  

But what about internally? For example if a service exposes a REST API and upon receiving a request it publishes a command that's somehow picked up and 
routed to a function in your domain model. It's not uncommon to use a framework in which you define your domain model like this:

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

Let's look at a "command" and see what it typically looks like:

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

From a typically Java perspective one could argue that this is not too bad. But it does have a few things one could improve upon from a broader perspective:

1. The `WordGuessingGame` is [complecting](https://www.infoq.com/presentations/Simple-Made-Easy/) several things that may be modelled separately. 
   Data, state, behavior, command- and event routing and event publishing are all defined in the same model (the `WordGuessingGame` class). 
   For small examples like this it arguably doesn't matter but if you have complex logic it probably will. Keeping state and behavior separate allows
   for easier testing, referential transparency and function composition. It allows treating the state as a [value](https://www.infoq.com/presentations/Value-Values/)
   which has many benefits.    
1. Commands are defined as explicit data structures (this is not _necessarily_ a bad thing but it will add to your code base) when arguably they don't have to. 

So how would one dispatch commands in Occurrent? There's actually nothing stopping you from implementation a simple command bus, create explicit commands, 
and dispatch them the way we did in the example above. Actually it would be relativley easy to implement the imaginary framework above using Occurrent components. But if
you've recognized the problems described above you're probably looking for a different approach. Here's another way you can do it. First of all let's refactor 
our domain model to pure functions, without any state or dependencies to Occurrent or any other library/framework. 

{% include macros/domain/wordGuessingGameDomainEvents.md java=java kotlin=kotlin %}

If you define your behavior like this it'll be really easy to test (and also to compose using normal function composition techniques). There are no side-effects 
(such as publishing events) which also allows for easier testing and [local reasoning](https://www.inner-product.com/posts/fp-what-and-why/).

But where are our commands!? In this example we've decided to represent them as functions! I.e. the "command" is modeled as simple function, e.g. `startNewGame`!
But wait, how can I dispatch commands to this function? Don't I need to create some custom, problem specific, middleware mumbo-jumbo to achieve this?
The answer is.... 🥁 no! Just create or copy a generic `ApplicationService` class like the one below if you're using an object-oriented approach:         

{% include macros/applicationservice/generic-oo-application-service.md %}

<div class="comment">Why is this "utility" not included in Occurrent? Maybe it will in the future, but one reason is that you might want to do small tweaks to this implementation. 
When using Spring, you might want to add a "@Transactional" annotation, or if you're using Kotlin you might want to take a higher-order function that returns a "Sequence&lt;DomainEvent&gt;" 
instead of "Stream&lt;DomainEvent&gt;" etc etc. The reasoning is that copying and pasting this peice of code into your application will not be difficult, and then you're in full control!</div>

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

If you're using a more functional approach you can create a function like this that represents an application service:

{% include macros/applicationservice/generic-fp-application-service.md %}

and when you have instantiated an `EventStore` and created functions that converts a CloudEvent to a DomainEvent and vice versa:

{% capture java %}
// A function that converts a CloudEvent to a "domain event"
Function<CloudEvent, DomainEvent> convertCloudEventToDomainEvent = ..
// A function that a "domain event" to a CloudEvent
Function<DomainEvent, CloudEvent> convertDomainEventToCloudEvent = ..
// The event store
EventStore eventStore = ..
{% endcapture %}
{% capture kotlin %}
// A function that converts a CloudEvent to a "domain event"
val convertCloudEventToDomainEvent : (CloudEvent) -> DomainEvent = 
// A function that a "domain event" to a CloudEvent
val convertDomainEventToCloudEvent = (DomainEvent) -> CloudEvent  = ..
val eventStore : EventStore = ..
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

then you can compose these functions into a generic "application service function":

{% capture java %}
// This example is using an imaginary FP library for Java that has methods such as "partially". 
// You might want to look into "Vavr" or "Functional Java" which includes functions like this  
BiConsumer<String, Function<Stream<DomainEvent>, Stream<DomainEvent>> applicationService = (streamId, domainFn) -> 
            partially(ApplicationService::execute, evenStore, streamId)
            .andThen( domainEventsInStream -> domainEventsInStream.map(convertCloudEventToDomainEvent))
            .andThen(domainFn)
            .andThen( newDomainEvents -> newDomainEvents.map(convertDomainEventToCloudEvent));       
{% endcapture %}
{% capture kotlin %}
// This example is using an imaginary FP library for Kotlin that has methods such as "partially" and "andThen". 
// You might want to look into the Kotlin "arrow" library which include these functions.
val applicationService = (String, (Stream<DomainEvent>) -> Stream<DomainEvent>)) = { streamId, domainFn -> 
         partially(ApplicationService::execute, evenStore, streamId)
         .andThen { domainEventsInStream -> domainEventsInStream.map(convertCloudEventToDomainEvent)) }
         .andThen(domainFn)
         .andThen { newDomainEvents -> newDomainEvents.map(convertDomainEventToCloudEvent) }
}

{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

and then use the "application service function" like this:

{% capture java %}
// Now in your REST API use the application service function:
String gameId = ... // From a form parameter
String wordToGuess = .. // From a form parameter
applicationService.consume(gameId, events -> WordGuessingGame.startNewGame(gameId, wordToGuess));
{% endcapture %}
{% capture kotlin %}
// Now in your REST API use the application service function:
val gameId = ... // From a form parameter
val wordToGuess = .. // From a form parameter
applicationService(gameId) { events -> 
    WordGuessingGame.startNewGame(gameId, wordToGuess)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}


## Sagas

* Link to [zio-saga](https://github.com/VladKopanev/zio-saga) if using Scala
* Describe TODO-list pattern (or routing slip)
* Show a reactor/policy using subscription

## Snapshots

* Async using subscriptions (if you don't want to update snapshot for every event then use `streamVersion` modulo `n`) 
* Sync using `@Transactional`
* "Closing the books" using a periodic snapshot

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

All MongoDB `EventStore` implementations tries to stay as close as possible to the <a href="https://cloudevents.io/">CloudEvent's</a> specification even in the persitence layer.
Occurrent, by default, automatically adds a custom "Occurrent extension" to each cloud event that is written to an `EventStore`.
The Occurrent CloudEvent Extension consists of these attributes:

<br>

| Attribute Name | Type  | Description |
|:----|:-----:|:----|
| `streamId` | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| An id the uniquely identifies a particular event stream.<br>It's used to determine which events belong to which stream. |     
| `streamVersion` | Long | The id of the stream version for a particular event.<br>It's used for optimistic concurrency control.  |     

A json schema describing a complete Occurrent CloudEvent, as it will be persisted to a MongoDB collection, can be found [here](https://github.com/johanhaleby/occurrent/blob/master/cloudevents-schema-occurrent.json) 
(a "raw" cloud event json schema can be found [here](https://github.com/tsurdilo/cloudevents-schema-vscode/blob/master/schemas/cloudevents-schema.json) for comparison).

Note that MongoDB will automatically add an [\_id](https://docs.mongodb.com/manual/reference/method/ObjectId/) field (which is not used by Occurrent). 
The reason why the CloudEvent `id` attribute is not stored as `_id` in MongoDB is that the `id` of a CloudEvent is not globally unique! 
The combination of `id` and `source` is a globally unique CloudEvent. Note also that `_id` will _not_ be included a `CloudEvent` when read from an `EventStore`.    

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
	"streamId" : "a1fc6ba1-7cd4-45cf-8dcc-b357fe23956d",
	"streamVersion" : NumberLong(1)
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
	"streamId" : "a1fc6ba1-7cd4-45cf-8dcc-b357fe23956d",
	"streamVersion" : NumberLong(2)
}
``` 

### MongoDB Time Representation

The CloudEvents specification says that the [time attribute](https://github.com/cloudevents/spec/blob/v1.0/spec.md#time), if present, must adhere to the [RFC 3339 specification](https://tools.ietf.org/html/rfc3339).
To accommodate this in MongoDB, the `time` attribute must be persisted as a `String`. This by itself is not a problem, a problem only arise 
if you want to make time-based queries on the events persisted to a MongoDB-backed `EventStore` (using the [EventStoreQueries](#eventstore-queries) interface).
This is, quite obviously, because time-based queries on `String`'s are suboptimal (to say the least) and may lead to surprising results.
What we _would_ like to do is to persist the `time` attribute as a `Date` in MongoDB, but MongoDB internally represents a Date with only millisecond resolution 
(see [here](https://docs.mongodb.com/manual/reference/method/Date/#behavior)) and then the CloudEvent cannot be compliant with the RFC 3339 specification in _all_ circumstances.

Because of the reasons described above, users of a MongoDB-backed `EventStore` implementation, must decide how the `time` attribute is to be represented in MongoDB
when instantiating an `EventStore` implementation. This is done by passing a value from the `org.occurrent.mongodb.timerepresentation.TimeRepresentation` enum to an
`EventStoreConfig` object that is then passed to the `EventStore` implementation. `TimeRepresentation` has these values: 

| Value |  Description |
|:----|:-----|
| `RFC_3339_STRING`&nbsp;&nbsp;&nbsp;&nbsp;| Persist the time attribute as an RFC 3339 string. This string is able to represent both nanoseconds and a timezone so this is recommended for apps that need to store this information or if you are uncertain of whether this is required in the future. |
| <br>`DATE` | <br>Persist the time attribute as a MongoDB [Date](https://docs.mongodb.com/manual/reference/method/Date/#behavior). The benefit of using this approach is that you can do range queries etc on the "time" field on the cloud event. This can be really useful for certain types on analytics or projections (such as show the 10 latest number of started games) without writing any custom code. |

Note that if you choose to go with `RFC_3339_STRING` you always have the optional of adding a custom attribute, named for example "date", in which you represent the "time" attribute as a `Date` when writing the events to an `EventStore`.
This way you have the ability to use the "time" attribute to re-construct the CloudEvent time attribute exactly as well as the ability to do _custom_ time-queries on the "date" attribute. However, you cannot use the methods involving time-based queries when using the [EventStoreQueries](#eventstore-queries) interface.

**Important**: There's yet another option! If you don't need nanotime precision (i.e you're fine with millisecond precision) _and_ you're OK with always representing the "time" attribute in UTC, then you can use
`TimeRepresentation.DATE` without loss of precision! This is why, if `DATE` is configured for the `EventStore`, Occurrent will refuse to store a `CloudEvent` that specifies nanotime 
and is not defined in UTC (so that there won't be any surprises). I.e. using `DATE` and then doing this will throw an `IllegalArgumentException`:

```java          
var cloudEvent = new CloudEventBuilder().time(ZonedDateTime.now()). .. .build();

// Will throw exception since ZonedDateTime.now() will include nanoseconds by default in Java 9+
eventStore.write(Stream.of(cloudEvent));
```

Instead, you need to remove nano seconds do like this explicitly:

```java
// Remove millis and make sure to use UTC as timezone                                          
var now = ZonedDateTime.now().truncatedTo(ChronoUnit.MILLIS).withZoneSameInstant(ZoneOffset.UTC);
var cloudEvent = new CloudEventBuilder().time(now). .. .build();

// Now you can write the cloud event
eventStore.write(Stream.of(cloudEvent));
```

For more thoughts on this, refer to the [architecture decision record](https://github.com/johanhaleby/occurrent/blob/master/doc/architecture/decisions/0004-mongodb-datetime-representation.md) on time representation in MongoDB. 

### MongoDB Indexes

Each MongoDB `EventStore` [implementation](#mongodb-eventstore-implementations) creates a few indexes for the "events collection" the first time they're instantiated. These are:

|  Name | Properties | Description |
|:----|:------|:-----|
| `streamId`| ascending | An index for the `streamId` property. Allows for fast reads of all events in a particular stream. |     
| `id` + `source` | ascending `id`,<br>descending&nbsp;`source`,&nbsp;&nbsp;<br>unique<br><br> | Compound index of `id` and `source` to comply with the [specification](https://github.com/cloudevents/spec/blob/v1.0/spec.md) that the `id`+`source` combination must be unique. |     
| `streamId` + `streamVersion`&nbsp;&nbsp;| ascending `streamId`,<br>descending `streamVersion`,<br>unique | Compound index of `streamId` and `streamVersion` (Occurrent CloudEvent extension) used for fast retrieval of the latest cloud event in a stream. |     

To allow for fast queries, for example when using [EventStoreQueries](#eventstore-queries), it's recommended to create additional indexes tailored to the querying behavior of 
your application. See [MongoDB indexes](https://docs.mongodb.com/manual/indexes/) for more information on how to do this. If you have many adhoc queries it's also worth 
checking out [wild-card indexes](https://docs.mongodb.com/manual/core/index-wildcard/) which is a new feature in MongoDB 4.2. These allow you to create indexes 
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
If you're already using Spring and you don't need reactive support then this is a good choice. You can make use of the `@Transactional` annotation to write events and views in the same tx (but make sure you understand what you're going before attempting this).

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

## Blocking Subscriptions

A "blocking subscription" is a subscription that uses the normal Java threading mechanism for IO operations, i.e. reading changes from an [EventStore](#choosing-an-eventstore) 
will block the thread. This is arguably the easiest and most familiar way to use subscriptions for the typical Java developer, 
and it's probably good-enough for most scenarios. If high throughput, low CPU and memory-consumption is critical then consider using
[reactive subscription](#reactive-subscription) instead. Reactive subscriptions are also better suited if you want to work with streaming data.   
 
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
`com.mongodb.client.model.Filters` (i.e the normal way to express filters in MongoDB). However, it's recommended always start with an `OccurrentSubscriptionFilter`
and only pick a more specific implementation if you cannot express your filter using the capabilities of `OccurrentSubscriptionFilter`.  

### Blocking Subscription Stream Start Position

### Blocking Subscription Stream Position Storage 

There are two _non-durable_ implementations of this interface for [MongoDB](#mongodb-eventstore-implementations) event stores:

* [Blocking subscription using the "native" Java MongoDB driver](#)
* [Blocking subscription using Spring MongoTemplate](#)

By "non-durable" we mean implementations doesn't store the stream position in a durable storage automatically.  
It might be that the datastore does this automatically _or_ that stream position storage is not required.
If the datastore _doesn't_ support storing the stream position automatically a subscription will typically implement the
`org.occurrent.subscription.api.blocking.PositionAwareBlockingSubscription` interface.

  

   
Typically, if you want
the stream to continue where it left off on application restart you want to store away the stream position. You can do this anyway you like,
but for most cases you probably want to look into implementations of `org.occurrent.subscription.api.blocking.PositionAwareBlockingSubscription`.
Subscriptions that implement this interface will automatically store the stream position to a datastore. These implementations are currently
provided by Occurrent:

   
## Reactive Subscriptions

# Contact & Support

Mailing-list etc

# Credits
