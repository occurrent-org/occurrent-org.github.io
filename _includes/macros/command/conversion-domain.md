{% capture java %}
public class WordGuessingGame {
    public List<DomainEvent> guessWord(List<DomainEvents> events, String guess) {
        // Implementation
    }
}
{% endcapture %}
{% capture kotlin %}
object WordGuessingGame {
    fun guessWord(events : List<DomainEvent>, guess : String) : List<DomainEvent> {
        // Implementation
    }    
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}