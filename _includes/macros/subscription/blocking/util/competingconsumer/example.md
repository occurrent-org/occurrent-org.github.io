{% capture java %}
MongoDatabase mongoDatabase = mongoClient.getDatabase("some-database");
SubscriptionPositionStorage positionStorage = new NativeMongoSubscriptionPositionStorage(mongoDatabase, "position-storage");
SubscriptionModel wrappedSubscriptionModel = new DurableSubscriptionModel(new NativeMongoSubscriptionModel(mongoDatabase, "events", TimeRepresentation.DATE), positionStorage);
 
// Create the CompetingConsumerSubscriptionModel
NativeMongoLeaseCompetingConsumerStrategy competingConsumerStrategy = NativeMongoLeaseCompetingConsumerStrategy.withDefaults(mongoDatabase);
CompetingConsumerSubscriptionModel competingConsumerSubscriptionModel = new CompetingConsumerSubscriptionModel(wrappedSubscriptionModel, competingConsumerStrategy);
 // Now subscribe!
competingConsumerSubscriptionModel.subscribe("subscriptionId", type("SomeEvent"));
{% endcapture %}

{% capture kotlin %}
val mongoDatabase = mongoClient.getDatabase("some-database")
val positionStorage = NativeMongoSubscriptionPositionStorage(mongoDatabase, "position-storage")
val wrappedSubscriptionModel = new DurableSubscriptionModel(new NativeMongoSubscriptionModel(mongoDatabase, "events", TimeRepresentation.DATE), positionStorage)
 
// Create the CompetingConsumerSubscriptionModel
val competingConsumerStrategy = NativeMongoLeaseCompetingConsumerStrategy.withDefaults(mongoDatabase)
val competingConsumerSubscriptionModel = new CompetingConsumerSubscriptionModel(wrappedSubscriptionModel, competingConsumerStrategy)
 // Now subscribe!
competingConsumerSubscriptionModel.subscribe("subscriptionId", type("SomeEvent"))

{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}