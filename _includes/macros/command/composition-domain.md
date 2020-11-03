{% capture java %}
public class WordGuessingGame {
    public Stream<DomainEvent> startNewGame(Stream<DomainEvents> events, String gameId, String wordToGuess) {
        // Implementation
    }
    
    public Stream<DomainEvent> guessWord(Stream<DomainEvents> events, String guess) {
        // Implementation
    }
}
{% endcapture %}
{% capture kotlin %}
object WordGuessingGame {
    fun startNewGame(events : Sequence<DomainEvent>), gameId : String, wordToGuess : String) : Sequence<DomainEvent> {
        // Implementation
    } 

    fun guessWord(events : Sequence<DomainEvent>, guess : String) : Sequence<DomainEvent> {
        // Implementation
    }    
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}