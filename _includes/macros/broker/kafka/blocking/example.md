```java
// Publish side: one durable subscription forwards stored events to Kafka.
KafkaSharedTopicDestinationResolver resolver = new KafkaSharedTopicDestinationResolver("orders");

producerConfig.put(ProducerConfig.ACKS_CONFIG, "all");
KafkaCloudEventSink sink = KafkaCloudEventSink.builder(producerConfig, resolver).build();

DurableSubscriptionModel forwarderSubscription =
        new DurableSubscriptionModel(nativeMongoSubscriptionModel, forwarderCheckpoints);
CloudEventForwarder forwarder = new CloudEventForwarder(forwarderSubscription, sink);
forwarder.forward("order-status-forwarder");

// Consume side: the bridge feeds a PushSubscriptionModel, wrapped in catch-up.
consumerConfig.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "false");
consumerConfig.put(ConsumerConfig.GROUP_ID_CONFIG, "order-status");

RoutingOutcomeChannel outcomeChannel = new RoutingOutcomeChannel();
PushSubscriptionModel pushModel = new PushSubscriptionModel(DataFieldReader.refusing(), outcomeChannel);
CatchupThenPushSubscriptionModel model =
        new CatchupThenPushSubscriptionModel(eventStore, pushModel, catchupMarker);

KafkaCloudEventBridge bridge = KafkaCloudEventBridge.builder(consumerConfig, pushModel, outcomeChannel)
        .resolver(resolver)
        .build();

ProjectionRunner.stream(model, cloudEventConverter)
        .project("order-status", orderStatusProjection(), repository);
```
