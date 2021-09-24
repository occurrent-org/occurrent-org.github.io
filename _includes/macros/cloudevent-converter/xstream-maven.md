{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>cloudevent-converter-xstream</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:cloudevent-converter-xstream:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "cloudevent-converter-xstream" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='cloudevent-converter-xstream', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/cloudevent-converter-xstream "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:cloudevent-converter-xstream:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="cloudevent-converter-xstream" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}