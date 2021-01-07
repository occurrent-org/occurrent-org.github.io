{% capture java %}
ReactiveMongoTemplate reactiveMongoTemplate = ...
// Create the blocking subscription
SubscriptionModel subscriptionModel = new ReactorMongoSubscription(reactiveMongoTemplate, "eventCollectionName", TimeRepresentation.RFC_3339_STRING);

// Now you can create subscriptions instances that subscribes to new events as they're written to an EventStore
// Typically you do this after the Spring application context has finished loading. For example by subscribing to 
// the  (org.springframework.boot.context.event.ApplicationStartedEvent) or in a method annotated with (@PostConstruct) 
subscriptionModel.subscribe("mySubscriptionId").flatMap(cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent)).subscribe(); 

// You can later cancel the subscription by calling:
subscriptionModel.cancelSubscription("mySubscriptionId");
{% endcapture %}

{% capture kotlin %}
val reactiveMongoTemplate : ReactiveMongoTemplate = ... 
// Create the blocking subscription
val subscriptionModel = ReactorMongoSubscription(reactiveMongoTemplate, "eventCollectionName", TimeRepresentation.RFC_3339_STRING)

// Now you can create subscriptions instances that subscribes to new events as they're written to an EventStore
subscriptionModel.subscribe("mySubscriptionId").flatMap { cloudEvent -> doSomethingWithTheCloudEvent(cloudEvent) }.subscribe()

// You can later cancel the subscription by calling:
subscriptionModel.cancelSubscription("mySubscriptionId")
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}