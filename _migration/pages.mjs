// The pages of the new site, in sidebar order within each group, with the lines of pages/docs/docs.md each one is
// made from. convert.mjs moves a section to the page whose line range holds its heading, and when two ranges hold
// it, to the shorter one. A single line number, or text, in "source" is a note for the Spring Boot clean-up, which
// moves those sentences by hand.
const P = (group, slug, title, description, meta = {}, source = "") => ({ group, slug, title, description, ...meta, source });
const L0 = { layer: "0" }, L1 = { layer: "1" }, SB = { layer: "spring-boot", stack: ["spring-boot"] };
export const groups = [
  ["overview", "Overview"], ["layer-0", "Layer 0: CloudEvents"], ["layer-1", "Layer 1: Domain events"],
  ["spring-boot", "Spring Boot"], ["layer-3", "Layer 3: Your own framework"], ["stores", "Stores and infrastructure"],
  ["testing", "Testing"], ["extending", "Extending Occurrent"], ["upgrading", "Upgrading"], ["resources", "Resources"],
];
export const pages = [
  P("overview", "introduction", "Introduction", "What Occurrent is and why it exists.", {}, "240-263"),
  P("overview", "layers", "How Occurrent is layered", "The layers of Occurrent, what your code works with in each, and where to start.", {}, "264-295"),
  P("overview", "getting-started", "Getting started", "Write and read your first events with an event store, a converter and the ApplicationService, without Spring Boot.", { stack: ["plain-java"] }, "296-315"),
  P("overview", "getting-started-spring-boot", "Getting started with Spring Boot", "Let the Spring Boot starter wire the event store, subscriptions and converter for you.", { stack: ["spring-boot"] }, "312, 7557"),
  P("overview", "concepts", "Concepts", "Event sourcing, and synchronous and asynchronous policies.", {}, "316-348"),
  P("overview", "domain-model", "Your domain model", "How to shape your domain model so it plugs into the ApplicationService.", {}, "349-352"),
  P("overview", "commands", "Commands", "How Occurrent thinks about commands, and how to compose them.", {}, "353-598"),
  P("overview", "deciders", "Deciders", "Model your domain as a decider and run it through an ApplicationService.", {}, "599-808"),

  P("layer-0", "index", "About layer 0", "The parts of Occurrent that work with CloudEvents.", L0, "809-812"),

  P("layer-0", "cloudevents", "CloudEvents", "Why events are stored as CloudEvents, and Occurrent's own extensions and metadata.", L0, "813-861"),
  P("layer-0", "eventstore", "EventStore", "Read and write event streams as CloudEvents.", L0, "862-970"),
  P("layer-0", "write-conditions", "Write conditions", "Make a write succeed only when the stream is in the state you expect.", L0, "971-1118"),
  P("layer-0", "eventstore-queries", "EventStore queries", "Query events across streams, including filtering on payload data.", L0, "1119-1272"),
  P("layer-0", "eventstore-operations", "EventStore operations", "Delete, update and other operations on stored events.", L0, "1273-1320"),
  P("layer-0", "stream-filtering", "Stream filtering", "Read only part of a stream.", L0, "1321-1380"),
  P("layer-0", "subscriptions", "Subscriptions", "React to events as they are written, in a blocking or a reactive model.", L0, "1381-1406"),
  P("layer-0", "blocking-subscriptions", "Blocking subscriptions", "Filters, start positions and checkpoint storage for blocking subscriptions.", { ...L0, model: ["blocking"] }, "1407-1580"),
  P("layer-0", "blocking-subscription-models", "Blocking subscription models", "Subscription models for MongoDB (native driver and Spring), and in-memory.", { ...L0, model: ["blocking"] }, "1581-1797"),
  P("layer-0", "push-subscription", "Push subscription", "Feed events from a broker or any other source into a subscription model.", { ...L0, model: ["blocking"] }, "1798-2251"),
  P("layer-0", "push-subscription-failures", "Push subscription failures", "What happens when a push feed fails, and how to recover, stop and skip the catch-up.", { ...L0, model: ["blocking"] }, "2252-2427"),
  P("layer-0", "durable-subscriptions", "Durable subscriptions", "Continue where a subscription left off after a restart.", { ...L0, model: ["blocking"] }, "2428-2484"),
  P("layer-0", "catch-up-subscription", "Catch-up subscription", "Replay history before switching to live events.", { ...L0, model: ["blocking"] }, "2485-2647"),
  P("layer-0", "competing-consumers", "Competing consumers", "Run a subscription on several nodes with only one delivering at a time.", { ...L0, model: ["blocking"] }, "2648-2751"),
  P("layer-0", "checkpoint-fencing", "Checkpoint fencing", "Stop a node that lost its lease from overwriting a checkpoint.", { ...L0, model: ["blocking"] }, "2752-2839"),
  P("layer-0", "subscription-life-cycle", "Subscription life-cycle", "Start, stop and test subscriptions.", { ...L0, model: ["blocking"] }, "2840-2949"),
  P("layer-0", "reactive-subscriptions", "Reactive subscriptions", "Filters, start positions and checkpoint storage for reactive subscriptions.", { ...L0, model: ["reactive"] }, "2950-3144"),
  P("layer-0", "reactive-subscription-models", "Reactive subscription models", "The Spring ReactiveMongoTemplate model and durable reactive subscriptions.", { ...L0, model: ["reactive"] }, "3145-3416"),
  P("layer-0", "reactive-push-subscription", "Reactive push subscription", "Feed events from any source into a reactive subscription model.", { ...L0, model: ["reactive"] }, "3417-3534"),
  P("layer-0", "subscription-model-capabilities", "Subscription model capabilities", "What a subscription model can do, and how wrapping models combines their capabilities.", L0, "3535-3644"),
  P("layer-0", "dcb-event-store", "DCB event store", "Dynamic Consistency Boundary: tags, criteria and the DCB event store.", L0, "3645-3821"),

  P("layer-1", "index", "About layer 1", "The parts of Occurrent that work with your domain events.", L1, "3822-3825"),

  P("layer-1", "cloudevent-conversion", "CloudEvent conversion", "Map your domain events to CloudEvents and back with the generic, XStream or Jackson converter.", L1, "3826-4010"),
  P("layer-1", "custom-cloudevent-converter", "Custom CloudEvent converter", "Write your own CloudEventConverter.", L1, "4011-4175"),
  P("layer-1", "application-service", "ApplicationService", "Load a stream as domain events, call your domain function, and write the new events back.", L1, "4176-4272"),
  P("layer-1", "application-service-side-effects", "ApplicationService side effects", "Synchronous and transactional side effects, and the Kotlin extensions.", L1, "4273-4428"),
  P("layer-1", "synchronous-subscriptions", "Synchronous subscriptions", "Update a read model in the same transaction as the write.", L1, "4429-4520"),
  P("layer-1", "command-dispatch", "Command dispatch", "Send a command to the right stream without writing the routing yourself.", L1, "4557-4700"),
  P("layer-1", "dcb-with-domain-events", "DCB with domain events", "The DCB application service, tags from annotations, and DCB subscriptions.", L1, "4701-4881"),
  P("layer-1", "querying-domain-events", "Querying domain events", "Query events as domain events with the Query DSL, including DCB queries.", L1, "4882-4944"),
  P("layer-1", "subscribing-to-domain-events", "Subscribing to domain events", "Subscribe to domain events with the subscription DSL.", L1, "4945-5013"),
  P("layer-1", "deriving-the-event-filter", "Deriving the event filter", "How Occurrent works out which events a query or subscription reads.", L1, "5014-5151"),
  P("layer-1", "views", "Views", "Fold events into state with the View DSL, and store the result.", L1, "5152-5280"),
  P("layer-1", "projections", "Projections", "Keep a read model up to date with the Projection DSL.", L1, "5281-5482"),
  P("layer-1", "replay-batching", "Replay batching", "Write a read model in batches while replaying history.", L1, "5483-5599"),
  P("layer-1", "snapshots", "Snapshots", "Snapshot a decider's state so a long stream loads quickly.", L1, "5913-6091"),
  P("layer-1", "sagas", "Sagas", "Coordinate a process across events with the core and flow saga DSL.", L1, "6092-6337"),
  P("layer-1", "saga-step-conditions", "Saga step conditions", "Conditions that join several events before a saga moves on.", L1, "6338-6662"),
  P("layer-1", "saga-correlation", "Saga correlation and filters", "Correlation, event types, filters, metadata and effects in a saga.", L1, "6663-6828"),
  P("layer-1", "running-a-saga", "Running a saga", "Run a saga, with or without command types.", L1, "6829-6940"),
  P("layer-1", "saga-delivery", "Saga delivery and instances", "The delivery contract, running on several instances, and side effects.", L1, "7143-7312"),
  P("layer-1", "observing-sagas", "Observing sagas", "Inspect saga instances, and quarantine one that keeps failing.", L1, "7313-7552"),

  P("spring-boot", "index", "About Spring Boot", "The Spring Boot starters and the annotations they read.", SB, "7553-7556"),

  P("spring-boot", "starter", "Spring Boot starter", "The blocking and reactive starters, and what they set up.", SB, "7557-7689"),
  P("spring-boot", "what-the-starter-configures", "What the starter configures", "The beans the starter creates, its transactions, DataFieldReader and StreamIdResolver.", SB, "1269, 4465, 4521-4556, 4699"),
  P("spring-boot", "subscription-annotations", "Subscription annotations", "Register handlers with @Subscription and the other subscription annotations.", SB, "7690-7877"),
  P("spring-boot", "projection-annotation", "@Projection", "Declare a projection with an annotation.", SB, "5600-5912"),
  P("spring-boot", "saga-annotation", "@Saga", "Declare a saga with an annotation, including one fed from a broker.", SB, "6941-7142"),
  P("spring-boot", "snapshot-annotation", "@Snapshot", "Declare a maintained snapshot with an annotation.", SB, "6001-6028"),
  P("spring-boot", "brokers", "Brokers with Spring Boot", "Forward to and consume from RabbitMQ or Kafka with the broker starters.", SB, "8703-8794"),
  P("spring-boot", "testing", "Testing with Spring Boot", "Integration tests with Testcontainers, and controlling which subscriptions start.", SB, "9498-9520, 9653-9741"),
  P("spring-boot", "configuration-properties", "Configuration properties", "Every occurrent.* property the starters read.", SB, "(gathered in phase 4)"),

  P("layer-3", "your-own-framework", "Your own framework", "Combine the layer 1 parts into a framework shaped after your business.", { layer: "3" }, "7878-7914"),

  P("stores", "index", "About stores and infrastructure", "Event stores, Spring modules, brokers, retry and deadlines.", {}, "7915-7918"),

  P("stores", "choosing-an-event-store", "Choosing an event store", "Which event store to pick, and how MongoDB stores events and time.", {}, "7919-8084"),
  P("stores", "mongodb-indexes", "MongoDB indexes", "The indexes Occurrent creates, and adding a capability to an existing store.", {}, "8085-8159"),
  P("stores", "mongodb-event-stores", "MongoDB event stores", "The native driver, Spring MongoTemplate and ReactiveMongoTemplate event stores.", {}, "8160-8277"),
  P("stores", "in-memory-event-store", "In-memory event store", "An event store for tests and experiments.", { stack: ["plain-java"] }, "8278-8303"),
  P("stores", "spring-modules", "Spring modules without Spring Boot", "Use Occurrent's Spring modules as plain libraries.", { stack: ["spring-data"] }, "8304-8329"),
  P("stores", "brokers", "Brokers", "Forward events to a message broker and consume them back.", { model: ["blocking"] }, "8330-8548"),
  P("stores", "rabbitmq-and-kafka", "RabbitMQ and Kafka", "The RabbitMQ and Kafka transports, and what they guarantee.", { model: ["blocking"] }, "8549-8702"),
  P("stores", "retry", "Retry", "Retry configuration, shutdown and transactions.", {}, "8795-8922"),
  P("stores", "deadlines", "Deadlines", "Schedule something to happen later, with JobRunr or in memory.", {}, "8923-9095"),

  P("testing", "index", "About testing", "How to test sagas and projections, and what to test at each level.", {}, "9096-9101"),

  P("testing", "testing-a-saga", "Testing a saga", "Test a saga's reactions, timeouts and transitions without waiting.", {}, "9102-9319"),
  P("testing", "testing-a-projection", "Testing a projection", "Test a projection into a store, read after write, and fed from a broker.", {}, "9320-9463"),
  P("testing", "integration-testing", "Integration testing", "Test without a framework, and control the subscription life cycle in tests.", {}, "9464-9652"),

  P("extending", "index", "About extending Occurrent", "Check your own event store or subscription model against Occurrent's conformance tests.", {}, "9742-9745"),

  P("extending", "your-own-event-store", "Testing your own event store", "Check an event store of your own against the TCK.", {}, "9746-9844"),
  P("extending", "your-own-subscription-model", "Testing your own subscription model", "Check a subscription model of your own against the conformance tests.", {}, "9845-10017"),

  P("upgrading", "index", "Upgrading", "How to upgrade between Occurrent versions.", {}, "10018-10021"),
  P("upgrading", "0-34-0", "Upgrading to 0.34.0", "What changes in 0.34.0, and repairing events damaged before it.", {}, "10022-10186"),
  P("upgrading", "0-33-0", "Upgrading to 0.33.0", "What changes in 0.33.0.", {}, "10187-10198"),
  P("upgrading", "0-32-0", "Upgrading to 0.32.0", "What changes in 0.32.0.", {}, "10199-10208"),
  P("upgrading", "0-31-0", "Upgrading to 0.31.0", "What changes in 0.31.0.", {}, "10209-10212"),
  P("upgrading", "0-30-0", "Upgrading to 0.30.0", "What changes in 0.30.0.", {}, "10213-10216"),

  P("resources", "examples", "Examples", "Example applications in the Occurrent repository.", {}, "10217-10241"),
  P("resources", "community", "Blogs, support and credits", "Blog posts about Occurrent, where to get help, and credits.", {}, "10242-10258"),
];
