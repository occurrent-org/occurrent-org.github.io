{% capture java %}

public class ApplicationService {

    public static void execute(EventStore eventStore, String streamId, Function<List<CloudEvent>, List<CloudEvent>> functionThatCallsDomainModel) {
        // Read all events from the event store for a particular stream
        EventStream<CloudEvent> eventStream = eventStore.read(streamId);
        List<CloudEvent> eventsInStream = eventStream.eventList();

        // Call a pure function from the domain model which returns a List of events
        List<CloudEvent> newEvents = functionThatCallsDomainModel.apply(eventsInStream);

        // Write the new events to the event store  
        eventStore.write(streamId, eventStream.version(), newEvents);
    }
}
{% endcapture %}

{% capture kotlin %}
fun execute(eventStore : EventStore, streamId : String, functionThatCallsDomainModel : (List<CloudEvent>) -> List<CloudEvent>) {
    // Read all events from the event store for a particular stream
    val eventStream : EventStream<CloudEvent> = eventStore.read(streamId)
    val eventsInStream : List<CloudEvent> = eventStream.eventList()

    // Call a pure function from the domain model which returns a List of events
    val newEvents = functionThatCallsDomainModel(eventsInStream)

    // Write the new events to the event store 
    eventStore.write(streamId, eventStream.version(), newEvents)
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
