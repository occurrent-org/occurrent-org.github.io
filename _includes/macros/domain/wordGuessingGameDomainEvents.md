{% capture java %}
public class WordGuessingGame {
	public static List<DomainEvent> startNewGame(String gameId, String wordToGuess) {	
		...
	}

	public static List<DomainEvent> guessWord(List<DomainEvent> eventStream, String word) {
		...
	}
}
{% endcapture %}  
{% capture kotlin %}
// Note that the functions might as well be placed directly in a package.
 object WordGuessingGame {
    fun startNewGame(gameId : String, wordToGuess : String) : List<DomainEvent> = ...	
 
    fun guessWord(eventStream : List<DomainEvent>, word : String) : List<DomainEvent> = ...
 }
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}