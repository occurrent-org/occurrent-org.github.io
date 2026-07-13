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
        // Read snapshot from the snapshot repository 
        Snapshot snapshot = snapshotRepository.findByStreamId(streamId);
        long snapshotVersion = snapshot.version();        
    
        // Read all events for "streamId" from snapshotVersion  
        EventStream<CloudEvent> eventStream = eventStore.read(streamId, snapshotVersion, Long.MAX_VALUE);
        List<CloudEvent> eventsSinceSnapshot = eventStream.eventList();

        // Call a pure function from the domain model which returns a List of new events
        List<CloudEvent> newEvents = functionThatCallsDomainModel.apply(snapshot.state(), eventsSinceSnapshot);

        // Write the new events to the event store  
        eventStore.write(streamId, eventStream.version(), newEvents);
        
        // Update the snapshot
        Snapshot updatedSnapshot = snapshot.updateFrom(newEvents, eventStream.version());
        snapshotRepository.save(updatedSnapshot);
    }
}
{% endcapture %}

{% capture kotlin %}
class ApplicationService(val eventStore : EventStore, val snapshotRepository : SnapshotRepository) {
    
    @Transactional
    fun execute(streamId : String, functionThatCallsDomainModel : (Snapshot, List<CloudEvent>) -> List<CloudEvent>) {
        // Read snapshot from the snapshot repository 
        val snapshot : Snapshot = snapshotRepository.findByStreamId(streamId)
        val snapshotVersion = snapshot.streamVersion()        
    
        // Read all events for "streamId" from snapshotVersion  
        val eventStream = eventStore.read(streamId, snapshotVersion, Long.MAX_VALUE)
        val eventsSinceSnapshot = eventStream.eventList()

        // Call a pure function from the domain model which returns a List of new events
        val newEvents = functionThatCallsDomainModel(snapshot.state(), eventsSinceSnapshot)

        // Write the new events to the event store  
        eventStore.write(streamId, eventStream.version(), newEvents)
        
        // Update the snapshot
        val updatedSnapshot = snapshot.updateFrom(newEvents, eventStream.version())
        snapshotRepository.save(updatedSnapshot)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}