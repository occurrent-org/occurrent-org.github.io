{% capture java %}
public class ApplicationService {

    private final EventStore eventStore;
    private final Converter converter;

    public ApplicationService(EventStore eventStore, Converter converter) {
        this.eventStore = eventStore;
        this.converter = converter;
    }

    public void execute(String streamId, Function<Stream<DomainEvent>, Stream<DomainEvent>> functionThatCallsDomainModel) {
        // Read all events from the event store for a particular stream
        EventStream<CloudEvent> eventStream = eventStore.read(streamId.toString());
        // Convert the cloud events into domain events
        Stream<DomainEvent> persistedDomainEvents = eventStream.events().map(converter::toDomainEvent);

        // Call a pure function from the domain model which returns a Stream of domain events  
        Stream<DomainEvent> newDomainEvents = functionThatCallsDomainModel.apply(persistedDomainEvents);

        // Convert domain events to cloud events and write them to the event store  
        eventStore.write(streamId, eventStream.version(), newDomainEvents.map(converter::toCloudEvent));
    }
}
{% endcapture %}

{% capture kotlin %}
class ApplicationService constructor (val eventStore : EventStore, val converter : Converter) {

    fun execute(streamId : String, functionThatCallsDomainModel : (Stream<DomainEvent>) -> Stream<DomainEvent>) {
        // Read all events from the event store for a particular stream
        val  eventStream : EventStream<CloudEvent> = eventStore.read(streamId.toString())
        // Convert the cloud events into domain events
        val persistedDomainEvents : Stream<DomainEvent> = eventStream.events().map(converter::toDomainEvent)

        // Call a pure function from the domain model which returns a Stream of domain events
        val newDomainEvents = functionThatCallsDomainModel(persistedDomainEvents)

        // Convert domain events to cloud events and write them to the event store
        eventStore.write(streamId, eventStream.version(), newDomainEvents.map(converter::toCloudEvent))
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
