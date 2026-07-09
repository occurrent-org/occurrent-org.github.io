{% capture java %}
public class WordGuessingGame {
    public List<DomainEvent> startNewGame(List<DomainEvent> events, String gameId, String wordToGuess) {
        // Implementation
    }
    
    public List<DomainEvent> makeGuess(List<DomainEvent> events, String guess) {
        // Implementation
    }
}
{% endcapture %}
{% capture kotlin %}
object WordGuessingGame {
    fun startNewGame(events : List<DomainEvent>, gameId : String, wordToGuess : String) : List<DomainEvent> {
        // Implementation
    } 

    fun makeGuess(events : List<DomainEvent>, guess : String) : List<DomainEvent> {
        // Implementation
    }    
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
