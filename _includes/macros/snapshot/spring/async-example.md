{% capture java %}
public class UpdateSnapshotWhenNewEventsAreWrittenToEventStore {

    private final BlockingSubscription subscription;
    private final SnapshotRepository snapshotRepository;
    
    public UpdateSnapshotWhenNewEventsAreWrittenToEventStore(BlockingSubscription subscription, SnapshotRepository snapshotRepository) {
        this.subscription = subscription;
        this.snapshotRepository = snapshotRepository;
    }
    
    @PostConstruct
    public void updateSnapshotWhenNewEventsAreWrittenToEventStore() {
        subscription.subscribe("updateSnapshots", cloudEvent -> {
            String streamId = OccurrentExtensionGetter.getStreamId(cloudEvent);
            long streamVersion = OccurrentExtensionGetter.getStreamVersion(cloudEvent);
            
            Snapshot snapshot = snapshotRepository.findByStreamId(streamId);        
            snapshot.updateFrom(cloudEvent, streamVersion);
            snapshotRepository.save(snapshot);
        }          
    }
}
{% endcapture %}

{% capture kotlin %}
class UpdateSnapshotWhenNewEventsAreWrittenToEventStore(val subscription : BlockingSubscription, 
                                                        val snapshotRepository : SnapshotRepository) {

    @PostConstruct
    fun updateSnapshotWhenNewEventsAreWrittenToEventStore() {
        subscription.subscribe("updateSnapshots", { cloudEvent -> 
            String streamId = OccurrentExtensionGetter.getStreamId(cloudEvent)
            long streamVersion = OccurrentExtensionGetter.getStreamVersion(cloudEvent)
            
            Snapshot snapshot = snapshotRepository.findByStreamId(streamId)        
            snapshot.updateFrom(cloudEvent, streamVersion)
            snapshotRepository.save(snapshot)
        }          
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
