{% capture java %}
public class WhenGameWonThenSendEmailToWinnerPolicy {

    private final BlockingSubscription subscription;
    private final EmailClient emailClient;
    private final Players players;
    
    public WhenGameWonThenSendEmailToWinnerPolicy(BlockingSubscription subscription, EmailClient emailClient, Players players) {
        this.subscription = subscription;
        this.emailClient = emailClient;
        this.players = players;
    }
    
    @PostConstruct
    public void whenGameWonThenSendEmailToWinner() {
        subscription.subscribe("whenGameWonThenSendEmailToWinnerPolicy", filter(type("GameWon")), cloudEvent -> {
            String playerEmailAddress =  players.whatIsTheEmailAddressOfPlayer(playerIdIn(cloudEvent.getData()));
            emailClient.sendEmail(playerEmailAddress, "You won, yaay!");
        }          
    }
}
{% endcapture %}

{% capture kotlin %}
class WhenGameWonThenSendEmailToWinnerPolicy(val subscription : BlockingSubscription, 
                                             val emailClient : EmailClient, val players : Players) {

    @PostConstruct
    fun whenGameWonThenSendEmailToWinner() = 
        subscription.subscribe("whenGameWonThenSendEmailToWinnerPolicy", filter(type("GameWon")) { cloudEvent -> 
            val playerEmailAddress =  players.whatIsTheEmailAddressOfPlayer(playerIdIn(cloudEvent.getData()))
            emailClient.sendEmail(playerEmailAddress, "You won, yaay!")
        }          
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
