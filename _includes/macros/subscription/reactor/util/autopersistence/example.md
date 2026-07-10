{% capture java %}
// Create the non-durable reactive subscription instance 
CheckpointAwareSubscriptionModel nonDurableSubscription = ...
// Create the storage
ReactorCheckpointStorage storage = ...

// Now combine the non-durable subscription and the checkpoint storage
ReactorDurableSubscriptionModel durableSubscription = new ReactorDurableSubscriptionModel(nonDurableSubscription, storage);

// Start a subscription
durableSubscription.subscribe("mySubscriptionId", cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)).subscribe(); 
{% endcapture %}

{% capture kotlin %}
// Create the non-durable reactive subscription instance 
val nonDurableSubscription : CheckpointAwareSubscriptionModel = ...
// Create the storage
val storage : ReactorCheckpointStorage = ...

// Now combine the non-durable subscription and the checkpoint storage
val durableSubscription = ReactorDurableSubscriptionModel(nonDurableSubscription, storage)

// Start a subscription
durableSubscription.subscribe("mySubscriptionId") { cloudEvent -> 
    doSomethingWithTheCloudEvent(cloudEvent) 
}.subscribe()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}