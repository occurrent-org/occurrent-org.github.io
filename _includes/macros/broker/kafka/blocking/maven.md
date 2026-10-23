{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-broker-kafka-blocking</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:occurrent-broker-kafka-blocking:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "occurrent-broker-kafka-blocking" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='occurrent-broker-kafka-blocking', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/occurrent-broker-kafka-blocking "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:occurrent-broker-kafka-blocking:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="occurrent-broker-kafka-blocking" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}
