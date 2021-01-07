{% capture java %}
public class WhenGameWonThenSendEmailToWinnerPolicy {

    private final SubscriptionModel subscriptionModel;
    private final EmailClient emailClient;
    private final Players players;
    
    public WhenGameWonThenSendEmailToWinnerPolicy(SubscriptionModel subscriptionModel, EmailClient emailClient, Players players) {
        this.subscriptionModel = subscriptionModel;
        this.emailClient = emailClient;
        this.players = players;
    }
    
    @PostConstruct
    public void whenGameWonThenSendEmailToWinner() {
        subscriptionModel.subscribe("whenGameWonThenSendEmailToWinnerPolicy", filter(type("GameWon")), cloudEvent -> {
            String playerEmailAddress =  players.whatIsTheEmailAddressOfPlayer(playerIdIn(cloudEvent.getData()));
            emailClient.sendEmail(playerEmailAddress, "You won, yaay!");
        }          
    }
}
{% endcapture %}

{% capture kotlin %}
class WhenGameWonThenSendEmailToWinnerPolicy(val subscriptionModel : SubscriptionModel, 
                                             val emailClient : EmailClient, val players : Players) {

    @PostConstruct
    fun whenGameWonThenSendEmailToWinner() = 
        subscriptionModel.subscribe("whenGameWonThenSendEmailToWinnerPolicy", filter(type("GameWon")) { cloudEvent -> 
            val playerEmailAddress =  players.whatIsTheEmailAddressOfPlayer(playerIdIn(cloudEvent.getData()))
            emailClient.sendEmail(playerEmailAddress, "You won, yaay!")
        }          
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
