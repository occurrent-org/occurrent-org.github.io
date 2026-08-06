{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-tck-eventstore-reactor</artifactId>
    <version>{{site.occurrentversion}}</version>
    <scope>test</scope>
</dependency>
{% endcapture %}

{% capture gradle %}
testImplementation 'org.occurrent:occurrent-tck-eventstore-reactor:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "occurrent-tck-eventstore-reactor" % "{{site.occurrentversion}}" % Test
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='occurrent-tck-eventstore-reactor', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/occurrent-tck-eventstore-reactor "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:occurrent-tck-eventstore-reactor:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="occurrent-tck-eventstore-reactor" rev="{{site.occurrentversion}}" conf="test" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}
