{% capture java %}
public class ApplicationService {

    private final EventStore eventStore;
    private final Function<CloudEvent, DomainEvent> convertCloudEventToDomainEvent;
    private final Function<DomainEvent, CloudEvent> convertDomainEventToCloudEvent;

    public ApplicationService(EventStore eventStore, 
                              Function<CloudEvent, DomainEvent> convertCloudEventToDomainEvent, 
                              Function<DomainEvent, CloudEvent> convertDomainEventToCloudEvent) {
        this.eventStore = eventStore;
        this.convertCloudEventToDomainEvent = convertCloudEventToDomainEvent;
        this.convertDomainEventToCloudEvent = convertDomainEventToCloudEvent;
    }

    public void execute(String streamId, Function<List<DomainEvent>, List<DomainEvent>> functionThatCallsDomainModel) {
        // Read all events from the event store for a particular stream
        EventStream<CloudEvent> eventStream = eventStore.read(streamId);
        // Convert the cloud events into domain events
        List<DomainEvent> domainEventsInStream = eventStream.events().map(convertCloudEventToDomainEvent).toList();

        // Call a pure function from the domain model which returns a List of domain events
        List<DomainEvent> newDomainEvents = functionThatCallsDomainModel.apply(domainEventsInStream);

        // Convert domain events to cloud events and write them to the event store
        List<CloudEvent> newCloudEvents = newDomainEvents.stream().map(convertDomainEventToCloudEvent).toList();
        eventStore.write(streamId, eventStream.version(), newCloudEvents);
    }
}
{% endcapture %}

{% capture kotlin %}
class ApplicationService constructor (val eventStore : EventStore, 
                                      val convertCloudEventToDomainEvent : (CloudEvent) -> DomainEvent, 
                                      val convertDomainEventToCloudEvent : (DomainEvent) -> CloudEvent) {

    fun execute(streamId : String, functionThatCallsDomainModel : (List<DomainEvent>) -> List<DomainEvent>) {
        // Read all events from the event store for a particular stream
        val  eventStream : EventStream<CloudEvent> = eventStore.read(streamId)
        // Convert the cloud events into domain events
        val domainEventsInStream : List<DomainEvent> = eventStream.events().map(convertCloudEventToDomainEvent).toList()

        // Call a pure function from the domain model which returns a List of domain events
        val newDomainEvents = functionThatCallsDomainModel(domainEventsInStream)

        // Convert domain events to cloud events and write them to the event store
        val newCloudEvents = newDomainEvents.map(convertDomainEventToCloudEvent)
        eventStore.write(streamId, eventStream.version(), newCloudEvents)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
