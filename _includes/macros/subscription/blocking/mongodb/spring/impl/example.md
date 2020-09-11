{% capture java %}
MongoTemplate mongoTemplate = ...
// Create the blocking subscription
BlockingSubscription<CloudEvent> subscriptions = new SpringBlockingSubscriptionForMongoDB(mongoTemplate, "eventCollectionName", TimeRepresentation.RFC_3339_STRING);

// Now you can create subscriptions instances that subscribes to new events as they're written to an EventStore
// Typically you do this after the Spring application context has finished loading. For example by subscribing to 
// the  (org.springframework.boot.context.event.ApplicationStartedEvent) or in a method annotated with (@PostConstruct) 
subscriptions.subscribe("mySubscriptionId", cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)); 

// You can later cancel the subscription by calling:
subscriptions.cancelSubscription("mySubscriptionId");
{% endcapture %}

{% capture kotlin %}
val mongoTemplate : MongoTemplate = ... 
// Create the blocking subscription
val subscriptions = SpringBlockingSubscriptionForMongoDB(mongoTemplate, "eventCollectionName", TimeRepresentation.RFC_3339_STRING);

// Now you can create subscriptions instances that subscribes to new events as they're written to an EventStore
subscriptions.subscribe("mySubscriptionId") { cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent) }

// You can later cancel the subscription by calling:
subscriptions.cancelSubscription("mySubscriptionId")
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}