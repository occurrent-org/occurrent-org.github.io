{% capture java %}
// Create the non-durable blocking subscription instance 
PositionAwareBlockingSubscription nonDurableSubscription = ...
// Create the storage
BlockingSubscriptionPositionStorage storage = ...

// Now combine the non-durable subscription and the subscription position storage
BlockingSubscription durableSubscription = new BlockingSubscriptionWithAutomaticPositionPersistence(nonDurableSubscription, storage);

// Start a subscription
durableSubscription.subscribe("mySubscriptionId", cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)); 
{% endcapture %}

{% capture kotlin %}
// Create the non-durable blocking subscription instance 
val nonDurableSubscription : PositionAwareBlockingSubscription = ...
// Create the storage
val storage : BlockingSubscriptionPositionStorage = ...

// Now combine the non-durable subscription and the subscription position storage
val durableSubscription : BlockingSubscription = new BlockingSubscriptionWithAutomaticPositionPersistence(nonDurableSubscription, storage)

// Start a subscription
durableSubscription.subscribe("mySubscriptionId") { cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent) };
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}