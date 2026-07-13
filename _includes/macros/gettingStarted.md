{% capture java %}
public class ApplicationService {

    private final EventStore eventStore;
    private final Converter converter;

    public ApplicationService(EventStore eventStore, Converter converter) {
        this.eventStore = eventStore;
        this.converter = converter;
    }

    public void execute(String streamId, Function<List<DomainEvent>, List<DomainEvent>> functionThatCallsDomainModel) {
        // Read all events from the event store for a particular stream
        EventStream<CloudEvent> eventStream = eventStore.read(streamId.toString());
        // Convert the cloud events into domain events
        List<DomainEvent> persistedDomainEvents = eventStream.events().map(converter::toDomainEvent).toList();

        // Call a pure function from the domain model which returns a List of domain events
        List<DomainEvent> newDomainEvents = functionThatCallsDomainModel.apply(persistedDomainEvents);

        // Convert domain events to cloud events and write them to the event store
        List<CloudEvent> newCloudEvents = newDomainEvents.stream().map(converter::toCloudEvent).toList();
        eventStore.write(streamId, eventStream.version(), newCloudEvents);
    }
}
{% endcapture %}

{% capture kotlin %}
class ApplicationService constructor (val eventStore : EventStore, val converter : Converter) {

    fun execute(streamId : String, functionThatCallsDomainModel : (List<DomainEvent>) -> List<DomainEvent>) {
        // Read all events from the event store for a particular stream
        val  eventStream : EventStream<CloudEvent> = eventStore.read(streamId.toString())
        // Convert the cloud events into domain events
        val persistedDomainEvents : List<DomainEvent> = eventStream.events().map(converter::toDomainEvent).toList()

        // Call a pure function from the domain model which returns a List of domain events
        val newDomainEvents = functionThatCallsDomainModel(persistedDomainEvents)

        // Convert domain events to cloud events and write them to the event store
        val newCloudEvents = newDomainEvents.map(converter::toCloudEvent)
        eventStore.write(streamId, eventStream.version(), newCloudEvents)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
