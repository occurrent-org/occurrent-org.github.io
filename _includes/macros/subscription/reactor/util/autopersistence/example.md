{% capture java %}
// Create the non-durable blocking subscription instance 
PositionAwareReactorSubscription nonDurableSubscription = ...
// Create the storage
ReactorSubscriptionPositionStorage storage = ...

// Now combine the non-durable subscription and the subscription position storage
ReactorSubscriptionWithAutomaticPositionPersistence durableSubscription = new ReactorSubscriptionWithAutomaticPositionPersistence(nonDurableSubscription, storage);

// Start a subscription
durableSubscription.subscribe("mySubscriptionId", cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)).subscribe(); 
{% endcapture %}

{% capture kotlin %}
// Create the non-durable blocking subscription instance 
val nonDurableSubscription : PositionAwareReactorSubscription = ...
// Create the storage
val storage : ReactorSubscriptionPositionStorage = ...

// Now combine the non-durable subscription and the subscription position storage
val durableSubscription = new BlockingSubscriptionWithAutomaticPositionPersistence(nonDurableSubscription, storage)

// Start a subscription
durableSubscription.subscribe("mySubscriptionId") { cloudEvent -> 
    doSomethingWithTheCloudEvent(cloudEvent) 
}.subscribe()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}