{% capture java %}
// Create the non-durable blocking subscription instance 
CheckpointAwareSubscriptionModel nonDurableSubscriptionModel = ...
// Create the storage
CheckpointStorage storage = ...

// Now combine the non-durable subscription model and the checkpoint storage
SubscriptionModel durableSubscriptionModel = new DurableSubscriptionModel(nonDurableSubscriptionModel, storage);

// Start a subscription
durableSubscriptionModel.subscribe("mySubscriptionId", cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)); 
{% endcapture %}

{% capture kotlin %}
// Create the non-durable blocking subscription instance 
val nonDurableSubscriptionModel : CheckpointAwareSubscriptionModel = ...
// Create the storage
val storage : CheckpointStorage = ...

// Now combine the non-durable subscription model and the checkpoint storage
val durableSubscriptionModel : SubscriptionModel = DurableSubscriptionModel(nonDurableSubscriptionModel, storage)

// Start a subscription
durableSubscriptionModel.subscribe("mySubscriptionId") { cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent) };
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}