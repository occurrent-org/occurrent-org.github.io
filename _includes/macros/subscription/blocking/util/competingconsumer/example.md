{% capture java %}
MongoDatabase mongoDatabase = mongoClient.getDatabase("some-database");
CheckpointStorage checkpointStorage = new NativeMongoCheckpointStorage(mongoDatabase, "position-storage");
SubscriptionModel wrappedSubscriptionModel = new DurableSubscriptionModel(new NativeMongoSubscriptionModel(mongoDatabase, "events", TimeRepresentation.DATE), checkpointStorage);
 
// Create the CompetingConsumerSubscriptionModel
NativeMongoLeaseCompetingConsumerStrategy competingConsumerStrategy = NativeMongoLeaseCompetingConsumerStrategy.withDefaults(mongoDatabase);
CompetingConsumerSubscriptionModel competingConsumerSubscriptionModel = new CompetingConsumerSubscriptionModel(wrappedSubscriptionModel, competingConsumerStrategy);
 // Now subscribe!
competingConsumerSubscriptionModel.subscribe("subscriptionId", type("SomeEvent"));
{% endcapture %}

{% capture kotlin %}
val mongoDatabase = mongoClient.getDatabase("some-database")
val checkpointStorage = NativeMongoCheckpointStorage(mongoDatabase, "position-storage")
val wrappedSubscriptionModel = DurableSubscriptionModel(NativeMongoSubscriptionModel(mongoDatabase, "events", TimeRepresentation.DATE), checkpointStorage)
 
// Create the CompetingConsumerSubscriptionModel
val competingConsumerStrategy = NativeMongoLeaseCompetingConsumerStrategy.withDefaults(mongoDatabase)
val competingConsumerSubscriptionModel = CompetingConsumerSubscriptionModel(wrappedSubscriptionModel, competingConsumerStrategy)
 // Now subscribe!
competingConsumerSubscriptionModel.subscribe("subscriptionId", type("SomeEvent"))

{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}