{% capture java %}
CloudEvent event = CloudEventBuilder.v1()
                    .withId("eventId")
                    .withSource(URI.create("urn:mydomain"))
                    .withType("HelloWorld")
                    .withTime(LocalDateTime.now().atOffset(ZoneOffset.UTC))
                    .withSubject("subject")
                    .withDataContentType("application/json")
                    .withData("{ \"message\" : \"hello\" }".getBytes(StandardCharsets.UTF_8))
                    .build();

// Write                    
eventStore.write("streamId", Stream.of(event));

// Read
EventStream<CloudEvent> eventStream = eventStore.read("streamId");

// Read filtered events when the store supports it
if (eventStore instanceof ReadEventStreamWithFilter filteredEventStore) {
    EventStream<CloudEvent> filteredEventStream = filteredEventStore.read(
            "streamId",
            StreamReadFilter.type("com.example.NameDefined")
    );
}
{% endcapture %}

{% capture kotlin %}
val event = CloudEventBuilder.v1()
                    .withId("eventId")
                    .withSource(URI.create("urn:mydomain"))
                    .withType("HelloWorld")
                    .withTime(LocalDateTime.now().atOffset(ZoneOffset.UTC))
                    .withSubject("subject")
                    .withDataContentType("application/json")
                    .withData("{ \"message\" : \"hello\" }".toByteArray())
                    .build()

// Write                    
eventStore.write("streamId", Stream.of(event))

// Read
val eventStream : EventStream<CloudEvent> = eventStore.read("streamId")

// Read filtered events when the store supports it
val filteredEventStore = eventStore as? ReadEventStreamWithFilter
val filteredEventStream = filteredEventStore?.read(
    "streamId",
    StreamReadFilter.type(NameDefined::class.java.name)
)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
