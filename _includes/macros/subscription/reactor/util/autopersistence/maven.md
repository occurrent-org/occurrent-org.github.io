{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>subscription-util-reactor-automatic-position-persistence</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:subscription-util-reactor-automatic-position-persistence:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "subscription-util-reactor-automatic-position-persistence" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='subscription-util-reactor-automatic-position-persistence', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/subscription-util-reactor-automatic-position-persistence "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:subscription-util-reactor-automatic-position-persistence:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="subscription-util-reactor-automatic-position-persistence" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}