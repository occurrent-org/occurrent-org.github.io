{% capture java %}
// Create the subscription position storage. Note that if PositionAwareBlockingSubscription
// is also storing the position, it's highly recommended to share the same BlockingSubscriptionPositionStorage instance.     
SubscriptionPositionStorage storage = ...
// Create the subscription instance that will be used once the replay has caught up the latest event position
PositionAwareSubscriptionModel continuousSubscriptionModel = ...
// Instantiate an event store that implements the EventStoreQueries API
EventStoreQueries eventStoreQueries = ... 


// Now combine the continuous subscription model and the subscription position storage to allow
// handing over to the continuous subscription once catch-up phase is completed.
// In this example, we also store the subscription position during catch-up for every third event.
// This is optional, but useful if you're reading a lot of events and don't want to risk restarting 
// from the beginning if the application where to crash during the catch-up phase.   
CatchupSubscriptionModel catchupSubscriptionModelModel = new CatchupSubscriptionModel(continuousSubscriptionModel, eventStoreQueries, 
            new CatchupSubscriptionModelConfig(useSubscriptionPositionStorage(storage)
                    .andPersistSubscriptionPositionDuringCatchupPhaseForEveryNEvents(3));

// Start a subscription that starts replaying events of type "GameEnded" from the beginning of time
catchupSubscriptionModelModel.subscribe("mySubscription", filter(type("GameEnded")), StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime()), cloudEvent -> System.out.println(cloudEvent));

// Note that excluding "StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime())" like below would still start at 
// the beginnning of time the first time, but on subsequent calls will start from the latest position storing the in the storage.
// This is recommended if you want to continue using the CatchupSubscriptionModel later when no catch-up is required
// (since the subscription has already caught up).
catchupSubscriptionModelModel.subscribe("mySubscription", filter(type("GameEnded")), cloudEvent -> System.out.println(cloudEvent));

{% endcapture %}

{% capture kotlin %}
// is also storing the position, it's highly recommended to share the same SubscriptionPositionStorage instance.     
val storage : SubscriptionPositionStorage = ...
// Create the subscription instance that will be used once the replay has caught up the latest event position
val continuousSubscription : PositionAwareSubscriptionModel= ...
// Instantiate an event store that implements the EventStoreQueries API
val eventStoreQueries : EventStoreQueries = ... 


// Now combine the continuous subscription model and the subscription position storage to allow
// handing over to the continuous subscription once catch-up phase is completed.
// In this example, we also store the subscription position during catch-up for every third event.
// This is optional, but useful if you're reading a lot of events and don't want to risk restarting 
// from the beginning if the application where to crash during the catch-up phase. If you don't
// use "andPersistSubscriptionPositionDuringCatchupPhaseForEveryNEvents" but just "useSubscriptionPositionStorage(storage)"
// then the CatchupSubscriptionModel will still start from the position in the storage, but not write to it.
// The continuous subscription (passed as first parameter to CatchupSubscriptionModel) might write to the store, 
// which means that once the CatchupSubscriptionModel has caught up and the continuous subscription starts
// writing the position, the CatchupSubscriptionModel will just delegate to continuous subscription if it finds
// a position in the storage.           
val catchupSubscriptionModel = CatchupSubscriptionModel(continuousSubscription, eventStoreQueries, 
            CatchupSubscriptionModelConfig(useSubscriptionPositionStorage(storage)
                    .andPersistSubscriptionPositionDuringCatchupPhaseForEveryNEvents(3))

// Start a subscription that starts replaying events of type "GameEnded" from the beginning of time
catchupSubscriptionModel.subscribe("mySubscription", filter(type("GameEnded")), StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime())) { cloudEvent -> 
    println(cloudEvent)
}

// Note that excluding "StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime())" like below would still start at 
// the beginnning of time the first time, but on subsequent calls will start from the latest position storing the in the storage.
// This is recommended if you want to continue using the CatchupSubscriptionModel later when no catch-up is required
// (since the subscription has already caught up).
catchupSubscriptionModel.subscribe("mySubscription", filter(type("GameEnded"))) { cloudEvent -> 
    println(cloudEvent)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}