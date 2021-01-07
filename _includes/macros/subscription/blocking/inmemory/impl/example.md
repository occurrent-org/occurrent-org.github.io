{% capture java %}
InMemorySubscriptionModel subscriptionModel = new InMemorySubscriptionModel();
InMemoryEventStore inMemoryEventStore = new InMemoryEventStore(inMemorySubscriptionModel);

subscriptionModel.subscribe("subscription1", System.out::println);

// You can later cancel the subscription by calling:
subscriptionModel.cancelSubscription("mySubscriptionId");
{% endcapture %}

{% capture kotlin %}
val subscriptionModel = new InMemorySubscriptionModel()
val inMemoryEventStore = new InMemoryEventStore(inMemorySubscriptionModel)

subscriptionModel.subscribe("subscription1", ::println)

// You can later cancel the subscription by calling:
subscriptionModel.cancelSubscription("mySubscriptionId")
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}