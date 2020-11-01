{% capture java %}
// Create the subscription position storage. Note that if PositionAwareBlockingSubscription
// is also storing the position, it's highly recommended to share the same BlockingSubscriptionPositionStorage instance.     
BlockingSubscriptionPositionStorage storage = ...
// Create the subscription instance that will be used once the replay has caught up the latest event position
PositionAwareBlockingSubscription continuousSubscription = ...
// Instantiate an event store that implements the EventStoreQueries API
EventStoreQueries eventStoreQueries = ... 


// Now combine the continuous subscription and the subscription position storage to allow
// handing over to the continuous subscription once catch-up phase is completed.
// In this example, we also store the subscription position during catch-up for every third event.
// This is optional, but useful if you're reading a lot of events and don't want to risk restarting 
// from the beginning if the application where to crash during the catch-up phase.   
CatchupSupportingBlockingSubscription catchupSubscription = new CatchupSupportingBlockingSubscription(continuousSubscription, eventStoreQueries, 
            new CatchupSupportingBlockingSubscriptionConfig(useSubscriptionPositionStorage(storage)
                    .andPersistSubscriptionPositionDuringCatchupPhaseForEveryNEvents(3));

// Start a subscription that starts replaying events of type "GameEnded" from the beginning of time
catchupSubscription.subscribe("mySubscription", filter(type("GameEnded")), StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime()), cloudEvent -> System.out.println(cloudEvent));

// Note that excluding "StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime())" like below would still start at 
// the beginnning of time the first time, but on subsequent calls will start from the latest position storing the in the storage.
// This is recommended if you want to continue using the CatchupSupportingBlockingSubscription later when no catch-up is required
// (since the subscription has already caught up).
catchupSubscription.subscribe("mySubscription", filter(type("GameEnded")), cloudEvent -> System.out.println(cloudEvent));

{% endcapture %}

{% capture kotlin %}
// is also storing the position, it's highly recommended to share the same BlockingSubscriptionPositionStorage instance.     
val storage : BlockingSubscriptionPositionStorage = ...
// Create the subscription instance that will be used once the replay has caught up the latest event position
val continuousSubscription : PositionAwareBlockingSubscription= ...
// Instantiate an event store that implements the EventStoreQueries API
val eventStoreQueries : EventStoreQueries = ... 


// Now combine the continuous subscription and the subscription position storage to allow
// handing over to the continuous subscription once catch-up phase is completed.
// In this example, we also store the subscription position during catch-up for every third event.
// This is optional, but useful if you're reading a lot of events and don't want to risk restarting 
// from the beginning if the application where to crash during the catch-up phase. If you don't
// use "andPersistSubscriptionPositionDuringCatchupPhaseForEveryNEvents" but just "useSubscriptionPositionStorage(storage)"
// then the CatchupSupportingBlockingSubscription will still start from the position in the storage, but not write to it.
// The continuous subscription (passed as first parameter to CatchupSupportingBlockingSubscription) might write to the store, 
// which means that once the CatchupSupportingBlockingSubscription has caught up and the continuous subscription starts
// writing the position, the CatchupSupportingBlockingSubscription will just delegate to continuous subscription if it finds
// a position in the storage.           
val catchupSubscription = CatchupSupportingBlockingSubscription(continuousSubscription, eventStoreQueries, 
            CatchupSupportingBlockingSubscriptionConfig(useSubscriptionPositionStorage(storage)
                    .andPersistSubscriptionPositionDuringCatchupPhaseForEveryNEvents(3))

// Start a subscription that starts replaying events of type "GameEnded" from the beginning of time
catchupSubscription.subscribe("mySubscription", filter(type("GameEnded")), StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime())) { cloudEvent -> 
    println(cloudEvent)
}

// Note that excluding "StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime())" like below would still start at 
// the beginnning of time the first time, but on subsequent calls will start from the latest position storing the in the storage.
// This is recommended if you want to continue using the CatchupSupportingBlockingSubscription later when no catch-up is required
// (since the subscription has already caught up).
catchupSubscription.subscribe("mySubscription", filter(type("GameEnded"))) { cloudEvent -> 
    println(cloudEvent)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}