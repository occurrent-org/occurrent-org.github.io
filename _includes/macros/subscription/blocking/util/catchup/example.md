{% capture java %}
// Create the subscription position storage. Note that if PositionAwareBlockingSubscription
// is also storing the position, it's recommended to share the same BlockingSubscriptionPositionStorage instance.     
BlockingSubscriptionPositionStorage storage = ...
// Create the subscription instance that will be used once the replay has caught up the latest event position 
PositionAwareBlockingSubscription continuousSubscription = ...
// Instantiate an event store that implements the EventStoreQueries API
EventStoreQueries eventStoreQueries = ... 


// Now combine the continuous subscription and the subscription position storage to allow
CatchupSupportingBlockingSubscription catchupSubscription = new CatchupSupportingBlockingSubscription(continuousSubscription, mongoEventStore, storage);

// Start a subscription that starts replaying events of type "GameEnded" from the beginning of time
catchupSubscription.subscribe("mySubscription", filter(type("GameEnded")), StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime()), cloudEvent -> System.out.println(cloudEvent));
{% endcapture %}

{% capture kotlin %}
// Create the subscription position storage. Note that if PositionAwareBlockingSubscription
// is also storing the position, it's recommended to share the same BlockingSubscriptionPositionStorage instance.     
BlockingSubscriptionPositionStorage storage = ...
// Create the subscription instance that will be used once the replay has caught up the latest event position 
PositionAwareBlockingSubscription continuousSubscription = ...
// Instantiate an event store that implements the EventStoreQueries API
EventStoreQueries eventStoreQueries = ... 

// Now combine the continuous subscription and the subscription position storage to allow
val catchupSubscription = CatchupSupportingBlockingSubscription(continuousSubscription, mongoEventStore, storage, config)

// Start a subscription that starts replaying events of type "GameEnded" from the beginning of time
catchupSubscription.subscribe("mySubscription", filter(type("GameEnded")), StartAt.subscriptionPosition(TimeBasedSubscriptionPosition.beginningOfTime())) { cloudEvent ->
    println(cloudEvent)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}