{% capture java %}
@Component
public class Example {
    
    @Subscription(id = "printAllDomainEvents", startAt = StartPosition.BEGINNING_OF_TIME, startupMode = StartupMode.BACKGROUND)
    void printAllDomainEvents(DomainEvent e) {
        System.out.println("Received domain event %s".formatted(e));    
    }
}
{% endcapture %}

{% capture kotlin %}
@Component
class Example {

    @Subscription(id = "printAllDomainEvents", startAt = StartPosition.BEGINNING_OF_TIME, startupMode = StartupMode.BACKGROUND)
    fun printAllDomainEvents(e: DomainEvent) {
        println("Received domain event $e")
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}