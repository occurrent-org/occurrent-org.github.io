{% capture java %}
public class ApplicationService {

    private final EventStore eventStore;
    private final SnapshotRepository snapshotRepository;
    
    public ApplicationService(EventStore eventStore,  SnapshotRepository snapshotRepository) {
        this.eventStore = eventStore;
        this.snapshotRepository = snapshotRepository;
    }
    
    @Transactional
    public void execute(String streamId, BiFunction<Snapshot, List<CloudEvent>, List<CloudEvent>> functionThatCallsDomainModel) {
        // Read snapshot from a the snapshot repsitory 
        Snapshot snapshot = snapshotRepsitory.findByStreamId(streamId);
        long snapshotVersion = snapshot.version();        
    
        // Read all events for "streamId" from snapshotVersion  
        EventStream<CloudEvent> eventStream = eventStore.read(streamId, snapshotVersion, Long.MAX_VALUE);
        List<CloudEvent> eventsSinceSnapshot = eventStream.eventList();

        // Call a pure function from the domain model which returns a List of new events
        List<CloudEvent> newEvents = functionThatCallsDomainModel.apply(snapshot.state(), eventsSinceSnapshot);

        // Convert domain events to cloud events and write them to the event store  
        eventStore.write(streamId, eventStream.version(), newEvents);
        
        // Update the snapshot
        Snapshot updatedSnapshot = snapshot.updateFrom(newEvents, eventStream.version());
        snapshotRepsitory.save(updatedSnapshot);
    }
}
{% endcapture %}

{% capture kotlin %}
class ApplicationService(val eventStore : EventStore, val snapshotRepository : SnapshotRepository) {
    
    @Transactional
    fun execute(String streamId, functionThatCallsDomainModel : (Snapshot, List<CloudEvent>) -> List<CloudEvent>) {
        // Read snapshot from a the snapshot repsitory 
        val snapshot : Snapshot = snapshotRepsitory.findByStreamId(streamId)
        long snapshotVersion = snapshot.streamVersion()        
    
        // Read all events for "streamId" from snapshotVersion  
        val eventStream = eventStore.read(streamId, snapshotVersion, Long.MAX_VALUE)
        val eventsSinceSnapshot = eventStream.eventList()

        // Call a pure function from the domain model which returns a List of new events
        val newEvents = functionThatCallsDomainModel(snapshot.state(), eventsSinceSnapshot)

        // Convert domain events to cloud events and write them to the event store  
        eventStore.write(streamId, eventStream.version(), newEvents)
        
        // Update the snapshot
        val updatedSnapshot = snapshot.updateFrom(newEvents, eventStream.version())
        snapshotRepsitory.save(updatedSnapshot)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}