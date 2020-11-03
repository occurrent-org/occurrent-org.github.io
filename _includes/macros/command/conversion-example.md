{% capture java %}
String guess = ...
applicationService.execute(gameId, toStreamCommand( events -> WordGuessingGame.makeGuess(events, guess)));
{% endcapture %}
{% capture kotlin %}
val guess = ...
applicationService.execute(gameId, toStreamCommand { events -> WordGuessingGame.makeGuess(events, guess) } )
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}