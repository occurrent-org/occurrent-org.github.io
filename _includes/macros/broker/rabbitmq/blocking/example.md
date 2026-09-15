```java
// Publish side: one durable subscription forwards stored events to RabbitMQ.
RabbitMqTopicExchangeDestinationResolver resolver =
        new RabbitMqTopicExchangeDestinationResolver("orders-exchange", typeMapper);

RabbitMqCloudEventSink sink = RabbitMqCloudEventSink.builder(rabbitConnection, resolver).build();

DurableSubscriptionModel forwarderSubscription =
        new DurableSubscriptionModel(nativeMongoSubscriptionModel, forwarderCheckpoints);
CloudEventForwarder forwarder = new CloudEventForwarder(forwarderSubscription, sink);
forwarder.forward("order-status-forwarder");

// Consume side: the bridge feeds a PushSubscriptionModel, wrapped in catch-up.
RoutingOutcomeChannel outcomeChannel = new RoutingOutcomeChannel();
PushSubscriptionModel pushModel = new PushSubscriptionModel(DataFieldReader.refusing(), outcomeChannel);
CatchupThenPushSubscriptionModel model =
        new CatchupThenPushSubscriptionModel(eventStore, pushModel, catchupMarker);

RabbitMqCloudEventBridge bridge = RabbitMqCloudEventBridge.builder(
                rabbitConnection, pushModel, outcomeChannel, "order-status-queue")
        .resolver(resolver)
        .build();

ProjectionRunner.stream(model, cloudEventConverter)
        .project("order-status", orderStatusProjection(), repository);
```
