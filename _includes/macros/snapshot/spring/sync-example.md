{% capture java %}
public class ApplicationService {

    private final EventStore eventStore;
    private final SnapshotRepository snapshotRepository;
    
    public ApplicationService(EventStore eventStore,  SnapshotRepository snapshotRepository) {
        this.eventStore = eventStore;
        this.snapshotRepository = snapshotRepository;
    }
    
    @Transactional
    public void execute(String streamId, BiFunction<Snapshot, Stream<CloudEvent>, Stream<CloudEvent>> functionThatCallsDomainModel) {
        // Read snapshot from a the snapshot repsitory 
        Snapshot snapshot = snapshotRepsitory.findByStreamId(streamId);
        long snapshotVersion = snapshot.version();        
    
        // Read all events for "streamId" from snapshotVersion  
        EventStream<CloudEvent> eventStream = eventStore.read(streamId, snapshotVersion, Long.MAX_VALUE);

        // Call a pure function from the domain model which returns a Stream of new events  
        List<CloudEvent> newEvents = functionThatCallsDomainModel.apply(snapshot.state(), eventStream).collect(Collectors.toList());

        // Convert domain events to cloud events and write them to the event store  
        eventStore.write(streamId, eventStream.version(), newEvents.stream());
        
        // Update the snapshot
        Snapshot updatedSnapshot = snapshot.updateFrom(newEvents.stream(), eventStream.version());
        snapshotRepsitory.save(updatedSnapshot);
    }
}
{% endcapture %}

{% capture kotlin %}
class ApplicationService(val eventStore : EventStore, val snapshotRepository : SnapshotRepository) {
    
    @Transactional
    fun execute(String streamId, functionThatCallsDomainModel : (Snapshot, Stream<CloudEvent>) -> Stream<CloudEvent>) {
        // Read snapshot from a the snapshot repsitory 
        val snapshot : Snapshot = snapshotRepsitory.findByStreamId(streamId)
        long snapshotVersion = snapshot.streamVersion()        
    
        // Read all events for "streamId" from snapshotVersion  
        val eventStream = eventStore.read(streamId, snapshotVersion, Long.MAX_VALUE)

        // Call a pure function from the domain model which returns a Stream of new events  
        val newEvents = functionThatCallsDomainModel(snapshot.state(), eventStream).collect(Collectors.toList())

        // Convert domain events to cloud events and write them to the event store  
        eventStore.write(streamId, eventStream.version(), newEvents.stream())
        
        // Update the snapshot
        val updatedSnapshot = snapshot.updateFrom(newEvents.stream(), eventStream.version())
        snapshotRepsitory.save(updatedSnapshot)
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}