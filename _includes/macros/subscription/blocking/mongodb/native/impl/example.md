{% capture java %}
MongoDatabase database = mongoClient.getDatabase("some-database");
// Create the blocking subscription
SubscriptionModel subscriptionModel = new NativeMongoSubscriptionModel(database, "eventCollection", TimeRepresentation.DATE, Executors.newCachedThreadPool(), RetryStrategy.retry().fixed(200));

// Now you can create subscription instances that subscribes to new events as they're written to an EventStore
subscriptionModel.subscribe("mySubscriptionId", cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)); 

// You can later cancel the subscription by calling:
subscriptionModel.cancelSubscription("mySubscriptionId");
{% endcapture %}

{% capture kotlin %}
val database = mongoClient.getDatabase("some-database")
// Create the blocking subscription
val subscriptionModel = NativeMongoSubscriptionModel(database, "eventCollection", TimeRepresentation.DATE, Executors.newCachedThreadPool(), RetryStrategy.retry().fixed(200))

// Now you can create subscriptions instances that subscribes to new events as they're written to an EventStore
subscriptionModel.subscribe("mySubscriptionId") { cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent) }

// You can later cancel the subscription by calling:
subscriptionModel.cancelSubscription("mySubscriptionId")
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}