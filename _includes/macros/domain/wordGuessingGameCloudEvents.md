{% capture java %}
public class WordGuessingGame {
	public static List<CloudEvent> startNewGame(String gameId, String wordToGuess) {	
		...
	}

	public static List<CloudEvent> guessWord(List<CloudEvent> eventStream, String word) {
		...
	}
}
{% endcapture %}  
{% capture kotlin %}
// Note that the functions might as well be placed directly in a package 
 object WordGuessingGame {
    fun startNewGame(gameId : String, wordToGuess : String) : List<CloudEvent> = ...	
 
    fun guessWord(eventStream : List<CloudEvent>, word : String) : List<CloudEvent> = ...
 }
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}