{% capture java %}
MongoTemplate mongoTemplate = mongoClient.getDatabase("some-database");
// Create the blocking subscription
BlockingSubscription<CloudEvent> subscriptions = new BlockingSubscriptionForMongoDB(database, "eventCollection", TimeRepresentation.DATE, Executors.newCachedThreadPool(), RetryStrategy.fixed(200));

// Now you can create subscriptions instances that subscribes to new events as they're written to an EventStore
subscriptions.subscribe("mySubscriptionId", cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)); 

// You can later cancel the subscription by calling:
subscriptions.cancelSubscription("mySubscriptionId");
{% endcapture %}

{% capture kotlin %}
val database = mongoClient.getDatabase("some-database")
// Create the blocking subscription
val subscriptions = BlockingSubscriptionForMongoDB(database, "eventCollection", TimeRepresentation.DATE, Executors.newCachedThreadPool(), RetryStrategy.fixed(200))

// Now you can create subscriptions instances that subscribes to new events as they're written to an EventStore
subscriptions.subscribe("mySubscriptionId") { cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent) }

// You can later cancel the subscription by calling:
subscriptions.cancelSubscription("mySubscriptionId")
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}