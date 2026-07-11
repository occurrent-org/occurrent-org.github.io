{% capture java %}
// Create the checkpoint storage. Note that if the CheckpointAwareSubscriptionModel
// is also storing the checkpoint, it's highly recommended to share the same CheckpointStorage instance.     
CheckpointStorage storage = ...
// Create the subscription instance that will be used once the replay has caught up the latest event position
CheckpointAwareSubscriptionModel continuousSubscriptionModel = ...
// Instantiate an event store that implements the EventStoreQueries API
EventStoreQueries eventStoreQueries = ... 


// Now combine the continuous subscription model and the checkpoint storage to allow
// handing over to the continuous subscription once catch-up phase is completed.
// In this example, we also store the checkpoint during catch-up for every third event.
// This is optional, but useful if you're reading a lot of events and don't want to risk restarting 
// from the beginning if the application where to crash during the catch-up phase.   
CatchupSubscriptionModel catchupSubscriptionModelModel = new CatchupSubscriptionModel(continuousSubscriptionModel, eventStoreQueries, 
            new CatchupSubscriptionModelConfig(useCheckpointStorage(storage)
                    .andPersistCheckpointDuringCatchupPhaseForEveryNEvents(3)));

// Start a subscription that starts replaying events of type "GameEnded" from the beginning of time
catchupSubscriptionModelModel.subscribe("mySubscription", filter(type("GameEnded")), StartAtTime.beginningOfTime(), cloudEvent -> System.out.println(cloudEvent));

// Note that excluding "StartAt.checkpoint(TimeBasedCheckpoint.beginningOfTime())" like below would still start at 
// the beginnning of time the first time, but on subsequent calls will start from the latest checkpoint stored in the storage.
// This is recommended if you want to continue using the CatchupSubscriptionModel later when no catch-up is required
// (since the subscription has already caught up).
catchupSubscriptionModelModel.subscribe("mySubscription", filter(type("GameEnded")), cloudEvent -> System.out.println(cloudEvent));

{% endcapture %}

{% capture kotlin %}
// is also storing the checkpoint, it's highly recommended to share the same CheckpointStorage instance.     
val storage : CheckpointStorage = ...
// Create the subscription instance that will be used once the replay has caught up the latest event position
val continuousSubscription : CheckpointAwareSubscriptionModel= ...
// Instantiate an event store that implements the EventStoreQueries API
val eventStoreQueries : EventStoreQueries = ... 


// Now combine the continuous subscription model and the checkpoint storage to allow
// handing over to the continuous subscription once catch-up phase is completed.
// In this example, we also store the checkpoint during catch-up for every third event.
// This is optional, but useful if you're reading a lot of events and don't want to risk restarting 
// from the beginning if the application where to crash during the catch-up phase. If you don't
// use "andPersistCheckpointDuringCatchupPhaseForEveryNEvents" but just "useCheckpointStorage(storage)"
// then the CatchupSubscriptionModel will still start from the checkpoint in the storage, but not write to it.
// The continuous subscription (passed as first parameter to CatchupSubscriptionModel) might write to the store, 
// which means that once the CatchupSubscriptionModel has caught up and the continuous subscription starts
// writing the checkpoint, the CatchupSubscriptionModel will just delegate to continuous subscription if it finds
// a checkpoint in the storage.           
val catchupSubscriptionModel = CatchupSubscriptionModel(continuousSubscription, eventStoreQueries, 
            CatchupSubscriptionModelConfig(useCheckpointStorage(storage)
                    .andPersistCheckpointDuringCatchupPhaseForEveryNEvents(3)))

// Start a subscription that starts replaying events of type "GameEnded" from the beginning of time
catchupSubscriptionModel.subscribe("mySubscription", filter(type("GameEnded")), StartAtTime.beginningOfTime()) { cloudEvent -> 
    println(cloudEvent)
}

// Note that excluding "StartAt.checkpoint(TimeBasedCheckpoint.beginningOfTime())" like below would still start at 
// the beginnning of time the first time, but on subsequent calls will start from the latest checkpoint stored in the storage.
// This is recommended if you want to continue using the CatchupSubscriptionModel later when no catch-up is required
// (since the subscription has already caught up).
catchupSubscriptionModel.subscribe("mySubscription", filter(type("GameEnded"))) { cloudEvent -> 
    println(cloudEvent)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}