{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-tck-eventstore-blocking</artifactId>
    <version>{{site.occurrentversion}}</version>
    <scope>test</scope>
</dependency>
{% endcapture %}

{% capture gradle %}
testImplementation 'org.occurrent:occurrent-tck-eventstore-blocking:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "occurrent-tck-eventstore-blocking" % "{{site.occurrentversion}}" % Test
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='occurrent-tck-eventstore-blocking', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/occurrent-tck-eventstore-blocking "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:occurrent-tck-eventstore-blocking:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="occurrent-tck-eventstore-blocking" rev="{{site.occurrentversion}}" conf="test" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}
