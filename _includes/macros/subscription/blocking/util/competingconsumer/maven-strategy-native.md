{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>subscription-mongodb-native-blocking-competing-consumer-strategy</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:subscription-mongodb-native-blocking-competing-consumer-strategy:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "subscription-mongodb-native-blocking-competing-consumer-strategy" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='subscription-mongodb-native-blocking-competing-consumer-strategy', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/subscription-mongodb-native-blocking-competing-consumer-strategy "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:subscription-mongodb-native-blocking-competing-consumer-strategy:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="subscription-mongodb-native-blocking-competing-consumer-strategy" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}