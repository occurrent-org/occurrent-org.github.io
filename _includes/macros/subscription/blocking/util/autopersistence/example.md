{% capture java %}
// Create the non-durable blocking subscription instance 
PositionAwareBlockingSubscription nonDurableSubscriptionModel = ...
// Create the storage
SubscriptionPositionStorage storage = ...

// Now combine the non-durable subscription model and the subscription position storage
SubscriptionModel durableSubscriptionModel = new DurableSubscriptionModel(nonDurableSubscriptionModel, storage);

// Start a subscription
durableSubscriptionModel.subscribe("mySubscriptionId", cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)); 
{% endcapture %}

{% capture kotlin %}
// Create the non-durable blocking subscription instance 
val nonDurableSubscriptionModel : PositionAwareBlockingSubscription = ...
// Create the storage
val storage : SubscriptionPositionStorage = ...

// Now combine the non-durable subscription model and the subscription position storage
val durableSubscriptionModel : SubscriptionModel = new DurableSubscriptionModel(nonDurableSubscriptionModel, storage)

// Start a subscription
durableSubscriptionModel.subscribe("mySubscriptionId") { cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent) };
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}